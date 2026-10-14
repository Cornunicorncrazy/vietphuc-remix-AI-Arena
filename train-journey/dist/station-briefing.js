(() => {
  const briefingData = {
    vi: {
      kicker: 'HÀNH TRÌNH DI SẢN · SỔ TAY SÂN GA',
      title: 'Khám phá Đoàn tàu Việt Nam',
      subtitle: 'Mỗi toa tàu là một miền ký ức và một trải nghiệm văn hóa riêng biệt. Hãy cùng xem qua toàn bộ hành trình trước khi nhận vé lên tàu.',
      hint: 'Bạn có thể mở lại sổ tay này bất cứ lúc nào từ nút “Sổ tay” ở góc trên.',
      start: 'Bắt đầu hành trình — Nhận vé tàu',
      close: 'Đóng sổ tay',
      reopen: 'Sổ tay',
      reopenTitle: 'Xem sổ tay giới thiệu 10 toa tàu',
      carriages: [
        {
          num: 'Toa 01',
          code: 'VNR · 001',
          name: 'Toa Hành khách 01',
          desc: 'Điểm khởi hành của chuyến đi, nơi lưu giữ vẻ đẹp cổ phục Việt Nam qua các triều đại lịch sử.',
          activity: '✦ Trắc nghiệm Việt phục'
        },
        {
          num: 'Toa 02',
          code: 'VNR · 002',
          name: 'Toa Hoa Phượng Đỏ',
          desc: 'Sắc đỏ Hải Phòng rực rỡ và những hồi ức tươi đẹp của những chuyến tàu phương Bắc thời hoa lửa.',
          activity: '📷 Buồng ảnh thử trang phục'
        },
        {
          num: 'Toa 03',
          code: 'VNR · 003',
          name: 'Toa Bưu điện',
          desc: 'Không gian bưu chính vàng son, nơi những phong thư tay và con tem di sản kết nối tâm tình người Việt.',
          activity: '✉ Dán tem & Bưu thiếp xưa'
        },
        {
          num: 'Toa 04',
          code: 'VNR · 004',
          name: 'Toa Tranh Tết',
          desc: 'Sắc xuân sum vầy với những bức tranh khắc gỗ dân gian Đông Hồ, Hàng Trống thắm đượm hương Tết xưa.',
          activity: '🏮 Hỏi đáp tranh Tết & AI'
        },
        {
          num: 'Toa 05',
          code: 'VNR · 005',
          name: 'Toa Chở hàng',
          desc: 'Toa hàng xanh Ratraco bền bỉ ngày đêm chuyên chở sản vật trù phú dọc dải đất hình chữ S.',
          activity: '⚙ Khám phá khoang hàng & Cơ khí'
        },
        {
          num: 'Toa 06',
          code: 'VNR · 006',
          name: 'Toa Hành trình Di sản',
          desc: 'Tôn vinh Cố đô Huế, nhã nhạc cung đình và hoa văn gấm vóc quý tộc thời Nguyễn trang nghiêm.',
          activity: '🏛 Triển lãm lịch sử di sản'
        },
        {
          num: 'Toa 07',
          code: 'VNR · 007',
          name: 'Toa Hà Nội hai tầng',
          desc: 'Tái hiện kiến trúc Ô Quan Chưởng rêu phong, ga Hàng Cỏ cổ kính và nét thanh lịch của thủ đô.',
          activity: '🏙 Ngắm cảnh ga & Phố cổ Hà Nội'
        },
        {
          num: 'Toa 08',
          code: 'VNR · 008',
          name: 'Toa SJourney',
          desc: 'Toa du lịch sang trọng phong cách Đông Dương (Indochine) với nội thất gỗ quý và ẩm thực thượng hạng.',
          activity: '☕ Khoang nghỉ dưỡng Indochine'
        },
        {
          num: 'Toa 09',
          code: 'VNR · 009',
          name: 'Toa cổ Đà Lạt',
          desc: 'Ký ức hào hùng của tuyến đường sắt răng cưa Tháp Chàm – Đà Lạt huyền thoại vượt đèo sương mù.',
          activity: '⛰ Tư liệu đường sắt răng cưa'
        },
        {
          num: 'Đầu máy',
          code: 'D19E · 946',
          name: 'Đầu máy Đổi Mới',
          desc: 'Trái tim mạnh mẽ dẫn dắt toàn bộ đoàn tàu Việt Nam vững vàng trên hành trình xuyên suốt Bắc Nam.',
          activity: '🚂 Buồng lái đầu máy & Thử còi'
        }
      ]
    },
    en: {
      kicker: 'HERITAGE JOURNEY · STATION GUIDE',
      title: 'Explore the Vietnam Train Journey',
      subtitle: 'Each carriage holds a distinct memory and cultural heritage experience. Take a preview before getting your boarding ticket.',
      hint: 'You can reopen this station guide anytime via the “Guidebook” button in the top bar.',
      start: 'Start Journey — Get Train Ticket',
      close: 'Close guidebook',
      reopen: 'Guidebook',
      reopenTitle: 'Open the 10-carriage station guidebook',
      carriages: [
        {
          num: 'Coach 01',
          code: 'VNR · 001',
          name: 'Passenger Coach 01',
          desc: 'The starting point of the voyage, exploring the timeless elegance of Vietnamese historical attire.',
          activity: '✦ Heritage Clothing Quiz'
        },
        {
          num: 'Coach 02',
          code: 'VNR · 002',
          name: 'Red Flamboyant Coach',
          desc: 'Vibrant crimson blooms of Hai Phong and nostalgic memories of the northern railway lines.',
          activity: '📷 Heritage Photobooth'
        },
        {
          num: 'Coach 03',
          code: 'VNR · 003',
          name: 'Postal Coach',
          desc: 'Golden postal carriage preserving vintage handwritten letters, classic stamps, and fond memories.',
          activity: '✉ Vintage Stamps & Postcards'
        },
        {
          num: 'Coach 04',
          code: 'VNR · 004',
          name: 'Tet Festival Coach',
          desc: 'Festive springtime colors celebrating traditional Dong Ho and Hang Trong folk woodblock prints.',
          activity: '🏮 Tet Culture & Folk QA'
        },
        {
          num: 'Coach 05',
          code: 'VNR · 005',
          name: 'Freight Carriage',
          desc: 'Rugged Ratraco cargo coach reliably transporting local goods connecting regions across Vietnam.',
          activity: '⚙ Freight Cargo & Mechanics'
        },
        {
          num: 'Coach 06',
          code: 'VNR · 006',
          name: 'Heritage Journey Coach',
          desc: 'Imperial citadel of Hue, royal court music, and aristocratic silk costumes of the Nguyen dynasty.',
          activity: '🏛 Dynastic History Exhibit'
        },
        {
          num: 'Coach 07',
          code: 'VNR · 007',
          name: 'Hanoi Double-Decker',
          desc: 'Historic Quan Chuong gate, old Hang Co station, and the enduring charm of Hanoi’s 36 guild streets.',
          activity: '🏙 Historic Hanoi Station Scenes'
        },
        {
          num: 'Coach 08',
          code: 'VNR · 008',
          name: 'SJourney Coach',
          desc: 'Refined Indochine-style luxury carriage featuring rich timber interiors and aristocratic rail dining.',
          activity: '☕ Indochine Luxury Interiors'
        },
        {
          num: 'Coach 09',
          code: 'VNR · 009',
          name: 'Vintage Da Lat Coach',
          desc: 'Honoring the legendary cogwheel railway climbing through misty pine mountains to Da Lat.',
          activity: '⛰ Cog Railway Archives'
        },
        {
          num: 'Locomotive',
          code: 'D19E · 946',
          name: 'D19E Doi Moi Engine',
          desc: 'The powerful diesel flagship leading Vietnam Railways steadfastly along the North-South corridor.',
          activity: '🚂 Locomotive Cockpit & Horn'
        }
      ]
    }
  };

  const overlay = document.createElement('div');
  overlay.id = 'station-briefing-overlay';
  overlay.className = 'station-briefing-overlay';
  overlay.hidden = true;
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Sổ tay giới thiệu 10 toa tàu');

  const card = document.createElement('div');
  card.className = 'station-briefing-card';

  card.innerHTML = `
    <header class="station-briefing-header">
      <span class="station-briefing-kicker"></span>
      <h2 class="station-briefing-title"></h2>
      <p class="station-briefing-subtitle"></p>
      <button type="button" class="station-briefing-close" aria-label="Đóng sổ tay">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </header>
    <div class="station-briefing-grid" id="station-briefing-grid"></div>
    <footer class="station-briefing-footer">
      <div class="station-briefing-hint">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4m0-4h.01"/></svg>
        <span class="station-briefing-hint-text"></span>
      </div>
      <button type="button" class="station-briefing-start" id="briefing-start-journey">
        <span class="station-briefing-start-text"></span>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>
      </button>
    </footer>
  `;

  overlay.append(card);
  document.body.append(overlay);

  const kickerEl = card.querySelector('.station-briefing-kicker');
  const titleEl = card.querySelector('.station-briefing-title');
  const subtitleEl = card.querySelector('.station-briefing-subtitle');
  const closeBtn = card.querySelector('.station-briefing-close');
  const gridEl = card.querySelector('#station-briefing-grid');
  const hintEl = card.querySelector('.station-briefing-hint-text');
  const startBtn = card.querySelector('#briefing-start-journey');
  const startBtnText = card.querySelector('.station-briefing-start-text');

  // Create reopen button for top toolbar
  const reopenBtn = document.createElement('button');
  reopenBtn.type = 'button';
  reopenBtn.className = 'station-briefing-reopen';
  reopenBtn.id = 'station-briefing-reopen';
  reopenBtn.setAttribute('data-no-translate', '');
  reopenBtn.innerHTML = `
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
      <path d="M6 6h10M6 10h10M6 14h6"/>
    </svg>
    <span class="station-briefing-reopen-text">Sổ tay</span>
  `;

  const controlsMount = document.getElementById('site-controls');
  if (controlsMount) {
    controlsMount.prepend(reopenBtn);
  } else {
    document.body.append(reopenBtn);
  }

  const getLang = () => (window.trainI18n?.language === 'en' ? 'en' : 'vi');

  function renderBriefing() {
    const lang = getLang();
    const t = briefingData[lang];

    kickerEl.textContent = t.kicker;
    titleEl.textContent = t.title;
    subtitleEl.textContent = t.subtitle;
    hintEl.textContent = t.hint;
    startBtnText.textContent = t.start;
    closeBtn.setAttribute('aria-label', t.close);
    closeBtn.title = t.close;
    reopenBtn.querySelector('.station-briefing-reopen-text').textContent = t.reopen;
    reopenBtn.setAttribute('aria-label', t.reopenTitle);
    reopenBtn.title = t.reopenTitle;

    gridEl.innerHTML = t.carriages
      .map(
        c => `
      <article class="briefing-card">
        <div class="briefing-card-meta">
          <span class="briefing-card-num">${c.num}</span>
          <span class="briefing-card-code">${c.code}</span>
        </div>
        <h3 class="briefing-card-name">${c.name}</h3>
        <p class="briefing-card-desc">${c.desc}</p>
        <div>
          <span class="briefing-card-activity">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
            ${c.activity}
          </span>
        </div>
      </article>
    `
      )
      .join('');
  }

  function openBriefing() {
    renderBriefing();
    overlay.hidden = false;
    document.body.classList.add('station-briefing-open');
    closeBtn.focus({ preventScroll: true });
  }

  function closeBriefing() {
    overlay.hidden = true;
    document.body.classList.remove('station-briefing-open');

    // Smoothly focus the passenger name input on the ticket gate if present
    const ticketInput = document.querySelector('#ticket-name');
    if (ticketInput && ticketInput.offsetParent !== null) {
      setTimeout(() => {
        ticketInput.focus();
      }, 100);
    }
  }

  closeBtn.addEventListener('click', closeBriefing);
  startBtn.addEventListener('click', closeBriefing);
  reopenBtn.addEventListener('click', openBriefing);

  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      closeBriefing();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !overlay.hidden) {
      closeBriefing();
    }
  });

  window.addEventListener('train-language-changed', () => {
    renderBriefing();
  });

  // Automatically open the station briefing on initial load
  renderBriefing();
  openBriefing();

  window.openStationBriefing = openBriefing;
  window.closeStationBriefing = closeBriefing;
})();
