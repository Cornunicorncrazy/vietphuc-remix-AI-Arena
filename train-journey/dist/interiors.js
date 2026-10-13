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
    <span class="experience-kicker">TRƯỚC KHI BẮT ĐẦU</span>
    <button class="experience-close" type="button" aria-label="Đóng giới thiệu hoạt động"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg></button>
    <h2 id="experience-title"></h2>
    <p id="experience-description"></p>
    <div class="experience-actions"><button class="experience-later" type="button">Để sau</button><button class="experience-continue" type="button">Trải nghiệm hoạt động</button></div>
  </section>`;
  journey.append(experienceOverlay);
  const experienceTitle = experienceOverlay.querySelector('#experience-title');
  const experienceDescription = experienceOverlay.querySelector('#experience-description');
  const experienceContinue = experienceOverlay.querySelector('.experience-continue');
  let pendingExperience = null, experienceReturnFocus, experienceInactive = [];
  const experienceDetails = [
    {title:'Tìm Việt phục hợp với bạn', description:'Khám phá kiểu trang phục truyền thống hợp với bạn qua vài câu hỏi ngắn. Kết quả là gợi ý để bạn tìm hiểu và thử những mẫu mình yêu thích.'},
    {title:'Chụp ảnh cùng Việt phục', description:'Chọn khung hình, thêm ảnh của bạn và chọn một mẫu trang phục để tạo kỷ niệm trong photobooth.'},
    {title:'Gửi thư từ toa bưu điện', description:'Chọn tem, viết lời chào và lưu lại một tấm thư kỷ niệm từ chuyến tàu Việt phục.'},
    {title:'Hỏi đáp trang phục', description:'Chọn câu hỏi gợi ý để tìm hiểu trang phục truyền thống cùng trợ lý Gemini.'},
    {title:'Việt phục qua các thời kỳ · Khởi nguồn', description:'Khám phá các dấu tích trang phục từ Đông Sơn đến thời Hậu Lê qua dòng thời gian và tư liệu.'},
    {title:'Việt phục qua các thời kỳ · Tiếp nối', description:'Theo dõi những biến đổi từ áo ngũ thân đến hiện đại qua dòng thời gian và tư liệu.'},
    {title:'Tràng An · Ninh Bình', description:'Khám phá núi đá vôi, hang động và dòng nước của quần thể danh thắng Tràng An.'},
    {title:'Hồ Hoàn Kiếm · Hà Nội', description:'Ngắm không gian hồ, Tháp Rùa và nhịp sống giữa lòng Hà Nội.'},
    {title:'Ga Đà Lạt · Lâm Đồng', description:'Tìm hiểu nhà ga cổ và khung cảnh cao nguyên Đà Lạt.'}
  ];
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
    if (n > 0 && !window.trainQuizComplete) return;
    if (!overlay.hidden) close();
    if (!experienceOverlay.hidden) closeExperienceIntro();
    pendingExperience = n;
    experienceReturnFocus = document.activeElement;
    experienceTitle.textContent = (experienceDetails[n]?.title || cars[n]?.dataset?.carName || '').normalize('NFC');
    experienceDescription.textContent = experienceDetails[n]?.description || '';
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
      if(window.trainQuizComplete)window.go?.(n);
      cars[n]?.focus?.({preventScroll:true});
      const played=await window.playTrainHorn?.();
      if(!played){const hint=document.querySelector('.hint small');if(hint)hint.textContent='Bật âm thanh để nghe còi tàu';}
      return;
    }
    if(!window.trainQuizComplete)return;
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
    const resolvedTitle = historyMeta[n]?.title || experienceDetails[n]?.title || cars[n]?.dataset?.carName || '';
    title.textContent = resolvedTitle.normalize('NFC');
    description.textContent = experienceDetails[n]?.description || historyMeta[n]?.description || '';
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
    car.setAttribute('aria-label', n===0?'Toa đầu tiên; khám phá trang phục phù hợp với bạn':n===cars.length-1?`${car.dataset.carName}; bấm để nghe còi tàu`:`${car.dataset.carName}; hoàn thành bài khám phá để mở toa`);
    if(n>0 && n!==cars.length-1)car.setAttribute('aria-disabled','true');
    let start, dragged = false;
    car.addEventListener('pointerdown', event => { start = {x: event.clientX, y: event.clientY}; dragged = false; });
    car.addEventListener('pointermove', event => { if (start && Math.hypot(event.clientX - start.x, event.clientY - start.y) > 15) dragged = true; });
    car.addEventListener('pointercancel', () => { dragged = true; start = null; });
    car.addEventListener('click', event => {
      if (dragged || car.getAttribute('aria-disabled') === 'true') { dragged = false; return; }
      returnFocus = car;
      car.focus({preventScroll: true});
      showExperienceIntro(n);
    });
    car.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); showExperienceIntro(n); }
    });
  });
  const hint = document.querySelector('.hint small');
  if (hint) hint.textContent = 'Bấm vào toa đầu tiên để khám phá trang phục và mở hành trình';
  window.addEventListener('train-quiz-completed',()=>{
    cars.forEach((car,n)=>{
      car.removeAttribute('aria-disabled');
      if(n>0)car.setAttribute('aria-label',n===cars.length-1?`${car.dataset.carName}; bấm để nghe còi tàu`:`${car.dataset.carName}; bấm để khám phá`);
    });
    if(hint)hint.textContent='Hành trình đã mở · Bấm vào toa để khám phá';
  });
})();
