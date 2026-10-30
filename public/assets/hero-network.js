/* Főoldali hero háttér: lassan mozgó pontok és vonalak, néhány piros ponttal. */
(() => {
  const canvas = document.querySelector('.hero-network');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rnd = (a, b) => a + Math.random() * (b - a);
  let w = 0, h = 0, nodes = [], raf = 0, last = 0, onScreen = true, resizeTimer = 0;

  function build() {
    const count = Math.max(24, Math.min(64, Math.round((w * h) / 16000)));
    nodes = [];
    for (let i = 0; i < count; i++) {
      const red = i % 6 === 0;
      nodes.push({
        x: rnd(0, w), y: rnd(0, h),
        vx: rnd(-0.16, 0.16), vy: rnd(-0.16, 0.16),
        r: red ? rnd(2.4, 5) : rnd(1, 1.9), red
      });
    }
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    w = rect.width; h = rect.height;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    draw(0);
  }

  function draw(dt) {
    ctx.clearRect(0, 0, w, h);
    const dark = document.documentElement.dataset.theme === 'dark';
    const rgb = dark ? '255,255,255' : '110,127,141';
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#8f1f1f';
    const reach = Math.max(120, Math.min(180, w / 7));

    for (const n of nodes) {
      n.x += n.vx * dt;
      n.y += n.vy * dt;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
    }

    ctx.lineWidth = 0.7;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d > reach) continue;
        const strength = (1 - d / reach) * (a.red || b.red ? 0.24 : 0.13);
        ctx.strokeStyle = 'rgba(' + rgb + ',' + strength.toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (const n of nodes) {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.red ? accent : 'rgba(' + rgb + ',0.42)';
      ctx.fill();
    }
  }

  function frame(t) {
    raf = 0;
    if (!onScreen || document.hidden) return;
    const dt = last ? Math.min((t - last) / 16.7, 3) : 1;
    last = t;
    draw(dt);
    raf = requestAnimationFrame(frame);
  }

  function start() {
    if (reduce || raf || !onScreen || document.hidden) return;
    last = 0;
    raf = requestAnimationFrame(frame);
  }

  new IntersectionObserver(entries => {
    onScreen = entries[0].isIntersecting;
    if (onScreen) start();
  }).observe(canvas);
  document.addEventListener('visibilitychange', start);
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); start(); }, 120);
  }).observe(canvas);

  resize();
  start();
})();
