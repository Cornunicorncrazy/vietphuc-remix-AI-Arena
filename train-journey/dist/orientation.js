(() => {
  const root = document.documentElement;
  // A narrow window alone never identifies a phone. Touch is required as
  // well as a mobile/tablet browser identity (including iPad desktop mode).
  const ua = navigator.userAgent || '';
  const touch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
  const mobileIdentity = navigator.userAgentData?.mobile === true ||
    /Android|iPhone|iPad|iPod|Windows Phone|Mobile|Tablet|Silk/i.test(ua) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const mobile = touch && mobileIdentity;
  let pending = false;

  function update() {
    pending = false;
    const viewport = window.visualViewport;
    const useVisualViewport = viewport && Math.abs(viewport.scale - 1) < 0.01;
    const width = useVisualViewport ? viewport.width : window.innerWidth;
    const height = useVisualViewport ? viewport.height : window.innerHeight;
    root.style.setProperty('--view-width', `${width}px`);
    root.style.setProperty('--view-height', `${height}px`);
    root.classList.toggle('mobile-landscape', mobile && width > height);
  }

  function scheduleUpdate() {
    if (!pending) {
      pending = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  window.addEventListener('orientationchange', scheduleUpdate, { passive: true });
  window.visualViewport?.addEventListener('resize', scheduleUpdate, { passive: true });
  update();
})();
