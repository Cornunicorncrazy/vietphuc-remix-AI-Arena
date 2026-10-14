(() => {
  const journey = document.querySelector('.journey');
  const frames = [
    {id:'strip',name:'Dải kỷ niệm',label:'4 ảnh · dọc',w:600,h:1800,slots:[[.08,.05,.84,.2],[.08,.28,.84,.2],[.08,.51,.84,.2],[.08,.74,.84,.2]],color:'#f5eddc'},
    {id:'postcard',name:'Bưu thiếp',label:'3 ảnh · ngang',w:1500,h:1000,slots:[[.05,.08,.55,.78],[.64,.08,.31,.37],[.64,.49,.31,.37]],color:'#e2e8dc'},
    {id:'album',name:'Bốn mùa',label:'4 ảnh · vuông',w:1200,h:1300,slots:[[.06,.055,.42,.39],[.52,.055,.42,.39],[.06,.48,.42,.39],[.52,.48,.42,.39]],color:'#f0ded0'}
  ];
  const garmentVariants = {
    'giao-linh': [
      {id:'green',name:'Xanh ngọc',src:'garments/giao-linh-green.png'},
      {id:'pink',name:'Hồng phấn',src:'garments/giao-linh-pink.png'},
      {id:'floral',name:'Trắng thêu hoa',src:'garments/giao-linh-floral.png'},
      {id:'white',name:'Nam trắng',src:'garments/giao-linh-white.png'},
      {id:'rose',name:'Nam hồng đất',src:'garments/giao-linh-rose.png'},
      {id:'yellow',name:'Vàng thêu hoa',src:'garments/giao-linh-yellow.png'}
    ],
    'ngu-than': [
      {id:'blue',name:'Nữ xanh nhạt',src:'garments/ngu-than-blue.png'},
      {id:'purple',name:'Nữ tím',src:'garments/ngu-than-purple.png'},
      {id:'red',name:'Nữ đỏ',src:'garments/ngu-than-red.png'},
      {id:'dragon',name:'Nam đỏ thêu rồng',src:'garments/ngu-than-dragon.png'},
      {id:'navy',name:'Nam xanh đậm',src:'garments/ngu-than-navy.png'},
      {id:'pink',name:'Nữ hồng',src:'garments/ngu-than-pink.png'}
    ],
    'ba-ba': [
      {id:'woman-dark',name:'Nữ nâu sẫm',src:'garments/ba-ba-woman-dark.png'},
      {id:'man-brown',name:'Nam nâu',src:'garments/ba-ba-man-brown.png'},
      {id:'man-black',name:'Nam đen',src:'garments/ba-ba-man-black.png'},
      {id:'woman-brown',name:'Nữ nâu',src:'garments/ba-ba-woman-brown.png'}
    ],
    'hmong': [
      {id:'black',name:'Váy đen phối đỏ',src:'garments/hmong-black.png'},
      {id:'red-portrait',name:'Bộ đỏ thêu hoa',src:'garments/hmong-red-portrait.png'},
      {id:'red-full',name:'Váy đỏ đen',src:'garments/hmong-red-full.png'}
    ],
    'dao-do': [
      {id:'red',name:'Bộ đen đỏ',src:'garments/dao-do-red.png'}
    ],
    'thai': [
      {id:'white-black',name:'Áo trắng, váy đen',src:'garments/thai-white-black.png'}
    ],
    'ede': [
      {id:'front',name:'Áo và váy dệt sọc',src:'garments/ede-front.png'}
    ],
    'nhat-binh': [
      {id:'red',name:'Nữ đỏ thêu',src:'garments/nhat-binh-red.png'},
      {id:'pink',name:'Nữ hồng',src:'garments/nhat-binh-pink.png'},
      {id:'blue-man',name:'Nam xanh lam',displayName:'Việt phục nam · Xanh lam',src:'garments/nhat-binh-blue-man.png'},
      {id:'cream-man',name:'Nam trắng kem',displayName:'Việt phục nam · Trắng kem',src:'garments/nhat-binh-cream-man.png'},
      {id:'cream-woman',name:'Nữ trắng kem',src:'garments/nhat-binh-cream-woman.png'},
      {id:'ivory',name:'Nữ trắng ngà',displayName:'Việt phục nữ · Trắng ngà',src:'garments/nhat-binh-ivory.png'},
      {id:'yellow-man',name:'Nam vàng',displayName:'Việt phục nam · Vàng',src:'garments/nhat-binh-yellow-man.png'},
      {id:'purple',name:'Nữ tím thêu',src:'garments/nhat-binh-purple.png'},
      {id:'yellow-woman',name:'Nữ vàng',src:'garments/nhat-binh-yellow-woman.png'},
      {id:'white',name:'Nữ trắng thêu',src:'garments/nhat-binh-white.png'},
      {id:'navy-man',name:'Nam xanh đậm',displayName:'Việt phục nam · Xanh đậm',src:'garments/nhat-binh-navy-man.png'}
    ]
  };
  const maleVariantIds={
    'giao-linh':['white','rose'],
    'ngu-than':['dragon','navy'],
    'ba-ba':['man-brown','man-black'],
    'nhat-binh':['blue-man','cream-man','yellow-man','navy-man']
  };
  window.clothingQuizGarmentVariants=garmentVariants;
  window.clothingQuizVisibleVariants=(categoryId,gender='other')=>{
    const variants=garmentVariants[categoryId]||[];
    if(gender==='other')return variants;
    const maleIds=maleVariantIds[categoryId]||[];
    return variants.filter(variant=>gender==='male'?maleIds.includes(variant.id):!maleIds.includes(variant.id));
  };
  const overlay=document.createElement('div'); overlay.className='booth-overlay'; overlay.hidden=true;
  overlay.innerHTML='<section class="booth-card" role="dialog" aria-modal="true" aria-labelledby="booth-title"><header class="booth-header"><div><span class="booth-kicker">TOA 02 · HOA PHƯỢNG ĐỎ</span><h2 id="booth-title">Một tấm hình, một nét Việt</h2></div><button class="booth-close" type="button" aria-label="Đóng photobooth"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><line x1="2" y1="2" x2="14" y2="14"/><line x1="14" y1="2" x2="2" y2="14"/></svg></button></header><ol class="booth-steps" aria-label="Các bước photobooth"></ol><div class="booth-body"></div><p class="booth-status" role="status" aria-live="polite"></p></section>';
  journey.append(overlay);
  const body=overlay.querySelector('.booth-body'), status=overlay.querySelector('.booth-status'), steps=overlay.querySelector('.booth-steps');
  let step=0,frame=frames[0],photos=[],outfit=null,sourceId=null,placements=[],adjustments=[],activeSlot=null,stream=null,cameraToken=0,returnFocus,inactive=[],busy=false;
  const titles=['Frame','Ảnh của bạn','Trang phục','Tạo ảnh','Xếp ảnh'];
  const el=(tag,cls,text)=>{const node=document.createElement(tag); if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;};
  const button=(text,fn,cls='booth-button')=>{const node=el('button',cls,text);node.type='button';node.addEventListener('click',fn);return node;};
  const note=text=>el('p','booth-note',text);
  function stopCamera(){cameraToken++;stream?.getTracks().forEach(track=>track.stop());stream=null;}
  function close(){stopCamera();overlay.hidden=true;document.body.classList.remove('booth-open');inactive.forEach(({node,inert})=>node.inert=inert);returnFocus?.focus({preventScroll:true});}
  function changeStep(n){stopCamera();step=n;if(n!==4)activeSlot=null;status.textContent='';render();overlay.querySelector('.booth-card').scrollTop=0;body.querySelector('h3')?.focus({preventScroll:true});}
  function heading(title,description){const h=el('h3','',title);h.tabIndex=-1;body.append(h,note(description));}
  function nav(nextText,nextFn,disabled=false){const row=el('div','booth-actions');if(step>0)row.append(button('← Quay lại',()=>changeStep(step-1),'booth-button secondary'));const next=button(nextText,nextFn,'booth-button primary');next.disabled=disabled;row.append(next);body.append(row);}
  function miniature(f){const p=el('div','booth-mini-frame');p.style.aspectRatio=`${f.w}/${f.h}`;p.style.background=f.color;f.slots.forEach((s,i)=>{const slot=el('span','',String(i+1));Object.assign(slot.style,{left:s[0]*100+'%',top:s[1]*100+'%',width:s[2]*100+'%',height:s[3]*100+'%'});p.append(slot);});return p;}
  function image(url,alt){const img=el('img');img.src=url;img.alt=alt;return img;}
  function selectedPhoto(){return photos.find(p=>p.id===sourceId);}
  function addPhoto(blob,kind='original'){
    if(photos.length>=12){status.textContent='Bộ ảnh đã có 12 ảnh. Hãy xóa bớt ảnh trước khi thêm.';return;}
    const name=kind==='generated'?'Ảnh trang phục đã tạo':`Ảnh gốc ${photos.filter(p=>p.kind==='original').length+1}`;
    const p={id:crypto.randomUUID(),url:URL.createObjectURL(blob),blob,kind,name};photos.push(p);sourceId=p.id;return p;
  }
  async function loadImage(url){const img=new Image();img.src=url;await img.decode();return img;}
  async function importPhotos(files,targetSlot=null){
    const errors=[],added=[];for(const file of files){
      if(photos.length>=12){errors.push('Tối đa 12 ảnh trong một bộ.');break;}
      if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>12*1024*1024){errors.push('Chỉ nhận JPG, PNG, WebP tối đa 12 MB mỗi ảnh.');continue;}
      const url=URL.createObjectURL(file);
      try{const img=await loadImage(url);if(img.width*img.height>50000000)throw Error('Ảnh quá lớn.');const scale=Math.min(1,1600/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);const blob=await new Promise(resolve=>c.toBlob(resolve,'image/png'));if(!blob)throw Error('Không đọc được ảnh.');added.push(addPhoto(blob));}
      catch(_){errors.push('Không thể đọc một ảnh. Hãy thử ảnh khác.');}finally{URL.revokeObjectURL(url);}
    }
    if(targetSlot!==null&&added.length){placements[targetSlot]=added[0].id;adjustments[targetSlot]={x:0,y:0,zoom:1};activeSlot=null;}
    if(!overlay.hidden&&(step===1||step===4))render();status.textContent=errors.join(' ');
  }
  function uploadControl(label){const wrap=el('label','booth-upload',label);const input=el('input');input.type='file';input.accept='image/jpeg,image/png,image/webp';input.multiple=true;input.setAttribute('aria-label',label);input.addEventListener('change',()=>{importPhotos([...input.files]);input.value='';});wrap.append(input);return wrap;}
  async function startCamera(){
    stopCamera();const token=cameraToken;
    const area=body.querySelector('.booth-camera');area.replaceChildren();
    if(!navigator.mediaDevices?.getUserMedia){status.textContent='Trình duyệt này chưa hỗ trợ camera. Bạn có thể tải ảnh lên.';return;}
    status.textContent='Đang mở camera…';
    try{const active=await navigator.mediaDevices.getUserMedia({video:{facingMode:'user',width:{ideal:1280},height:{ideal:960}},audio:false});if(token!==cameraToken||overlay.hidden||step!==1){active.getTracks().forEach(t=>t.stop());return;}stream=active;const video=el('video');video.autoplay=true;video.playsInline=true;video.muted=true;video.srcObject=stream;area.append(video);await video.play();status.textContent='Camera đã sẵn sàng.';area.append(button('Chụp ảnh',()=>{if(!video.videoWidth)return;const c=document.createElement('canvas');c.width=video.videoWidth;c.height=video.videoHeight;c.getContext('2d').drawImage(video,0,0);c.toBlob(blob=>{if(blob){addPhoto(blob);stopCamera();render();status.textContent='Đã chụp ảnh. Bạn có thể chụp thêm hoặc tiếp tục.';}},'image/png');},'booth-button primary'),button('Tắt camera',()=>{stopCamera();area.replaceChildren();status.textContent='Đã tắt camera.';}));}
    catch(_){if(token===cameraToken)status.textContent='Không mở được camera. Hãy cho phép camera trong trình duyệt hoặc tải ảnh lên.';}
  }
  function renderPhotos(){
    const list=el('div','booth-photo-list');photos.forEach(p=>{const card=el('div','booth-photo-card');const choose=button('',()=>{sourceId=p.id;render();});choose.setAttribute('aria-label',`Dùng ${p.name} để thử trang phục`);choose.setAttribute('aria-pressed',String(p.id===sourceId));choose.append(image(p.url,p.name),el('span','',p.name));const remove=button('×',()=>{URL.revokeObjectURL(p.url);photos=photos.filter(item=>item!==p);placements=placements.map(id=>id===p.id?null:id);if(sourceId===p.id)sourceId=photos[0]?.id||null;render();});remove.setAttribute('aria-label',`Xóa ${p.name}`);card.append(choose,remove);list.append(card);});return list;
  }
  function renderCatalogue(){
    const filters=el('div','booth-filters');let group='all';const list=el('div','booth-catalogue');
    const fill=()=>{list.replaceChildren();const gender=window.clothingQuizGender||'other';window.clothingQuizData.categories.filter(c=>group==='all'||(group==='ethnic')===['hmong','dao-do','thai','ede'].includes(c.id)).flatMap(c=>window.clothingQuizVisibleVariants(c.id,gender).map(variant=>({c,variant}))).forEach(({c,variant})=>{
      const selected={...c,variantId:variant?.id||null,variantName:variant?.name||null,imageSrc:variant?.src||null,name:variant?.displayName|| (variant?`${c.name} · ${variant.name}`:c.name)};
      const card=button('',()=>{outfit=selected;render();});card.className='booth-garment';card.setAttribute('aria-label',`Chọn ${selected.name}`);card.setAttribute('aria-pressed',String(outfit?.id===c.id&&outfit?.variantId===selected.variantId));
      const art=el('div','booth-garment-art');if(variant){const garment=image(variant.src,selected.name);garment.loading='lazy';art.append(garment);}else{art.innerHTML='<svg viewBox="0 0 120 150" aria-hidden="true"><path d="M42 19 60 30 78 19 110 45 94 67 80 58 87 135 33 135 40 58 26 67 10 45Z" fill="currentColor" stroke="#485b48" stroke-width="2"/><path d="M42 19 60 44 78 19M60 44v90M35 115h50" fill="none" stroke="#f3efe3" stroke-width="3"/></svg>';art.append(el('span','','Ảnh trang phục sẽ bổ sung'));}
      card.append(art,el('strong','',selected.name),el('span','',c.tagline));list.append(card);
    });};
    [['all','Tất cả'],['viet','Việt phục & áo bà ba'],['ethnic','Trang phục dân tộc']].forEach(([id,label])=>{const b=button(label,()=>{group=id;[...filters.children].forEach(btn=>btn.setAttribute('aria-pressed',String(btn===b)));fill();});b.setAttribute('aria-pressed',String(id==='all'));filters.append(b);});const gender=window.clothingQuizGender||'other';body.append(note(gender==='male'?'Đang hiển thị mẫu trang phục nam.':gender==='female'?'Đang hiển thị mẫu trang phục nữ.':'Đang hiển thị tất cả mẫu trang phục.'),filters,list);fill();
  }
  async function generate(){
    const config=window.photoboothConfig;const source=selectedPhoto();
    if(!config?.generationEndpoint){status.textContent='Chưa kết nối API. Ảnh và lựa chọn của bạn vẫn được giữ trong cửa sổ này.';return;}
    if(!source||!outfit||busy)return;
    if(!outfit.imageSrc){status.textContent='Trang phục này chưa có ảnh để tạo ảnh AI.';return;}
    const endpoint=new URL(config.generationEndpoint,location.href);if(endpoint.origin!==location.origin){status.textContent='Kết nối tạo ảnh cần đi qua máy chủ của website.';return;}
    busy=true;render();status.textContent='Đang tạo ảnh trang phục…';
    try{const form=new FormData();form.append('person',source.blob,'person.png');form.append('outfitId',outfit.id);if(outfit.variantId)form.append('outfitVariantId',outfit.variantId);const garmentResponse=await fetch(outfit.imageSrc);if(!garmentResponse.ok)throw Error('Chưa thể tải ảnh trang phục.');const garmentBlob=await garmentResponse.blob();if(!garmentBlob.type.startsWith('image/'))throw Error('Ảnh trang phục không phải là tệp hình ảnh hợp lệ.');form.append('garment',garmentBlob,`${outfit.id}-${outfit.variantId||'reference'}.png`);const response=await fetch(endpoint,{method:'POST',body:form});if(!response.ok){const error=await response.json().catch(()=>({}));throw Error(error.error||error.message||'Không thể tạo ảnh. Hãy thử lại.');}const type=response.headers.get('content-type')||'';if(!type.startsWith('image/'))throw Error('Máy chủ chưa trả về ảnh hợp lệ.');const blob=await response.blob();if(blob.size>20*1024*1024)throw Error('Ảnh trả về quá lớn.');const url=URL.createObjectURL(blob);try{await loadImage(url);}finally{URL.revokeObjectURL(url);}addPhoto(blob,'generated');if(!overlay.hidden)changeStep(4);}
    catch(error){status.textContent=error.message;}finally{busy=false;if(!overlay.hidden&&step===3)render();}
  }
  function adjustmentFor(index){return adjustments[index]||{x:0,y:0,zoom:1};}
  function setAdjustment(index,patch){adjustments[index]={...adjustmentFor(index),...patch};}
  const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
  function imageCrop(img,w,h,adjustment){
    const scale=Math.max(w/img.width,h/img.height)*adjustment.zoom,sw=w/scale,sh=h/scale;
    return {sw,sh,x:(img.width-sw)*(1+adjustment.x)/2,y:(img.height-sh)*(1+adjustment.y)/2};
  }
  function drawCompositionImage(ctx,img,w,h,adjustment){
    const crop=imageCrop(img,w,h,adjustment);
    ctx.clearRect(0,0,w,h);
    ctx.drawImage(img,crop.x,crop.y,crop.sw,crop.sh,0,0,w,h);
  }
  function placePhoto(index,id){placements[index]=id;adjustments[index]={x:0,y:0,zoom:1};activeSlot=null;render();}
  function editSlot(index,slot,canvas,photo,tapOpensPicker=true){
    if(!photo)return;
    loadImage(photo.url).then(img=>{
      if(!canvas.isConnected)return;
      const pointers=new Map();
      const paint=()=>body.querySelectorAll(`[data-slot-index="${index}"] canvas`).forEach(target=>drawCompositionImage(target.getContext('2d'),img,target.width,target.height,adjustmentFor(index)));
      const centerFor=(adjustment,w,h)=>{const crop=imageCrop(img,w,h,adjustment);return {x:crop.x+crop.sw/2,y:crop.y+crop.sh/2,sw:crop.sw,sh:crop.sh};};
      const normalized=(center,span,total)=>span>=total-.001?0:clamp((center-total/2)*2/(total-span),-1,1);
      const point=event=>({x:event.clientX,y:event.clientY});
      const measure=()=>{const items=[...pointers.values()],center={x:items.reduce((sum,p)=>sum+p.x,0)/items.length,y:items.reduce((sum,p)=>sum+p.y,0)/items.length};return {center,distance:items.length>1?Math.hypot(items[0].x-items[1].x,items[0].y-items[1].y):0};};
      let gesture=null,moved=false;
      const begin=()=>{if(!pointers.size)return;const current=measure(),adjustment={...adjustmentFor(index)},crop=centerFor(adjustment,canvas.width,canvas.height),box=slot.getBoundingClientRect();gesture={...current,adjustment,crop,box,anchorX:crop.x-crop.sw/2+(current.center.x-box.left)/box.width*crop.sw,anchorY:crop.y-crop.sh/2+(current.center.y-box.top)/box.height*crop.sh};if(pointers.size>1)moved=true;};
      const apply=(zoom,center,anchorX,anchorY)=>{const box=slot.getBoundingClientRect(),sw=canvas.width/(Math.max(canvas.width/img.width,canvas.height/img.height)*zoom),sh=canvas.height/(Math.max(canvas.width/img.width,canvas.height/img.height)*zoom);const cx=anchorX-((center.x-box.left)/box.width-.5)*sw,cy=anchorY-((center.y-box.top)/box.height-.5)*sh;setAdjustment(index,{zoom,x:normalized(cx,sw,img.width),y:normalized(cy,sh,img.height)});paint();};
      paint();
      slot.addEventListener('pointerdown',event=>{if(event.button!==0&&event.pointerType==='mouse')return;event.preventDefault();slot.setPointerCapture(event.pointerId);if(!pointers.size)moved=false;pointers.set(event.pointerId,point(event));begin();});
      slot.addEventListener('pointermove',event=>{if(!pointers.has(event.pointerId)||!gesture)return;pointers.set(event.pointerId,point(event));const current=measure();if(Math.hypot(current.center.x-gesture.center.x,current.center.y-gesture.center.y)>3||pointers.size>1)moved=true;if(!moved)return;const zoom=clamp(gesture.adjustment.zoom*(gesture.distance?current.distance/gesture.distance:1),1,3);apply(zoom,current.center,gesture.anchorX,gesture.anchorY);});
      const finish=event=>{if(!pointers.has(event.pointerId))return;const wasTap=tapOpensPicker&&!moved&&pointers.size===1&&event.type==='pointerup';pointers.delete(event.pointerId);if(pointers.size)begin();else gesture=null;if(wasTap){activeSlot=index;render();}};
      slot.addEventListener('pointerup',finish);slot.addEventListener('pointercancel',finish);
      slot.addEventListener('wheel',event=>{event.preventDefault();const box=slot.getBoundingClientRect(),current=adjustmentFor(index),crop=centerFor(current,canvas.width,canvas.height),fractionX=(event.clientX-box.left)/box.width,fractionY=(event.clientY-box.top)/box.height;const anchorX=crop.x-crop.sw/2+fractionX*crop.sw,anchorY=crop.y-crop.sh/2+fractionY*crop.sh;apply(clamp(current.zoom*Math.exp(-event.deltaY*.002),1,3),point(event),anchorX,anchorY);},{passive:false});
      slot.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activeSlot=index;render();return;}const current=adjustmentFor(index);if(event.key==='+'||event.key==='='){setAdjustment(index,{zoom:clamp(current.zoom*1.1,1,3)});}else if(event.key==='-'){setAdjustment(index,{zoom:clamp(current.zoom/1.1,1,3)});}else if(event.key.startsWith('Arrow')){const axis=event.key==='ArrowLeft'||event.key==='ArrowRight'?'x':'y',direction=event.key==='ArrowLeft'||event.key==='ArrowUp'?-1:1;setAdjustment(index,{[axis]:clamp(current[axis]+direction*.08,-1,1)});}else return;event.preventDefault();paint();});
    }).catch(()=>{status.textContent='Không thể hiển thị ảnh trong ô. Hãy chọn ảnh khác.';});
  }
  function renderComposition(){
    const layout=el('div','booth-layout'),preview=el('div','booth-frame-preview');preview.style.aspectRatio=`${frame.w}/${frame.h}`;preview.style.background=frame.color;
    frame.slots.forEach((s,i)=>{const slot=el('div','booth-frame-slot');Object.assign(slot.style,{left:s[0]*100+'%',top:s[1]*100+'%',width:s[2]*100+'%',height:s[3]*100+'%'});slot.dataset.slotIndex=i;slot.tabIndex=0;slot.setAttribute('role','button');const p=photos.find(p=>p.id===placements[i]);slot.setAttribute('aria-label',p?`Ô ${i+1}: ${p.name}. Nhấn để chọn ảnh khác; kéo để căn ảnh.`:`Ô ${i+1}: nhấn để chọn ảnh`);if(p){const canvas=el('canvas');canvas.width=Math.round(frame.w*s[2]);canvas.height=Math.round(frame.h*s[3]);slot.append(canvas);editSlot(i,slot,canvas,p);}else{slot.append(el('span','',`Ô ${i+1}`));slot.addEventListener('click',()=>{activeSlot=i;render();});slot.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();activeSlot=i;render();}});}preview.append(slot);});preview.append(el('div','booth-frame-title','VIỆT PHỤC · KỶ NIỆM TRÊN TÀU'));
    const choices=el('div','booth-slot-choices');choices.append(note('Chạm vào ô để chọn ảnh. Kéo ảnh để căn vị trí; cuộn chuột hoặc chụm hai ngón để phóng to, thu nhỏ.'));
    if(activeSlot!==null){const picker=el('section','booth-slot-picker');picker.append(el('h4','',`Chọn ảnh cho ô ${activeSlot+1}`));const current=photos.find(p=>p.id===placements[activeSlot]);if(current){const s=frame.slots[activeSlot],editor=el('div','booth-slot-editor'),canvas=el('canvas');editor.dataset.slotIndex=activeSlot;editor.style.aspectRatio=`${frame.w*s[2]}/${frame.h*s[3]}`;editor.tabIndex=0;editor.setAttribute('role','button');editor.setAttribute('aria-label',`Căn ${current.name}: kéo để di chuyển, cuộn chuột hoặc chụm hai ngón để phóng thu`);canvas.width=Math.round(frame.w*s[2]);canvas.height=Math.round(frame.h*s[3]);editor.append(canvas);picker.append(editor);editSlot(activeSlot,editor,canvas,current,false);}const list=el('div','booth-slot-photo-list');photos.forEach(p=>{const option=button('',()=>placePhoto(activeSlot,p.id),'booth-slot-photo');option.setAttribute('aria-label',`Chọn ${p.name} cho ô ${activeSlot+1}`);option.append(image(p.url,p.name),el('span','',p.name));list.append(option);});picker.append(list);
      const upload=el('label','booth-upload','Tải ảnh mới');const input=el('input');input.type='file';input.accept='image/jpeg,image/png,image/webp';input.setAttribute('aria-label',`Tải ảnh mới cho ô ${activeSlot+1}`);input.addEventListener('change',()=>{const target=activeSlot;importPhotos([...input.files],target);input.value='';});upload.append(input);picker.append(upload);
      if(placements[activeSlot])picker.append(button('Đặt lại vị trí và kích cỡ',()=>{adjustments[activeSlot]={x:0,y:0,zoom:1};render();},'booth-button secondary'),button('Bỏ ảnh khỏi ô',()=>placePhoto(activeSlot,null),'booth-button secondary'));
      picker.append(button('Đóng',()=>{activeSlot=null;render();},'booth-button secondary'));choices.append(picker);
    }
    const frameComplete=frame.slots.every((_,i)=>photos.some(p=>p.id===placements[i]));
    const download=button('Tải frame PNG',exportFrame,'booth-button primary');download.disabled=!frameComplete;
    const continueJourney=button('Đi tiếp: Toa bưu điện →',()=>{close();window.showTrainExperienceIntro?.(2);},'booth-button primary');continueJourney.disabled=!frameComplete;
    choices.append(download,button('Thêm ảnh / chụp lại',()=>changeStep(1)),button('Thử trang phục khác',()=>changeStep(2)),continueJourney);layout.append(preview,choices);body.append(layout);
  }
  async function exportFrame(){
    try{const c=document.createElement('canvas');c.width=frame.w;c.height=frame.h;const ctx=c.getContext('2d');ctx.fillStyle=frame.color;ctx.fillRect(0,0,c.width,c.height);
      for(let i=0;i<frame.slots.length;i++){const p=photos.find(p=>p.id===placements[i]);if(!p)throw Error('Hãy chọn ảnh cho tất cả các ô.');const img=await loadImage(p.url);const [x,y,w,h]=frame.slots[i].map((v,j)=>v*(j%2===0?frame.w:frame.h));const crop=imageCrop(img,w,h,adjustmentFor(i));ctx.drawImage(img,crop.x,crop.y,crop.sw,crop.sh,x,y,w,h);}
      ctx.fillStyle='#354b3e';ctx.textAlign='center';ctx.font=`${Math.round(frame.w*.022)}px Cambria, 'Times New Roman', serif`;ctx.fillText(window.trainI18n?.t('VIỆT PHỤC · KỶ NIỆM TRÊN TÀU') || 'VIỆT PHỤC · KỶ NIỆM TRÊN TÀU',frame.w/2,frame.h*.976);
      const blob=await new Promise(resolve=>c.toBlob(resolve,'image/png'));if(!blob)throw Error('Chưa thể xuất frame.');const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`photobooth-viet-phuc-${frame.id}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);status.textContent='Frame đã sẵn sàng để tải.';
    }catch(error){status.textContent=error.message;}
  }
  function render(){
    stopCamera();
    if(outfit?.variantId&&!window.clothingQuizVisibleVariants(outfit.id,window.clothingQuizGender||'other').some(variant=>variant.id===outfit.variantId)){outfit=null;if(step===3)step=2;}
    body.replaceChildren();steps.replaceChildren();titles.forEach((title,i)=>{const item=el('li','',`${i+1}. ${title}`);if(i===step)item.setAttribute('aria-current','step');steps.append(item);});
    if(step===0){heading('Chọn một khung kỷ niệm','Các frame dưới đây là mẫu giữ chỗ. Frame thiết kế riêng sẽ được bổ sung sau.');const list=el('div','booth-frame-list');frames.forEach(f=>{const card=button('',()=>{if(frame.id!==f.id){placements=[];adjustments=[];activeSlot=null;}frame=f;render();});card.className='booth-frame-option';card.setAttribute('aria-label',`Chọn frame ${f.name}`);card.setAttribute('aria-pressed',String(frame.id===f.id));card.append(miniature(f),el('strong','',f.name),el('span','',f.label));list.append(card);});body.append(list);nav('Tiếp tục →',()=>changeStep(1));}
    if(step===1){heading('Giữ lại một khoảnh khắc','Chọn một ảnh rõ mặt và trang phục hiện tại. Bạn có thể thêm nhiều ảnh để xếp vào frame.');const actions=el('div','booth-source-actions');actions.append(button('Mở camera',startCamera,'booth-button primary'),uploadControl('Tải ảnh lên'));body.append(actions,note('JPG, PNG hoặc WebP · tối đa 12 MB / ảnh · tối đa 12 ảnh. Ảnh được giữ trong phiên này; chỉ gửi để tạo ảnh khi bạn xác nhận.'),el('div','booth-camera'));if(photos.length){body.append(renderPhotos());}nav('Chọn trang phục →',()=>changeStep(2),!selectedPhoto());}
    if(step===2){heading('Một catalogue, nhiều nét đẹp','Chọn mẫu trang phục dựng lại từ ảnh bạn gửi. Một số chi tiết có thể khác ảnh gốc.');renderCatalogue();nav('Xác nhận lựa chọn →',()=>changeStep(3),!outfit);}
    if(step===3){heading('Sẵn sàng cho một diện mạo mới','Ảnh của bạn và mẫu trang phục sẽ được gửi tới dịch vụ tạo ảnh OpenAI khi kết nối đã sẵn sàng và bạn xác nhận.');const summary=el('div','booth-confirmation');const p=selectedPhoto();if(p)summary.append(image(p.url,p.name));const detail=el('div');if(outfit?.imageSrc){const garment=image(outfit.imageSrc,outfit.name);garment.className='booth-selected-garment';detail.append(garment);}detail.append(el('h4','',outfit?.name||''),note(outfit?.description||''),note(`Frame: ${frame.name} · ${frame.slots.length} ô ảnh`));summary.append(detail);body.append(summary);const ready=!!window.photoboothConfig?.generationEndpoint&&!!outfit?.imageSrc;body.append(note(ready?'Tạo một ảnh mỗi lần. Bạn có thể quay lại để thử thêm trang phục.':outfit?.imageSrc?'Đang chờ kết nối API OpenAI. Chưa có ảnh AI nào được tạo.':'Đang chờ API OpenAI và ảnh trang phục thật. Chưa có ảnh AI nào được tạo.'));const create=button(busy?'Đang tạo ảnh…':ready?'Xác nhận và tạo ảnh':outfit?.imageSrc?'Tạo ảnh · Chờ kết nối API':'Tạo ảnh · Chờ ảnh trang phục',generate,'booth-button primary');create.disabled=busy||!ready;body.append(create,button('Thử xếp ảnh gốc vào frame',()=>changeStep(4),'booth-button secondary'));body.append(button('← Quay lại ảnh của bạn',()=>changeStep(1),'booth-button secondary'),button('← Chọn lại trang phục',()=>changeStep(2),'booth-button secondary'));}
    if(step===4){heading('Xếp những khoảnh khắc của bạn','Chọn ảnh cho từng ô, xem trước rồi tải frame về. Những ảnh gốc và ảnh AI được ghi nhãn riêng.');renderComposition();}
  }
  window.openTrainPhotobooth=()=>{if(!window.trainQuizComplete)return;if(overlay.hidden){returnFocus=document.activeElement;inactive=[...journey.children].filter(node=>node!==overlay).map(node=>({node,inert:node.inert}));inactive.forEach(({node})=>node.inert=true);overlay.inert=false;overlay.hidden=false;document.body.classList.add('booth-open');}window.go?.(1);render();overlay.querySelector('.booth-close').focus({preventScroll:true});};
  overlay.querySelector('.booth-close').addEventListener('click',close);
  overlay.addEventListener('click',event=>{if(event.target===overlay)close();});
  document.addEventListener('keydown',event=>{if(overlay.hidden)return;if(event.key==='Escape'){event.preventDefault();event.stopImmediatePropagation();close();return;}if(event.key.startsWith('Arrow'))event.stopImmediatePropagation();if(event.key==='Tab'){const nodes=[...overlay.querySelectorAll('button,input,select,a')].filter(node=>!node.disabled&&node.getClientRects().length),first=nodes[0],last=nodes.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}},true);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopCamera();});
  window.addEventListener('pagehide',stopCamera);
})();
