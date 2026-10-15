(() => {
  const overlays = {
    quiz: document.querySelector('.clothing-quiz-overlay'),
    booth: document.querySelector('.booth-overlay'),
    postal: document.querySelector('.postal-overlay'),
    qa: document.querySelector('.interior-overlay')
  };
  if (Object.values(overlays).some(overlay => !overlay)) return;

  const text = {
    vi: {
      skip: 'Bỏ qua', done: 'Đã hiểu',
      quiz: {
        gender: ['1 / 4 · BÀI KHÁM PHÁ', 'Chọn gợi ý phù hợp', 'Chọn giới tính bạn muốn nhận gợi ý trang phục theo.'],
        mode: ['2 / 4 · BÀI KHÁM PHÁ', 'Chọn độ dài', 'Chọn bộ nhanh 5 câu hoặc bộ chi tiết.'],
        start: ['3 / 4 · BÀI KHÁM PHÁ', 'Bắt đầu trả lời', 'Nhấn nút bắt đầu để xem câu hỏi đầu tiên.'],
        answer: ['4 / 4 · BÀI KHÁM PHÁ', 'Chọn điều gần với bạn', 'Chọn một đáp án. Không có câu trả lời đúng hoặc sai.'],
        next: ['4 / 4 · BÀI KHÁM PHÁ', 'Đi tiếp', 'Nhấn “Câu tiếp” sau khi chọn. Các câu còn lại làm tương tự.']
      },
      booth: {
        frame: ['1 / 5 · PHOTOBOOTH', 'Chọn khung ảnh', 'Chọn một khung rồi nhấn “Tiếp tục”.'],
        photo: ['2 / 5 · PHOTOBOOTH', 'Thêm ảnh của bạn', 'Mở camera hoặc tải ảnh JPG, PNG, WebP lên. Ảnh chỉ được gửi khi bạn xác nhận tạo ảnh.'],
        photoNext: ['2 / 5 · PHOTOBOOTH', 'Chọn ảnh để dùng', 'Ảnh đã sẵn sàng. Nhấn “Chọn trang phục” để đi tiếp.'],
        outfit: ['3 / 5 · PHOTOBOOTH', 'Chọn trang phục', 'Chọn một mẫu trang phục bạn muốn thử.'],
        outfitNext: ['3 / 5 · PHOTOBOOTH', 'Xác nhận mẫu', 'Nhấn “Xác nhận lựa chọn” để xem lại ảnh và trang phục.'],
        generate: ['4 / 5 · PHOTOBOOTH', 'Tạo hoặc xếp ảnh', 'Nếu tính năng tạo ảnh sẵn sàng, bạn có thể xác nhận tạo một ảnh. Bạn cũng có thể xếp ảnh gốc vào khung ngay.'],
        slot: ['5 / 5 · PHOTOBOOTH', 'Căn chỉnh & xếp ảnh vào khung', 'Nhấn vào từng ô để chọn ảnh. Kéo ảnh để di chuyển vị trí trong ô, cuộn chuột hoặc chụm 2 ngón (phím + / -) để phóng to / thu nhỏ kích cỡ.'],
        pick: ['5 / 5 · PHOTOBOOTH', 'Chọn ảnh cho ô', 'Chọn ảnh từ danh sách để đặt vào ô đang mở.'],
        download: ['5 / 5 · PHOTOBOOTH', 'Lưu kỷ niệm chuyến tàu', 'Khung ảnh đã hoàn tất! Nhấn “Tải frame PNG” hoặc “Chia sẻ frame” để lưu giữ kỷ niệm.']
      },
      postal: {
        stamp: ['1 / 3 · TOA BƯU ĐIỆN', 'Chọn một con tem', 'Nhấn vào ô tem trên phong thư.'],
        pick: ['1 / 3 · TOA BƯU ĐIỆN', 'Dán tem lên thư', 'Chọn một con tem trong danh sách.'],
        send: ['2 / 3 · TOA BƯU ĐIỆN', 'Gửi phong thư', 'Nhấn “Gửi thư đi” để xem lá thư hồi đáp.'],
        receive: ['3 / 3 · TOA BƯU ĐIỆN', 'Mở thư đến', 'Nhấn “Mở thư đến” để đọc tờ tin Việt phục.'],
        read: ['3 / 3 · TOA BƯU ĐIỆN', 'Đọc tờ tin', 'Cuộn để đọc nội dung. Khi xong, trở lại đoàn tàu để đi tiếp.']
      },
      qa: {
        ask: ['1 / 2 · BÀN HỎI ĐÁP', 'Đặt câu hỏi', 'Chọn một câu hỏi gợi ý hoặc viết câu hỏi của bạn vào ô này.'],
        send: ['1 / 2 · BÀN HỎI ĐÁP', 'Gửi câu hỏi', 'Nhấn “Gửi câu hỏi” để xem câu trả lời.'],
        read: ['2 / 2 · BÀN HỎI ĐÁP', 'Đọc câu trả lời', 'Đọc câu trả lời và các nguồn tham khảo khi có. Bạn có thể hỏi tiếp.']
      }
    },
    en: {
      skip: 'Skip', done: 'Got it',
      quiz: {
        gender: ['1 / 4 · STYLE QUIZ', 'Choose your suggestion', 'Choose the gender you want the clothing suggestion to use.'],
        mode: ['2 / 4 · STYLE QUIZ', 'Choose a length', 'Pick the quick five-question quiz or the detailed version.'],
        start: ['3 / 4 · STYLE QUIZ', 'Start answering', 'Select Start to see the first question.'],
        answer: ['4 / 4 · STYLE QUIZ', 'Choose what fits you', 'Select one answer. There are no right or wrong answers.'],
        next: ['4 / 4 · STYLE QUIZ', 'Continue', 'Select Next after answering. Follow the same pattern for the remaining questions.']
      },
      booth: {
        frame: ['1 / 5 · PHOTOBOOTH', 'Choose a frame', 'Choose a frame, then select Continue.'],
        photo: ['2 / 5 · PHOTOBOOTH', 'Add your photos', 'Open the camera or upload JPG, PNG, or WebP photos. Photos are sent only if you confirm image generation.'],
        photoNext: ['2 / 5 · PHOTOBOOTH', 'Use your photo', 'Your photo is ready. Select Choose clothing to continue.'],
        outfit: ['3 / 5 · PHOTOBOOTH', 'Choose clothing', 'Select an outfit you would like to try.'],
        outfitNext: ['3 / 5 · PHOTOBOOTH', 'Confirm the outfit', 'Select Confirm selection to review your photo and outfit.'],
        generate: ['4 / 5 · PHOTOBOOTH', 'Generate or arrange', 'If image generation is available, you can confirm one generated image. You can also arrange your original photos in the frame now.'],
        slot: ['5 / 5 · PHOTOBOOTH', 'Reposition & resize photos', 'Select each slot to choose a photo. Drag to reposition the photo in its frame, and scroll or pinch (or use + / - keys) to zoom and resize.'],
        pick: ['5 / 5 · PHOTOBOOTH', 'Choose a slot photo', 'Select a photo from the list for the open slot.'],
        download: ['5 / 5 · PHOTOBOOTH', 'Save train memories', 'Your frame is complete! Select Download frame PNG or Share frame to save your memories.']
      },
      postal: {
        stamp: ['1 / 3 · POSTAL CARRIAGE', 'Choose a stamp', 'Select the stamp space on the envelope.'],
        pick: ['1 / 3 · POSTAL CARRIAGE', 'Add the stamp', 'Choose a stamp from the list.'],
        send: ['2 / 3 · POSTAL CARRIAGE', 'Send the envelope', 'Select Send letter to see the reply.'],
        receive: ['3 / 3 · POSTAL CARRIAGE', 'Open the reply', 'Select Open incoming letter to read the Việt phục bulletin.'],
        read: ['3 / 3 · POSTAL CARRIAGE', 'Read the bulletin', 'Scroll to read it. Return to the train when you are done.']
      },
      qa: {
        ask: ['1 / 2 · Q&A DESK', 'Ask a question', 'Choose a suggested question or write your own here.'],
        send: ['1 / 2 · Q&A DESK', 'Send your question', 'Select Send question to see the answer.'],
        read: ['2 / 2 · Q&A DESK', 'Read the answer', 'Read the answer and any sources provided. You can ask another question.']
      }
    }
  };

  const panel = document.createElement('aside');
  panel.className = 'journey-guide-panel experience-guide-panel';
  panel.hidden = true;
  panel.setAttribute('role', 'status');
  panel.setAttribute('aria-live', 'polite');
  panel.setAttribute('data-no-translate', '');
  panel.innerHTML = `<div class="journey-guide-top"><span class="journey-guide-progress"></span><button type="button" class="journey-guide-skip"></button></div>
    <h2 class="journey-guide-title"></h2><p class="journey-guide-body"></p>
    <button type="button" class="journey-guide-done" hidden></button>`;
  document.body.append(panel);
  const skip = panel.querySelector('.journey-guide-skip');
  const done = panel.querySelector('.journey-guide-done');
  let currentKey = '';
  let currentStep = '';
  let currentLanguage = '';
  let currentTarget = null;
  let forcedKey = '';
  let frame = 0;
  let pending = false;
  const language = () => window.trainI18n?.language === 'en' ? 'en' : 'vi';
  const seen = key => { try { return localStorage.getItem(`vietphuc-${key}-guide-v1`) === 'seen'; } catch (_) { return false; } };
  const remember = key => { try { localStorage.setItem(`vietphuc-${key}-guide-v1`, 'seen'); } catch (_) {} };

  function hide() {
    currentTarget?.classList.remove('journey-guide-target');
    currentTarget = null;
    panel.hidden = true;
    cancelAnimationFrame(frame);
  }
  function finish() {
    if (currentKey) remember(currentKey);
    forcedKey = '';
    hide();
  }
  function context() {
    const quiz = overlays.quiz;
    if (!quiz.hidden) {
      const body = quiz.querySelector('.clothing-quiz-body');
      const groups = [...body.querySelectorAll('.clothing-quiz-choice-group')];
      if (groups.length) {
        if (!groups[0].querySelector('[aria-pressed="true"]')) return {key:'quiz', step:'gender', target:groups[0].querySelector('.clothing-quiz-start-options')};
        if (!groups[1]?.querySelector('[aria-pressed="true"]')) return {key:'quiz', step:'mode', target:groups[1].querySelector('.clothing-quiz-start-options')};
        return {key:'quiz', step:'start', target:body.querySelector('.clothing-quiz-actions .clothing-quiz-primary')};
      }
      if (body.querySelector('.clothing-quiz-question')) {
        const number = Number(body.querySelector('.clothing-quiz-progress span')?.textContent.match(/\d+/)?.[0] || 1);
        if (number > 1 && forcedKey !== 'quiz') { remember('quiz'); return null; }
        const checked = body.querySelector('.clothing-quiz-answers input:checked');
        return checked
          ? {key:'quiz', step:'next', target:body.querySelector('.clothing-quiz-actions .clothing-quiz-primary')}
          : {key:'quiz', step:'answer', target:body.querySelector('.clothing-quiz-answers'), highlight:false};
      }
      return null;
    }

    const booth = overlays.booth;
    if (!booth.hidden) {
      const body = booth.querySelector('.booth-body');
      const current = [...booth.querySelectorAll('.booth-steps li')].findIndex(item => item.getAttribute('aria-current') === 'step');
      if (current === 0) return {key:'booth', step:'frame', target:body.querySelector('.booth-frame-list'), highlight:false};
      if (current === 1) return body.querySelector('.booth-photo-card')
        ? {key:'booth', step:'photoNext', target:body.querySelector('.booth-actions .primary')}
        : {key:'booth', step:'photo', target:body.querySelector('.booth-source-actions')};
      if (current === 2) return body.querySelector('.booth-garment[aria-pressed="true"]')
        ? {key:'booth', step:'outfitNext', target:body.querySelector('.booth-actions .primary')}
        : {key:'booth', step:'outfit', target:body.querySelector('.booth-garment')};
      if (current === 3) return {key:'booth', step:'generate', target:body.querySelector(':scope > .booth-button.secondary')};
      if (current === 4) {
        const picker = body.querySelector('.booth-slot-picker');
        if (picker) return {key:'booth', step:'pick', target:picker.querySelector('.booth-slot-photo')};
        const download = [...body.querySelectorAll('.booth-button.primary')].find(button => /Tải frame PNG|Download frame PNG/.test(button.textContent));
        if (download && !download._guideListenerAttached) {
          download._guideListenerAttached = true;
          download.addEventListener('click', finish);
        }
        const share = [...body.querySelectorAll('.booth-button.primary')].find(button => /Chia sẻ frame|Share frame/.test(button.textContent));
        if (share && !share._guideListenerAttached) {
          share._guideListenerAttached = true;
          share.addEventListener('click', finish);
        }
        return download && !download.disabled
          ? {key:'booth', step:'download', target:download, final:true}
          : {key:'booth', step:'slot', target:body.querySelector('.booth-frame-slot'), final:true};
      }
      return null;
    }

    const postal = overlays.postal;
    if (!postal.hidden) {
      const body = postal.querySelector('.postal-body');
      if (postal.querySelector('.postal-stamps.is-open')) return {key:'postal', step:'pick', target:postal.querySelector('.postal-stamp-choice')};
      if (body.querySelector('.postal-paper')) return {key:'postal', step:'read', target:body.querySelector('.postal-paper'), highlight:false, final:true};
      if (body.querySelector('.postal-transit')) return null;
      if (body.querySelector('.postal-stamp-spot:not(:disabled)')) {
        const stamp = body.querySelector('.postal-stamp-spot');
        return stamp.querySelector('img')
          ? {key:'postal', step:'send', target:body.querySelector('.postal-actions .primary')}
          : {key:'postal', step:'stamp', target:stamp};
      }
      const receive = body.querySelector('.postal-actions .primary');
      return receive ? {key:'postal', step:'receive', target:receive} : null;
    }

    const interior = overlays.qa;
    if (!interior.hidden) {
      const host = interior.querySelector('.tet-qa-host:not([hidden])');
      const input = host?.querySelector('.tet-qa-form textarea');
      if (!input) return null;
      if (host.querySelector('.tet-qa-form button:disabled')) return null;
      if (host.querySelector('.tet-qa-message--user')) return {key:'qa', step:'read', target:host.querySelector('.tet-qa-messages'), highlight:false, final:true};
      return input.value.trim()
        ? {key:'qa', step:'send', target:host.querySelector('.tet-qa-form button')}
        : {key:'qa', step:'ask', target:input};
    }
    return null;
  }
  function position() {
    if (panel.hidden || !currentTarget?.isConnected) return;
    const rect = currentTarget.getBoundingClientRect();
    const width = panel.offsetWidth, height = panel.offsetHeight, gap = 10, margin = 10;
    const maxLeft = Math.max(margin, innerWidth - width - margin);
    const maxTop = Math.max(margin, innerHeight - height - margin);

    const overlaps = (l, t) => !(l + width < rect.left - 4 || l > rect.right + 4 || t + height < rect.top - 4 || t > rect.bottom + 4);

    let bestLeft = margin, bestTop = margin, found = false;
    const leftCenter = Math.max(margin, Math.min(rect.left + rect.width / 2 - width / 2, maxLeft));

    // 1. Try placing strictly above target
    const topAbove = rect.top - height - gap;
    if (topAbove >= margin && !overlaps(leftCenter, topAbove)) {
      bestLeft = leftCenter; bestTop = topAbove; found = true;
    }

    // 2. Try placing to the left of target
    if (!found) {
      const leftBeside = rect.left - width - gap;
      const topBeside = Math.max(margin, Math.min(rect.top + rect.height / 2 - height / 2, maxTop));
      if (leftBeside >= margin && !overlaps(leftBeside, topBeside)) {
        bestLeft = leftBeside; bestTop = topBeside; found = true;
      }
    }

    // 3. Try placing to the right of target
    if (!found) {
      const rightBeside = rect.right + gap;
      const topBeside = Math.max(margin, Math.min(rect.top + rect.height / 2 - height / 2, maxTop));
      if (rightBeside <= maxLeft && !overlaps(rightBeside, topBeside)) {
        bestLeft = rightBeside; bestTop = topBeside; found = true;
      }
    }

    // 4. Try placing below target
    if (!found) {
      const topBelow = rect.bottom + gap;
      if (topBelow <= maxTop && !overlaps(leftCenter, topBelow)) {
        bestLeft = leftCenter; bestTop = topBelow; found = true;
      }
    }

    // Fallback: Safe position away from the target
    if (!found) {
      if (rect.top > innerHeight / 2) {
        bestTop = margin;
        bestLeft = leftCenter;
        if (bestTop + height >= rect.top) {
          bestLeft = rect.left > innerWidth / 2 ? margin : maxLeft;
        }
      } else {
        bestTop = maxTop;
        bestLeft = rect.left > innerWidth / 2 ? margin : maxLeft;
      }
    }

    panel.style.left = `${Math.round(bestLeft)}px`;
    panel.style.top = `${Math.round(bestTop)}px`;
  }
  function render() {
    const lang = language();
    const info = context();
    if (!info || !info.target || (seen(info.key) && forcedKey !== info.key)) { hide(); return; }
    if (panel.parentElement !== overlays[info.key]) overlays[info.key].append(panel);
    if (currentTarget !== info.target) {
      currentTarget?.classList.remove('journey-guide-target');
      currentTarget = info.target;
    }
    currentTarget.classList.toggle('journey-guide-target', info.highlight !== false);
    if (currentKey !== info.key || currentStep !== info.step || currentLanguage !== lang || panel.hidden) {
      const [progress, title, body] = text[lang][info.key][info.step];
      panel.querySelector('.journey-guide-progress').textContent = progress;
      panel.querySelector('.journey-guide-title').textContent = title;
      panel.querySelector('.journey-guide-body').textContent = body;
      skip.textContent = text[lang].skip;
      done.textContent = text[lang].done;
      currentKey = info.key;
      currentStep = info.step;
      currentLanguage = lang;
    }
    done.hidden = !info.final;
    panel.hidden = false;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(position);
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { pending = false; render(); });
  }
  skip.addEventListener('click', finish);
  done.addEventListener('click', finish);
  window.addEventListener('train-language-changed', schedule);
  window.addEventListener('resize', position);
  window.addEventListener('scroll', position, true);
  Object.values(overlays).forEach(overlay => {
    overlay.addEventListener('click', schedule);
    overlay.addEventListener('input', schedule);
    overlay.addEventListener('change', schedule);
    new MutationObserver(mutations => {
      if (mutations.some(mutation => mutation.target !== panel && !panel.contains(mutation.target)
        && ![...mutation.addedNodes].some(node => node === panel))) schedule();
    }).observe(overlay, {subtree:true, childList:true, attributes:true, attributeFilter:['hidden','aria-pressed','disabled']});
  });
})();
