(() => {
  const journey = document.querySelector('.journey');
  if (!journey) return;

  const community = 'Những người đam mê trang phục truyền thống Việt Nam';
  const stamps = [
    'Ô ăn quan', 'Nhảy dây', 'Rồng rắn lên mây', 'Bịt mắt bắt dê',
    'Kỷ niệm Bưu chính', 'Ngày Độc lập', 'Xe xưa', 'Chiến thắng Điện Biên',
    'Rồng Thăng Long', 'Y phục cổ truyền Việt Nam'
  ].map((name, index) => ({name, src: `postal/stamp-${index + 1}.png`}));
  const overlay = document.createElement('div');
  overlay.className = 'postal-overlay';
  overlay.hidden = true;
  overlay.innerHTML = `<section class="postal-card" role="dialog" aria-modal="true" aria-labelledby="postal-title">
    <header class="postal-header"><div><span class="postal-kicker">TOA 03 · BƯU ĐIỆN</span><h2 id="postal-title">Thư từ toa bưu điện</h2></div><button class="postal-close" type="button" aria-label="Đóng toa bưu điện">×</button></header>
    <div class="postal-body"></div><p class="postal-status" role="status" aria-live="polite"></p>
  </section>`;
  journey.append(overlay);
  const body = overlay.querySelector('.postal-body');
  const status = overlay.querySelector('.postal-status');
  const closeButton = overlay.querySelector('.postal-close');
  const card = overlay.querySelector('.postal-card');
  let stage = 'compose', chosenStamp = -1, incomingStamp = 0, timer = null, returnFocus = null, inactive = [];
  const node = (tag, className, content) => {const element = document.createElement(tag);if(className)element.className=className;if(content!==undefined)element.textContent=content;return element;};
  const button = (label, click, className = 'postal-button') => {const element=node('button',className,label);element.type='button';element.addEventListener('click',click);return element;};
  const passenger = () => window.trainPassengerName?.trim() || 'Hành khách Việt Phục';
  const link = (label, url) => {const a=node('a','',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;};
  const drawerScrim = node('div','postal-stamp-scrim');
  drawerScrim.hidden = true;
  const stampDrawer = stampPicker();
  stampDrawer.inert = true;
  stampDrawer.setAttribute('aria-hidden','true');
  overlay.append(drawerScrim,stampDrawer);
  drawerScrim.addEventListener('click',()=>closeStampDrawer());

  function openStampDrawer() {
    if (stage !== 'compose') return;
    stampDrawer.querySelectorAll('.postal-stamp-choice').forEach((choice,index)=>choice.setAttribute('aria-pressed',String(index===chosenStamp)));
    drawerScrim.hidden = false;
    stampDrawer.inert = false;
    stampDrawer.setAttribute('aria-hidden','false');
    stampDrawer.classList.add('is-open');
    card.inert = true;
    stampDrawer.querySelector('.postal-stamp-drawer-close')?.focus({preventScroll:true});
  }
  function closeStampDrawer(restoreFocus = true) {
    if (!stampDrawer.classList.contains('is-open')) return;
    stampDrawer.classList.remove('is-open');
    stampDrawer.inert = true;
    stampDrawer.setAttribute('aria-hidden','true');
    drawerScrim.hidden = true;
    card.inert = false;
    if (restoreFocus) body.querySelector('.postal-stamp-spot')?.focus({preventScroll:true});
  }

  function close() {
    clearTimeout(timer);
    closeStampDrawer(false);
    if (stage==='transit') {incomingStamp=Math.floor(Math.random()*stamps.length);stage='received';}
    overlay.hidden = true;
    inactive.forEach(({element, inert}) => {element.inert=inert;});
    returnFocus?.focus({preventScroll:true});
  }
  function open() {
    if (overlay.hidden) {
      returnFocus=document.activeElement;
      inactive=[...journey.children].filter(element=>element!==overlay).map(element=>({element,inert:element.inert}));
      inactive.forEach(({element})=>{element.inert=true;});
      overlay.inert=false;
      overlay.hidden=false;
    }
    render();
    closeButton.focus({preventScroll:true});
  }
  function envelope(sender, recipient, stamp, canChoose) {
    const wrap=node('div','postal-envelope');
    const image=node('img','postal-envelope-image');image.src='postal/envelope.png';image.alt='Phong thư bưu điện Việt Nam viền đỏ xanh đã tách nền';wrap.append(image);
    const from=node('span','postal-address postal-from',sender);
    const to=node('span','postal-address postal-to',recipient);
    wrap.append(from,to);
    const spot=button(stamp<0?'＋ Dán tem':'',()=>{if(canChoose)openStampDrawer();},'postal-stamp-spot');
    spot.setAttribute('aria-label',stamp<0?'Chọn tem để dán vào phong thư':`Tem ${stamps[stamp].name}`);
    if (canChoose) spot.setAttribute('aria-haspopup','dialog');
    if (stamp>=0) {const img=node('img');img.src=stamps[stamp].src;img.alt=stamps[stamp].name;spot.append(img);}
    if (!canChoose) spot.disabled=true;
    wrap.append(spot);
    return wrap;
  }
  function stampPicker() {
    const section=node('section','postal-stamps');
    section.setAttribute('role','dialog');
    section.setAttribute('aria-label','Chọn con tem cho lá thư');
    const head=node('div','postal-stamp-drawer-head');
    head.append(node('h3','', 'Chọn con tem cho lá thư'),button('×',()=>closeStampDrawer(),'postal-stamp-drawer-close'));
    head.querySelector('button').setAttribute('aria-label','Đóng danh sách tem');
    section.append(head);
    const grid=node('div','postal-stamp-grid');
    stamps.forEach((stamp,index)=>{
      const choice=button('',()=>{chosenStamp=index;closeStampDrawer(false);render();status.textContent=`Đã dán tem ${stamp.name}.`;body.querySelector('.postal-actions button')?.focus({preventScroll:true});},'postal-stamp-choice');
      choice.setAttribute('aria-label',`Dán tem ${stamp.name}`);
      choice.setAttribute('aria-pressed',String(index===chosenStamp));
      const img=node('img');img.src=stamp.src;img.alt='';
      choice.append(img,node('span','',stamp.name));grid.append(choice);
    });
    section.append(grid);return section;
  }
  function send() {
    if (chosenStamp<0 || stage!=='compose') return;
    closeStampDrawer(false);
    stage='transit';render();status.textContent='Thư đang theo đường ray đến nơi nhận…';
    clearTimeout(timer);
    timer=setTimeout(()=>{
      incomingStamp=Math.floor(Math.random()*stamps.length);
      stage='received';render();status.textContent='Bạn có thư mới từ những người yêu trang phục truyền thống Việt Nam.';
    },1600);
  }
  function newspaper() {
    const outer=node('div','postal-paper-wrap');
    const paper=node('article','postal-paper');
    paper.setAttribute('aria-label','Tờ báo Việt Phục gửi đến bạn');
    const top=node('div','postal-paper-top');
    const sidebar=node('section','postal-paper-side');
    sidebar.append(node('p','postal-paper-rubric','LỜI NHẮN TỪ BƯU ĐIỆN'),node('h3','', 'Gửi người vừa xuống ga'));
    sidebar.append(node('p','',`Kính gửi ${passenger()}, tấm vé đã đưa bạn đến một miền ký ức. Nay xin gửi mấy hàng tin để cuộc hẹn với Việt phục còn nối dài ngoài sân ga.`));
    sidebar.append(node('h4','', 'Tìm áo, giữ dáng xưa'));
    const rent=node('p');rent.append('Tại Hà Nội, có thể hỏi mượn Nhật Bình, áo Tấc, Ngũ Thân ở ',link('Tô Hà Style','https://tohastyle.com.vn/'),'; hoặc xem các bộ Việt cổ phục cho thuê tại ',link('V’s Style','https://vietphuc.net/'),'. Nên hỏi trước về mẫu, cỡ áo và lịch nhận trả.');sidebar.append(rent);
    const main=node('section','postal-paper-main');
    main.append(node('p','postal-paper-edition','TỜ TIN VĂN HÓA · SỐ ĐẶC BIỆT'),node('h2','', 'Việt phục lại về giữa phố'),node('p','postal-paper-deck','Từ tà áo nơi cố đô đến nếp váy miền cao, mỗi đường kim mở một câu chuyện để người hôm nay cùng đọc tiếp.'));
    main.append(node('h3','', 'Tin từ Bách Hoa Bộ Hành'));
    const event=node('p');event.append('Ngày 24/11/2026, nhân Ngày Văn hóa Việt Nam, Bách Hoa Bộ Hành cho biết sẽ có một sự kiện dành cho cộng đồng yêu văn hóa và Việt phục. ',link('Xem bài đăng về sự kiện','https://web.facebook.com/share/p/1HVYxWhjUA/'),'.');main.append(event);
    const follow=node('p');follow.append('Thông tin về chương trình, thời gian và địa điểm sẽ được cập nhật trên ',link('trang Bách Hoa Bộ Hành','https://web.facebook.com/bachhoabohanh/?locale=vi_VN&_rdc=11&_rdr'),' khi được công bố.');main.append(follow);
    top.append(sidebar,main);
    const bottom=node('div','postal-paper-bottom');
    const locations=node('section');locations.append(node('h3','', 'Theo dấu một tấm hình'));
    const spots=node('p');spots.append('Đại Nội Huế cùng những cung điện cổ là phông nền cho áo ngũ thân; ',link('Sở Du lịch Huế','https://huetourism.gov.vn/doan-kols-australia-trai-nghiem-ve-dep-co-kinh-va-am-thuc-dac-sac-xu-hue-%E2%80%93-dong-luc-moi-cho-quang-ba-du-lich-quoc-te/?pid=MjM4MDR8Y3NkbGRs0'),' từng ghi lại trải nghiệm ấy. Ở Hội An, phố nhà vàng và đèn lồng cũng chờ một tà áo đi qua.');locations.append(spots,link('Gợi ý từ Cục Du lịch Việt Nam','https://image.vietnam.travel/things-to-do/the-best-ways-to-explore-the-ancient-town-of-hoi-an'));
    const garments=node('section');garments.append(node('h3','', 'Áo từ nhiều miền đất'));
    garments.append(node('p','', 'Xin thử tìm hiểu áo bà ba Nam Bộ mộc mạc; váy xòe H’Mông rực rỡ; sắc đỏ trong lễ phục của người Dao Đỏ; áo cóm và váy của người Thái; hay hoa văn trên trang phục Ê Đê. Mỗi bộ áo thuộc về một cộng đồng, một dịp mặc và một câu chuyện riêng.'));
    const note=node('section');note.append(node('h3','', 'Lời hẹn của tòa soạn'),node('p','', 'Nếu muốn mượn hoặc chụp cùng trang phục dân tộc, hãy lắng nghe người làm nghề, tìm hiểu bối cảnh và xin phép ở những không gian cần được tôn trọng. Một bức hình đẹp bắt đầu từ sự trân quý.'));
    bottom.append(locations,garments,note);
    paper.append(top,bottom);
    outer.append(paper);
    return outer;
  }
  function render() {
    body.replaceChildren();status.textContent='';
    if (stage==='compose') {
      body.append(node('p','postal-intro','Chạm vào ô tem, chọn một con tem rồi gửi lời chào từ chuyến tàu Việt Phục.'));
      body.append(envelope(passenger(),community,chosenStamp,true));
      const actions=node('div','postal-actions');const sendButton=button('Gửi thư đi →',send,'postal-button primary');sendButton.disabled=chosenStamp<0;actions.append(sendButton);body.append(actions);
    } else if(stage==='transit') {
      body.append(node('div','postal-transit','✉'));
      body.append(node('p','postal-intro','Lá thư đã rời toa bưu điện. Xin chờ một thoáng…'));
    } else if(stage==='received') {
      body.append(node('p','postal-intro','Có một lá thư mới dành cho bạn. Mở ra để đọc tờ tin từ những người yêu Việt phục.'));
      body.append(envelope(community,passenger(),incomingStamp,false));
      const actions=node('div','postal-actions');actions.append(button('Mở thư đến →',()=>{stage='paper';render();},'postal-button primary'));body.append(actions);
    } else {
      body.append(newspaper());
      const actions=node('div','postal-actions');actions.append(button('← Xem lại phong thư',()=>{stage='received';render();},'postal-button secondary'),button('Khám phá tiếp đoàn tàu',close,'postal-button primary'));body.append(actions);
    }
    card.scrollTop=0;
  }
  window.openPostalCar=open;
  closeButton.addEventListener('click',close);
  overlay.addEventListener('click',event=>{if(event.target===overlay)close();});
  document.addEventListener('keydown',event=>{
    if(overlay.hidden)return;
    if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();if(stampDrawer.classList.contains('is-open'))closeStampDrawer();else close();return;}
    if(event.key.startsWith('Arrow'))event.stopImmediatePropagation();
    if(event.key==='Tab'){
      const focusable=[...overlay.querySelectorAll('button,a')].filter(element=>!element.disabled&&!element.closest('[inert]')&&element.getClientRects().length);
      const first=focusable[0],last=focusable.at(-1);
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    }
  },true);
})();
