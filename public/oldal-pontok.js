// Pontrács a főoldal teljes háttereként (rögzített, görgetéskor is végig ott van): halvány szürke pontok, az egér körül kicsit félrehúzódnak és
// besötétednek, a nyom kb. 1 mp alatt cseng le. Nyugalomban nem rajzol. (A Tervező pontrácsa, színek nélkül.)
(() => {
  const box = document.querySelector('[data-page-dots]');
  if (!box) return;
  const cv = box.querySelector('canvas'), ctx = cv.getContext('2d');
  const GAP = 22, RADIUS = 140, PUSH = 6;
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let dpr, w, h, cols, rows, ox, oy, energy, base, hot, dark = false;
  let mx = -1e4, my = -1e4, raf = 0, last = 0;

  function readTheme() {
    dark = document.documentElement.dataset.theme === 'dark';
    base = dark ? 'rgba(255,255,255,.07)' : '#ebebee';
    hot = dark ? '200,200,206' : '120,120,128';
  }
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2); w = innerWidth; h = innerHeight;
    cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cols = Math.ceil(w / GAP) + 1; rows = Math.ceil(h / GAP) + 1;
    ox = (w - (cols - 1) * GAP) / 2; oy = (h - (rows - 1) * GAP) / 2;
    energy = new Float32Array(cols * rows);
    draw(0);
  }
  function draw(dt) {
    ctx.clearRect(0, 0, w, h);
    const decay = Math.pow(0.04, dt / 1000);
    let busy = false;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
      const k = j * cols + i, x = ox + i * GAP, y = oy + j * GAP;
      const dx = x - mx, dy = y - my, d = Math.hypot(dx, dy);
      let near = d < RADIUS ? 1 - d / RADIUS : 0;
      near = near * near * (3 - 2 * near);
      const e = energy[k] = Math.max(near, energy[k] * decay);
      let px = x, py = y;
      if (near > 0 && d > .01) { px += dx / d * PUSH * near; py += dy / d * PUSH * near; }
      if (e < .01) { ctx.fillStyle = base; ctx.fillRect(px - .9, py - .9, 1.8, 1.8); continue; }
      busy = true;
      const r = .9 + 1.1 * e;
      ctx.fillStyle = `rgba(${hot},${(.18 + .42 * e).toFixed(3)})`;
      ctx.fillRect(px - r, py - r, r * 2, r * 2);
    }
    return busy;
  }
  function loop(t) {
    const dt = last ? Math.min(t - last, 50) : 16; last = t;
    raf = draw(dt) ? requestAnimationFrame(loop) : 0;
    if (!raf) last = 0;
  }
  function kick() { if (!raf && !still && !document.hidden) raf = requestAnimationFrame(loop); }
  function at(e) { mx = e.clientX; my = e.clientY; kick(); }
  addEventListener('pointermove', at, { passive: true });
  addEventListener('pointerdown', at, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => { mx = my = -1e4; kick(); });
  addEventListener('blur', () => { mx = my = -1e4; kick(); });
  addEventListener('resize', size);
  new MutationObserver(() => { readTheme(); draw(0); }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  readTheme(); size();
})();
