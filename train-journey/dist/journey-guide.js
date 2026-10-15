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
        board: ['2 / 4 · LÊN TÀU', 'Bắt đầu hành trình', 'Nhấn “Lên tàu” để vào sân ga. Bạn cũng có thể bỏ qua vé hoặc tải ảnh vé làm kỷ niệm.'],
        carriage: ['3 / 4 · KHÁM PHÁ', 'Chọn một toa tàu', 'Bạn có thể bắt đầu ở toa đầu tiên hoặc chọn bất kỳ toa nào để xem chủ đề văn hóa bên trong.'],
        experience: ['3 / 4 · HOẠT ĐỘNG', 'Bắt đầu hoạt động', 'Chọn hoạt động bạn muốn thử. Bài khám phá trang phục là một lựa chọn, không phải điều kiện để đi tiếp.'],
        explore: ['4 / 4 · ĐI DỌC ĐOÀN TÀU', 'Tự chọn hành trình', 'Dùng nút mũi tên, phím ← → hoặc vuốt để chuyển toa. Nhấn vào một toa để xem trải nghiệm bên trong.']
      }
    },
    en: {
      reopen: 'Guide', skip: 'Skip', done: 'Done',
      steps: {
        name: ['1 / 4 · YOUR TICKET', 'Add your name', 'Select the name field on the ticket and enter your name.'],
        board: ['2 / 4 · BOARD THE TRAIN', 'Start your journey', 'Select “Board the train” to enter the platform. You can also skip the ticket or download it as a keepsake.'],
        carriage: ['3 / 4 · EXPLORE', 'Choose a carriage', 'Start with the first carriage or choose any carriage to explore a cultural topic.'],
        experience: ['3 / 4 · ACTIVITY', 'Start an activity', 'Choose an activity to try. The clothing quiz is optional and does not block the rest of the journey.'],
        explore: ['4 / 4 · EXPLORE THE TRAIN', 'Choose your own route', 'Use the arrow buttons, ← → keys, or swipe to change carriages. Select a carriage to explore inside.']
      }
    }
  };

  const reopen = document.createElement('button');
  reopen.type = 'button';
  reopen.className = 'journey-guide-reopen';
  reopen.innerHTML = '<span aria-hidden="true">?</span><span class="journey-guide-reopen-text"></span>';
  (document.getElementById('site-controls') || document.body).append(reopen);

  const panel = document.createElement('aside');
  panel.className = 'journey-guide-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'status');
  panel.setAttribute('aria-live', 'polite');
  panel.innerHTML = `<div class="journey-guide-top"><span class="journey-guide-progress"></span><button type="button" class="journey-guide-skip"></button></div>
    <h2 class="journey-guide-title"></h2><p class="journey-guide-body"></p>
    <button type="button" class="journey-guide-done" hidden></button>
    <div class="journey-guide-arrow" aria-hidden="true"></div>`;
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
    const width = panel.offsetWidth || 300;
    const height = panel.offsetHeight || 140;
    const gap = 10;
    const margin = 10;
    const maxLeft = Math.max(margin, innerWidth - width - margin);
    const maxTop = Math.max(margin, innerHeight - height - margin);

    // List of interactive elements that the guide panel must NEVER cover
    const obstacleElements = [
      currentTarget,
      document.querySelector('#ticket-download'),
      document.querySelector('.ticket-enter'),
      document.querySelector('#ticket-name'),
      document.querySelector('.ticket-actions button'),
      document.querySelector('#site-controls')
    ].filter(el => el && el.isConnected && el.offsetParent !== null);

    const obstacles = obstacleElements.map(el => {
      const r = el.getBoundingClientRect();
      return {
        left: r.left - 4,
        right: r.right + 4,
        top: r.top - 4,
        bottom: r.bottom + 4
      };
    });

    const overlapsAny = (l, t) => {
      const rPanel = l + width;
      const bPanel = t + height;
      return obstacles.some(obs => !(rPanel <= obs.left || l >= obs.right || bPanel <= obs.top || t >= obs.bottom));
    };

    let bestLeft = margin;
    let bestTop = margin;
    let placement = 'top';
    let found = false;

    // Centered coordinates relative to current target
    const centerLeft = Math.max(margin, Math.min(rect.left + rect.width / 2 - width / 2, maxLeft));
    const targetMidY = Math.max(margin, Math.min(rect.top + rect.height / 2 - height / 2, maxTop));

    // 1. Primary preference: Directly ABOVE the target button (close & points right down at it)
    const topAbove = rect.top - height - gap;
    if (topAbove >= margin && !overlapsAny(centerLeft, topAbove)) {
      bestLeft = centerLeft;
      bestTop = topAbove;
      placement = 'top';
      found = true;
    }

    // 2. Next preference: Directly to the RIGHT of the target button (close & points left at it)
    if (!found) {
      const rightBeside = rect.right + gap;
      if (rightBeside <= maxLeft && !overlapsAny(rightBeside, targetMidY)) {
        bestLeft = rightBeside;
        bestTop = targetMidY;
        placement = 'right';
        found = true;
      }
    }

    // 3. Next preference: Directly BELOW the target button (close & points up at it)
    if (!found) {
      const topBelow = rect.bottom + gap;
      if (topBelow <= maxTop && !overlapsAny(centerLeft, topBelow)) {
        bestLeft = centerLeft;
        bestTop = topBelow;
        placement = 'bottom';
        found = true;
      }
    }

    // 4. Next preference: Directly to the LEFT of the target button (only if not blocking #ticket-download)
    if (!found) {
      const leftBeside = rect.left - width - gap;
      if (leftBeside >= margin && !overlapsAny(leftBeside, targetMidY)) {
        bestLeft = leftBeside;
        bestTop = targetMidY;
        placement = 'left';
        found = true;
      }
    }

    // 5. Intelligent Fallback: Pick the closest valid non-overlapping position to currentTarget center
    if (!found) {
      const targetCenterX = rect.left + rect.width / 2;
      const targetCenterY = rect.top + rect.height / 2;
      let minDistance = Infinity;

      const candidateList = [
        { l: centerLeft, t: Math.max(margin, rect.top - height - gap), p: 'top' },
        { l: centerLeft, t: Math.min(maxTop, rect.bottom + gap), p: 'bottom' },
        { l: Math.min(maxLeft, rect.right + gap), t: targetMidY, p: 'right' },
        { l: Math.max(margin, rect.left - width - gap), t: targetMidY, p: 'left' },
        { l: maxLeft, t: targetMidY, p: 'right' },
        { l: margin, t: targetMidY, p: 'left' }
      ];

      for (const cand of candidateList) {
        if (!overlapsAny(cand.l, cand.t)) {
          const d = Math.hypot((cand.l + width / 2) - targetCenterX, (cand.t + height / 2) - targetCenterY);
          if (d < minDistance) {
            minDistance = d;
            bestLeft = cand.l;
            bestTop = cand.t;
            placement = cand.p;
            found = true;
          }
        }
      }

      if (!found) {
        bestTop = rect.top > innerHeight / 2 ? margin : maxTop;
        bestLeft = rect.left > innerWidth / 2 ? margin : maxLeft;
        placement = bestTop === margin ? 'bottom' : 'top';
      }
    }

    panel.setAttribute('data-placement', placement);
    if (placement === 'top' || placement === 'bottom') {
      const arrowLeft = Math.max(20, Math.min(width - 24, (rect.left + rect.width / 2) - bestLeft));
      panel.style.setProperty('--arrow-left', `${arrowLeft}px`);
    } else {
      const arrowTop = Math.max(20, Math.min(height - 24, (rect.top + rect.height / 2) - bestTop));
      panel.style.setProperty('--arrow-top', `${arrowTop}px`);
    }

    panel.style.left = `${Math.round(bestLeft)}px`;
    panel.style.top = `${Math.round(bestTop)}px`;
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
  ticket.querySelector('#ticket-download')?.addEventListener('click', () => {
    cancelAnimationFrame(positionedFrame);
    positionedFrame = requestAnimationFrame(position);
  });
  window.addEventListener('train-boarded', () => setTimeout(render, 550));
  window.addEventListener('train-quiz-completed', render);
  window.addEventListener('train-language-changed', render);
  window.addEventListener('resize', position);
  window.addEventListener('scroll', position, true);
  [...document.querySelectorAll('.experience-overlay,.clothing-quiz-overlay,.booth-overlay,.postal-overlay,.interior-overlay,.destination-overlay')]
    .filter(Boolean)
    .forEach(overlay => new MutationObserver(render).observe(overlay, {attributes: true, attributeFilter: ['hidden']}));
  // Hướng dẫn tự động chạy ngay lúc đầu
  start();
  requestAnimationFrame(position);
  setTimeout(position, 150);
  setTimeout(position, 500);
  window.addEventListener('load', () => {
    if (active) position();
  });
})();
