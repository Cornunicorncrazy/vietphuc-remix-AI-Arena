(() => {
  const gate = document.createElement('section');
  gate.className = 'ticket-gate';
  gate.setAttribute('aria-label', 'Vé tàu Việt Phục');
  gate.innerHTML = `<div class="ticket-gate-inner">
    <div class="ticket-heading"><span class="ticket-kicker">ĐƯỜNG SẮT VIỆT NAM · MỘT CHUYẾN ĐI QUA THỜI GIAN</span><h1>Vé lên tàu Việt Phục</h1><p>Ghi tên mình lên tấm vé, rồi bắt đầu khám phá đoàn tàu.</p></div>
    <div class="ticket-paper-wrap"><div class="ticket-sheet ticket-bitmap">
      <img class="ticket-paper" src="ticket-generated-v1.png" alt="Vé Tàu Việt Phục trên giấy cổ, với lưu ý hành khách và các ô thông tin theo vé gốc. Ga đi và ga đến: Việt Nam.">
      <input class="ticket-name-on-paper is-empty" id="ticket-name" form="ticket-form" aria-label="Họ và tên hành khách trên vé" name="passenger" type="text" maxlength="42" autocomplete="name" placeholder="Nhập họ và tên" required>
    </div></div>
    <div class="ticket-actions"><form class="ticket-form" id="ticket-form" hidden><button id="ticket-download" type="button">↓ Tải ảnh vé PNG</button><button class="ticket-enter" type="submit">Lên tàu <span aria-hidden="true">→</span></button></form><p class="ticket-footnote" id="ticket-status" aria-live="polite" hidden>Tấm vé lưu niệm của riêng bạn · Tải về hoặc tiếp tục hành trình</p></div>
  </div>`;
  document.body.append(gate);
  const journey = document.querySelector('.journey');
  journey.inert = true;
  journey.setAttribute('aria-hidden', 'true');
  const input = gate.querySelector('#ticket-name');
  const form = gate.querySelector('#ticket-form');
  const status = gate.querySelector('#ticket-status');
  function updateName() {
    const name = input.value.trim().replace(/\s+/g, ' ');
    input.classList.toggle('is-empty', !name);
    form.hidden = !name;
    status.hidden = !name;
    input.setCustomValidity(name ? '' : (window.trainI18n?.t('Vui lòng nhập họ và tên.') || 'Vui lòng nhập họ và tên.'));
    return name;
  }
  input.addEventListener('input', updateName);
  window.addEventListener('train-language-changed', updateName);
  gate.querySelector('#ticket-download').addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const name = updateName();
    status.textContent = 'Đang tạo ảnh vé…';
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2032; canvas.height = 600;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(image, 0, 92, 2032, 600, 0, 0, 2032, 600);
      let size = 32;
      ctx.font = `italic ${size}px Georgia, serif`;
      while (ctx.measureText(name).width > 312 && size > 12) {
        size -= 1;
        ctx.font = `italic ${size}px Georgia, serif`;
      }
      ctx.fillStyle = '#365d69';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(name, 1778, 309);
      canvas.toBlob(blob => {
        if (!blob) { status.textContent = 'Không thể tạo ảnh PNG. Vui lòng thử lại.'; return; }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        link.href = url;
        link.download = `ve-tau-viet-phuc-${filename || 'hanh-khach'}.png`;
        document.body.append(link);
        link.click();
        link.remove();
        status.textContent = 'Ảnh vé PNG đã sẵn sàng để tải.';
        setTimeout(() => URL.revokeObjectURL(url), 10000);
      }, 'image/png');
    };
    image.onerror = () => { status.textContent = 'Không thể tải ảnh vé. Vui lòng thử lại.'; };
    image.src = new URL('ticket-generated-v1.png', document.baseURI).href;
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    window.trainPassengerName = updateName();
    window.dispatchEvent(new Event('train-boarded'));
    gate.classList.add('is-leaving');
    journey.inert = false;
    journey.removeAttribute('aria-hidden');
    setTimeout(() => { gate.remove(); document.querySelector('#next')?.focus({ preventScroll: true }); }, 520);
  });
})();
