(() => {
  const suggested = [
    { question: 'Váy H’Mông được tạo nên từ những kỹ thuật nào?', ids: ['hmong'] },
    { question: 'Trang phục Dao đỏ có điểm gì nổi bật?', ids: ['dao-do'] },
    { question: 'Áo cóm và khăn piêu gắn với trang phục Thái ra sao?', ids: ['thai'] },
    { question: 'Hoa văn trên trang phục Ê Đê có gì đáng chú ý?', ids: ['ede'] },
    { question: 'Áo bà ba thường được mặc như thế nào?', ids: ['ba-ba'] },
    { question: 'Áo ngũ thân và áo dài hiện đại khác nhau ra sao?', ids: ['ngu-than', 'ao-dai'] }
  ];
  const aliases = {
    hmong: ['hmong', 'h mong', 'mong', 'váy xếp nếp'],
    'dao-do': ['dao do', 'red dao'],
    thai: ['dan toc thai', 'nguoi thai', 'ao com', 'khan pieu', 'thai clothing'],
    ede: ['e de', 'ede', 'hoa van ede'],
    'ba-ba': ['ba ba'],
    'ngu-than': ['ngu than', 'ao tac'],
    'ao-dai': ['ao dai', 'le mur'],
    'nhat-binh': ['nhat binh'],
    'giao-linh': ['giao linh']
  };
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, ' ').trim();
  const categories = () => window.clothingQuizData?.categories || [];
  const endpoint = () => window.trainTetQAConfig?.endpoint;

  window.mountTetQA = host => {
    if (host.dataset.ready) return;
    host.dataset.ready = 'true';
    host.innerHTML = `<div class="tet-qa-heading"><div><span class="tet-qa-kicker">BÀN HỎI ĐÁP · TOA TRANH TẾT</span><h3>Những câu chuyện trên nếp áo</h3><p>Chọn một câu hỏi để đọc tư liệu, hoặc viết điều bạn muốn tìm hiểu.</p></div><span class="tet-qa-ornament" aria-hidden="true">✦</span></div>
      <div class="tet-qa-suggestions" aria-label="Câu hỏi gợi ý"></div>
      <div class="tet-qa-messages" role="log" aria-label="Cuộc trò chuyện về trang phục" aria-live="polite"></div>
      <form class="tet-qa-form"><label for="tet-qa-question">Câu hỏi của bạn</label><div class="tet-qa-compose"><textarea id="tet-qa-question" rows="2" maxlength="500" placeholder="Ví dụ: Trang phục Dao đỏ có những biến thể nào?"></textarea><button type="submit">Gửi câu hỏi ↗</button></div></form>
      <p class="tet-qa-footnote">Bạn có thể hỏi thêm về trang phục truyền thống. Nếu kết nối tạm gián đoạn, câu hỏi gợi ý vẫn dùng tư liệu có sẵn.</p>`;

    const suggestions = host.querySelector('.tet-qa-suggestions');
    const messages = host.querySelector('.tet-qa-messages');
    const form = host.querySelector('.tet-qa-form');
    const input = host.querySelector('textarea');
    const submit = form.querySelector('button');
    const history = [];
    let pending = false;

    function bubble(role, content, sources = [], heading = '') {
      const item = document.createElement('article');
      item.className = `tet-qa-message tet-qa-message--${role}`;
      const byline = document.createElement('span');
      byline.className = 'tet-qa-byline';
      byline.textContent = role === 'user' ? 'Bạn hỏi' : (heading || 'Bàn hỏi đáp');
      const body = document.createElement('p');
      body.textContent = content;
      item.append(byline, body);
      const validSources = sources.filter(source => source && /^https:\/\//i.test(source.url || ''));
      if (validSources.length) {
        const refs = document.createElement('div');
        refs.className = 'tet-qa-sources';
        validSources.forEach(source => {
          const link = document.createElement('a');
          link.href = source.url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.textContent = source.title || 'Nguồn tham khảo ↗';
          refs.append(link);
        });
        item.append(refs);
      }
      messages.append(item);
      messages.scrollTop = messages.scrollHeight;
    }

    function localIds(question) {
      const normalized = normalize(question);
      return Object.entries(aliases).filter(([, terms]) => terms.some(term => normalized.includes(normalize(term)))).map(([id]) => id);
    }

    function answerFromLibrary(ids) {
      const found = ids.map(id => categories().find(category => category.id === id)).filter(Boolean);
      if (!found.length) {
        bubble('assistant', 'Câu hỏi này cần trợ lý Gemini để trả lời đầy đủ. Trong lúc chờ kết nối, bạn có thể chọn một câu hỏi gợi ý hoặc hỏi về H’Mông, Dao đỏ, Thái, Ê Đê, áo bà ba, áo ngũ thân và áo dài.');
        return;
      }
      found.forEach(category => {
        bubble('assistant', category.description, category.sources || [], category.name);
        history.push({role: 'assistant', content: category.description});
      });
    }

    async function ask(rawQuestion, suggestedIds = []) {
      const question = rawQuestion.trim().slice(0, 500);
      if (!question || pending) return;
      bubble('user', question);
      history.push({role: 'user', content: question});
      input.value = '';
      const apiEndpoint = endpoint();
      if (!apiEndpoint) {
        answerFromLibrary(suggestedIds.length ? suggestedIds : localIds(question));
        return;
      }
      pending = true;
      submit.disabled = true;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);
      try {
        // The endpoint is a same-origin server route. Gemini credentials stay on the server.
        const url = new URL(apiEndpoint, location.href);
        if (url.origin !== location.origin) throw new Error('External endpoint');
        const response = await fetch(url, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({messages: history.slice(-8), language: window.trainI18n?.language || 'vi'}),
          signal: controller.signal
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        if (typeof result.answer !== 'string' || !result.answer.trim()) throw new Error('Empty answer');
        const answer = result.answer.trim().slice(0, 4000);
        bubble('assistant', answer, Array.isArray(result.sources) ? result.sources : []);
        history.push({role: 'assistant', content: answer});
      } catch (_) {
        const ids = suggestedIds.length ? suggestedIds : localIds(question);
        if (ids.length) answerFromLibrary(ids);
        else bubble('assistant', 'Chưa thể kết nối trợ lý lúc này. Bạn có thể thử lại hoặc chọn câu hỏi gợi ý để xem tư liệu có sẵn.');
      } finally {
        clearTimeout(timeout);
        pending = false;
        submit.disabled = false;
      }
    }

    suggested.forEach(({question, ids}) => {
      const choice = document.createElement('button');
      choice.type = 'button';
      choice.textContent = question;
      choice.addEventListener('click', () => ask(question, ids));
      suggestions.append(choice);
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      ask(input.value);
    });
    input.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        form.requestSubmit();
      }
    });
    bubble('assistant', 'Chào bạn! Mỗi bộ trang phục gắn với một cộng đồng, địa phương và dịp mặc riêng. Hãy chọn một câu hỏi để bắt đầu cuộc trò chuyện.');
  };
})();
