/* Pixelpin: lassan mozgó, összetartó pont-vonal háttér az oldalak tetején és a láblécben.
   A pontok néhány csoport körül úsznak, a gombok, linkek és mezők mögül pedig ki van vágva. */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const KEEP = 'a, button, input, textarea, select, summary, label';

  const HERO = { cls: 'site-network--hero', area: 17000, min: 22, max: 56, clusters: 4, spread: 130, reach: 150, red: [2.2, 4], grey: [1, 1.9], line: 0.14 };
  const FOOT = { cls: 'site-network--footer', area: 7500, min: 40, max: 96, clusters: 4, spread: 120, reach: 170, red: [3, 5.5], grey: [1.6, 3.2], line: 0.2 };

  function make(host, opt) {
    if (host.querySelector(':scope > canvas.site-network')) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'site-network ' + opt.cls;
    canvas.setAttribute('aria-hidden', 'true');
    // inline layout, so a late stylesheet can never make the canvas push the page around
    canvas.style.cssText = 'position:absolute;display:block;pointer-events:none;z-index:0;' + (opt === HERO
      ? 'top:0;left:50%;width:100vw;height:100%;transform:translateX(-50%);'
      : 'top:0;left:0;width:100%;height:100%;');
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    host.insertBefore(canvas, host.firstChild);
    const ctx = canvas.getContext('2d');
    let w = 0, h = 0, nodes = [], keep = [], raf = 0, last = 0, onScreen = true, resizeTimer = 0, keepTimer = 0;

    function build() {
      const count = Math.max(opt.min, Math.min(opt.max, Math.round((w * h) / opt.area)));
      const centers = [];
      for (let i = 0; i < opt.clusters; i++) {
        centers.push({ x: ((i + 0.5) / opt.clusters) * w + rnd(-0.08, 0.08) * w, y: rnd(0.25, 0.75) * h });
      }
      nodes = [];
      for (let i = 0; i < count; i++) {
        const c = centers[i % centers.length];
        const a = rnd(0, Math.PI * 2), d = Math.sqrt(Math.random()) * opt.spread;
        const hx = c.x + Math.cos(a) * d, hy = c.y + Math.sin(a) * d * 0.7;
        const red = i % 14 === 3;
        nodes.push({
          x: hx, y: hy, hx, hy, vx: rnd(-0.1, 0.1), vy: rnd(-0.1, 0.1),
          r: red ? rnd(opt.red[0], opt.red[1]) : rnd(opt.grey[0], opt.grey[1]), red
        });
      }
    }

    function measureKeep() {
      const cr = canvas.getBoundingClientRect();
      keep = [];
      host.querySelectorAll(KEEP).forEach(el => {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height || r.width > 760 || r.height > 140) return;
        keep.push({ x: r.left - cr.left - 12, y: r.top - cr.top - 10, w: r.width + 24, h: r.height + 20 });
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const first = !w;
      const moved = Math.abs(rect.width - w) > 40 || Math.abs(rect.height - h) > 40;
      w = Math.min(rect.width, 3000); h = Math.min(rect.height, 2400);
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
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--red').trim() || '#c43a3a';

      for (const n of nodes) {
        n.vx += (n.hx - n.x) * 0.0016 * dt + rnd(-0.01, 0.01) * dt;
        n.vy += (n.hy - n.y) * 0.0016 * dt + rnd(-0.01, 0.01) * dt;
        n.vx *= 0.985; n.vy *= 0.985;
        n.x += n.vx * dt; n.y += n.vy * dt;
      }

      ctx.lineWidth = 0.8;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > opt.reach) continue;
          const s = (1 - d / opt.reach) * (a.red || b.red ? opt.line * 1.7 : opt.line);
          ctx.strokeStyle = 'rgba(' + rgb + ',' + s.toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      for (const n of nodes) {
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.red ? accent : 'rgba(' + rgb + ',0.42)';
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

    new IntersectionObserver(entries => { onScreen = entries[0].isIntersecting; if (onScreen) start(); }).observe(canvas);
    document.addEventListener('visibilitychange', start);
    new ResizeObserver(() => { clearTimeout(resizeTimer); resizeTimer = setTimeout(() => { resize(); start(); }, 120); }).observe(host);
    keepTimer = setInterval(measureKeep, 700);
    resize();
    start();
  }

  function init() {
    const hero = document.querySelector('.hv-hero, .detail-hero, .category-hero, .lp-top');
    if (hero) make(hero, HERO);
    const foot = document.querySelector('.portfolio-footer');
    if (foot) make(foot, FOOT);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
