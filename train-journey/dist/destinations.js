(() => {
  const journey = document.querySelector('.journey');
  if (!journey) return;

  const places = {
    6: {
      title: 'Tràng An · Ninh Bình',
      region: 'ĐIỂM DỪNG DI SẢN',
      description: 'Ngồi thuyền qua các thung nước, núi đá vôi và hang động của Tràng An. Quần thể danh thắng này được UNESCO ghi danh là Di sản Thế giới hỗn hợp về văn hóa và thiên nhiên năm 2014.',
      tip: 'Gợi ý tham quan: chọn một trong các tuyến thuyền đi qua hang và đền; mang áo chống nắng, nước uống và mặc áo phao theo hướng dẫn.',
      image: 'https://images.pexels.com/photos/29819078/pexels-photo-29819078.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Thuyền trên dòng nước giữa núi đá vôi Tràng An, Ninh Bình',
      credit: 'Ảnh: Sachith Ravishka Kodikara · Pexels',
      source: 'https://www.pexels.com/photo/scenic-boat-tour-through-trang-an-landscape-29819078/',
      guide: 'https://vietnam.travel/things-to-do/guide-boat-tours-ninh-binh',
      heritage: 'https://whc.unesco.org/en/list/1438'
    },
    7: {
      title: 'Hồ Hoàn Kiếm · Hà Nội',
      region: 'ĐIỂM DỪNG THỦ ĐÔ',
      description: 'Dạo quanh Hồ Hoàn Kiếm để cảm nhận nhịp sống giữa trung tâm Hà Nội. Ở phía bắc hồ, cầu Thê Húc dẫn đến đền Ngọc Sơn trên một đảo nhỏ.',
      tip: 'Gợi ý tham quan: đi bộ ven hồ vào sáng sớm hoặc cuối chiều, rồi ghé cầu Thê Húc và đền Ngọc Sơn.',
      image: 'https://images.pexels.com/photos/18693557/pexels-photo-18693557.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Tháp Rùa giữa hồ Hoàn Kiếm ở trung tâm Hà Nội',
      credit: 'Ảnh: Hiep Nguyen · Pexels',
      source: 'https://www.pexels.com/photo/hoan-kiem-lake-by-hoan-kiem-lake-18693557/',
      guide: 'https://vietnam.travel/things-to-do/explore-old-quarter-your-way'
    },
    8: {
      title: 'Ga Đà Lạt · Lâm Đồng',
      region: 'ĐIỂM DỪNG CAO NGUYÊN',
      description: 'Ga Đà Lạt mang phong cách Art Deco với ba mái nhọn gợi dáng núi Lang Biang. Từ nhà ga, du khách có thể đi tàu đến Trại Mát để thăm chùa Linh Phước.',
      tip: 'Gợi ý tham quan: ngắm mặt tiền và các ô kính màu của nhà ga; kiểm tra lịch chạy tàu tại chỗ nếu muốn đi Trại Mát.',
      image: 'https://images.pexels.com/photos/906143/pexels-photo-906143.jpeg?auto=compress&cs=tinysrgb&w=1200',
      alt: 'Nhà ga cổ Đà Lạt ở Lâm Đồng',
      credit: 'Ảnh: Min An · Pexels',
      source: 'https://www.pexels.com/photo/beige-and-brown-concrete-house-906143/',
      guide: 'https://vietnam.travel/index.php/things-to-do/highland-escape-coffee-waterfalls-cool-breezes-da-lat',
      heritage: 'https://vietnam.travel/node/100'
    }
  };

  const overlay = document.createElement('div');
  overlay.className = 'destination-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `<section class="destination-card" role="dialog" aria-modal="true" aria-labelledby="destination-title" aria-describedby="destination-description">
    <button class="destination-close" type="button" aria-label="Đóng điểm dừng">×</button>
    <div class="destination-media"><img alt="" loading="lazy" decoding="async"></div>
    <div class="destination-content"><span class="destination-kicker"></span><h2 id="destination-title"></h2><p id="destination-description"></p><p class="destination-tip"></p>
      <div class="destination-links"><a class="destination-guide" target="_blank" rel="noopener noreferrer">Nguồn và hướng dẫn ↗</a><a class="destination-heritage" target="_blank" rel="noopener noreferrer">Tìm hiểu thêm ↗</a><a class="destination-credit" target="_blank" rel="noopener noreferrer"></a><a class="destination-license" href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">Giấy phép ảnh Pexels ↗</a></div>
      <nav class="destination-navigation" aria-label="Chuyển điểm dừng"><button class="destination-prev" type="button">← Điểm trước</button><button class="destination-return" type="button">Trở lại đoàn tàu</button><button class="destination-next" type="button">Điểm tiếp →</button></nav>
    </div>
  </section>`;
  journey.append(overlay);
  const image = overlay.querySelector('img');
  const title = overlay.querySelector('#destination-title');
  const description = overlay.querySelector('#destination-description');
  const tip = overlay.querySelector('.destination-tip');
  const kicker = overlay.querySelector('.destination-kicker');
  const credit = overlay.querySelector('.destination-credit');
  const guide = overlay.querySelector('.destination-guide');
  const heritage = overlay.querySelector('.destination-heritage');
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
    tip.textContent = place.tip;
    image.src = place.image;
    image.alt = place.alt;
    credit.href = place.source;
    credit.textContent = place.credit;
    guide.href = place.guide;
    heritage.hidden = !place.heritage;
    if (place.heritage) heritage.href = place.heritage;
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
