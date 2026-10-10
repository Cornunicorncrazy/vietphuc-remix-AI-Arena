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
  let step=0,frame=frames[0],photos=[],outfit=null,sourceId=null,placements=[],stream=null,cameraToken=0,returnFocus,inactive=[],busy=false;
  let backgroundMode='color',backgroundColor='#e9dfcf',backgroundImageUrl=null,backgroundBusy=false,segmenterPromise=null;
  const titles=['Frame','Ảnh của bạn','Trang phục','Tạo ảnh','Xếp ảnh'];
  const el=(tag,cls,text)=>{const node=document.createElement(tag); if(cls)node.className=cls;if(text!==undefined)node.textContent=text;return node;};
  const button=(text,fn,cls='booth-button')=>{const node=el('button',cls,text);node.type='button';node.addEventListener('click',fn);return node;};
  const note=text=>el('p','booth-note',text);
  function stopCamera(){cameraToken++;stream?.getTracks().forEach(track=>track.stop());stream=null;}
  function close(){stopCamera();overlay.hidden=true;document.body.classList.remove('booth-open');inactive.forEach(({node,inert})=>node.inert=inert);returnFocus?.focus({preventScroll:true});}
  function changeStep(n){stopCamera();step=n;status.textContent='';render();overlay.querySelector('.booth-card').scrollTop=0;body.querySelector('h3')?.focus({preventScroll:true});}
  function heading(title,description){const h=el('h3','',title);h.tabIndex=-1;body.append(h,note(description));}
  function nav(nextText,nextFn,disabled=false){const row=el('div','booth-actions');if(step>0)row.append(button('← Quay lại',()=>changeStep(step-1),'booth-button secondary'));const next=button(nextText,nextFn,'booth-button primary');next.disabled=disabled;row.append(next);body.append(row);}
  function miniature(f){const p=el('div','booth-mini-frame');p.style.aspectRatio=`${f.w}/${f.h}`;p.style.background=f.color;f.slots.forEach((s,i)=>{const slot=el('span','',String(i+1));Object.assign(slot.style,{left:s[0]*100+'%',top:s[1]*100+'%',width:s[2]*100+'%',height:s[3]*100+'%'});p.append(slot);});return p;}
  function image(url,alt){const img=el('img');img.src=url;img.alt=alt;return img;}
  function selectedPhoto(){return photos.find(p=>p.id===sourceId);}
  function addPhoto(blob,kind='original'){
    if(photos.length>=12){status.textContent='Bộ ảnh đã có 12 ảnh. Hãy xóa bớt ảnh trước khi thêm.';return;}
    const name=kind==='generated'?'Ảnh trang phục đã tạo':kind==='background'?`Ảnh đã đổi nền ${photos.filter(p=>p.kind==='background').length+1}`:`Ảnh gốc ${photos.filter(p=>p.kind==='original').length+1}`;
    const p={id:crypto.randomUUID(),url:URL.createObjectURL(blob),blob,kind,name};photos.push(p);sourceId=p.id;return p;
  }
  async function loadImage(url){const img=new Image();img.src=url;await img.decode();return img;}
  async function importPhotos(files){
    const errors=[];for(const file of files){
      if(photos.length>=12){errors.push('Tối đa 12 ảnh trong một bộ.');break;}
      if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>12*1024*1024){errors.push('Chỉ nhận JPG, PNG, WebP tối đa 12 MB mỗi ảnh.');continue;}
      const url=URL.createObjectURL(file);
      try{const img=await loadImage(url);if(img.width*img.height>50000000)throw Error('Ảnh quá lớn.');const scale=Math.min(1,1600/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.round(img.width*scale);c.height=Math.round(img.height*scale);c.getContext('2d').drawImage(img,0,0,c.width,c.height);const blob=await new Promise(resolve=>c.toBlob(resolve,'image/png'));if(!blob)throw Error('Không đọc được ảnh.');addPhoto(blob);}
      catch(_){errors.push('Không thể đọc một ảnh. Hãy thử ảnh khác.');}finally{URL.revokeObjectURL(url);}
    }
    if(!overlay.hidden&&step===1)render();status.textContent=errors.join(' ');
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
    const list=el('div','booth-photo-list');photos.forEach(p=>{const card=el('div','booth-photo-card');const choose=button('',()=>{sourceId=p.id;render();});choose.setAttribute('aria-label',`Dùng ${p.name} để thử trang phục`);choose.setAttribute('aria-pressed',String(p.id===sourceId));choose.append(image(p.url,p.name),el('span','',p.name));const remove=button('×',()=>{URL.revokeObjectURL(p.url);photos=photos.filter(item=>item!==p);placements=placements.map(id=>id===p.id?null:id);if(sourceId===p.id)sourceId=photos[0]?.id||null;render();});remove.setAttribute('aria-label',`Xóa ${p.name}`);card.append(choose);if(p.kind==='background'){const download=el('a','booth-photo-download','Tải ảnh đã đổi nền');download.href=p.url;download.download=`viet-phuc-doi-nen-${p.id.slice(0,8)}.png`;card.append(download);}card.append(remove);list.append(card);});return list;
  }
  async function getSegmenter(){
    if(!segmenterPromise)segmenterPromise=(async()=>{
      const version='1.1.0';
      const module=await import(`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${version}/vision_bundle.mjs`);
      const vision=module.default?.ImageSegmenter?module.default:module;
      const fileset=await vision.FilesetResolver.forVisionTasks(`https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@${version}/wasm`);
      return vision.ImageSegmenter.createFromOptions(fileset,{
        baseOptions:{modelAssetPath:'https://storage.googleapis.com/mediapipe-models/image_segmenter/selfie_segmenter/float16/1/selfie_segmenter.tflite',delegate:'CPU'},
        runningMode:'IMAGE',outputCategoryMask:false,outputConfidenceMasks:true
      });
    })().catch(error=>{segmenterPromise=null;throw error;});
    return segmenterPromise;
  }
  async function importBackground(file){
    if(!file)return;
    if(!['image/jpeg','image/png','image/webp'].includes(file.type)||file.size>12*1024*1024){status.textContent='Ảnh nền phải là JPG, PNG hoặc WebP tối đa 12 MB.';return;}
    const url=URL.createObjectURL(file);
    try{const img=await loadImage(url);if(img.width*img.height>50000000)throw Error('Ảnh nền quá lớn.');if(backgroundImageUrl)URL.revokeObjectURL(backgroundImageUrl);backgroundImageUrl=url;backgroundMode='photo';if(!overlay.hidden&&step===1)render();status.textContent='Đã chọn ảnh nền. Nhấn “Tạo ảnh nền mới” để áp dụng.';}
    catch(error){URL.revokeObjectURL(url);status.textContent=error.message==='Ảnh nền quá lớn.'?error.message:'Không đọc được ảnh nền. Hãy chọn ảnh khác.';}
  }
  function renderBackgroundEditor(){
    const source=selectedPhoto();if(!source)return;
    const editor=el('section','booth-background-editor');editor.append(el('h4','','Đổi nền ảnh'),note('Chọn màu hoặc tải ảnh nền, sau đó tạo bản ảnh mới. Ảnh gốc vẫn được giữ lại; ảnh được xử lý ngay trên thiết bị của bạn.'));
    const choices=el('div','booth-background-choices');
    const colorChoice=el('label','booth-background-color');const colorRadio=el('input');colorRadio.type='radio';colorRadio.name='booth-background-mode';colorRadio.checked=backgroundMode==='color';colorRadio.disabled=backgroundBusy;colorRadio.addEventListener('change',()=>{backgroundMode='color';});
    const colorInput=el('input');colorInput.type='color';colorInput.value=backgroundColor;colorInput.disabled=backgroundBusy;colorInput.setAttribute('aria-label','Chọn màu nền');colorInput.addEventListener('input',()=>{backgroundColor=colorInput.value;backgroundMode='color';colorRadio.checked=true;});colorChoice.append(colorRadio,el('span','','Màu nền'),colorInput);choices.append(colorChoice);
    const photoChoice=el('label','booth-upload booth-background-upload','Tải ảnh nền');const photoInput=el('input');photoInput.type='file';photoInput.accept='image/jpeg,image/png,image/webp';photoInput.disabled=backgroundBusy;photoInput.setAttribute('aria-label','Tải ảnh nền');photoInput.addEventListener('change',()=>{importBackground(photoInput.files[0]);photoInput.value='';});photoChoice.append(photoInput);choices.append(photoChoice);
    if(backgroundImageUrl){const usePhoto=button('Dùng ảnh nền đã tải',()=>{backgroundMode='photo';render();},'booth-button secondary');usePhoto.disabled=backgroundBusy;usePhoto.setAttribute('aria-pressed',String(backgroundMode==='photo'));choices.append(usePhoto);const thumb=image(backgroundImageUrl,'Ảnh nền đã tải');thumb.className='booth-background-thumb';choices.append(thumb);}
    editor.append(choices);const apply=button(backgroundBusy?'Đang đổi nền…':'Tạo ảnh nền mới',applyBackground,'booth-button primary');apply.disabled=backgroundBusy||photos.length>=12;editor.append(apply);if(photos.length>=12)editor.append(note('Bộ ảnh đã có 12 ảnh. Hãy xóa bớt một ảnh trước khi đổi nền.'));body.append(editor);
  }
  async function applyBackground(){
    const source=selectedPhoto();if(!source||backgroundBusy||photos.length>=12)return;
    if(backgroundMode==='photo'&&!backgroundImageUrl){status.textContent='Hãy tải một ảnh nền trước.';return;}
    const mode=backgroundMode,color=backgroundColor,backgroundUrl=backgroundImageUrl;
    backgroundBusy=true;render();status.textContent='Đang tải MediaPipe và tách người khỏi nền…';
    let result;
    try{
      const [segmenter,img,bg]=await Promise.all([getSegmenter(),loadImage(source.url),mode==='photo'?loadImage(backgroundUrl):Promise.resolve(null)]);
      await new Promise(resolve=>requestAnimationFrame(resolve));
      result=segmenter.segment(img);
      const mask=result.confidenceMasks?.[1];if(!mask)throw Error('MediaPipe chưa tìm được vùng người trong ảnh.');
      const confidence=mask.getAsFloat32Array(),maskCanvas=document.createElement('canvas');maskCanvas.width=mask.width;maskCanvas.height=mask.height;
      const maskContext=maskCanvas.getContext('2d'),pixels=maskContext.createImageData(mask.width,mask.height);
      let personPixels=0;for(let i=0;i<confidence.length;i++){if(confidence[i]>.5)personPixels++;pixels.data[i*4+3]=Math.round(Math.max(0,Math.min(1,(confidence[i]-.08)/.84))*255);}
      if(personPixels<confidence.length*.001)throw Error('MediaPipe chưa tìm được vùng người trong ảnh.');
      maskContext.putImageData(pixels,0,0);
      const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;
      const ctx=c.getContext('2d');if(mode==='color'){ctx.fillStyle=color;ctx.fillRect(0,0,c.width,c.height);}else{const scale=Math.max(c.width/bg.naturalWidth,c.height/bg.naturalHeight);const w=bg.naturalWidth*scale,h=bg.naturalHeight*scale;ctx.drawImage(bg,(c.width-w)/2,(c.height-h)/2,w,h);}
      const foreground=document.createElement('canvas');foreground.width=c.width;foreground.height=c.height;const fg=foreground.getContext('2d');fg.drawImage(img,0,0);fg.globalCompositeOperation='destination-in';fg.imageSmoothingEnabled=true;fg.imageSmoothingQuality='high';fg.drawImage(maskCanvas,0,0,c.width,c.height);ctx.drawImage(foreground,0,0);
      const blob=await new Promise(resolve=>c.toBlob(resolve,'image/png'));if(!blob)throw Error('Không thể tạo ảnh đã đổi nền.');
      if(!photos.some(p=>p.id===source.id))throw Error('Ảnh gốc đã bị xóa. Hãy chọn ảnh khác.');
      addPhoto(blob,'background');status.textContent='Đã tạo ảnh nền mới. Ảnh gốc vẫn còn trong bộ ảnh.';
    }catch(error){status.textContent=error.message?.startsWith('MediaPipe')||error.message?.startsWith('Không thể')||error.message?.startsWith('Ảnh gốc')?error.message:'Không tải hoặc xử lý được MediaPipe. Hãy kiểm tra kết nối rồi thử lại.';}
    finally{result?.confidenceMasks?.forEach(mask=>mask.close?.());result?.categoryMask?.close?.();backgroundBusy=false;if(!overlay.hidden&&step===1)render();}
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
    try{const form=new FormData();form.append('person',source.blob,'person.png');form.append('outfitId',outfit.id);if(outfit.variantId)form.append('outfitVariantId',outfit.variantId);const garmentResponse=await fetch(outfit.imageSrc);if(!garmentResponse.ok)throw Error('Chưa thể tải ảnh trang phục.');form.append('garment',await garmentResponse.blob(),`${outfit.id}-${outfit.variantId}.png`);const response=await fetch(endpoint,{method:'POST',body:form});if(!response.ok){const error=await response.json().catch(()=>({}));throw Error(error.message||'Không thể tạo ảnh. Hãy thử lại.');}const type=response.headers.get('content-type')||'';if(!type.startsWith('image/'))throw Error('Máy chủ chưa trả về ảnh hợp lệ.');const blob=await response.blob();if(blob.size>20*1024*1024)throw Error('Ảnh trả về quá lớn.');const url=URL.createObjectURL(blob);try{await loadImage(url);}finally{URL.revokeObjectURL(url);}addPhoto(blob,'generated');if(!overlay.hidden)changeStep(4);}
    catch(error){status.textContent=error.message;}finally{busy=false;if(!overlay.hidden&&step===3)render();}
  }
  function renderComposition(){
    const layout=el('div','booth-layout'),preview=el('div','booth-frame-preview');preview.style.aspectRatio=`${frame.w}/${frame.h}`;preview.style.background=frame.color;
    frame.slots.forEach((s,i)=>{const slot=el('div','booth-frame-slot');Object.assign(slot.style,{left:s[0]*100+'%',top:s[1]*100+'%',width:s[2]*100+'%',height:s[3]*100+'%'});const p=photos.find(p=>p.id===placements[i]);if(p)slot.append(image(p.url,p.name));else slot.append(el('span','',`Ô ${i+1}`));preview.append(slot);});preview.append(el('div','booth-frame-title','VIỆT PHỤC · KỶ NIỆM TRÊN TÀU'));
    const choices=el('div','booth-slot-choices');frame.slots.forEach((_,i)=>{const label=el('label','',`Ảnh cho ô ${i+1}`),select=el('select');select.setAttribute('aria-label',`Ảnh cho ô ${i+1}`);select.append(new Option('Chọn ảnh…',''));photos.forEach(p=>select.append(new Option(p.name,p.id)));select.value=placements[i]||'';select.addEventListener('change',()=>{placements[i]=select.value||null;render();});label.append(select);choices.append(label);});choices.append(note('Mỗi ô có thể dùng một ảnh khác nhau hoặc lặp lại cùng ảnh. Ảnh được căn giữa và cắt theo ô.'));
    const frameComplete=frame.slots.every((_,i)=>photos.some(p=>p.id===placements[i]));
    const download=button('Tải frame PNG',exportFrame,'booth-button primary');download.disabled=!frameComplete;
    const continueJourney=button('Đi tiếp: Toa bưu điện →',()=>{close();window.showTrainExperienceIntro?.(2);},'booth-button primary');continueJourney.disabled=!frameComplete;
    choices.append(download,button('Thêm ảnh / chụp lại',()=>changeStep(1)),button('Thử trang phục khác',()=>changeStep(2)),continueJourney);layout.append(preview,choices);body.append(layout);
  }
  async function exportFrame(){
    try{const c=document.createElement('canvas');c.width=frame.w;c.height=frame.h;const ctx=c.getContext('2d');ctx.fillStyle=frame.color;ctx.fillRect(0,0,c.width,c.height);
      for(let i=0;i<frame.slots.length;i++){const p=photos.find(p=>p.id===placements[i]);if(!p)throw Error('Hãy chọn ảnh cho tất cả các ô.');const img=await loadImage(p.url);const [x,y,w,h]=frame.slots[i].map((v,j)=>v*(j%2===0?frame.w:frame.h));const scale=Math.max(w/img.width,h/img.height);const sw=w/scale,sh=h/scale;ctx.drawImage(img,(img.width-sw)/2,(img.height-sh)/2,sw,sh,x,y,w,h);}
      ctx.fillStyle='#354b3e';ctx.textAlign='center';ctx.font=`${Math.round(frame.w*.022)}px Georgia`;ctx.fillText(window.trainI18n?.t('VIỆT PHỤC · KỶ NIỆM TRÊN TÀU') || 'VIỆT PHỤC · KỶ NIỆM TRÊN TÀU',frame.w/2,frame.h*.976);
      const blob=await new Promise(resolve=>c.toBlob(resolve,'image/png'));if(!blob)throw Error('Chưa thể xuất frame.');const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`photobooth-viet-phuc-${frame.id}.png`;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);status.textContent='Frame đã sẵn sàng để tải.';
    }catch(error){status.textContent=error.message;}
  }
  function render(){
    stopCamera();
    if(outfit?.variantId&&!window.clothingQuizVisibleVariants(outfit.id,window.clothingQuizGender||'other').some(variant=>variant.id===outfit.variantId)){outfit=null;if(step===3)step=2;}
    body.replaceChildren();steps.replaceChildren();titles.forEach((title,i)=>{const item=el('li','',`${i+1}. ${title}`);if(i===step)item.setAttribute('aria-current','step');steps.append(item);});
    if(step===0){heading('Chọn một khung kỷ niệm','Các frame dưới đây là mẫu giữ chỗ. Frame thiết kế riêng sẽ được bổ sung sau.');const list=el('div','booth-frame-list');frames.forEach(f=>{const card=button('',()=>{if(frame.id!==f.id)placements=[];frame=f;render();});card.className='booth-frame-option';card.setAttribute('aria-label',`Chọn frame ${f.name}`);card.setAttribute('aria-pressed',String(frame.id===f.id));card.append(miniature(f),el('strong','',f.name),el('span','',f.label));list.append(card);});body.append(list);nav('Tiếp tục →',()=>changeStep(1));}
    if(step===1){heading('Giữ lại một khoảnh khắc','Chọn một ảnh rõ mặt và trang phục hiện tại. Bạn có thể thêm nhiều ảnh để xếp vào frame.');const actions=el('div','booth-source-actions');actions.append(button('Mở camera',startCamera,'booth-button primary'),uploadControl('Tải ảnh lên'));body.append(actions,note('JPG, PNG hoặc WebP · tối đa 12 MB / ảnh · tối đa 12 ảnh. Ảnh được giữ trong phiên này; chỉ gửi để tạo ảnh khi bạn xác nhận.'),el('div','booth-camera'));if(photos.length){body.append(renderPhotos());renderBackgroundEditor();}nav('Chọn trang phục →',()=>changeStep(2),!selectedPhoto());}
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
