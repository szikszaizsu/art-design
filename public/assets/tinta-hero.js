// Nyitókép: a tintafelhő lassan hullámzik (SVG-torzítás), a jobb szélén apró kockák válnak le és úsznak el.
(() => {
  const box = document.querySelector('.hv-ink');
  if (!box) return;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const turb = document.getElementById('ink-turb');
  const disp = document.getElementById('ink-disp');
  const cv = box.querySelector('canvas');
  const g = cv.getContext('2d');
  let w = 0, h = 0, dpr = 1;
  const size = () => {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = box.clientWidth; h = box.clientHeight;
    cv.width = w * dpr; cv.height = h * dpr;
  };
  size(); addEventListener('resize', size);
  // a kockák a felhő jobb széléről indulnak (a kép arányaiban megadva)
  const spawn = () => ({
    x: .62 + Math.random() * .2, y: .28 + Math.random() * .5,
    s: .006 + Math.random() * .012, vx: .00025 + Math.random() * .0006, vy: -.0002 + Math.random() * .0003,
    life: 0, max: 160 + Math.random() * 220, dark: Math.random() < .5
  });
  const cubes = Array.from({ length: 70 }, () => { const c = spawn(); c.life = Math.random() * c.max; return c; });
  let mx = .5, my = .5;
  box.addEventListener('pointermove', (e) => { const b = box.getBoundingClientRect(); mx = (e.clientX - b.left) / b.width; my = (e.clientY - b.top) / b.height; });
  const t0 = performance.now();
  const frame = (now) => {
    const t = (now - t0) / 1000;
    // lassú, folyékony hullámzás
    const f = 0.006 + Math.sin(t * .25) * .0015;
    turb.setAttribute('baseFrequency', f.toFixed(5) + ' ' + (f * 1.6).toFixed(5));
    turb.setAttribute('seed', '3');
    disp.setAttribute('scale', (9 + Math.sin(t * .4) * 4 + (mx - .5) * 10).toFixed(2));
    box.style.setProperty('--ink-shift', (Math.sin(t * .3) * 6) + 'px');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.clearRect(0, 0, w, h);
    for (const c of cubes) {
      c.life++;
      c.x += c.vx * (1 + (mx > .6 ? .6 : 0)); c.y += c.vy + Math.sin(t + c.max) * .0002;
      if (c.life > c.max) Object.assign(c, spawn());
      const k = c.life / c.max, a = k < .15 ? k / .15 : 1 - (k - .15) / .85;
      g.globalAlpha = Math.max(0, a) * .9;
      g.fillStyle = c.dark ? '#6e1414' : '#a8262b';
      const s = c.s * w * (1 - k * .4);
      g.fillRect(c.x * w, c.y * h, s, s);
    }
    g.globalAlpha = 1;
    requestAnimationFrame(frame);
  };
  if (!still) requestAnimationFrame(frame);
})();
