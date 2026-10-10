(() => {
  const scene = document.querySelector('.scene');
  const train = document.querySelector('#train-track');
  if (!scene || !train || scene.querySelector('.motion-streaks')) return;

  const streaks = document.createElement('div');
  streaks.className = 'motion-streaks';
  streaks.setAttribute('aria-hidden', 'true');
  // Deliberately varied positions keep the motion airy rather than a solid band.
  const lines = [
    [3, 22, 2, 3.6, -1.2], [5, 14, 2, 4.8, -3.1],
    [7, 29, 3, 4.1, -.7], [9, 17, 2, 3.8, -2.8],
    [11, 26, 2, 5.1, -1.6], [13, 12, 3, 4.3, -3.5],
    [6, 23, 2, 3.5, -.3], [10, 18, 2, 4.6, -2.2],
    [14, 31, 3, 4.2, -1.8], [16, 15, 2, 3.7, -3.2],
    [18, 25, 2, 5, -1.1], [20, 19, 3, 4.4, -2.6],
    [4, 26, 2, 4.7, -2.4], [6, 19, 2, 3.9, -.9],
    [8, 34, 2, 5.2, -3.7], [10, 21, 3, 4.5, -1.7],
    [12, 28, 2, 3.7, -2.9], [13, 16, 2, 4.9, -.4],
  ];
  lines.forEach(([top, length, height, time, delay], index) => {
    const line = document.createElement('i');
    line.className = 'motion-streak';
    line.style.setProperty('--streak-top', `${top}%`);
    line.style.setProperty('--streak-length', `${length}%`);
    line.style.setProperty('--streak-height', `${height}px`);
    line.style.setProperty('--streak-time', `${time}s`);
    line.style.setProperty('--streak-delay', `${delay}s`);
    line.style.setProperty('--streak-color', index % 3 === 0 ? '#819282b0' : '#4f7666bd');
    streaks.appendChild(line);
  });
  scene.insertBefore(streaks, train);

  let shiftTimer;
  window.addEventListener('train-navigation', event => {
    streaks.dataset.direction = '-1';
    streaks.classList.add('is-shifting');
    clearTimeout(shiftTimer);
    shiftTimer = setTimeout(() => {
      streaks.classList.remove('is-shifting');
      streaks.dataset.direction = '-1';
    }, 1000);
  });
})();

