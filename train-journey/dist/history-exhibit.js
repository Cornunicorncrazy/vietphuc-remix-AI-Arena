(() => {
  const sources = {
    twinkl: {label: 'Twinkl', url: 'https://www.twinkl.com.vn/teaching-wiki/viet-phuc-qua-cac-thoi-ky'},
    hoaNghiem: {label: 'Hoa Nghiêm Việt Phục', url: 'https://hoanghiemvietphuc.com/co-phuc-viet-nam-qua-tung-thoi-ky/'},
    museum: {label: 'Ngàn năm áo mũ · BTLSQG', url: 'https://baotanglichsu.vn/vi/Articles/2006/67015/ngan-nam-ao-mu.html'},
    dongSon: {label: 'Nghệ thuật Đông Sơn', url: 'https://baotanglichsu.vn/vi/Articles/3101/68748/nghe-thuat-djong-son.html'},
    dongSonCloth: {label: 'Vải Đông Sơn · BTLSQG', url: 'https://baotanglichsu.vn/vi/Articles/3101/74706/tim-ve-trang-phuc-thoi-djong-son-ky-5-tho-may-djong-son-va-su-khoi-djau-nghe-theu.html'},
    earlyDynasties: {label: 'Ngô – Đinh – Tiền Lê · BTLSQG', url: 'https://baotanglichsu.vn/vi/Articles/4046/trieu-ngo-djinh-tien-le-939-1009'},
    nguyenObjects: {label: 'Y phục Nguyễn · BTLSQG', url: 'https://baotanglichsu.vn/vi/Articles/3096/18741/y-phuc-thoi-nguyen-tai-bao-tang-lich-su-quoc-gia.html'},
    nguThanMuseum: {label: 'Áo ngũ thân · BTLSQG', url: 'https://baotanglichsu.vn/vi/Articles/3090/72685/bao-tang-lich-su-quoc-gia-tiep-nhan-ao-dai-ngu-than-truyen-thong.html'},
    hue: {label: 'Triển lãm áo dài · Sở Văn hóa Huế', url: 'https://svhttdl.hue.gov.vn/tin-trong-nuoc/ao-dai-viet-nam-qua-cac-thoi-ky-lich-su-mot-trien-lam-khong-the-bo-qua.html'},
    researchToday: {label: 'Thực hành cổ phục · Tạp chí VHNT', url: 'https://vanhoanghethuat.vn/cong-bocong-khai-hien-vat-nhu-cau-cap-thiet-de-nguoi-tre-thuc-hanh-co-phuc-2024-77758017.html'}
  };
  const exhibits = {
    4: {
      vi: {eyebrow: 'TOA 05 · KHỞI NGUỒN', title: 'Từ dấu tích đến áo mũ cung đình', intro: 'Lần theo những dấu vết còn lại của trang phục Việt. Mỗi thời kỳ có nhiều cách ăn mặc khác nhau theo địa phương, tầng lớp và dịp sử dụng.', prompt: 'Chọn một thời kỳ để mở trang tư liệu', source: 'Đọc thêm', note: 'Hình dung về y phục cổ cần đối chiếu hiện vật, hình khắc và văn bản; không có một kiểu áo đại diện cho cả thời kỳ.'},
      en: {eyebrow: 'CARRIAGE 05 · ORIGINS', title: 'From surviving traces to court dress', intro: 'Follow what remains of Vietnamese dress. Every period included different clothing across regions, communities and occasions.', prompt: 'Choose a period to open its archive page', source: 'Read more', note: 'Reconstructing historical dress requires comparing artifacts, images and written records; one garment cannot represent an entire era.'},
      periods: [
        {years: 'Trước thế kỷ X / Before the 10th century', vi: {name: 'Văn Lang – Âu Lạc và Đông Sơn', lead: 'Một mảnh vải cũng kể chuyện', body: 'Ngoài hình người trên trống và tượng đồng, mộ Châu Can còn lưu những mảnh vải có mép gấp và đường khâu. Đó là chứng cứ về kỹ thuật làm trang phục, nhưng chưa đủ để xác định một kiểu “quốc phục” duy nhất của cả thời kỳ.'}, en: {name: 'Văn Lang – Âu Lạc and Đông Sơn', lead: 'Even a fabric fragment tells a story', body: 'Alongside human figures on drums and bronze objects, the Châu Can burial preserved cloth fragments with folded, sewn hems. These show clothing techniques, but cannot establish one single “national costume” for the whole period.'}, refs: ['dongSonCloth','dongSon','hoaNghiem']},
        {years: 'Thế kỷ X / 10th century', vi: {name: 'Ngô – Đinh – Tiền Lê', lead: 'Một khoảng tư liệu cần thận trọng', body: 'Hiện vật thế kỷ X giúp nhận diện bối cảnh văn hóa của các triều đại độc lập đầu tiên, nhưng tư liệu về cấu tạo y phục còn mỏng. Vì thế, hình ảnh cổ phục gắn với giai đoạn này thường là cách diễn giải hoặc phục dựng, cần ghi rõ căn cứ.'}, en: {name: 'Ngô – Đinh – Early Lê', lead: 'A period with limited clothing evidence', body: '10th-century objects help establish the setting of the early independent dynasties, but evidence for garment construction remains thin. Costume images assigned to this period are therefore interpretations or reconstructions whose basis should be stated.'}, refs: ['earlyDynasties','hoaNghiem']},
        {years: 'Thế kỷ XI–XIV / 11th–14th centuries', vi: {name: 'Thời Lý – Trần', lead: 'Nếp áo của nhiều tầng lớp', body: 'Áo mũ của triều đình và cách mặc trong dân gian không giống nhau. Nghiên cứu phục dựng dựa vào sử liệu, tượng, phù điêu và những dấu tích còn lại, vì thế nên xem từng kiểu áo trong đúng bối cảnh của nó.'}, en: {name: 'The Lý – Trần dynasties', lead: 'Dress across social settings', body: 'Court clothing and everyday dress were not the same. Reconstructions draw on records, statues, reliefs and surviving objects, so each style belongs in its own context.'}, refs: ['museum','twinkl']},
        {years: 'Thế kỷ XV–XVIII / 15th–18th centuries', vi: {name: 'Thời Hậu Lê', lead: 'Lễ phục và đời thường', body: 'Nghiên cứu “Ngàn năm áo mũ” đối chiếu những hệ áo mũ cung đình với cách mặc dân gian như giao lĩnh, tứ thân, yếm và váy. Chúng thuộc các môi trường sử dụng khác nhau; không thể lấy lễ phục triều đình làm hình mẫu cho mọi người cùng thời.'}, en: {name: 'The Later Lê period', lead: 'Ceremonial and everyday wear', body: 'The study “Ngàn năm áo mũ” contrasts court dress systems with everyday forms such as cross-collar robes, four-panel garments, bodices and skirts. They served different settings; court dress cannot stand for everyone in the same era.'}, refs: ['museum','twinkl']}
      ]
    },
    5: {
      vi: {eyebrow: 'TOA 06 · TIẾP NỐI', title: 'Từ áo ngũ thân đến hôm nay', intro: 'Tiếp tục hành trình qua những biến đổi của áo dài và cách người Việt tìm về, diễn giải y phục xưa.', prompt: 'Chọn một thời kỳ để mở trang tư liệu', source: 'Đọc thêm', note: 'Áo dài hiện đại và phục dựng cổ phục đều có nhiều biến thể. Tên gọi, niên đại và chi tiết may mặc nên gắn với nguồn tư liệu cụ thể.'},
      en: {eyebrow: 'CARRIAGE 06 · CONTINUITY', title: 'From the ngũ thân robe to today', intro: 'Continue through changes to áo dài and the ways people rediscover and interpret earlier dress.', prompt: 'Choose a period to open its archive page', source: 'Read more', note: 'Modern áo dài and historical reconstructions have many variants. Names, dates and sewing details should be tied to specific sources.'},
      periods: [
        {years: 'Thế kỷ XVIII–XIX / 18th–19th centuries', vi: {name: 'Thời Nguyễn: áo mũ cung đình', lead: 'Hiện vật còn lưu giữ', body: 'Bảo tàng Lịch sử Quốc gia lưu nhiều áo thời Nguyễn với chất liệu, màu sắc, lối may và họa tiết khác nhau. Những chi tiết ấy phản ánh quy định và vị thế trong môi trường cung đình; đây chỉ là một phần của đời sống y phục thời Nguyễn.'}, en: {name: 'Nguyễn court dress', lead: 'Surviving garments', body: 'The National Museum of History preserves Nguyễn garments with differing materials, colors, construction and motifs. These details reflect rules and status at court, one part of the wider clothing life of the era.'}, refs: ['nguyenObjects','museum']},
        {years: 'Thế kỷ XVIII–đầu XX / 18th–early 20th c.', vi: {name: 'Áo ngũ thân và áo tứ thân', lead: 'Hai dòng áo, nhiều bối cảnh', body: 'Triển lãm của Bảo tàng Lịch sử Huế giới thiệu áo tứ thân gắn với phụ nữ nông thôn Bắc Bộ và áo ngũ thân phát triển mạnh dưới thời Nguyễn. Áo ngũ thân có dạng tay chẽn, tay thụng; hiện vật và áo do nghệ nhân may cũng đang được các bảo tàng lưu giữ.'}, en: {name: 'Ngũ thân and tứ thân', lead: 'Different garments, different contexts', body: 'A Huế museum exhibition presents the four-panel tứ thân in rural northern women’s dress and the five-panel ngũ thân, which flourished in the Nguyễn period. Ngũ thân included narrow- and wide-sleeved forms; museums preserve both historic objects and artisans’ later work.'}, refs: ['hue','nguThanMuseum']},
        {years: 'Đầu thế kỷ XX / Early 20th century', vi: {name: 'Áo dài chuyển mình', lead: 'Giữa nếp cũ và dáng mới', body: 'Những thử nghiệm thập niên 1930 như áo Le Mur của Cát Tường, rồi cải biến gắn với Lê Phổ, làm đổi đường nét áo dài trong môi trường đô thị. Áo tứ thân và ngũ thân vẫn tiếp tục hiện diện; một kiểu mới không thay thế tức thì mọi cách mặc cũ.'}, en: {name: 'A changing áo dài', lead: 'Between older forms and new silhouettes', body: '1930s experiments such as Cát Tường’s Le Mur design and changes associated with Lê Phổ reshaped áo dài in urban settings. Tứ thân and ngũ thân continued to be worn; a new fashion did not instantly replace older forms.'}, refs: ['hue','twinkl']},
        {years: 'Hiện nay / Today', vi: {name: 'Di sản đang được mặc tiếp', lead: 'Khám phá và phục dựng', body: 'Nghệ nhân, bảo tàng và các nhóm thực hành đang lưu giữ, may lại và nghiên cứu cổ phục. Mỗi bộ phục dựng nên cho biết nguồn hiện vật hoặc văn bản, phần được suy đoán và phần được sáng tạo cho người mặc hôm nay.'}, en: {name: 'A living dress heritage', lead: 'Rediscovery and reconstruction', body: 'Artisans, museums and clothing communities preserve, remake and research historical dress. A reconstruction can identify its artifact or written sources, what remains inferred, and what was adapted for today’s wearer.'}, refs: ['nguThanMuseum','researchToday']}
      ]
    }
  };
  const selected = new Map();
  let activeHost, activeCar;
  function element(tag, className, content) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (content) node.textContent = content;
    return node;
  }
  function render(host, car) {
    const exhibit = exhibits[car];
    if (!exhibit) return;
    const language = window.trainI18n?.language === 'en' ? 'en' : 'vi';
    const words = exhibit[language];
    const active = selected.get(car) || 0;
    host.replaceChildren();
    const header = element('header', 'history-exhibit-heading');
    header.append(element('span', 'history-exhibit-kicker', words.eyebrow), element('h3', '', words.title), element('p', '', words.intro));
    const layout = element('div', 'history-exhibit-layout');
    const timeline = element('div', 'history-timeline');
    timeline.setAttribute('role', 'group');
    timeline.setAttribute('aria-label', words.prompt);
    timeline.append(element('p', 'history-timeline-prompt', words.prompt));
    exhibit.periods.forEach((period, index) => {
      const button = element('button', 'history-period', period[language].name);
      button.type = 'button';
      button.setAttribute('aria-pressed', String(index === active));
      button.prepend(element('span', 'history-period-years', period.years));
      button.addEventListener('click', () => { selected.set(car, index); render(host, car); host.querySelectorAll('.history-period')[index]?.focus({preventScroll:true}); });
      timeline.append(button);
    });
    const period = exhibit.periods[active];
    const page = element('article', 'history-page');
    page.append(element('span', 'history-page-number', `${String(active + 1).padStart(2, '0')} / ${String(exhibit.periods.length).padStart(2, '0')}`), element('p', 'history-page-years', period.years), element('h4', '', period[language].name), element('p', 'history-page-lead', period[language].lead), element('p', 'history-page-body', period[language].body));
    const links = element('div', 'history-page-sources');
    links.append(element('span', '', `${words.source}: `));
    period.refs.forEach(key => {
      const anchor = element('a', '', sources[key].label);
      anchor.href = sources[key].url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      links.append(anchor);
    });
    page.append(links);
    layout.append(timeline, page);
    host.append(header, layout, element('p', 'history-exhibit-note', words.note));
  }
  window.mountHistoryExhibit = (host, car) => {
    activeHost = host;
    activeCar = car;
    render(host, car);
  };
  window.addEventListener('train-language-changed', () => {
    if (activeHost && !activeHost.hidden) render(activeHost, activeCar);
  });
})();
