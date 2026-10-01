// Forest tile: a square, endlessly moving pixel landscape in pale greys (the footer's mountains and
// spruce forest). On first view it builds itself (ridges rise, spruces drop in row by row), then the
// whole scene glides sideways in parallax layers: far domes slowly, the forest fastest, mist and
// clouds drifting along. Runs only while the tile is on screen; static finished frame with
// prefers-reduced-motion. #scene=N in the URL freezes every tile at N ms (screenshots).
// Markup: <div class="forest-tile" data-forest-tile aria-hidden="true"><canvas></canvas></div>
(() => {
  const tiles = document.querySelectorAll("[data-forest-tile]");
  if (!tiles.length) return;
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const freeze = /scene=(\d+)/.exec(location.hash);

  // ---------- palette: pale greys on white ----------
  const G = { w0: "#ffffff", g0: "#f3f3f5", g1: "#ececef", g2: "#e1e1e5", g3: "#d4d4d9", g4: "#c6c6cc", g5: "#b7b7be" };
  const MIST = "rgba(255,255,255,0.75)";
  const GHOST = "rgba(23,19,16,0.1)";

  // ---------- deterministic noise (same landscape every visit, endless in x) ----------
  const hash = (a, b = 0) => {
    let h = Math.imul(a ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(b + 0x632be5ab, 0xc2b2ae35);
    h ^= h >>> 15; h = Math.imul(h, 0x2c1b3c6d); h ^= h >>> 12;
    return (h >>> 0) / 4294967296;
  };
  const mod = (a, n) => ((a % n) + n) % n;
  const N = 72;              // the tile is N × N cells
  const P = 150;             // the far domes repeat every P cells
  const PEAK = 40;           // the cross stands on this dome
  const dome = (x, c, w) => { const d = Math.min(Math.abs(mod(x, P) - c), P - Math.abs(mod(x, P) - c)); return Math.exp(-((d / w) ** 2)); };
  const farH = (x) => Math.round(18 + 24 * dome(x, PEAK, 22) + 11 * dome(x, 108, 17) + Math.sin(x / 5));
  const midH = (x) => Math.round(15 + 4 * Math.sin(x / 17) + 2.5 * Math.sin(x / 7.3));
  const nearH = (x) => Math.round(8 + 2.5 * Math.sin(x / 13 + 2) + 1.2 * Math.sin(x / 5));
  // little spruce spikes along a ridge line: each source column throws a small triangle
  const spikes = (x, chance, seed) => {
    let best = 0;
    for (let j = -2; j <= 2; j++) {
      if (hash(x + j, seed) < chance) best = Math.max(best, 2 + Math.floor(hash(x + j, seed + 1) * 4) - 3 * Math.abs(j));
    }
    return best;
  };

  // spruce layers: slot = spacing, speed = cells per second once gliding
  const LAYERS = [
    { slot: 6, jit: 3, hMin: 8, hMax: 14, speed: 2.4, seed: 11, delay: 1300, colors: [G.g3, G.g2, G.g2, G.g4] },
    { slot: 8, jit: 4, hMin: 14, hMax: 30, speed: 3.4, seed: 23, delay: 900, colors: [G.g4, G.g5, G.g3, G.g5] },
  ];
  const cache = new Map();
  function spruce(L, k) {
    const key = L.seed + ":" + k;
    let t = cache.get(key);
    if (t) return t;
    if (cache.size > 600) cache.clear();
    const h = L.hMin + Math.floor(hash(k, L.seed + 2) * (L.hMax - L.hMin + 1));
    const [pine, pine2, lit, trunk] = L.colors;
    const cells = [];
    cells.push([0, 0, trunk], [0, 1, trunk]);
    for (let y = 2; y <= h; y++) {
      const top = h - y;
      const hw = top < 2 ? 0 : top < 4 ? 1 : Math.max(1, Math.round(top * 0.3 - ((y - 2) % 4) * 0.55 + 0.9));
      for (let dx = -hw; dx <= hw; dx++) {
        const c = dx === -hw && hw > 0 && hash(k * 131 + y, L.seed + 3) < 0.75 ? lit : hash(k * 977 + dx * 31 + y, L.seed + 4) < 0.22 ? pine2 : pine;
        cells.push([dx, y, c, hash(k * 53 + dx, y + L.seed) * 110]);
      }
    }
    t = { x: k * L.slot + Math.floor(hash(k, L.seed + 1) * L.jit), cells };
    cache.set(key, t);
    return t;
  }

  const easeOut = (p) => 1 - Math.pow(1 - p, 3);
  const easeOutBack = (p) => 1 + 2.70158 * Math.pow(p - 1, 3) + 1.70158 * Math.pow(p - 1, 2);
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const GLIDE_AT = 3400, RAMP = 1.8; // ms until the glide starts, seconds to reach full speed

  function makeTile(root) {
    const canvas = root.querySelector("canvas");
    if (!canvas || !canvas.getContext) return;
    const ctx = canvas.getContext("2d");
    let cs = 4, clock = 0, last = 0, raf = 0, visible = false, started = false;

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 3);
      cs = Math.max(2, Math.round((root.clientWidth * dpr) / N));
      canvas.width = canvas.height = N * cs;
    }

    function draw(T) {
      const u0 = Math.max(0, (T - GLIDE_AT) / 1000);
      const u = u0 < RAMP ? (u0 * u0) / (2 * RAMP) : u0 - RAMP / 2; // seconds of full-speed travel
      const Y = (y) => (N - 3 - y) * cs;
      const col = (sx, fr) => { const a = Math.round((sx - fr) * cs); return [a, Math.round((sx + 1 - fr) * cs) - a]; };
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;

      // sun
      const sunA = clamp01((T - 100) / 700);
      if (sunA > 0) {
        ctx.globalAlpha = sunA;
        ctx.fillStyle = G.g1;
        for (let x = -5; x <= 5; x++) for (let y = -5; y <= 5; y++) if (x * x + y * y <= 27) ctx.fillRect((15 + x) * cs, Y(54 + y), cs, cs);
      }

      // clouds drifting
      const cloudA = clamp01((T - 300) / 800);
      if (cloudA > 0) {
        ctx.globalAlpha = cloudA;
        ctx.fillStyle = G.w0;
        ctx.strokeStyle = "rgba(23,19,16,0.05)";
        ctx.lineWidth = 1;
        const o = 0.7 * u + T / 9000;
        for (const [cx, cy, w] of [[8, 63, 12], [62, 59, 9], [104, 65, 14]]) {
          for (let n = -1; n <= 1; n++) {
            const x0 = cx + n * 140 - mod(o, 140);
            if (x0 > N || x0 + w < 0) continue;
            [[0, w], [2, w - 4], [4, w - 9]].forEach(([dx, len], r) => {
              for (let i = 0; i < len; i++) {
                const px = Math.round((x0 + dx + i) * cs);
                ctx.fillRect(px, Y(cy + r), cs, cs);
                ctx.strokeRect(px + 0.5, Y(cy + r) + 0.5, cs - 1, cs - 1);
              }
            });
          }
        }
      }

      // ridges: rise column by column from the middle, then glide at their own speed
      const ridge = (fn, color, speed, delay, opts = {}) => {
        const o = speed * u, fo = Math.floor(o), fr = o - fo;
        for (let sx = -1; sx <= N; sx++) {
          const wx = sx + fo;
          const r = easeOut(clamp01((T - delay - Math.abs(sx - N / 2) * 10) / 520));
          if (r <= 0) continue;
          const full = fn(wx) + (opts.spikes ? spikes(wx, opts.spikes, opts.seed) : 0);
          const h = Math.round(full * r);
          if (h <= 0) continue;
          const [px, w] = col(sx, fr);
          ctx.globalAlpha = 1;
          ctx.fillStyle = color;
          ctx.fillRect(px, Y(h - 1), w, h * cs);
          if (opts.rim && r === 1) { ctx.fillStyle = opts.rim; ctx.fillRect(px, Y(h - 1), w, cs); }
          // the cross on the high dome
          if (opts.cross && r === 1 && T > delay + 900) {
            const m = mod(wx, P), top = fn(wx - (m - PEAK));
            ctx.fillStyle = opts.rim;
            ctx.globalAlpha = clamp01((T - delay - 900) / 400);
            if (m === PEAK) ctx.fillRect(px, Y(top + 4), w, 5 * cs);
            if (m === PEAK - 1 || m === PEAK + 1) ctx.fillRect(px, Y(top + 3), w, cs);
          }
        }
      };
      ridge(farH, G.g0, 0.5, 0, { rim: G.g2, cross: true });
      ridge(midH, G.g1, 1.2, 250, { spikes: 0.22, seed: 5 });

      // mist flowing through the valley
      const mistA = clamp01((T - 900) / 900);
      if (mistA > 0) {
        const o = 4 * u + T / 2500, fo = Math.floor(o), fr = o - fo;
        ctx.globalAlpha = mistA;
        ctx.fillStyle = MIST;
        for (let sx = -1; sx <= N; sx++) {
          const wx = sx + fo, thick = Math.round(1.6 + 1.2 * Math.sin(wx / 9) + 0.8 * Math.sin(wx / 4));
          if (thick <= 0) continue;
          const [px, w] = col(sx, fr);
          ctx.fillRect(px, Y(9 + thick), w, thick * cs);
        }
      }
      ridge(nearH, "#e6e6ea", 2, 500, { spikes: 0.45, seed: 9 });

      // spruces: ghost outline first, then each block drops in; afterwards they glide
      for (const L of LAYERS) {
        const o = L.speed * u;
        const k0 = Math.floor((o - 12) / L.slot) - 1, k1 = Math.ceil((o + N + 12) / L.slot);
        for (let k = k0; k <= k1; k++) {
          const t = spruce(L, k);
          const start = L.delay + Math.abs(t.x - N / 2) * 22;
          for (const [dx, y, c, jit] of t.cells) {
            const ct = start + y * 24 + (jit || 0);
            const p = (T - ct) / 320;
            const px = Math.round((t.x + dx - o) * cs);
            if (px < -cs || px > canvas.width) continue;
            if (p <= 0) {
              if (T > ct - 650) {
                ctx.globalAlpha = clamp01((T - ct + 650) / 220);
                ctx.strokeStyle = GHOST;
                ctx.lineWidth = 1;
                ctx.strokeRect(px + 0.5, Y(y) + 0.5, cs - 1, cs - 1);
              }
              continue;
            }
            ctx.globalAlpha = p < 1 ? Math.min(1, p * 2.5) : 1;
            ctx.fillStyle = c;
            ctx.fillRect(px, Y(y) - (p < 1 ? (1 - easeOutBack(p)) * cs * 4 : 0), cs, cs);
          }
        }
      }

      // ground
      ctx.globalAlpha = clamp01(T / 400);
      ctx.fillStyle = G.g3;
      ctx.fillRect(0, Y(-1), canvas.width, 2 * cs);
      ctx.globalAlpha = 1;
    }

    function frame(now) {
      clock += Math.min(50, now - last); // time only runs while the tile is on screen
      last = now;
      draw(clock);
      if (visible) raf = requestAnimationFrame(frame);
    }
    function resume() {
      if (raf) cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    size();
    if (freeze) { draw(+freeze[1]); }
    else if (reduceMotion) { draw(GLIDE_AT); }
    else {
      draw(0);
      new IntersectionObserver((entries) => {
        visible = entries[entries.length - 1].isIntersecting;
        if (visible) { started = true; resume(); }
        else { cancelAnimationFrame(raf); raf = 0; }
      }, { threshold: 0.15 }).observe(root);
    }
    new ResizeObserver(() => {
      size(); // resizing clears the canvas, so always paint again
      draw(freeze ? +freeze[1] : reduceMotion ? GLIDE_AT : clock);
    }).observe(root);
  }

  tiles.forEach(makeTile);
})();
