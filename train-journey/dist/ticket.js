(() => {
  const rules = [
    '1.- Hành khách đi tàu phải đi đúng ngày tháng và chuyến tàu đã được ghi trên vé. Hành khách phải lên đúng toa xe và sử dụng đúng số chỗ đã ghi trên vé.',
    '2.- Sau khi mua vé hành khách phải giữ gìn bảo quản vé, không được tẩy xóa, sửa chữa.',
    '3.- Những vé sau đây coi như mất giá trị, không được sử dụng đi tàu: vé để nhòe không đọc được; vé đã bị tẩy xóa, sửa chữa mà không được Đường sắt xác nhận; hành khách đi không đúng số tàu và ngày tháng ghi trên vé mà không được Đường sắt xác nhận là đã đồng ý.',
    '4.- Không được mang lên tàu những thứ nguy hiểm như: chất nổ, chất dễ cháy, chất phóng xạ v.v... tử thi, hài cốt (trừ tro hài cốt đựng trong chai lọ chuyên dùng), vật chất hôi thối làm dơ bẩn toa xe và hư hỏng hàng hóa khác, động vật sống, hàng quốc cấm, hàng hóa Nhà nước cấm lưu thông.',
    '5.- Nếu không mua vé ở ga mà cứ lên tàu thì phải mua vé ở trên tàu với giá vé cao hơn nhiều so với giá vé mua ở ga.',
    '6.- Các trường hợp miễn vé và giảm giá vé.',
    '— Hành lý xách tay hành khách mang theo người được miễn cước 20 kg (mua cả vé hành khách) 10kg (mua nửa vé hành khách). Hành lý xách tay phải có đồ chứa đựng, bao gói cẩn thận, để đúng nơi quy định và hành khách phải tự trông nom bảo quản.',
    '— Trẻ em từ 10 tuổi trở xuống được miễn vé với điều kiện mỗi trẻ em phải có một hành khách đi cùng.',
    'Nếu một hành khách đi theo từ 2 trẻ em quá số tuổi quy định thì trẻ em thứ hai trở đi phải mua vé như người lớn.',
    'Trẻ em đi tàu được miễn vé không được chiếm chỗ ngồi, chỗ nằm.',
    '— Hành khách đi tập thể từ 50 người trở lên được giảm 10% giá vé của loại ghế hoặc giường sử dụng và loại tàu chuyên chở.'
  ];
  const ruleLines = [];
  rules.forEach((paragraph, paragraphIndex) => {
    let line = '';
    paragraph.split(' ').forEach(word => {
      if ((line + ' ' + word).trim().length > 90) {
        ruleLines.push({ text: line, crossed: paragraphIndex === 8 });
        line = word;
      } else line = (line + ' ' + word).trim();
    });
    ruleLines.push({ text: line, crossed: paragraphIndex === 8 });
  });
  const rulesMarkup = ruleLines.map((line, i) => {
    const y = 103 + i * 13.4;
    return `<text x="43" y="${y}" font-size="12.3" font-weight="bold" ${line.text.length > 75 ? 'textLength="515" lengthAdjust="spacingAndGlyphs"' : ''}>${line.text}</text>${line.crossed ? `<path d="M58 ${y - 4}H556" stroke="#835064" stroke-width="6" opacity=".5"/>` : ''}`;
  }).join('');
  const gate = document.createElement('section');
  gate.className = 'ticket-gate';
  gate.setAttribute('aria-label', 'Vé tàu Việt Phục');
  gate.innerHTML = `
    <div class="ticket-gate-inner">
      <div class="ticket-heading"><span class="ticket-kicker">ĐƯỜNG SẮT VIỆT NAM · MỘT CHUYẾN ĐI QUA THỜI GIAN</span><h1>Vé lên tàu Việt Phục</h1><p>Ghi tên mình lên tấm vé, rồi bắt đầu khám phá đoàn tàu.</p></div>
      <div class="ticket-paper-wrap">
        <div class="ticket-sheet">
        <svg id="vintage-ticket" class="ticket-paper" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 480" role="img" aria-labelledby="ticket-svg-title ticket-svg-desc">
          <title id="ticket-svg-title">Vé hành khách Tàu Việt Phục</title><desc id="ticket-svg-desc">Vé tàu giấy cổ với ga đi và ga đến là Việt Nam, có tên hành khách tùy chỉnh.</desc>
          <defs>
            <linearGradient id="ticket-paper-color" x2="1" y2="1"><stop stop-color="#f4e2be"/><stop offset=".28" stop-color="#ead4ac"/><stop offset=".54" stop-color="#f4e2bd"/><stop offset=".78" stop-color="#e8cc9f"/><stop offset="1" stop-color="#efdbb6"/></linearGradient>
            <radialGradient id="ticket-stain"><stop stop-color="#ae613f" stop-opacity=".25"/><stop offset="1" stop-color="#ae613f" stop-opacity="0"/></radialGradient>
            <filter id="ticket-grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".48" numOctaves="3" seed="17" stitchTiles="stitch"/></filter>
            <filter id="ticket-shadow" x="-5%" y="-12%" width="110%" height="130%"><feDropShadow dx="0" dy="11" stdDeviation="12" flood-color="#392c1b" flood-opacity=".33"/></filter>
            <clipPath id="ticket-edge"><path d="M17 13 Q13 12 14 19 L17 403 36 467 1160 464 1178 447 1174 44 1152 17 595 14 585 19 575 14Z"/></clipPath>
          </defs>
          <g filter="url(#ticket-shadow)"><path d="M17 13 Q13 12 14 19 L17 403 36 467 1160 464 1178 447 1174 44 1152 17 595 14 585 19 575 14Z" fill="url(#ticket-paper-color)" stroke="#b58b62" stroke-width="2"/></g>
          <g clip-path="url(#ticket-edge)">
            <rect x="12" y="12" width="1170" height="458" filter="url(#ticket-grain)" opacity=".12"/>
            <ellipse cx="180" cy="85" rx="230" ry="115" fill="url(#ticket-stain)"/><ellipse cx="1080" cy="380" rx="230" ry="140" fill="url(#ticket-stain)"/><ellipse cx="560" cy="450" rx="160" ry="55" fill="url(#ticket-stain)"/>
            <path d="M587 15Q581 110 592 218Q583 321 588 464" fill="none" stroke="#7d5b45" stroke-width="8" opacity=".17"/>
            <path d="M587 15Q583 110 589 218Q584 321 588 464" fill="none" stroke="#fff5df" stroke-width="2" opacity=".5"/>
            <path d="M30 27H1154 M30 453H1157" stroke="#826b50" stroke-width="1.4" opacity=".55"/>
            <g font-family="Arial, sans-serif" fill="#42392c">
              <text x="302" y="70" text-anchor="middle" font-size="21" font-weight="bold" letter-spacing="1">HÀNH KHÁCH ĐI TÀU CẦN BIẾT:</text>
              ${rulesMarkup}
            </g>
            <g fill="none" stroke="#74604b" stroke-width="1.4" opacity=".9"><path d="M605 42H1150V440H605Z M855 42V440 M605 88H855 M730 88V171 M605 171H855 M605 224H855 M605 277H855 M605 332H855 M605 385H855 M855 116H1150 M855 234H1150 M855 282H1150 M855 329H1150 M1008 329V440"/></g>
            <g font-family="Arial, sans-serif" fill="#493c2e">
              <text x="730" y="73" text-anchor="middle" font-size="18">ĐƯỜNG SẮT VIỆT NAM</text>
              <text x="666" y="111" text-anchor="middle" font-size="18">Ga đi</text><text x="793" y="111" text-anchor="middle" font-size="18">Ga đến</text>
              <text x="616" y="195" font-size="17">Giá vé (ghế)</text><text x="616" y="247" font-size="17">Số tàu</text><text x="616" y="301" font-size="17">Số toa</text><text x="616" y="356" font-size="17">Số ghế</text><text x="616" y="410" font-size="17">Ngày, giờ chạy</text>
              <text x="867" y="253" font-size="17">Họ, tên HK</text><text x="867" y="311" font-size="17">Số CMT</text>
              <text x="865" y="350" font-size="14.5">Người và nơi bán vé</text><text x="1016" y="350" font-size="14.5">Người phụ trách toa</text>
              <text x="874" y="414" font-size="16" font-style="italic">Ngày</text><text x="935" y="414" font-size="16" font-style="italic">tháng</text>
              <text x="1002" y="149" text-anchor="middle" font-size="26">VÉ HÀNH KHÁCH</text>
            </g>
            <g fill="#aa423a" font-family="Arial, sans-serif" font-weight="bold">
              <text x="666" y="149" text-anchor="middle" font-size="21" letter-spacing="1">VIỆT NAM</text><text x="793" y="149" text-anchor="middle" font-size="21" letter-spacing="1">VIỆT NAM</text>
              <text x="733" y="210" font-size="14">cứng</text>
              <text x="754" y="268" text-anchor="middle" font-size="19">VIỆT PHỤC TBN 9</text>
              <text x="1080" y="88" text-anchor="middle" font-size="23" letter-spacing="2">A11 — C</text>
              <text x="1002" y="200" text-anchor="middle" font-size="31" letter-spacing="1">TÀU VIỆT PHỤC</text>
              <text id="ticket-passenger-name" x="1002" y="277" text-anchor="middle" font-size="23" letter-spacing=".5">HÀNH KHÁCH</text>
            </g>
            <g fill="#527b78" opacity=".6" font-family="Georgia, serif" font-style="italic"><text x="750" y="325" font-size="26">2</text><text x="721" y="378" font-size="27">73</text><text x="785" y="212" font-size="18">18.000</text></g>
            <g transform="translate(920 75)" fill="none" stroke="#493c2e" stroke-width="2.4"><path d="M-48-10Q-28-5-9-5L0-13 9-5Q28-5 48-10L40 1 18 10 7 9 6 23H-6L-7 9-18 10-40 1Z M-34-7-30 1M-24-5-22 5M-15-5-13 6M34-7 30 1M24-5 22 5M15-5 13 6 M-11 1Q0-8 11 1M-4 4H4V16H-4Z"/></g>
            <g transform="rotate(-17 1043 373)" fill="none" stroke="#b34b42" opacity=".38"><rect x="954" y="344" width="180" height="68" stroke-width="2"/><rect x="978" y="356" width="132" height="29" stroke-width="1.5"/><text x="1044" y="377" text-anchor="middle" fill="#b34b42" stroke="none" font-family="Arial, sans-serif" font-size="21" font-weight="bold">CHƯA SOÁT</text><text x="1044" y="403" text-anchor="middle" fill="#b34b42" stroke="none" font-family="Arial, sans-serif" font-size="13" letter-spacing="2">GA VIỆT NAM</text></g>
            <g opacity=".22" fill="#9f6b48"><circle cx="113" cy="30" r="2"/><circle cx="550" cy="209" r="1.5"/><circle cx="1153" cy="287" r="2"/><circle cx="781" cy="443" r="2.5"/></g>
          </g>
        </svg>
        <input class="ticket-name-on-paper" id="ticket-name" form="ticket-form" aria-label="Họ và tên hành khách trên vé" name="passenger" type="text" maxlength="42" autocomplete="name" placeholder="Nhập họ và tên" required>
        </div>
      </div>
      <div class="ticket-actions">
        <form class="ticket-form" id="ticket-form" hidden><button id="ticket-download" type="button">↓ Tải ảnh vé PNG</button><button class="ticket-enter" type="submit">Lên tàu <span aria-hidden="true">→</span></button></form>
        <p class="ticket-footnote" id="ticket-status" aria-live="polite" hidden>Tấm vé lưu niệm của riêng bạn · Tải về hoặc tiếp tục hành trình</p>
      </div>
    </div>`;
  document.body.append(gate);
  const journey = document.querySelector('.journey');
  journey.inert = true;
  journey.setAttribute('aria-hidden', 'true');
  const input = gate.querySelector('#ticket-name');
  const nameNode = gate.querySelector('#ticket-passenger-name');
  const form = gate.querySelector('#ticket-form');
  const ticket = gate.querySelector('#vintage-ticket');
  const status = gate.querySelector('#ticket-status');

  function updateName() {
    const name = input.value.trim().replace(/\s+/g, ' ');
    form.hidden = !name;
    status.hidden = !name;
    input.setCustomValidity(name ? '' : 'Vui lòng nhập họ và tên.');
    nameNode.textContent = name ? name.toLocaleUpperCase('vi-VN') : 'HÀNH KHÁCH';
    nameNode.setAttribute('font-size', name.length > 30 ? '16' : name.length > 22 ? '19' : '23');
    if (name.length > 22) {
      nameNode.setAttribute('textLength', '245');
      nameNode.setAttribute('lengthAdjust', 'spacingAndGlyphs');
    } else {
      nameNode.removeAttribute('textLength');
      nameNode.removeAttribute('lengthAdjust');
    }
    return name;
  }
  input.addEventListener('input', updateName);

  gate.querySelector('#ticket-download').addEventListener('click', async () => {
    if (!form.reportValidity()) return;
    const name = updateName();
    status.textContent = 'Đang tạo ảnh vé…';
    const copy = ticket.cloneNode(true);
    copy.querySelector('#ticket-passenger-name').setAttribute('opacity', '1');
    copy.setAttribute('width', '1200');
    copy.setAttribute('height', '480');
    const source = new XMLSerializer().serializeToString(copy);
    const url = URL.createObjectURL(new Blob([source], { type: 'image/svg+xml;charset=utf-8' }));
    const image = new Image();
    image.onload = () => {
      status.textContent = 'Đang lưu ảnh PNG…';
      const canvas = document.createElement('canvas');
      canvas.width = 2400; canvas.height = 960;
      const context = canvas.getContext('2d');
      context.fillStyle = '#f8f4ea';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      canvas.toBlob(blob => {
        if (!blob) { status.textContent = 'Không thể tạo ảnh PNG. Vui lòng thử lại.'; return; }
        const downloadUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        link.href = downloadUrl;
        link.download = `ve-tau-viet-phuc-${filename || 'hanh-khach'}.png`;
        link.click();
        status.textContent = 'Ảnh vé PNG đã sẵn sàng để tải.';
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 10000);
      }, 'image/png');
    };
    image.onerror = () => { URL.revokeObjectURL(url); status.textContent = 'Không thể tạo ảnh vé. Vui lòng thử lại.'; };
    image.src = url;
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    updateName();
    window.dispatchEvent(new Event('train-boarded'));
    gate.classList.add('is-leaving');
    journey.inert = false;
    journey.removeAttribute('aria-hidden');
    window.setTimeout(() => {
      gate.remove();
      document.querySelector('#next')?.focus({ preventScroll: true });
    }, 520);
  });
})();
