(() => {
  const journey = document.querySelector('.journey');
  if (!journey) return;
  const overlay = document.createElement('div');
  overlay.className = 'clothing-quiz-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `<section class="clothing-quiz-card" role="dialog" aria-modal="true" aria-labelledby="clothing-quiz-title"><header class="clothing-quiz-header"><div><span class="clothing-quiz-kicker">TOA 01 · SẮC PHỤC CỦA BẠN</span><h2 id="clothing-quiz-title">Một nét riêng, một tà áo</h2></div><button type="button" class="clothing-quiz-close" aria-label="Đóng bài khám phá trang phục"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg></button></header><div class="clothing-quiz-body"></div></section>`;
  journey.append(overlay);
  const body = overlay.querySelector('.clothing-quiz-body');
  const closeButton = overlay.querySelector('.clothing-quiz-close');
  let selections = {}, step = 0, mode = null, gender = null, resultShown = false, chosenCategory, returnFocus, inactive = [];
  const data = () => window.clothingQuizData;
  const activeQuestions = () => data()?.questions?.filter(question => mode === 'detailed' || question.quick) || [];
  const visibleVariants = id => window.clothingQuizVisibleVariants?.(id, gender || 'other') || window.clothingQuizGarmentVariants?.[id] || [];
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  window.scoreClothingQuiz = (answers, options = {}) => {
    const quiz = data();
    if (!quiz?.categories?.length || !quiz?.questions?.length) return null;
    const selectedMode = options.mode || 'detailed', selectedGender = options.gender || 'other';
    const questions = quiz.questions.filter(question => selectedMode === 'detailed' || question.quick);
    const totals = Object.fromEntries(quiz.categories.map(category => [category.id, 0]));
    const matches = Object.fromEntries(quiz.categories.map(category => [category.id, 0]));
    questions.forEach(question => {
      const chosen = Array.isArray(answers) ? answers[quiz.questions.indexOf(question)] : answers?.[question.id];
      const answer = question.answers[chosen];
      if (!answer) return;
      const entries = Object.entries(answer.weights || {}).filter(([id, weight]) => Object.hasOwn(totals, id) && Number.isFinite(weight) && weight > 0);
      const breadth = Math.sqrt(entries.length);
      entries.forEach(([id, weight]) => {
        totals[id] += weight / breadth;
        matches[id]++;
      });
    });
    const eligible = quiz.categories.filter(category => {
      const variants = window.clothingQuizVisibleVariants?.(category.id, selectedGender);
      return !variants || variants.length > 0;
    });
    const ranked = eligible.map((category, order) => ({category, score: totals[category.id], matches: matches[category.id], order})).sort((a, b) => b.score - a.score || b.matches - a.matches || a.order - b.order);
    return ranked.length ? {category: ranked[0].category, scores: totals, ranked} : null;
  };
  function action(text, className, handler) {
    const button = element('button', className, text);
    button.type = 'button';
    button.addEventListener('click', handler);
    return button;
  }
  function close() {
    overlay.hidden = true;
    document.body.classList.remove('quiz-open');
    inactive.forEach(({node, inert}) => { node.inert = inert; });
    returnFocus?.focus({preventScroll: true});
  }
  function unlockJourney(categoryId = null) {
    window.trainQuizComplete = true;
    window.dispatchEvent(new CustomEvent('train-quiz-completed', {detail: {categoryId}}));
  }
  function skipQuiz() {
    // Temporary test shortcut: unlock through the same event as a finished quiz.
    window.clothingQuizGender = gender || 'other';
    unlockJourney();
    close();
    window.go?.(1);
  }
  function skipButton() {
    return action('Bỏ qua toa 1 (thử nghiệm) →', 'clothing-quiz-skip', skipQuiz);
  }
  function renderIntro(focus = false) {
    resultShown = false;
    body.replaceChildren();
    const title = element('h3', 'clothing-quiz-intro-title', 'Trước khi khám phá');
    title.tabIndex = -1;
    body.append(title, element('p', 'clothing-quiz-description', 'Chọn giới tính để lọc ảnh mẫu và gợi ý hiển thị. Lựa chọn này không cộng điểm vào câu trả lời.'));
    const genderField = element('fieldset', 'clothing-quiz-choice-group');
    genderField.append(element('legend', '', 'Bạn muốn xem mẫu trang phục theo giới tính nào?'));
    const genderChoices = element('div', 'clothing-quiz-start-options');
    [['female', 'Nữ'], ['male', 'Nam'], ['other', 'Khác · xem tất cả']].forEach(([id, label]) => {
      const option = action(label, 'clothing-quiz-start-option', () => {gender = id; [...genderChoices.children].forEach(item => item.setAttribute('aria-pressed', String(item === option))); start.disabled = !mode;});
      option.setAttribute('aria-pressed', String(gender === id));
      genderChoices.append(option);
    });
    genderField.append(genderChoices);
    body.append(genderField);
    const modeField = element('fieldset', 'clothing-quiz-choice-group');
    modeField.append(element('legend', '', 'Bạn muốn trả lời bao nhiêu câu?'));
    const modeChoices = element('div', 'clothing-quiz-start-options');
    [['quick', 'Bộ câu hỏi nhanh · 5 câu'], ['detailed', `Bộ câu hỏi chi tiết · ${data().questions.length} câu`]].forEach(([id, label]) => {
      const option = action(label, 'clothing-quiz-start-option', () => {mode = id; [...modeChoices.children].forEach(item => item.setAttribute('aria-pressed', String(item === option))); start.disabled = !gender;});
      option.setAttribute('aria-pressed', String(mode === id));
      modeChoices.append(option);
    });
    modeField.append(modeChoices);
    body.append(modeField);
    const footer = element('div', 'clothing-quiz-actions');
    const start = action('Bắt đầu khám phá →', 'clothing-quiz-primary', () => {
      window.clothingQuizGender = gender;
      selections = {};
      step = 0;
      chosenCategory = undefined;
      renderQuestion(true);
    });
    start.disabled = !gender || !mode;
    footer.append(start);
    body.append(footer, skipButton());
    if (focus) title.focus({preventScroll: true});
  }
  function renderGallery(category) {
    const variants = visibleVariants(category.id), gallery = element('section', 'clothing-quiz-gallery');
    gallery.append(element('p', 'clothing-quiz-gallery-label', 'MẪU TRANG PHỤC'));
    if (!variants.length) {gallery.append(element('p', 'clothing-quiz-note', 'Chưa có ảnh mẫu cho lựa chọn này.')); return gallery;}
    const main = element('img', 'clothing-quiz-main-image');
    const firstLabel = variants[0].displayName || `${category.name} · ${variants[0].name}`;
    main.src = variants[0].src;
    main.alt = firstLabel;
    const caption = element('p', 'clothing-quiz-image-caption', firstLabel);
    gallery.append(main, caption);
    if (variants.length > 1) {
      const list = element('div', 'clothing-quiz-variant-list');
      variants.forEach((variant, index) => {
        const label = variant.displayName || `${category.name} · ${variant.name}`;
        const option = action('', 'clothing-quiz-variant', () => {
          main.src = variant.src;
          main.alt = label;
          caption.textContent = label;
          [...list.children].forEach(item => item.setAttribute('aria-pressed', String(item === option)));
        });
        option.setAttribute('aria-label', `Xem mẫu ${label}`);
        option.setAttribute('aria-pressed', String(index === 0));
        const thumb = element('img'); thumb.src = variant.src; thumb.alt = ''; thumb.loading = 'lazy';
        option.append(thumb, element('span', '', variant.name));
        list.append(option);
      });
      gallery.append(list);
    }
    return gallery;
  }
  function renderResult(preferredId = chosenCategory) {
    const questions = activeQuestions();
    if (!questions.length || !questions.every(question => Number.isInteger(selections[question.id]) && !!question.answers[selections[question.id]])) return;
    const result = window.scoreClothingQuiz(selections, {mode, gender});
    if (!result) return;
    const top = result.ranked[0], margin = Math.max(1.5, top.score * .22);
    const suggested = result.ranked.filter((item, index) => index > 0 && top.score - item.score <= margin).slice(0, 3);
    const active = [top, ...suggested].find(item => item.category.id === preferredId) || top;
    const category = active.category;
    chosenCategory = category.id;
    resultShown = true;
    body.replaceChildren();
    const layout = element('div', 'clothing-quiz-result-layout'), copy = element('section', 'clothing-quiz-result-copy');
    copy.append(element('p', 'clothing-quiz-eyebrow', 'TRANG PHỤC GỢI Ý CHO BẠN'));
    const heading = element('h3', 'clothing-quiz-result-name', category.name);
    heading.tabIndex = -1;
    copy.append(heading, element('p', 'clothing-quiz-tagline', category.tagline), element('p', 'clothing-quiz-description', category.description));
    if (category.traits?.length) {
      const traits = element('div', 'clothing-quiz-traits');
      category.traits.forEach(trait => traits.append(element('span', '', trait)));
      copy.append(traits);
    }
    copy.append(element('p', 'clothing-quiz-note', 'Gợi ý dựa trên sở thích bạn chọn, không phải đánh giá tâm lý. Trang phục không quy định tính cách hay bản sắc dân tộc của người mặc.'));
    const sources = category.sources || [];
    if (sources.length) {
      const details = element('details', 'clothing-quiz-sources');
      details.append(element('summary', '', 'Tìm hiểu thêm về trang phục'));
      const list = element('ul');
      sources.forEach(source => {
        if (!/^https?:\/\//.test(source.url || '')) return;
        const link = element('a', '', source.title);
        link.href = source.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        const item = element('li');
        item.append(link);
        list.append(item);
      });
      details.append(list);
      copy.append(details);
    }
    layout.append(copy, renderGallery(category));
    body.append(layout);
    if (suggested.length) {
      const alternatives = element('section', 'clothing-quiz-alternatives');
      alternatives.append(element('h4', '', 'Trang phục khác có thể phù hợp với bạn'));
      const cards = element('div', 'clothing-quiz-alternative-list');
      suggested.filter(item => item.category.id !== category.id).concat(category.id !== top.category.id ? [top] : []).forEach(item => {
        const option = action('', 'clothing-quiz-alternative', () => renderResult(item.category.id));
        const variant = visibleVariants(item.category.id)[0];
        if (variant) {const image = element('img'); image.src = variant.src; image.alt = ''; image.loading = 'lazy'; option.append(image);}
        option.append(element('strong', '', item.category.name), element('span', '', item.category.tagline));
        cards.append(option);
      });
      alternatives.append(cards);
      body.append(alternatives);
    }
    const footer = element('div', 'clothing-quiz-actions');
    footer.append(action('Khám phá lại', 'clothing-quiz-secondary', () => {selections = {}; step = 0; mode = null; gender = null; resultShown = false; chosenCategory = undefined; renderIntro(true);}), action('Tiếp tục hành trình →', 'clothing-quiz-primary', () => {close(); window.go?.(1);}));
    body.append(element('p', 'clothing-quiz-unlocked', 'Các toa tiếp theo đã mở. Hành trình của bạn bắt đầu!'), footer);
    unlockJourney(category.id);
    heading.focus({preventScroll: true});
  }
  function renderQuestion(focus = false) {
    const questions = activeQuestions();
    if (!questions.length) {
      body.replaceChildren(element('p', 'clothing-quiz-description', 'Chưa thể tải bài khám phá. Hãy đóng cửa sổ và thử lại.'), skipButton());
      return;
    }
    body.replaceChildren();
    const progress = element('div', 'clothing-quiz-progress');
    progress.append(element('span', '', `Câu ${step + 1} / ${questions.length}`), element('span', '', 'Chọn điều gần với bạn nhất'));
    const track = element('div', 'clothing-quiz-progress-track');
    const fill = element('span');
    fill.style.width = `${(step + 1) / questions.length * 100}%`;
    track.append(fill);
    body.append(progress, track);
    const question = questions[step];
    const fieldset = element('fieldset', 'clothing-quiz-question');
    const legend = element('legend', '', question.prompt);
    legend.tabIndex = -1;
    fieldset.append(legend);
    const answers = element('div', 'clothing-quiz-answers');
    question.answers.forEach((answer, index) => {
      const label = element('label', 'clothing-quiz-answer');
      const radio = element('input');
      radio.type = 'radio';
      radio.name = `clothing-question-${question.id}`;
      radio.value = index;
      radio.checked = selections[question.id] === index;
      label.append(radio, element('span', '', answer.label));
      radio.addEventListener('change', () => {selections[question.id] = index; next.disabled = false;});
      answers.append(label);
    });
    fieldset.append(answers);
    body.append(fieldset);
    const footer = element('div', 'clothing-quiz-actions');
    const back = action('← Câu trước', 'clothing-quiz-secondary', () => {if (step === 0) renderIntro(true); else {step--; renderQuestion(true);}});
    const next = action(step === questions.length - 1 ? 'Xem trang phục của tôi →' : 'Câu tiếp →', 'clothing-quiz-primary', () => {
      if (!Number.isInteger(selections[question.id])) return;
      if (step === questions.length - 1) renderResult();
      else {step++; renderQuestion(true);}
    });
    next.disabled = !Number.isInteger(selections[question.id]);
    footer.append(back, next);
    body.append(footer, element('p', 'clothing-quiz-note', 'Không có đáp án đúng hay sai. Hoàn thành bài khám phá để mở các toa tiếp theo.'), skipButton());
    if (focus) legend.focus({preventScroll: true});
  }
  window.openClothingQuiz = () => {
    if (overlay.hidden) {
      returnFocus = document.activeElement;
      inactive = [...journey.children].filter(node => node !== overlay).map(node => ({node, inert: node.inert}));
      inactive.forEach(({node}) => {node.inert = true;});
      overlay.inert = false;
      overlay.hidden = false;
      document.body.classList.add('quiz-open');
    }
    if (!mode || !gender) renderIntro(); else if (resultShown) renderResult(); else renderQuestion();
    closeButton.focus({preventScroll: true});
  };
  closeButton.addEventListener('click', close);
  overlay.addEventListener('click', event => {if (event.target === overlay) close();});
  document.addEventListener('keydown', event => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') {event.preventDefault(); event.stopImmediatePropagation(); close(); return;}
    if (event.key.startsWith('Arrow') || event.key === 'Home' || event.key === 'End') event.stopImmediatePropagation();
    if (event.key === 'Tab') {
      const nodes = [...overlay.querySelectorAll('button,input,a,summary')].filter(node => !node.disabled && node.getClientRects().length);
      const first = nodes[0], last = nodes.at(-1);
      if (event.shiftKey && document.activeElement === first) {event.preventDefault(); last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault(); first.focus();}
    }
  }, true);
})();
