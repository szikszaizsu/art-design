/* Pixelpin: lassan mozgó, összetartó pont-vonal háló minden oldalon.
   - PAGE: az egész oldal háttere (rögzített réteg, görgetéskor a háttér áll, a tartalom mozog)
   - FOOT: sűrűbb, nagyobb háló a láblécben
   A gombok, linkek és mezők mögül ki van vágva, így nem megy rájuk. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const KEEP = 'a, button, input, textarea, select, summary, label';

  const PAGE = { fixed: true, area: 3200, min: 70, max: 220, spread: 190, reach: 220, red: [3.6, 7.5], grey: [1.6, 3.2], line: 0.2 };
  const FOOT = { fixed: false, area: 3600, min: 60, max: 160, spread: 160, reach: 200, red: [4, 8.5], grey: [1.8, 3.6], line: 0.24 };

  function make(host, opt) {
    if (host.querySelector(':scope > canvas.site-network')) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'site-network ' + (opt.fixed ? 'site-network--page' : 'site-network--footer');
    canvas.setAttribute('aria-hidden', 'true');
    // inline layout, so a late stylesheet can never make the canvas push the page around
    canvas.style.cssText = opt.fixed
      ? 'position:fixed;display:block;pointer-events:none;z-index:-1;top:0;left:0;width:100%;height:100%;'
      : 'position:absolute;display:block;pointer-events:none;z-index:0;top:0;left:0;width:100%;height:100%;';
    if (!opt.fixed && getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.insertBefore(canvas, host.firstChild);
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, nodes = [], bridges = [], centers = [], keep = [], raf = 0, last = 0, onScreen = true, resizeTimer = 0, scrollQueued = false;

    function build() {
      const count = Math.max(opt.min, Math.min(opt.max, Math.round((w * h) / opt.area)));
      const k = Math.max(6, Math.min(18, Math.round((w * h) / 80000)));
      centers = [];
      // stratified centres: the clusters spread over the whole canvas but stay separate groups
      const cols = Math.ceil(Math.sqrt(k * (w / h))), rows = Math.ceil(k / cols);
      for (let i = 0; i < k; i++) {
        const c = i % cols, r = Math.floor(i / cols);
        centers.push({ x: ((c + rnd(0.25, 0.75)) / cols) * w, y: ((r + rnd(0.25, 0.75)) / rows) * h, size: rnd(0.35, 1.7), vx: rnd(-0.5, 0.5), vy: rnd(-0.5, 0.5) });
      }
      nodes = [];
      for (let i = 0; i < count; i++) {
        const c = centers[i % centers.length];
        const a = rnd(0, Math.PI * 2), d = Math.sqrt(Math.random()) * opt.spread * c.size;
        const hx = c.x + Math.cos(a) * d, hy = c.y + Math.sin(a) * d * 0.75;
        const red = i % 18 === 5;
        nodes.push({
          x: hx, y: hy, hx, hy, ox: hx - c.x, oy: hy - c.y, vx: rnd(-0.3, 0.3), vy: rnd(-0.3, 0.3), c: i % centers.length,
          r: red ? rnd(opt.red[0], opt.red[1]) : rnd(opt.grey[0], opt.grey[1]), red
        });
      }
      // every cluster is tied to its two nearest neighbours, so the groups form one connected web
      bridges = [];
      const seen = new Set();
      centers.forEach((a, ia) => {
        centers.map((b, ib) => ({ ib, d: Math.hypot(a.x - b.x, a.y - b.y) })).filter(o => o.ib !== ia)
          .sort((p, q) => p.d - q.d).slice(0, 2).forEach(o => {
            const key = Math.min(ia, o.ib) + '-' + Math.max(ia, o.ib);
            if (seen.has(key)) return;
            seen.add(key);
            let best = null, bd = 1e9;
            nodes.forEach((n, i) => { if (n.c !== ia) return; nodes.forEach((m, j) => { if (m.c !== o.ib) return; const d = Math.hypot(n.x - m.x, n.y - m.y); if (d < bd) { bd = d; best = [i, j]; } }); });
            if (best) bridges.push(best);
          });
      });
    }

    function measureKeep() {
      const cr = canvas.getBoundingClientRect();
      keep = [];
      host.querySelectorAll(KEEP).forEach(el => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height || r.width > 760 || r.height > 140) return;
        if (r.bottom < cr.top - 40 || r.top > cr.bottom + 40) return;
        keep.push({ x: r.left - cr.left - 12, y: r.top - cr.top - 10, w: r.width + 24, h: r.height + 20 });
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const first = !w;
      const nw = Math.min(rect.width, 3000), nh = Math.min(rect.height, 2400);
      if (!first && Math.abs(nw - w) < 2 && Math.abs(nh - h) < 2) { measureKeep(); return; }
      const moved = Math.abs(nw - w) > 40 || Math.abs(nh - h) > 40;
      w = nw; h = nh;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (first || moved) build();
      measureKeep();
      draw(0);
    }

    function draw(dt) {
      ctx.clearRect(0, 0, w, h);
      const dark = document.documentElement.dataset.theme === 'dark';
      const rgb = dark ? '255,255,255' : '107,107,112';
      const red = getComputedStyle(document.documentElement).getPropertyValue('--red').trim() || '#c43a3a';

      // every web drifts across the whole canvas on its own wandering path
      for (const c of centers) {
        c.vx += rnd(-0.02, 0.02) * dt; c.vy += rnd(-0.02, 0.02) * dt;
        const sp = Math.hypot(c.vx, c.vy);
        if (sp > 0.8) { c.vx *= 0.8 / sp; c.vy *= 0.8 / sp; } else if (sp < 0.25) { c.vx *= 1.1; c.vy *= 1.1; }
        c.x += c.vx * dt; c.y += c.vy * dt;
        if (c.x < 0 || c.x > w) { c.vx = -c.vx; c.x = Math.max(0, Math.min(w, c.x)); }
        if (c.y < 0 || c.y > h) { c.vy = -c.vy; c.y = Math.max(0, Math.min(h, c.y)); }
      }
      for (const n of nodes) {
        const c = centers[n.c]; n.hx = c.x + n.ox; n.hy = c.y + n.oy;
        n.vx += (n.hx - n.x) * 0.0035 * dt + rnd(-0.035, 0.035) * dt;
        n.vy += (n.hy - n.y) * 0.0035 * dt + rnd(-0.035, 0.035) * dt;
        n.vx *= 0.99; n.vy *= 0.99;
        n.x += n.vx * dt; n.y += n.vy * dt;
      }

      ctx.lineWidth = 0.9;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > opt.reach) continue;
          const s = (1 - d / opt.reach) * (a.red || b.red ? opt.line * 1.6 : opt.line);
          ctx.strokeStyle = 'rgba(' + rgb + ',' + s.toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.strokeStyle = 'rgba(' + rgb + ',' + (opt.line * 0.9).toFixed(3) + ')';
      for (const [i, j] of bridges) {
        ctx.beginPath(); ctx.moveTo(nodes[i].x, nodes[i].y); ctx.lineTo(nodes[j].x, nodes[j].y); ctx.stroke();
      }
      for (const n of nodes) {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.red ? red : 'rgba(' + rgb + ',0.5)';
        ctx.fill();
      }

      // nothing is drawn behind buttons, links and fields
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = '#000';
      for (const k of keep) {
        ctx.beginPath();
        if (ctx.roundRect) ctx.roundRect(k.x, k.y, k.w, k.h, 10); else ctx.rect(k.x, k.y, k.w, k.h);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';
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

    if (!opt.fixed) new IntersectionObserver(entries => { onScreen = entries[0].isIntersecting; if (onScreen) start(); }).observe(canvas);
    document.addEventListener('visibilitychange', start);
    if (opt.fixed) {
      window.addEventListener('resize', () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { resize(); start(); }, 120); });
      // the background stays put while the page scrolls, so the cut-outs follow the page content
      window.addEventListener('scroll', () => {
        if (scrollQueued) return;
        scrollQueued = true;
        requestAnimationFrame(() => { scrollQueued = false; measureKeep(); if (reduce) draw(0); });
      }, { passive: true });
    } else {
      new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { resize(); start(); }, 120); }).observe(host);
    }
    setInterval(measureKeep, 600);
    resize();
    start();
  }

  function init() {
    make(document.body, PAGE);
    const foot = document.querySelector('.portfolio-footer');
    if (foot) make(foot, FOOT);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
