/* Locally synthesized rail joints, steel-wheel rumble, diesel hum and horn. */
(() => {
  const journey = document.querySelector('.journey');
  if (!journey) return;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'train-audio-toggle';
  button.dataset.audioState = 'idle';
  button.setAttribute('aria-label', 'Mở tùy chọn âm thanh');
  button.setAttribute('aria-controls', 'train-sound-panel');
  button.setAttribute('aria-expanded', 'false');
  button.title = 'Tùy chọn âm thanh';
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z"/><path class="sound-waves" d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/><path class="sound-muted" d="m16 9 6 6m0-6-6 6"/></svg>';
  const panel = document.createElement('div');
  panel.id = 'train-sound-panel';
  panel.className = 'train-sound-panel';
  panel.hidden = true;
  panel.innerHTML = '<p>ÂM THANH</p><label class="sound-master-row"><input type="checkbox" data-sound-enabled><span><b>Bật âm thanh</b><small>Tàu chạy và âm thanh không gian</small></span></label><div class="sound-volume-row"><label for="train-volume">Âm lượng <output id="train-volume-value" for="train-volume"></output></label><input id="train-volume" type="range" min="0" max="100" step="1"></div><p class="sound-section-heading">KHÔNG GIAN</p><label><input type="checkbox" data-ambient="rain"><span><b>Mưa rơi</b><small>Tiếng mưa và giọt nước</small></span></label><label><input type="checkbox" data-ambient="field"><span><b>Đồng lúa</b><small>Gió và côn trùng ngoài đồng</small></span></label><label><input type="checkbox" data-ambient="nature"><span><b>Chim & thiên nhiên</b><small>Chim hót, lá cây và dòng nước</small></span></label><small class="sound-panel-note">Có thể bật nhiều âm cùng lúc.</small>';
  journey.append(button, panel);
  const ambient = {rain: false, field: false, nature: false};
  try {
    const saved = JSON.parse(localStorage.getItem('train-ambient-sounds') || '{}');
    Object.keys(ambient).forEach(key => { ambient[key] = saved[key] === true; });
  } catch (_) { /* Browsers without storage still keep this visit's choices. */ }
  panel.querySelectorAll('[data-ambient]').forEach(input => { input.checked = ambient[input.dataset.ambient]; });
  let enabled = true;
  let volume = 70;
  try {
    enabled = localStorage.getItem('train-audio-enabled') !== 'false';
    const volumeSetting = localStorage.getItem('train-audio-volume');
    const savedVolume = Number(volumeSetting);
    if (volumeSetting !== null && Number.isFinite(savedVolume) && savedVolume >= 0 && savedVolume <= 100) volume = savedVolume;
  } catch (_) { /* Keep the default settings when storage is unavailable. */ }
  const enabledInput = panel.querySelector('[data-sound-enabled]');
  const volumeInput = panel.querySelector('#train-volume');
  const volumeValue = panel.querySelector('#train-volume-value');
  enabledInput.checked = enabled;
  volumeInput.value = String(volume);
  volumeValue.textContent = `${volume}%`;
  let context, master, noiseBuffer, timer, hornTimer, nextBeat = 0;
  let whiteNoise, ambientGains, nextDrop = 0, nextChirp = 0, nextBird = 0;
  const hornVoices = new Set();
  let boarded = false;
  const masterLevel = () => .54 * volume / 100;
  function updateButton() {
    button.dataset.muted = String(!enabled || volume === 0);
    enabledInput.checked = enabled;
  }
  function makeAudio() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) throw new Error('Audio unavailable');
    context = new AudioContext();
    context.addEventListener('statechange', () => { button.dataset.audioState = context.state; });
    master = context.createGain();
    master.gain.value = 0;
    const compressor = context.createDynamicsCompressor();
    compressor.threshold.value = -20;
    compressor.ratio.value = 4;
    master.connect(compressor).connect(context.destination);
    noiseBuffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    let brown = 0;
    for (let i = 0; i < data.length; i++) {
      brown = (brown + (Math.random() * 2 - 1) * .025) / 1.025;
      data[i] = brown * 3;
    }
    const rumble = context.createBufferSource();
    rumble.buffer = noiseBuffer;
    rumble.loop = true;
    const lowpass = context.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 650;
    const rumbleGain = context.createGain();
    rumbleGain.gain.value = .65;
    rumble.connect(lowpass).connect(rumbleGain).connect(master);
    rumble.start();
    [47, 94, 141].forEach((frequency, i) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = frequency;
      gain.gain.value = [.13, .055, .018][i];
      oscillator.connect(gain).connect(master);
      oscillator.start();
    });
    makeAmbience();
  }
  function makeAmbience() {
    whiteNoise = context.createBuffer(1, context.sampleRate * 4, context.sampleRate);
    const samples = whiteNoise.getChannelData(0);
    for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1;
    ambientGains = {};
    Object.keys(ambient).forEach(key => {
      const gain = context.createGain();
      gain.gain.value = 0;
      gain.connect(master);
      ambientGains[key] = gain;
    });
    const rain = context.createBufferSource();
    rain.buffer = whiteNoise;
    rain.loop = true;
    const rainFilter = context.createBiquadFilter();
    rainFilter.type = 'bandpass';
    rainFilter.frequency.value = 1700;
    rainFilter.Q.value = .55;
    const rainLevel = context.createGain();
    rainLevel.gain.value = .15;
    rain.connect(rainFilter).connect(rainLevel).connect(ambientGains.rain);
    rain.start();

    const wind = context.createBufferSource();
    wind.buffer = whiteNoise;
    wind.loop = true;
    const windFilter = context.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 580;
    const windLevel = context.createGain();
    windLevel.gain.value = .10;
    wind.connect(windFilter).connect(windLevel).connect(ambientGains.field);
    wind.start();

    const nature = context.createBufferSource();
    nature.buffer = whiteNoise;
    nature.loop = true;
    const natureFilter = context.createBiquadFilter();
    natureFilter.type = 'bandpass';
    natureFilter.frequency.value = 430;
    natureFilter.Q.value = .35;
    const natureLevel = context.createGain();
    const rustle = context.createOscillator();
    const rustleDepth = context.createGain();
    rustle.frequency.value = .19;
    rustleDepth.gain.value = .025;
    natureLevel.gain.value = .07;
    rustle.connect(rustleDepth).connect(natureLevel.gain);
    nature.connect(natureFilter).connect(natureLevel).connect(ambientGains.nature);
    rustle.start();
    nature.start();
    updateAmbientGains();
  }
  function updateAmbientGains() {
    if (!ambientGains) return;
    const levels = {rain: .75, field: .8, nature: .85};
    Object.keys(ambient).forEach(key => {
      ambientGains[key].gain.setTargetAtTime(ambient[key] ? levels[key] : 0, context.currentTime, .12);
    });
  }
  function playDrop(time) {
    const drop = context.createOscillator();
    const gain = context.createGain();
    drop.type = 'sine';
    drop.frequency.setValueAtTime(1100 + Math.random() * 700, time);
    drop.frequency.exponentialRampToValueAtTime(450 + Math.random() * 200, time + .09);
    gain.gain.setValueAtTime(.001, time);
    gain.gain.exponentialRampToValueAtTime(.035, time + .008);
    gain.gain.exponentialRampToValueAtTime(.001, time + .12);
    drop.connect(gain).connect(ambientGains.rain);
    drop.start(time); drop.stop(time + .13);
    drop.onended = () => { drop.disconnect(); gain.disconnect(); };
  }
  function playChirp(time) {
    const insect = context.createOscillator();
    const gain = context.createGain();
    insect.type = 'triangle';
    const pitch = 3400 + Math.random() * 900;
    insect.frequency.setValueAtTime(pitch, time);
    insect.frequency.linearRampToValueAtTime(pitch * 1.07, time + .18);
    gain.gain.setValueAtTime(.001, time);
    gain.gain.exponentialRampToValueAtTime(.022, time + .012);
    for (let i = 1; i <= 5; i++) {
      gain.gain.setValueAtTime(.022, time + i * .03);
      gain.gain.exponentialRampToValueAtTime(.002, time + i * .03 + .015);
    }
    insect.connect(gain).connect(ambientGains.field);
    insect.start(time); insect.stop(time + .19);
    insect.onended = () => { insect.disconnect(); gain.disconnect(); };
  }
  function playBirdCall(time) {
    const base = 1650 + Math.random() * 700;
    const notes = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < notes; i++) {
      const start = time + i * .19;
      const bird = context.createOscillator();
      const gain = context.createGain();
      const pitch = base * (i % 2 ? 1.18 : 1);
      bird.type = 'sine';
      bird.frequency.setValueAtTime(pitch, start);
      bird.frequency.exponentialRampToValueAtTime(pitch * 1.35, start + .08);
      bird.frequency.exponentialRampToValueAtTime(pitch * .86, start + .22);
      gain.gain.setValueAtTime(.001, start);
      gain.gain.exponentialRampToValueAtTime(.075, start + .035);
      gain.gain.exponentialRampToValueAtTime(.001, start + .24);
      bird.connect(gain).connect(ambientGains.nature);
      bird.start(start); bird.stop(start + .25);
      bird.onended = () => { bird.disconnect(); gain.disconnect(); };
    }
  }
  function railJoint(time, strength) {
    const source = context.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = context.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = 1150;
    filter.Q.value = .7;
    const gain = context.createGain();
    gain.gain.setValueAtTime(.001, time);
    gain.gain.exponentialRampToValueAtTime(strength, time + .006);
    gain.gain.exponentialRampToValueAtTime(.001, time + .12);
    source.connect(filter).connect(gain).connect(master);
    source.start(time, Math.random() * 2);
    source.stop(time + .14);
    source.onended = () => { source.disconnect(); filter.disconnect(); gain.disconnect(); };
    const knock = context.createOscillator();
    const knockGain = context.createGain();
    knock.frequency.setValueAtTime(160, time);
    knock.frequency.exponentialRampToValueAtTime(55, time + .085);
    knockGain.gain.setValueAtTime(strength * .24, time);
    knockGain.gain.exponentialRampToValueAtTime(.001, time + .10);
    knock.connect(knockGain).connect(master);
    knock.start(time);
    knock.stop(time + .12);
    knock.onended = () => { knock.disconnect(); knockGain.disconnect(); };
  }
  function schedule() {
    if (context.state !== 'running') return;
    const horizon = context.currentTime + .2;
    while (nextBeat < horizon) {
      railJoint(nextBeat, .9);
      railJoint(nextBeat + .12, .65);
      nextBeat += .56;
    }
    if (ambient.rain && nextDrop < horizon) { playDrop(nextDrop); nextDrop += .16 + Math.random() * .45; }
    if (ambient.field && nextChirp < horizon) { playChirp(nextChirp); nextChirp += .9 + Math.random() * 2.8; }
    if (ambient.nature && nextBird < horizon) { playBirdCall(nextBird); nextBird += 2.2 + Math.random() * 4.3; }
  }
  function soundHorn() {
    if (!context || context.state !== 'running') return;
    const start = context.currentTime;
    // A distant air horn: vary its pitch, length and occasional second blast.
    const pitch = .96 + Math.random() * .08;
    const blasts = Math.random() < .28 ? 2 : 1;
    const duration = 1.25 + Math.random() * .55;
    const end = start + duration + (blasts === 2 ? .8 : 0);
    const envelope = context.createGain();
    envelope.gain.setValueAtTime(.001, start);
    for (let i = 0; i < blasts; i++) {
      const blastStart = start + (i ? duration + .24 : 0);
      const blastEnd = i ? end : start + duration;
      const level = i ? .14 : .2;
      envelope.gain.setValueAtTime(.001, blastStart);
      envelope.gain.exponentialRampToValueAtTime(level, blastStart + .12);
      envelope.gain.setValueAtTime(level, blastEnd - .38);
      envelope.gain.exponentialRampToValueAtTime(.001, blastEnd);
    }
    const mellow = context.createBiquadFilter();
    mellow.type = 'lowpass';
    mellow.frequency.value = 850;
    envelope.connect(mellow).connect(master);
    [196, 246.94, 293.66].forEach((frequency, i) => {
      const voice = context.createOscillator();
      const level = context.createGain();
      voice.type = 'sawtooth';
      voice.frequency.setValueAtTime(frequency * pitch * .985, start);
      voice.frequency.linearRampToValueAtTime(frequency * pitch, start + .22);
      level.gain.value = [.14, .11, .08][i];
      voice.connect(level).connect(envelope);
      hornVoices.add(voice);
      voice.start(start);
      voice.stop(end + .03);
      voice.onended = () => {
        hornVoices.delete(voice);
        voice.disconnect();
        level.disconnect();
        if (!hornVoices.size) { envelope.disconnect(); mellow.disconnect(); }
      };
    });
  }
  function scheduleHorn(initial = false) {
    if (hornTimer || !boarded || !enabled || document.hidden || !context || context.state !== 'running') return;
    hornTimer = setTimeout(() => {
      hornTimer = 0;
      if (!enabled || document.hidden || context.state !== 'running') return;
      soundHorn();
      scheduleHorn();
    }, initial ? 6000 + Math.random() * 8000 : 18000 + Math.random() * 32000);
  }
  async function play() {
    if (!boarded || !enabled || document.hidden) return;
    try {
      if (!context) makeAudio();
      await context.resume();
      if (!enabled || document.hidden) { pause(); return; }
      nextBeat = context.currentTime + .03;
      nextDrop = context.currentTime + .15;
      nextChirp = context.currentTime + .5;
      nextBird = context.currentTime + .8;
      master.gain.cancelScheduledValues(context.currentTime);
      master.gain.setTargetAtTime(masterLevel(), context.currentTime, .22);
      clearInterval(timer);
      schedule();
      timer = setInterval(schedule, 80);
      scheduleHorn(true);
    } catch (_) {
      enabled = false;
      updateButton();
    }
  }
  function pause() {
    clearInterval(timer);
    clearTimeout(hornTimer);
    hornTimer = 0;
    hornVoices.forEach(voice => { try { voice.stop(); } catch (_) {} });
    if (context) context.suspend().catch(() => {});
  }
  window.playTrainHorn = async () => {
    if (!enabled || volume === 0 || document.hidden) return false;
    boarded = true;
    if (!context || context.state !== 'running') await play();
    if (!context || context.state !== 'running') return false;
    soundHorn();
    return true;
  };
  button.addEventListener('click', () => {
    panel.hidden = !panel.hidden;
    button.setAttribute('aria-expanded', String(!panel.hidden));
  });
  panel.addEventListener('change', event => {
    const input = event.target;
    if (input.matches('[data-sound-enabled]')) {
      enabled = input.checked;
      try { localStorage.setItem('train-audio-enabled', String(enabled)); } catch (_) {}
      updateButton();
      if (enabled) play(); else pause();
      return;
    }
    if (!input.matches('[data-ambient]')) return;
    ambient[input.dataset.ambient] = input.checked;
    try { localStorage.setItem('train-ambient-sounds', JSON.stringify(ambient)); } catch (_) {}
    if (input.dataset.ambient === 'rain') {
      window.dispatchEvent(new CustomEvent('train-rain-change', {detail: {enabled: ambient.rain}}));
    }
    if (context) {
      const now = context.currentTime;
      if (input.dataset.ambient === 'rain') nextDrop = now + .15;
      if (input.dataset.ambient === 'field') nextChirp = now + .2;
      if (input.dataset.ambient === 'nature') nextBird = now + .25;
      updateAmbientGains();
    }
  });
  volumeInput.addEventListener('input', () => {
    volume = Number(volumeInput.value);
    volumeValue.textContent = `${volume}%`;
    updateButton();
    if (context) master.gain.setTargetAtTime(masterLevel(), context.currentTime, .08);
    try { localStorage.setItem('train-audio-volume', String(volume)); } catch (_) {}
  });
  document.addEventListener('click', event => {
    if (panel.hidden || panel.contains(event.target) || button.contains(event.target)) return;
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || panel.hidden) return;
    panel.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    button.focus();
  });
  window.addEventListener('train-boarded', () => { boarded = true; play(); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); else play(); });
  updateButton();
})();
