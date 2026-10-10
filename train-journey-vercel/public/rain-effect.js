(() => {
  const scene = document.querySelector('.scene');
  const rainOption = document.querySelector('[data-ambient="rain"]');
  if (!scene || !rainOption) return;

  const overlay = document.createElement('div');
  overlay.className = 'rain-weather';
  overlay.setAttribute('aria-hidden', 'true');
  const canvas = document.createElement('canvas');
  overlay.append(canvas);
  scene.append(overlay);
  const context = canvas.getContext('2d');
  if (!context) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let enabled = rainOption.checked;
  let drops = [];
  let width = 0;
  let height = 0;
  let frame = 0;
  let lastTime = 0;

  function createDrop(initial = false) {
    const near = Math.random() > .63;
    return {
      x: Math.random() * (width + 80),
      y: initial ? Math.random() * height : -20 - Math.random() * 60,
      length: near ? 15 + Math.random() * 14 : 7 + Math.random() * 11,
      speed: near ? 9 + Math.random() * 6 : 5 + Math.random() * 5,
      slant: near ? 3 + Math.random() * 3 : 2 + Math.random() * 2,
      lineWidth: near ? 1.25 : .8,
      color: near ? 'rgba(191,224,239,.65)' : 'rgba(49,94,118,.35)'
    };
  }

  function resize() {
    width = overlay.clientWidth;
    height = overlay.clientHeight;
    if (!width || !height) return;
    const scale = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * scale);
    canvas.height = Math.round(height * scale);
    context.setTransform(scale, 0, 0, scale, 0, 0);
    drops = Array.from({length: Math.min(170, Math.max(65, Math.round(width / 7)))}, () => createDrop(true));
    draw(false);
  }

  function draw(move, elapsed = 1) {
    context.clearRect(0, 0, width, height);
    context.lineCap = 'round';
    for (let i = 0; i < drops.length; i++) {
      let drop = drops[i];
      if (move) {
        drop.x -= drop.slant * elapsed;
        drop.y += drop.speed * elapsed;
        if (drop.y > height + drop.length || drop.x < -30) {
          drop = createDrop();
          drops[i] = drop;
        }
      }
      context.strokeStyle = drop.color;
      context.lineWidth = drop.lineWidth;
      context.beginPath();
      context.moveTo(drop.x, drop.y);
      context.lineTo(drop.x - drop.slant, drop.y + drop.length);
      context.stroke();
    }
  }

  function animate(time) {
    if (!enabled || document.hidden || reducedMotion.matches) { frame = 0; return; }
    const elapsed = Math.min(2.5, Math.max(.5, (time - (lastTime || time - 16.7)) / 16.7));
    lastTime = time;
    draw(true, elapsed);
    frame = requestAnimationFrame(animate);
  }

  function update() {
    overlay.classList.toggle('is-active', enabled);
    if (frame) { cancelAnimationFrame(frame); frame = 0; }
    lastTime = 0;
    if (!enabled || document.hidden) return;
    if (!width || !height) resize();
    if (reducedMotion.matches) draw(false);
    else frame = requestAnimationFrame(animate);
  }

  window.addEventListener('train-rain-change', event => {
    enabled = Boolean(event.detail.enabled);
    update();
  });
  document.addEventListener('visibilitychange', update);
  reducedMotion.addEventListener('change', update);
  new ResizeObserver(resize).observe(overlay);
  resize();
  update();
})();
