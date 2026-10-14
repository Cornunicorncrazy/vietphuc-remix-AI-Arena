const total=carriageNames.length;
let index=0;
const track=document.querySelector('#train-track');
document.documentElement.style.setProperty('--car-count',total);
document.documentElement.style.setProperty('--train-ratio', (total*1100)+'/360');
track.innerHTML=renderTrain();
const prev=document.querySelector('#prev'),next=document.querySelector('#next'),dots=document.querySelector('#dots');
const carriageSummaries = {
  vi: [
    'Toa hành khách tiêu chuẩn, không gian hoài cổ với ghế đệm và khung cửa sổ ngắm phong cảnh.',
    'Toa trang trí hoa phượng đỏ rực rỡ, gợi nhớ ký ức tuổi học trò và sân ga mùa hè.',
    'Toa bưu điện với hòm thư, bàn phân loại bưu phẩm và không gian bưu chính cổ kính.',
    'Toa tranh Tết trưng bày các dòng tranh dân gian Đông Hồ đặc sắc và góc hỏi đáp văn hóa.',
    'Toa hàng hóa RATRACO với thùng container và vách thép chắc chắn dọc cung đường sắt.',
    'Toa Hành trình Di sản trưng bày tư liệu lịch sử, kiến trúc và văn hóa truyền thống.',
    'Toa Hà Nội hai tầng tái hiện không gian phố phường và nhịp sống đặc trưng thủ đô xưa.',
    'Toa SJourney kết hợp không gian nghệ thuật, chụp ảnh kỷ niệm và tương tác văn hóa.',
    'Toa cổ Đà Lạt phong cách nhà ga xe lửa cổ kính với kiến trúc gỗ Pháp lãng mạn.',
    'Đầu máy D19E kéo tàu mạnh mẽ, biểu tượng uy nghiêm trên mọi cung đường sắt Việt Nam.'
  ],
  en: [
    'Standard passenger carriage with vintage cushioned seats and scenic windows.',
    'Red flamboyant flower themed carriage evoking school memories and summer station days.',
    'Postal carriage equipped with mailboxes, sorting tables, and heritage postal items.',
    'Tết art carriage displaying traditional Đông Hồ woodblock prints and cultural Q&A.',
    'RATRACO freight carriage featuring sturdy container cargo and steel ribbed walls.',
    'Heritage Journey carriage exhibiting historical architectural and cultural archives.',
    'Hanoi double-decker carriage recreating historic old quarter streets and daily life.',
    'SJourney art and photobooth carriage for interactive cultural experiences.',
    'Dalat vintage carriage styled after the historic French-colonial mountain railway station.',
    'Powerful D19E diesel locomotive, the stalwart engine powering Vietnam railway journeys.'
  ]
};
for(let n=0;n<total;n++){
  const dot=document.createElement('button');dot.type='button';
  dot.setAttribute('aria-label',`Đến ${carriageNames[n]}`);
  dot.addEventListener('click',()=>go(n));dots.append(dot);
}
function go(n){
  if(n>0&&!window.trainQuizComplete){
    const lang = window.trainI18n?.language === 'en' ? 'en' : 'vi';
    const hintSmall = document.querySelector('.hint small');
    if(hintSmall) hintSmall.textContent = lang === 'en' ? 'Complete the first-carriage quiz to unlock the journey' : 'Hoàn thành bài khám phá ở toa đầu tiên để mở hành trình';
    return;
  }
  const previous=index;index=Math.max(0,Math.min(total-1,n));
  const num=String(index+1).padStart(2,'0');
  track.style.transform=`translateX(-${index*100/total}%)`;
  prev.disabled=index===0;next.disabled=!window.trainQuizComplete||index===total-1;
  document.querySelector('#current').textContent=num;
  document.querySelector('#car-title').textContent=carriageNames[index];
  document.querySelector('#car-code').textContent=index===total-1?'D19E · 946':`VNR · 00${index+1}`;
  const lang = window.trainI18n?.language === 'en' ? 'en' : 'vi';
  const summaries = carriageSummaries[lang] || carriageSummaries.vi;
  const hintSmall = document.querySelector('.hint small');
  if(hintSmall) hintSmall.textContent = summaries[index];
  [...dots.children].forEach((d,i)=>{d.disabled=i>0&&!window.trainQuizComplete;d.classList.toggle('active',i===index);d.setAttribute('aria-current',i===index?'step':'false')});
  if(previous!==index)window.dispatchEvent(new CustomEvent('train-navigation',{detail:{direction:index>previous?1:-1,index}}));
}
window.addEventListener('train-language-changed', () => go(index));
prev.addEventListener('click',()=>go(index-1));
next.addEventListener('click',()=>go(index+1));
document.addEventListener('keydown',e=>{
  if(e.target.matches('input,textarea,select')||e.target.isContentEditable)return;
  if(document.querySelector('.experience-overlay:not([hidden]),.interior-overlay:not([hidden]),.clothing-quiz-overlay:not([hidden]),.booth-overlay:not([hidden]),.postal-overlay:not([hidden])'))return;
  if(e.altKey||e.ctrlKey||e.metaKey)return;
  if(e.key==='ArrowLeft'){e.preventDefault();go(index-1)}
  if(e.key==='ArrowRight'){e.preventDefault();go(index+1)}
});
let touchStart=null;
const scene=document.querySelector('.scene');
scene.addEventListener('touchstart',e=>{
  touchStart={x:e.changedTouches[0].clientX,y:e.changedTouches[0].clientY};
},{passive:true});
scene.addEventListener('touchend',e=>{
  if(!touchStart)return;
  const dx=e.changedTouches[0].clientX-touchStart.x,dy=e.changedTouches[0].clientY-touchStart.y;
  if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))go(index+(dx<0?1:-1));
  touchStart=null;
},{passive:true});
scene.addEventListener('touchcancel',()=>{touchStart=null},{passive:true});
go(0);
const brand=document.querySelector('.brand');
if(brand){
  brand.addEventListener('click',e=>{
    e.preventDefault();
    if(typeof window.closeInteriorOverlay==='function')window.closeInteriorOverlay();
    document.querySelectorAll('.experience-overlay:not([hidden]),.interior-overlay:not([hidden]),.clothing-quiz-overlay:not([hidden]),.booth-overlay:not([hidden]),.postal-overlay:not([hidden])').forEach(el=>{
      const closeBtn=el.querySelector('.interior-close, .booth-close, .clothing-quiz-close, .postal-close, .experience-close, button[aria-label*="Đóng"], button[aria-label*="Close"], .overlay-close');
      if(closeBtn)closeBtn.click();
      else {
        el.hidden=true;
        el.setAttribute('hidden','');
        el.style.display='none';
      }
    });
    go(0);
  });
}
const intro=document.querySelector('.intro');
const journeyTitle=document.querySelector('#journey-title');
const hoverTitle=journeyTitle?.querySelector('.journey-title-hover');
let hoveredCar=null;
let activatedCar=null;
function showCarPrompt(n){
  if(!intro||!hoverTitle)return;
  if(activatedCar===n)return;
  hoveredCar=n;
  const prompt=`Ấn để lên ${carriageNames[n]}`;
  hoverTitle.textContent=prompt;
  journeyTitle.setAttribute('aria-label',prompt);
  intro.classList.add('is-car-hovered');
}
function clearCarPrompt(n){
  if(hoveredCar!==n)return;
  hoveredCar=null;
  intro.classList.remove('is-car-hovered');
  journeyTitle.removeAttribute('aria-label');
}
function dismissCarPrompt(n){
  activatedCar=n;
  clearCarPrompt(n);
}
[...track.querySelectorAll('.train-car')].forEach((car,n)=>{
  car.addEventListener('pointerenter',()=>showCarPrompt(n));
  car.addEventListener('pointermove',()=>{if(activatedCar===n){activatedCar=null;showCarPrompt(n);}});
  car.addEventListener('pointerleave',()=>{if(document.activeElement!==car)clearCarPrompt(n);});
  car.addEventListener('focusin',()=>showCarPrompt(n));
  car.addEventListener('focusout',()=>{if(!car.matches(':hover'))clearCarPrompt(n);});
  car.addEventListener('click',()=>dismissCarPrompt(n));
  car.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' ')dismissCarPrompt(n);});
});
window.addEventListener('train-quiz-completed',()=>go(index));


