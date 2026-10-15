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
          desc: 'Bắt đầu bằng việc nhận diện sở thích của bạn để chọn hướng tìm hiểu cổ phục phù hợp.',
          activity: '✦ Tìm phong cách phù hợp'
        },
        {
          num: 'Toa 02',
          code: 'VNR · 002',
          name: 'Toa Hoa Phượng Đỏ',
          desc: 'Thử mặc cổ phục trong một trải nghiệm hình ảnh và phân biệt trải nghiệm ảo với cách mặc thực tế.',
          activity: '📷 Thử mặc qua photobooth'
        },
        {
          num: 'Toa 03',
          code: 'VNR · 003',
          name: 'Toa Bưu điện',
          desc: 'Tìm hiểu cách thư từ, con tem và tờ tin có thể kể lại câu chuyện văn hóa về cổ phục.',
          activity: '✉ Tạo bưu thiếp tìm hiểu'
        },
        {
          num: 'Toa 04',
          code: 'VNR · 004',
          name: 'Toa Tranh Tết',
          desc: 'Dùng hỏi đáp để khám phá tranh Tết, hoa văn và mối liên hệ giữa hình ảnh dân gian với văn hóa mặc.',
          activity: '🏮 Hỏi đáp tranh Tết'
        },
        {
          num: 'Toa 05',
          code: 'VNR · 005',
          name: 'Toa Chở hàng',
          desc: 'Tìm hiểu dấu tích và bối cảnh lịch sử của cổ phục qua tư liệu, hiện vật và những điều chưa thể khẳng định.',
          activity: '⚙ Mở tư liệu lịch sử'
        },
        {
          num: 'Toa 06',
          code: 'VNR · 006',
          name: 'Toa Hành trình Di sản',
          desc: 'Theo dõi sự tiếp nối từ áo ngũ thân đến hôm nay và nhận biết sự khác nhau giữa phục dựng, hiện đại và trình diễn.',
          activity: '🏛 Triển lãm các thời kỳ'
        },
        {
          num: 'Toa 07',
          code: 'VNR · 007',
          name: 'Toa Hà Nội hai tầng',
          desc: 'Khám phá Hồ Hoàn Kiếm như một không gian lịch sử để lựa chọn bối cảnh chụp ảnh cổ phục có ý thức.',
          activity: '🏙 Khám phá địa điểm chụp'
        },
        {
          num: 'Toa 08',
          code: 'VNR · 008',
          name: 'Toa SJourney',
          desc: 'Khám phá cách kết hợp cổ phục với không gian, ánh sáng và nghệ thuật trong một chuyến đi.',
          activity: '☕ Khám phá không gian & nghệ thuật'
        },
        {
          num: 'Toa 09',
          code: 'VNR · 009',
          name: 'Toa cổ Đà Lạt',
          desc: 'Tìm hiểu ga Đà Lạt như một địa điểm di sản và học cách chụp ảnh phù hợp với không gian cổ.',
          activity: '⛰ Khám phá địa điểm chụp'
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
          desc: 'Start by identifying your interests and choosing a direction for exploring traditional Vietnamese clothing.',
          activity: '✦ Find a clothing direction'
        },
        {
          num: 'Coach 02',
          code: 'VNR · 002',
          name: 'Red Flamboyant Coach',
          desc: 'Try traditional clothing through an image experience, while keeping virtual styling distinct from real-world dress practice.',
          activity: '📷 Try it in the photobooth'
        },
        {
          num: 'Coach 03',
          code: 'VNR · 003',
          name: 'Postal Coach',
          desc: 'Learn how letters, stamps and a bulletin can carry cultural stories about traditional clothing.',
          activity: '✉ Create a learning postcard'
        },
        {
          num: 'Coach 04',
          code: 'VNR · 004',
          name: 'Tet Festival Coach',
          desc: 'Use guided questions to explore Tết prints, motifs and their links to Vietnamese clothing culture.',
          activity: '🏮 Tết print questions'
        },
        {
          num: 'Coach 05',
          code: 'VNR · 005',
          name: 'Freight Carriage',
          desc: 'Study clothing history through sources and objects, while noticing what the surviving evidence cannot prove.',
          activity: '⚙ Open the history archive'
        },
        {
          num: 'Coach 06',
          code: 'VNR · 006',
          name: 'Heritage Journey Coach',
          desc: 'Follow clothing from the ngũ thân robe to today, distinguishing reconstruction, modern dress and performance.',
          activity: '🏛 Periods exhibit'
        },
        {
          num: 'Coach 07',
          code: 'VNR · 007',
          name: 'Hanoi Double-Decker',
          desc: 'Explore Hoàn Kiếm Lake as a historic setting and choose a respectful context for a traditional-clothing photo.',
          activity: '🏙 Explore a photo setting'
        },
        {
          num: 'Coach 08',
          code: 'VNR · 008',
          name: 'SJourney Coach',
          desc: 'Explore how clothing, space, light and art can work together in a travel setting.',
          activity: '☕ Explore space & art'
        },
        {
          num: 'Coach 09',
          code: 'VNR · 009',
          name: 'Vintage Da Lat Coach',
          desc: 'Learn about Da Lat station as a heritage setting and choose a photo approach that respects the old space.',
          activity: '⛰ Explore a photo setting'
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
