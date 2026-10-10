(() => {
  const journey = document.querySelector('.journey');
  if (!journey) return;

  const places = {
    6: {
      title: 'Tràng An · Ninh Bình',
      region: 'ĐIỂM DỪNG DI SẢN',
      description: 'Ngồi thuyền giữa dòng nước êm, nhìn núi đá vôi và những hang động mở ra trên đường đi. Tràng An là một cách thật chậm để ngắm vẻ đẹp Ninh Bình.',
      image: 'Trang An Landscape Complex, Ninh Binh Province, Vietnam, 20240202 1447 5310.jpg',
      alt: 'Thuyền trên dòng nước giữa núi đá vôi Tràng An, Ninh Bình',
      credit: 'Ảnh: Jakub Hałun · Wikimedia Commons · CC BY 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Trang_An_Landscape_Complex,_Ninh_Binh_Province,_Vietnam,_20240202_1447_5310.jpg',
      guide: 'https://www.vietnam.travel/vi/things-to-do/guide-boat-tours-ninh-binh'
    },
    7: {
      title: 'Hồ Hoàn Kiếm · Hà Nội',
      region: 'ĐIỂM DỪNG THỦ ĐÔ',
      description: 'Giữa nhịp phố Hà Nội, mặt hồ và những hàng cây tạo một khoảng lặng. Hãy dạo một vòng quanh hồ để cảm nhận đời sống thường ngày của thủ đô.',
      image: 'Hanoi, Vietnam, Hoan Kiem Lake.jpg',
      alt: 'Cảnh hồ Hoàn Kiếm ở trung tâm Hà Nội',
      credit: 'Ảnh: Vyacheslav Argenberg · Wikimedia Commons · CC BY 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Hanoi,_Vietnam,_Hoan_Kiem_Lake.jpg',
      guide: 'https://www.vietnam.travel/vi/things-to-do/11-must-see-attractions-ha-noi'
    },
    8: {
      title: 'Ga Đà Lạt · Lâm Đồng',
      region: 'ĐIỂM DỪNG CAO NGUYÊN',
      description: 'Một nhà ga cổ giữa thành phố của đồi thông và tiết trời mát. Từ đây, tiếp tục khám phá hồ Xuân Hương, những vườn hoa và nét kiến trúc riêng của Đà Lạt.',
      image: 'Da Lat - Train Station.jpg',
      alt: 'Nhà ga cổ Đà Lạt ở Lâm Đồng',
      credit: 'Ảnh: P. Hughes · Wikimedia Commons · CC BY 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Da_Lat_-_Train_Station.jpg',
      guide: 'https://www.vietnam.travel/vi/things-to-do/da-lat-enjoy-four-seasons-day'
    }
  };

  const overlay = document.createElement('div');
  overlay.className = 'destination-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `<section class="destination-card" role="dialog" aria-modal="true" aria-labelledby="destination-title" aria-describedby="destination-description">
    <button class="destination-close" type="button" aria-label="Đóng điểm dừng">×</button>
    <div class="destination-media"><img alt="" loading="lazy" decoding="async"></div>
    <div class="destination-content"><span class="destination-kicker"></span><h2 id="destination-title"></h2><p id="destination-description"></p>
      <div class="destination-links"><a class="destination-guide" target="_blank" rel="noopener noreferrer">Khám phá thêm ↗</a><a class="destination-credit" target="_blank" rel="noopener noreferrer"></a></div>
      <nav class="destination-navigation" aria-label="Chuyển điểm dừng"><button class="destination-prev" type="button">← Điểm trước</button><button class="destination-return" type="button">Trở lại đoàn tàu</button><button class="destination-next" type="button">Điểm tiếp →</button></nav>
    </div>
  </section>`;
  journey.append(overlay);
  const image = overlay.querySelector('img');
  const title = overlay.querySelector('#destination-title');
  const description = overlay.querySelector('#destination-description');
  const kicker = overlay.querySelector('.destination-kicker');
  const credit = overlay.querySelector('.destination-credit');
  const guide = overlay.querySelector('.destination-guide');
  const previous = overlay.querySelector('.destination-prev');
  const next = overlay.querySelector('.destination-next');
  const closeButton = overlay.querySelector('.destination-close');
  let current = 6, returnFocus, inactiveChildren = [];

  function show(n) {
    const place = places[n];
    if (!place) return;
    current = n;
    window.go?.(n);
    kicker.textContent = place.region;
    title.textContent = place.title;
    description.textContent = place.description;
    image.src = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(place.image)}?width=1200`;
    image.alt = place.alt;
    credit.href = place.source;
    credit.textContent = place.credit;
    guide.href = place.guide;
    previous.disabled = n === 6;
    next.disabled = n === 8;
    window.trainI18n?.apply();
  }
  function open(n) {
    if (!places[n] || !window.trainQuizComplete) return;
    if (overlay.hidden) {
      returnFocus = document.activeElement;
      inactiveChildren = [...journey.children].filter(child => child !== overlay).map(child => ({child, inert: child.inert}));
      inactiveChildren.forEach(({child}) => { child.inert = true; });
      overlay.inert = false;
      overlay.hidden = false;
      document.body.classList.add('destination-open');
    }
    show(n);
    closeButton.focus({preventScroll: true});
  }
  function close() {
    if (overlay.hidden) return;
    overlay.hidden = true;
    document.body.classList.remove('destination-open');
    inactiveChildren.forEach(({child, inert}) => { child.inert = inert; });
    returnFocus?.focus({preventScroll: true});
  }
  closeButton.addEventListener('click', close);
  overlay.querySelector('.destination-return').addEventListener('click', close);
  overlay.addEventListener('click', event => { if (event.target === overlay) close(); });
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  document.addEventListener('keydown', event => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') { event.preventDefault(); event.stopImmediatePropagation(); close(); return; }
    if (event.key.startsWith('Arrow')) event.stopImmediatePropagation();
    if (event.key === 'Tab') {
      const controls = [...overlay.querySelectorAll('button,a')].filter(element => !element.disabled && element.getClientRects().length);
      if (event.shiftKey && document.activeElement === controls[0]) { event.preventDefault(); controls.at(-1).focus(); }
      else if (!event.shiftKey && document.activeElement === controls.at(-1)) { event.preventDefault(); controls[0].focus(); }
    }
  }, true);
  window.openTrainDestination = open;
})();
