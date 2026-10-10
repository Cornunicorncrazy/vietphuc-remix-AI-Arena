// Add moving spokes to the existing railway wheels without changing each carriage's artwork.
// The SVG for every carriage uses concentric circles inside a translated wheel group.
(() => {
  const svg = document.querySelector('#train-track svg');
  if (!svg) return;

  const ns = 'http://www.w3.org/2000/svg';
  const wheelGroups = [...svg.querySelectorAll('g')].filter(group => {
    const circles = [...group.children].filter(child => child.localName === 'circle');
    if (circles.length < 3) return false;
    const radius = Number(circles[0].getAttribute('r'));
    return radius >= 21 && radius <= 25;
  });
  const locomotive = [...svg.querySelectorAll('[data-car-name]')].at(-1);

  wheelGroups.forEach(group => {
    const circles = [...group.children].filter(child => child.localName === 'circle');
    const radius = Number(circles[0].getAttribute('r'));
    const outer = radius * .70;
    const inner = radius * .34;
    const rotor = document.createElementNS(ns, 'g');
    rotor.setAttribute('class', 'wheel-rotor');
    rotor.setAttribute('aria-hidden', 'true');

    // Six short radial marks give the wheel a readable sense of rotation at scene scale.
    for (let spoke = 0; spoke < 6; spoke++) {
      const angle = spoke * Math.PI / 3;
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', (Math.cos(angle) * inner).toFixed(2));
      line.setAttribute('y1', (Math.sin(angle) * inner).toFixed(2));
      line.setAttribute('x2', (Math.cos(angle) * outer).toFixed(2));
      line.setAttribute('y2', (Math.sin(angle) * outer).toFixed(2));
      line.setAttribute('stroke', spoke === 0 ? '#e6ca83' : '#c7cfc5');
      line.setAttribute('stroke-width', spoke === 0 ? '3.4' : '2.3');
      line.setAttribute('stroke-linecap', 'round');
      rotor.append(line);
    }
    const hub = document.createElementNS(ns, 'circle');
    hub.setAttribute('r', '3.5');
    hub.setAttribute('fill', '#5d6861');
    hub.setAttribute('stroke', '#c1c5ae');
    hub.setAttribute('stroke-width', '1');
    rotor.append(hub);
    group.append(rotor);

    // The locomotive SVG is mirrored to face right, so reverse its local rotation.
    const carriage = group.closest('[data-car-name]');
    if (carriage === locomotive) {
      rotor.classList.add('wheel-rotor--mirrored');
    }
  });
})();
