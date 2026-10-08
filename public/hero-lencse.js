// Lencse: a főoldali hero fehér lapja alatt egy festmény rejtőzik; az egér bordó keretes lencséje
// előhívja, a nyoma lassan visszagyógyul. Kattintásra a következő festmény jön.
(() => {
  const box = document.querySelector('[data-hero-lens]');
  if (!box) return;
  const hero = box.parentElement;
  const cv = box.querySelector('canvas'), ctx = cv.getContext('2d');
  const ring = box.querySelector('.hv-lens-ring');
  const copy = hero.querySelector('.hv-hero-copy');
  const mask = document.createElement('canvas'), mctx = mask.getContext('2d');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SRC = ['together-6', 'stone-4', 'stone-22', 'together-5', 'stone-9', 'stone-2', 'together-7', 'stone-3', 'together-4']
    .map(n => `/assets/digital-gallery/${n}.webp`);
  const imgs = [];
  const load = i => imgs[i] || (imgs[i] = Object.assign(new Image(), { src: SRC[i], decoding: 'async' }));
  let art = 0; load(0); load(1);

  const ptr = { x: 0, y: 0, on: false, last: -1e9 };
  const setPtr = e => {
    const r = box.getBoundingClientRect();
    ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = true; ptr.last = performance.now();
  };
  hero.addEventListener('pointermove', setPtr);
  hero.addEventListener('pointerdown', setPtr);
  hero.addEventListener('pointerleave', () => { ptr.on = false; });
  hero.addEventListener('click', e => {
    if (e.target.closest('a')) return;
    art = (art + 1) % SRC.length; load(art); load((art + 1) % SRC.length);
  });

  let W = 0, H = 0, dpr = 1, R = 130, lx = 0, ly = 0;
  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = box.clientWidth; H = box.clientHeight;
    cv.width = mask.width = Math.round(W * dpr); cv.height = mask.height = Math.round(H * dpr);
    R = Math.max(40, Math.min(80, W * .055));
    ring.style.setProperty('--d', R * 2 + 'px');
    lx = W * .9; ly = H / 2;
  }
  function cover(img) {
    const s = Math.max(W / img.naturalWidth, H / img.naturalHeight) * dpr;
    const w = img.naturalWidth * s, h = img.naturalHeight * s;
    return [(cv.width - w) / 2, (cv.height - h) / 2, w, h];
  }

  const t0 = performance.now();
  function frame(now) {
    const t = (now - t0) / 1000;
    const idle = !ptr.on || now - ptr.last > 2200;
    if (idle && reduce) { ring.style.opacity = 0; ctx.clearRect(0, 0, cv.width, cv.height); mctx.clearRect(0, 0, mask.width, mask.height); return; }
    const tx = idle ? W / 2 + W * .4 * Math.cos(t * .5) : ptr.x;
    const ty = idle ? H / 2 + H * .36 * Math.sin(t * .5) : ptr.y;
    lx += (tx - lx) * .14; ly += (ty - ly) * .14;
    ring.style.transform = `translate(${lx}px, ${ly}px)`;
    ring.style.opacity = 1;

    // maszk: lassan visszagyógyul, a lencse nyomot hagy
    mctx.globalCompositeOperation = 'destination-out';
    mctx.fillStyle = 'rgba(0,0,0,.06)';
    mctx.fillRect(0, 0, mask.width, mask.height);
    mctx.globalCompositeOperation = 'source-over';
    const g = mctx.createRadialGradient(lx * dpr, ly * dpr, 0, lx * dpr, ly * dpr, R * dpr);
    g.addColorStop(0, '#000'); g.addColorStop(.94, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
    mctx.fillStyle = g; mctx.beginPath(); mctx.arc(lx * dpr, ly * dpr, R * dpr, 0, 7); mctx.fill();

    // a szöveg mögött a festmény csak halványan dereng
    const cb = copy.getBoundingClientRect(), bb = box.getBoundingClientRect();
    const cx = (cb.left - bb.left + cb.width / 2) * dpr, cy = (cb.top - bb.top + cb.height / 2) * dpr, pr = cb.width * .62 * dpr;
    mctx.save(); mctx.translate(cx, cy); mctx.scale(1, cb.height / cb.width);
    const pg = mctx.createRadialGradient(0, 0, 0, 0, 0, pr);
    pg.addColorStop(0, 'rgba(0,0,0,.9)'); pg.addColorStop(.7, 'rgba(0,0,0,.85)'); pg.addColorStop(1, 'rgba(0,0,0,0)');
    mctx.globalCompositeOperation = 'destination-out'; mctx.fillStyle = pg;
    mctx.beginPath(); mctx.arc(0, 0, pr, 0, 7); mctx.fill();
    mctx.restore(); mctx.globalCompositeOperation = 'source-over';

    ctx.clearRect(0, 0, cv.width, cv.height);
    const img = imgs[art];
    if (img && img.complete && img.naturalWidth) {
      ctx.drawImage(mask, 0, 0);
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(img, ...cover(img));
      ctx.globalCompositeOperation = 'source-over';
    }
  }

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);
  addEventListener('resize', size); size();
  (function loop(now) { if (visible) frame(now); requestAnimationFrame(loop); })(performance.now());
})();
