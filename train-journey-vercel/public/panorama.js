(() => {
  const viewport = document.querySelector('.panorama-viewport');
  const position = viewport?.querySelector('.panorama-position');
  const strip = viewport?.querySelector('.panorama-strip');
  const images = strip ? Array.from(strip.querySelectorAll('img')) : [];
  if (!viewport || !position || images.length === 0) return;

  const total = document.querySelectorAll('#dots button').length || 10;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let currentIndex = 0;
  let shiftTimer;

  function placePanorama(instant = false) {
    const image = images[0];
    if (!image.naturalWidth || !image.naturalHeight) return;
    const displayedWidth = viewport.clientHeight * image.naturalWidth / image.naturalHeight;
    const distance = Math.max(0, displayedWidth - viewport.clientWidth);
    const progress = total > 1 ? currentIndex / (total - 1) : 0;
    if (instant) position.style.transition = 'none';
    position.style.transform = `translate3d(${-distance * progress}px,0,0)`;
    if (instant) requestAnimationFrame(() => { position.style.transition = ''; });
  }

  function transition(direction) {
    if (reducedMotion.matches) return;
    viewport.dataset.direction = String(direction);
    viewport.classList.remove('is-shifting');
    void viewport.offsetWidth;
    viewport.classList.add('is-shifting');
    clearTimeout(shiftTimer);
    shiftTimer = setTimeout(() => viewport.classList.remove('is-shifting'), 850);
  }

  images[0].addEventListener('load', () => placePanorama(true));
  window.addEventListener('resize', () => placePanorama(true));
  window.addEventListener('train-navigation', event => {
    currentIndex = Math.max(0, Math.min(total - 1, event.detail.index));
    placePanorama();
    transition(event.detail.direction);
  });
  placePanorama(true);
})();
