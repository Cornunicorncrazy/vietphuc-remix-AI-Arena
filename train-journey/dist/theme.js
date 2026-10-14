(() => {
  const root=document.documentElement;
  let theme='light';
  try{theme=localStorage.getItem('train-theme')==='dark'?'dark':'light';}catch(_){}
  root.dataset.theme=theme;
  document.addEventListener('DOMContentLoaded',()=>{
    const button=document.createElement('button');button.type='button';button.className='theme-toggle';button.dataset.noTranslate='';
    button.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><g class="theme-sun"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/></g><path class="theme-moon" d="M20 15.2A9 9 0 0 1 8.8 4a9 9 0 1 0 11.2 11.2Z"/></svg>';
    function label(){const en=root.lang==='en';button.setAttribute('aria-label',theme==='dark'?(en?'Switch to light mode':'Chuyển sang chế độ sáng'):(en?'Switch to dark mode':'Chuyển sang chế độ tối'));button.title=button.getAttribute('aria-label');button.setAttribute('aria-pressed',String(theme==='dark'));}
    button.addEventListener('click',()=>{theme=theme==='dark'?'light':'dark';root.dataset.theme=theme;try{localStorage.setItem('train-theme',theme);}catch(_){}label();});
    window.addEventListener('train-language-changed',label);
    const mount=document.getElementById('site-controls')||document.body;
    mount.append(button);
    label();
  });
})();
