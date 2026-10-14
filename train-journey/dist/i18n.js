(() => {
  let language='vi';try{language=localStorage.getItem('train-language')==='en'?'en':'vi';}catch(_){}
  const dictionary=window.trainTranslations, records=new WeakMap(), attributes=new WeakMap();
  function translate(source){
    const normalizedSource=source.normalize('NFC');
    if(language==='vi')return normalizedSource;
    const whitespace=normalizedSource.match(/^(\s*)([\s\S]*?)(\s*)$/),text=whitespace[2];
    let result=dictionary[text];
    if(result===undefined){
      const rules=[
        [/^Câu (\d+) \/ (\d+)$/,(_,a,b)=>`Question ${a} / ${b}`],
        [/^(\d+)\. (Frame|Ảnh của bạn|Trang phục|Tạo ảnh|Xếp ảnh)$/,(_,a,b)=>`${a}. ${dictionary[b]||b}`],
        [/^Ảnh gốc (\d+)$/,(_,n)=>`Original photo ${n}`],[/^Ô (\d+)$/,(_,n)=>`Slot ${n}`],[/^Ảnh cho ô (\d+)$/,(_,n)=>`Photo for slot ${n}`],
        [/^Chọn frame (.+)$/,(_,v)=>`Choose frame ${translate(v)}`],[/^Xem mẫu (.+)$/,(_,v)=>`View ${translate(v)}`],[/^Chọn (.+)$/,(_,v)=>`Choose ${translate(v)}`],
        [/^Đến (.+)$/,(_,v)=>`Go to ${translate(v)}`],[/^Ấn để lên (.+)$/,(_,v)=>`Click to board ${translate(v)}`],[/^Xóa (.+)$/,(_,v)=>`Remove ${translate(v)}`],
        [/^Dùng (.+) để thử trang phục$/,(_,v)=>`Use ${translate(v)} for try-on`],
        [/^(.+); bấm để xem bên trong khoang tàu$/,(_,v)=>`${translate(v)}; click to explore inside`],
        [/^(.+); hoàn thành bài khám phá để mở toa$/,(_,v)=>`${translate(v)}; complete the quiz to unlock`],
        [/^Bên trong (.+)$/,(_,v)=>`Inside ${translate(v.replace(/^toa /,'Toa '))}`],
        [/^Frame: (.+) · (\d+) ô ảnh$/,(_,v,n)=>`Frame: ${translate(v)} · ${n} photo slots`],
        [/^Kính gửi (.+), tấm vé đã đưa bạn đến một miền ký ức\. Nay xin gửi mấy hàng tin để cuộc hẹn với Việt phục còn nối dài ngoài sân ga\.$/,(_,name)=>`Dear ${name}, your ticket has carried you into memory. Here are a few lines to continue your encounter with Việt phục beyond the station.`],
        [/^Dán tem (.+)$/,(_,name)=>`Add ${translate(name)} stamp`],
        [/^Tem (.+)$/,(_,name)=>`${translate(name)} stamp`],
        [/^Đã dán tem (.+)\.$/,(_,name)=>`${translate(name)} stamp added.`],
        [/^Xem góc nhìn (\d+): (.+)$/,(_,n,v)=>`View ${n}: ${translate(v)}`]
      ];
      for(const [pattern,fn]of rules)if(pattern.test(text)){result=text.replace(pattern,fn);break;}
    }
    return whitespace[1]+(result??text).normalize('NFC')+whitespace[3];
  }
  const switcher=document.createElement('div');switcher.className='language-switch';switcher.dataset.noTranslate='';switcher.setAttribute('role','group');switcher.setAttribute('aria-label','Ngôn ngữ / Language');
  ['vi','en'].forEach(code=>{const b=document.createElement('button');b.type='button';b.textContent=code.toUpperCase();b.setAttribute('aria-label',code==='vi'?'Tiếng Việt':'English');b.addEventListener('click',()=>setLanguage(code));switcher.append(b);});
  (document.getElementById('site-controls')||document.body).append(switcher);
  function syncText(node){const parent=node.parentElement;if(!parent||parent.closest('script,style,svg,[data-no-translate],textarea'))return;const current=node.nodeValue;let record=records.get(node);if(!record){record={original:current,applied:current};records.set(node,record);}else if(current!==record.applied){record.original=current;}const value=translate(record.original);record.applied=value;if(current!==value)node.nodeValue=value;}
  function syncElement(node){if(node.closest('[data-no-translate]'))return;let store=attributes.get(node);if(!store){store={};attributes.set(node,store);}for(const name of ['aria-label','title','alt','placeholder']){if(!node.hasAttribute(name))continue;const current=node.getAttribute(name);let record=store[name];if(!record)record=store[name]={original:current,applied:current};else if(current!==record.applied)record.original=current;const value=translate(record.original);record.applied=value;if(current!==value)node.setAttribute(name,value);}}
  const observer=new MutationObserver(()=>apply());
  function apply(){observer.disconnect();const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT);let node;while(node=walker.nextNode()){if(node.nodeType===Node.TEXT_NODE)syncText(node);else syncElement(node);}document.documentElement.lang=language;document.title=language==='en'?'Việt Phục Train Ticket — Vietnam Train Journey':'Vé Tàu Việt Phục — Chuyến tàu Việt Nam';[...switcher.children].forEach((b,i)=>b.setAttribute('aria-pressed',String((i===0?'vi':'en')===language)));observer.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['aria-label','title','alt','placeholder']});}
  function setLanguage(code){language=code;try{localStorage.setItem('train-language',code);}catch(_){}apply();window.dispatchEvent(new CustomEvent('train-language-changed',{detail:{language}}));}
  window.trainI18n={t:translate,get language(){return language;},apply};apply();
})();
