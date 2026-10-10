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
    const rotated = mobile && height > width;
    const logicalWidth = rotated ? height : width;
    const logicalHeight = rotated ? width : height;
    root.style.setProperty('--physical-width', `${width}px`);
    root.style.setProperty('--physical-height', `${height}px`);
    root.style.setProperty('--view-width', `${logicalWidth}px`);
    root.style.setProperty('--view-height', `${logicalHeight}px`);
    root.classList.toggle('mobile-landscape', mobile);
    root.classList.toggle('mobile-rotated', rotated);
    window.trainViewport = { mobile, rotated, width: logicalWidth, height: logicalHeight };
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
