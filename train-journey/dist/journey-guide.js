(() => {
  const journey = document.querySelector('.journey');
  const ticket = document.querySelector('.ticket-gate');
  if (!journey || !ticket) return;

  // A new key lets visitors who saw the old overview receive this guided flow.
  const storageKey = 'vietphuc-journey-guide-v2';
  const copy = {
    vi: {
      reopen: 'Hướng dẫn', skip: 'Bỏ qua', done: 'Xong',
      steps: {
        name: ['1 / 4 · TẤM VÉ CỦA BẠN', 'Ghi tên lên vé', 'Nhấn vào ô tên trên tấm vé và nhập tên của bạn.'],
        board: ['2 / 4 · LÊN TÀU', 'Bắt đầu hành trình', 'Vé đã có tên. Nhấn “Lên tàu” để vào sân ga. Bạn cũng có thể tải ảnh vé để giữ làm kỷ niệm.'],
        carriage: ['3 / 4 · TOA ĐẦU TIÊN', 'Khám phá toa đầu tiên', 'Nhấn vào toa tàu đang hiện trước mặt để bắt đầu.'],
        experience: ['3 / 4 · TOA ĐẦU TIÊN', 'Bắt đầu hoạt động', 'Nhấn “Trải nghiệm hoạt động” để mở bài khám phá trang phục. Hoàn thành bài này để mở các toa tiếp theo.'],
        explore: ['4 / 4 · ĐI DỌC ĐOÀN TÀU', 'Các toa đã mở', 'Dùng nút mũi tên, phím ← → hoặc vuốt để chuyển toa. Nhấn vào một toa để xem trải nghiệm bên trong.']
      }
    },
    en: {
      reopen: 'Guide', skip: 'Skip', done: 'Done',
      steps: {
        name: ['1 / 4 · YOUR TICKET', 'Add your name', 'Select the name field on the ticket and enter your name.'],
        board: ['2 / 4 · BOARD THE TRAIN', 'Start your journey', 'Your ticket has a name. Select “Board the train” to enter the platform. You can also download the ticket as a keepsake.'],
        carriage: ['3 / 4 · FIRST CARRIAGE', 'Explore the first carriage', 'Select the carriage in front of you to begin.'],
        experience: ['3 / 4 · FIRST CARRIAGE', 'Start the activity', 'Select “Experience the activity” to open the clothing quiz. Finish it to unlock the remaining carriages.'],
        explore: ['4 / 4 · EXPLORE THE TRAIN', 'The carriages are unlocked', 'Use the arrow buttons, ← → keys, or swipe to change carriages. Select a carriage to explore inside.']
      }
    }
  };

  const reopen = document.createElement('button');
  reopen.type = 'button';
  reopen.className = 'journey-guide-reopen';
  reopen.innerHTML = '<span aria-hidden="true">?</span><span class="journey-guide-reopen-text"></span>';
  document.body.append(reopen);

  const panel = document.createElement('aside');
  panel.className = 'journey-guide-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'status');
  panel.setAttribute('aria-live', 'polite');
  panel.setAttribute('data-no-translate', '');
  panel.innerHTML = `<div class="journey-guide-top"><span class="journey-guide-progress"></span><button type="button" class="journey-guide-skip"></button></div>
    <h2 class="journey-guide-title"></h2><p class="journey-guide-body"></p>
    <button type="button" class="journey-guide-done" hidden></button>`;
  document.body.append(panel);

  const skip = panel.querySelector('.journey-guide-skip');
  const done = panel.querySelector('.journey-guide-done');
  let active = false;
  let currentTarget = null;
  let currentStep = '';
  let currentLanguage = '';
  let positionedFrame = 0;
  const language = () => window.trainI18n?.language === 'en' ? 'en' : 'vi';
  const quizVisible = () => !!document.querySelector('.clothing-quiz-overlay:not([hidden])');
  const experienceVisible = () => !!document.querySelector('.experience-overlay:not([hidden])');
  const otherActivityVisible = () => !!document.querySelector('.booth-overlay:not([hidden]),.postal-overlay:not([hidden]),.interior-overlay:not([hidden]),.destination-overlay:not([hidden])');

  function remember() {
    try { localStorage.setItem(storageKey, 'seen'); } catch (_) {}
  }
  function stop() {
    active = false;
    remember();
    currentTarget?.classList.remove('journey-guide-target');
    currentTarget = null;
    panel.hidden = true;
    document.body.classList.remove('journey-guide-active');
    cancelAnimationFrame(positionedFrame);
  }
  function stepAndTarget() {
    const gate = document.querySelector('.ticket-gate:not(.is-leaving)');
    if (gate) {
      const input = gate.querySelector('#ticket-name');
      return input?.value.trim()
        ? ['board', gate.querySelector('.ticket-enter')]
        : ['name', input];
    }
    if (window.trainQuizComplete) return ['explore', document.querySelector('#next')];
    if (experienceVisible()) return ['experience', document.querySelector('.experience-overlay:not([hidden]) .experience-continue')];
    if (quizVisible()) return ['', null];
    return ['carriage', document.querySelector('#train-track .train-car')];
  }
  function position() {
    if (panel.hidden || !currentTarget?.isConnected) return;
    const rect = currentTarget.getBoundingClientRect();
    const width = panel.offsetWidth;
    const height = panel.offsetHeight;
    const gap = 16;
    const margin = 12;
    let left, top;
    if (innerWidth > 760 && rect.left - width - gap >= margin) {
      left = rect.left - width - gap;
      top = rect.top + rect.height / 2 - height / 2;
    } else if (innerWidth > 760 && rect.right + width + gap <= innerWidth - margin) {
      left = rect.right + gap;
      top = rect.top + rect.height / 2 - height / 2;
    } else {
      left = rect.left + rect.width / 2 - width / 2;
      top = rect.bottom + gap + height <= innerHeight - margin ? rect.bottom + gap : rect.top - height - gap;
    }
    panel.style.left = `${Math.max(margin, Math.min(left, innerWidth - width - margin))}px`;
    panel.style.top = `${Math.max(margin, Math.min(top, innerHeight - height - margin))}px`;
  }
  function render() {
    const content = copy[language()];
    reopen.querySelector('.journey-guide-reopen-text').textContent = content.reopen;
    reopen.setAttribute('aria-label', content.reopen);
    skip.textContent = content.skip;
    done.textContent = content.done;
    if (!active) return;

    const [step, target] = stepAndTarget();
    const visible = !!step && !!target && !quizVisible() && !otherActivityVisible() && (step !== 'explore' || !experienceVisible());
    if (currentTarget !== target) {
      currentTarget?.classList.remove('journey-guide-target');
      currentTarget = target;
    }
    if (!visible) {
      currentTarget?.classList.remove('journey-guide-target');
      panel.hidden = true;
      return;
    }
    currentTarget.classList.add('journey-guide-target');
    if (currentStep !== step || currentLanguage !== language() || panel.hidden) {
      const [progress, title, body] = content.steps[step];
      panel.querySelector('.journey-guide-progress').textContent = progress;
      panel.querySelector('.journey-guide-title').textContent = title;
      panel.querySelector('.journey-guide-body').textContent = body;
      done.hidden = step !== 'explore';
      currentStep = step;
      currentLanguage = language();
    }
    panel.hidden = false;
    cancelAnimationFrame(positionedFrame);
    positionedFrame = requestAnimationFrame(position);
  }
  function start() {
    active = true;
    currentStep = '';
    document.body.classList.add('journey-guide-active');
    render();
  }

  reopen.addEventListener('click', start);
  skip.addEventListener('click', stop);
  done.addEventListener('click', stop);
  ticket.querySelector('#ticket-name')?.addEventListener('input', render);
  window.addEventListener('train-boarded', () => setTimeout(render, 550));
  window.addEventListener('train-quiz-completed', render);
  window.addEventListener('train-language-changed', render);
  window.addEventListener('resize', position);
  window.addEventListener('scroll', position, true);
  [...document.querySelectorAll('.experience-overlay,.clothing-quiz-overlay,.booth-overlay,.postal-overlay,.interior-overlay,.destination-overlay')]
    .filter(Boolean)
    .forEach(overlay => new MutationObserver(render).observe(overlay, {attributes: true, attributeFilter: ['hidden']}));
  render();
  try { if (localStorage.getItem(storageKey) !== 'seen') start(); }
  catch (_) { start(); }
})();
