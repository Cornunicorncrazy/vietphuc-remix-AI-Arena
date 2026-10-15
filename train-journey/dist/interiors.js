(() => {
  const journey = document.querySelector('.journey');
  const cars = [...document.querySelectorAll('#train-track .train-car')];
  if (!journey || !cars.length) return;
  document.querySelector('#train-track svg').setAttribute('role', 'group');
  const overlay = document.createElement('div');
  overlay.className = 'interior-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `<section class="interior-card" role="dialog" aria-modal="true" aria-labelledby="interior-title" aria-describedby="interior-description">
    <header class="interior-header"><div><span class="interior-kicker">KHÁM PHÁ VIỆT PHỤC</span><h2 id="interior-title"></h2></div><button class="interior-close" type="button" aria-label="Đóng cửa sổ khám phá"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg></button></header>
    <p id="interior-description" class="interior-description"></p>
    <p class="interior-status" role="status" hidden></p>
    <section class="tet-qa-host" aria-label="Hỏi đáp trang phục truyền thống" hidden></section>
    <section class="history-exhibit-host" aria-label="Triển lãm Việt phục qua các thời kỳ" hidden data-no-translate></section>
    <nav class="interior-navigation" aria-label="Điều hướng trải nghiệm"><button type="button" class="interior-prev">← Mục trước</button><button type="button" class="interior-return">Trở lại đoàn tàu</button><button type="button" class="interior-next">Mục tiếp →</button></nav>
  </section>`;
  journey.append(overlay);
  const experienceOverlay = document.createElement('div');
  experienceOverlay.className = 'experience-overlay';
  experienceOverlay.hidden = true;
  experienceOverlay.innerHTML = `<section class="experience-card" role="dialog" aria-modal="true" aria-labelledby="experience-title" aria-describedby="experience-description">
    <span class="experience-kicker" id="experience-kicker">TRƯỚC KHI BẮT ĐẦU</span>
    <button class="experience-close" type="button" aria-label="Đóng giới thiệu hoạt động"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg></button>
    <h2 id="experience-title"></h2>
    <p id="experience-description"></p>
    <div class="experience-actions"><button class="experience-later" type="button">Để sau</button><button class="experience-continue" type="button">Trải nghiệm hoạt động</button></div>
  </section>`;
  journey.append(experienceOverlay);
  const experienceTitle = experienceOverlay.querySelector('#experience-title');
  const experienceDescription = experienceOverlay.querySelector('#experience-description');
  const experienceKicker = experienceOverlay.querySelector('#experience-kicker');
  const experienceLater = experienceOverlay.querySelector('.experience-later');
  const experienceContinue = experienceOverlay.querySelector('.experience-continue');
  let pendingExperience = null, experienceReturnFocus, experienceInactive = [];
  const experienceKinds = [
    ['TÌM HIỂU · SỞ THÍCH', 'LEARN · INTERESTS'],
    ['THỬ NGHIỆM · HÌNH ẢNH', 'TRY · IMAGE EXPERIENCE'],
    ['TÌM HIỂU · THƯ TỪ', 'LEARN · LETTERS'],
    ['HỎI ĐÁP · KIẾN THỨC', 'QUESTIONS · KNOWLEDGE'],
    ['HỌC LỊCH SỬ · TƯ LIỆU', 'LEARN HISTORY · SOURCES'],
    ['HỌC LỊCH SỬ · TIẾP NỐI', 'LEARN HISTORY · CONTINUITY'],
    ['KHÁM PHÁ · ĐỊA ĐIỂM', 'EXPLORE · LOCATION'],
    ['KHÁM PHÁ · ĐỊA ĐIỂM', 'EXPLORE · LOCATION'],
    ['KHÁM PHÁ · ĐỊA ĐIỂM', 'EXPLORE · LOCATION']
  ];
  const experienceDetails = [
    {vi:{title:'Tìm Việt phục hợp với bạn', description:'Tìm hiểu các kiểu cổ phục qua vài câu hỏi ngắn. Kết quả chỉ là gợi ý để bạn biết mình muốn khám phá chất liệu, kiểu dáng hay bối cảnh nào trước.'}, en:{title:'Find a Việt phục direction for you', description:'Explore traditional clothing through a few short questions. The result is only a starting suggestion for the materials, silhouettes or settings you may want to explore first.'}},
    {vi:{title:'Thử mặc cổ phục', description:'Thử hình dung mình trong một bộ cổ phục qua photobooth. Đây là hoạt động trải nghiệm hình ảnh, không phải hướng dẫn mặc đúng cho mọi hoàn cảnh.'}, en:{title:'Try traditional clothing', description:'Picture yourself in traditional clothing through the photobooth. This is an image experience, not a guide to dressing correctly for every setting.'}},
    {vi:{title:'Việt phục qua thư từ và con tem', description:'Tìm hiểu cách một bức thư, con tem và tờ tin có thể lưu giữ câu chuyện về cổ phục, rồi tự tạo một bưu thiếp kỷ niệm.'}, en:{title:'Việt phục through letters and stamps', description:'Learn how a letter, stamp and bulletin can preserve a story about traditional clothing, then create your own keepsake postcard.'}},
    {vi:{title:'Hỏi đáp về cổ phục', description:'Đặt câu hỏi về trang phục truyền thống và xem các góc giải thích để phân biệt kiến thức, giả thuyết và cách phục dựng.'}, en:{title:'Questions about traditional clothing', description:'Ask about traditional clothing and compare explanations so you can distinguish evidence, interpretation and reconstruction.'}},
    {vi:{title:'Lịch sử Việt phục · Khởi nguồn', description:'Tìm hiểu cách các nhà nghiên cứu đọc dấu tích từ Đông Sơn đến thời Hậu Lê, đồng thời nhận biết giới hạn của tư liệu còn lại.'}, en:{title:'Vietnamese clothing history · Origins', description:'See how researchers read evidence from Đông Sơn to the Later Lê period, while recognising the limits of what survives.'}},
    {vi:{title:'Lịch sử Việt phục · Tiếp nối', description:'Theo dõi những biến đổi từ áo ngũ thân đến hôm nay và hiểu vì sao một kiểu áo có thể có nhiều biến thể theo thời kỳ, vùng miền và hoàn cảnh.'}, en:{title:'Vietnamese clothing history · Continuity', description:'Follow changes from the ngũ thân robe to today and see why one garment can have many variants across periods, regions and contexts.'}},
    {vi:{title:'Địa điểm cổ phục · Tràng An', description:'Khám phá Tràng An như một bối cảnh chụp ảnh cổ phục, đồng thời tìm hiểu cách tôn trọng cảnh quan và di sản khi tham quan.'}, en:{title:'Traditional-clothing setting · Tràng An', description:'Explore Tràng An as a setting for traditional-clothing photos while learning how to respect the landscape and heritage site.'}},
    {vi:{title:'Địa điểm cổ phục · Hồ Hoàn Kiếm', description:'Khám phá các góc chụp quanh Hồ Hoàn Kiếm và tìm hiểu cách kết hợp trang phục với không gian lịch sử của Hà Nội.'}, en:{title:'Traditional-clothing setting · Hoàn Kiếm Lake', description:'Explore photo angles around Hoàn Kiếm Lake and consider how clothing can work with Hanoi’s historic setting.'}},
    {vi:{title:'Địa điểm cổ phục · Ga Đà Lạt', description:'Tìm hiểu nhà ga cổ Đà Lạt và cách lựa chọn góc chụp, trang phục, ánh sáng phù hợp với không gian di sản.'}, en:{title:'Traditional-clothing setting · Da Lat Station', description:'Learn about Da Lat’s old station and choose a photo angle, outfit and lighting that suit the heritage setting.'}}
  ];
  const experienceDetail = n => experienceDetails[n]?.[window.trainI18n?.language === 'en' ? 'en' : 'vi'];
  function closeExperienceIntro() {
    if (experienceOverlay.hidden) return;
    experienceOverlay.hidden = true;
    experienceOverlay.setAttribute('hidden', '');
    experienceOverlay.style.display = 'none';
    try {
      experienceInactive.forEach(({child, inert}) => { if (child) child.inert = !!inert; });
    } catch (_) {}
    pendingExperience = null;
    try { experienceReturnFocus?.focus?.({preventScroll: true}); } catch (_) {}
  }
  function showExperienceIntro(n) {
    if (n === cars.length - 1) { open(n); return; }
    if (!overlay.hidden) close();
    if (!experienceOverlay.hidden) closeExperienceIntro();
    pendingExperience = n;
    experienceReturnFocus = document.activeElement;
    const kind = experienceKinds[n];
    const languageIndex = window.trainI18n?.language === 'en' ? 1 : 0;
    if (experienceKicker && kind) {
      experienceKicker.textContent = kind[languageIndex];
    }
    if (experienceLater) experienceLater.textContent = languageIndex ? 'Later' : 'Để sau';
    if (experienceContinue) experienceContinue.textContent = languageIndex ? 'Start activity' : 'Trải nghiệm hoạt động';
    const detail = experienceDetail(n);
    experienceTitle.textContent = (detail?.title || cars[n]?.dataset?.carName || '').normalize('NFC');
    experienceDescription.textContent = detail?.description || '';
    experienceInactive = [...journey.children].filter(child => child !== experienceOverlay).map(child => ({child, inert: child.inert}));
    experienceInactive.forEach(({child}) => { child.inert = true; });
    experienceOverlay.inert = false;
    experienceOverlay.hidden = false;
    experienceOverlay.removeAttribute('hidden');
    experienceOverlay.style.display = '';
    experienceContinue.focus({preventScroll: true});
  }
  experienceContinue.addEventListener('click', () => {
    const n = pendingExperience;
    closeExperienceIntro();
    if (n !== null) open(n);
  });
  experienceOverlay.querySelector('.experience-close').addEventListener('click', closeExperienceIntro);
  experienceOverlay.querySelector('.experience-later').addEventListener('click', closeExperienceIntro);
  experienceOverlay.addEventListener('click', event => { if (event.target === experienceOverlay) closeExperienceIntro(); });
  document.addEventListener('keydown', event => {
    if (experienceOverlay.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); closeExperienceIntro(); return; }
    if (event.key.startsWith('Arrow')) event.stopImmediatePropagation();
    if (event.key === 'Tab') {
      const buttons = [...experienceOverlay.querySelectorAll('button')].filter(button => button.getClientRects().length);
      const first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }, true);
  window.showTrainExperienceIntro = showExperienceIntro;
  const title = overlay.querySelector('#interior-title');
  const description = overlay.querySelector('#interior-description');
  const status = overlay.querySelector('.interior-status');
  const tetHost = overlay.querySelector('.tet-qa-host');
  const historyHost = overlay.querySelector('.history-exhibit-host');
  const closeButton = overlay.querySelector('.interior-close');
  const previous = overlay.querySelector('.interior-prev');
  const next = overlay.querySelector('.interior-next');
  let current = 0, requestId = 0, returnFocus;
  let inactiveChildren = [];
  const historyMeta = {
    4: {title:'Việt phục qua các thời kỳ · Khởi nguồn', description:'Khám phá những dấu tích trang phục từ Đông Sơn đến thời Hậu Lê.'},
    5: {title:'Việt phục qua các thời kỳ · Tiếp nối', description:'Theo dòng biến đổi từ áo ngũ thân đến áo dài hôm nay.'}
  };

  async function open(n) {
    if(n===0){if(!overlay.hidden)close();window.go?.(0);window.openClothingQuiz?.();return;}
    if(n===cars.length-1){
      if(!overlay.hidden)close();
      window.go?.(n);
      cars[n]?.focus?.({preventScroll:true});
      const played=await window.playTrainHorn?.();
      if(!played){const hint=document.querySelector('.hint small');if(hint)hint.textContent='Bật âm thanh để nghe còi tàu';}
      return;
    }
    if(n===1){if(!overlay.hidden)close();window.openTrainPhotobooth?.();return;}
    if(n===2){if(!overlay.hidden)close();window.go?.(2);window.openPostalCar?.();return;}
    if(n >= 6 && n <= 8){window.openTrainDestination?.(n);return;}
    if(n < 3 || n > 5) return;
    current = n;
    ++requestId;
    if (overlay.hidden) {
      returnFocus = document.activeElement;
      inactiveChildren = [...journey.children].filter(child => child !== overlay).map(child => ({child, inert: child.inert}));
      inactiveChildren.forEach(({child}) => { child.inert = true; });
      overlay.inert = false;
      overlay.hidden = false;
      overlay.removeAttribute('hidden');
      overlay.style.display = '';
      document.body.classList.add('interior-open');
      closeButton.focus({preventScroll: true});
    }
    window.go?.(n);
    const detail = experienceDetail(n);
    const resolvedTitle = historyMeta[n]?.title || detail?.title || cars[n]?.dataset?.carName || '';
    title.textContent = resolvedTitle.normalize('NFC');
    description.textContent = detail?.description || historyMeta[n]?.description || '';
    status.hidden = true;
    tetHost.hidden = n !== 3;
    historyHost.hidden = n !== 4 && n !== 5;
    if (n === 3) window.mountTetQA?.(tetHost);
    if (n === 4 || n === 5) window.mountHistoryExhibit?.(historyHost, n);
    previous.disabled = n === 0;
    next.disabled = n === cars.length - 1;
  }
  function close() {
    ++requestId;
    overlay.hidden = true;
    overlay.setAttribute('hidden', '');
    overlay.style.display = 'none';
    document.body.classList.remove('interior-open');
    try {
      inactiveChildren.forEach(({child, inert}) => { if (child) child.inert = !!inert; });
    } catch (_) {}
    try {
      (cars[current] || returnFocus)?.focus?.({preventScroll: true});
    } catch (_) {}
  }
  window.closeInteriorOverlay = close;
  const handleClose = event => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    close();
  };
  closeButton.addEventListener('click', handleClose);
  overlay.querySelector('.interior-return').addEventListener('click', event => {
    event.preventDefault();
    close();
  });
  previous.addEventListener('click', () => showExperienceIntro(current - 1));
  next.addEventListener('click', () => showExperienceIntro(current + 1));
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  document.addEventListener('keydown', event => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); close(); return; }
    if (event.target.matches('input,textarea,select') || event.target.isContentEditable) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.stopImmediatePropagation();
    }
    if (event.key === 'Tab') {
      const buttons = [...overlay.querySelectorAll('button')].filter(button => !button.disabled && button.getClientRects().length);
      const first = buttons[0], last = buttons.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }, true);
  cars.forEach((car, n) => {
    car.setAttribute('role', 'button');
    car.setAttribute('aria-haspopup', n===cars.length-1 ? 'false' : 'dialog');
    car.setAttribute('aria-label', n===cars.length-1?`${car.dataset.carName}; bấm để nghe còi tàu`:`${car.dataset.carName}; ${carriageDescriptions[n]}; bấm để khám phá`);
    let start, dragged = false;
    car.addEventListener('pointerdown', event => { start = {x: event.clientX, y: event.clientY}; dragged = false; });
    car.addEventListener('pointermove', event => { if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 15) dragged = true; });
    car.addEventListener('pointercancel', () => { dragged = true; start = null; });
    car.addEventListener('click', event => {
      if (dragged) { dragged = false; return; }
      returnFocus = car;
      car.focus({preventScroll: true});
      showExperienceIntro(n);
    });
    car.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showExperienceIntro(n); }
    });
  });
  const hint = document.querySelector('.hint small');
  if (hint) hint.textContent = 'Bấm vào bất kỳ toa nào để khám phá chủ đề văn hóa';
})();
