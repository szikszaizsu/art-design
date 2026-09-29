// Footer scene: a row of pixel-block teeth that builds itself block by block when the
// footer scrolls into view (same technique as the portfolio footer-scene.js): ghost
// outlines appear first, blocks drop in with a small bounce, the middle tooth goes up
// first and the others follow outward; finally a wire and brackets are painted on.
// Markup: <div class="teeth-scene" data-teeth-scene aria-hidden="true"><canvas></canvas></div>
// Cell size and row count come from CSS (--cell, --rows). ?scene=4000 freezes it for screenshots.
(() => {
  const root = document.querySelector("[data-teeth-scene]");
  const canvas = root && root.querySelector("canvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // pale greys, like the portfolio footer
  const C = { t0: "#ffffff", t1: "#ececef", gum: "#e1e1e5", gum2: "#d4d4d9", wire: "#c6c6cc", brk: "#b7b7be" };
  const GHOST = "rgba(23,19,16,0.1)";
  const EDGE = { t0: "rgba(23,19,16,0.05)", t1: "rgba(23,19,16,0.035)", gum: "rgba(23,19,16,0.035)", gum2: "rgba(255,255,255,0.3)", wire: "", brk: "rgba(255,255,255,0.3)" };

  let seed = 20260929;
  const rnd = () => { seed = (seed + 0x6d2b79f5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };

  // sprites, top row first; X = enamel, s = shade
  const MOLAR = [".XXXX.XX.XXXX.", "XXXXXXXXXXXXXX", "XXXXXXXXXXXXXX", "XXXXXXXXXXXXsX", "XXXXXXXXXXXXsX", "XXXXXXXXXXXXsX", "XXXXXXXXXXXsXX", ".XXXXXXXXXXss.", ".XXXXX..XXXXs.", "..XXXX..XXXX..", "..XXX....XXX..", "..XX......XX..", "...X......X..."];
  const INCISOR = ["...XXXXXXXX...", "..XXXXXXXXXX..", "..XXXXXXXXXX..", "..XXXXXXXXsX..", "..XXXXXXXXsX..", "..XXXXXXXXsX..", "..XXXXXXXXsX..", "...XXXXXXss...", "....XXXXXs....", "....XXXXXX....", ".....XXXX.....", ".....XXXX.....", "......XX......"];
  const SLOT = 17, GUM = 3, TH = MOLAR.length; // teeth stand on a 3-row gum band
  const REACH = 400;

  const cells = [];
  const teeth = [];
  // gum band (fades in centre-out)
  for (let x = -REACH; x <= REACH; x++) {
    for (let y = 0; y < GUM; y++) cells.push({ x, y, c: y === GUM - 1 ? "gum2" : "gum", t: 80 + Math.abs(x) * 2 + y * 40, d: 360, k: 1 });
  }
  // teeth: slot 0 in the middle, then outward
  for (let n = -Math.floor(REACH / SLOT); n <= Math.floor(REACH / SLOT); n++) {
    const spr = Math.abs(n) <= 1 ? INCISOR : MOLAR;
    const x0 = n * SLOT - 7;
    const tooth = { n, x: x0, w: 14, cells: [] };
    spr.forEach((row, j) => [...row].forEach((ch, i) => {
      if (ch === ".") return;
      const y = GUM + (TH - 1 - j);
      const cell = { x: x0 + i, y, c: ch === "s" ? "t1" : "t0", t: Infinity, d: 340, k: 0, rt: (y - GUM) * 22 + rnd() * 140, gh: 300 + Math.abs(x0) * 1.2 + (y - GUM) * 6 };
      tooth.cells.push(cell); cells.push(cell);
    }));
    // braces paint: wire across the crown + a bracket in the middle
    const wy = GUM + 8;
    tooth.cells.forEach((c) => {
      const inBracket = c.y >= wy - 1 && c.y <= wy + 1 && c.x >= x0 + 5 && c.x <= x0 + 8;
      if (inBracket) c.lt = { c: "brk", t: Infinity, r: 0 };
      else if (c.y === wy) c.lt = { c: "wire", t: Infinity, r: 0 };
    });
    teeth.push(tooth);
  }
  // wire also bridges the gaps between teeth
  for (let x = -REACH; x <= REACH; x++) cells.push({ x, y: GUM + 8, c: "wire", t: Infinity, d: 300, k: 1, wireGap: true });

  let W = 0, H = 0, cs = 0, offX = 0, visible = [], END = 0;
  function schedule() {
    const vis = teeth.filter((t) => t.x + t.w + offX >= 0 && t.x + offX < W).sort((a, b) => Math.abs(a.n) - Math.abs(b.n) || a.n - b.n);
    teeth.forEach((t) => (t.start = Infinity));
    let t = 700;
    const span = TH * 22 + 120;
    vis.forEach((tooth) => { tooth.start = t; t += span; });
    const built = t + 300;
    END = 0;
    for (const tooth of teeth) for (const c of tooth.cells) {
      c.t = tooth.start + c.rt;
      if (c.lt) c.lt.t = tooth.start === Infinity ? Infinity : built + Math.abs(c.x) * 3;
      if (tooth.start !== Infinity) END = Math.max(END, c.t + c.d, c.lt ? c.lt.t + 450 : 0);
    }
    for (const c of cells) if (c.wireGap) { c.t = built + Math.abs(c.x) * 3; }
    END = Math.max(END, ...visible.filter((c) => c.k === 1).map((c) => c.t + c.d));
  }
  const occupied = new Set();
  teeth.forEach((t) => t.cells.forEach((c) => occupied.add(c.x + "," + c.y)));

  function setup() {
    const st = getComputedStyle(root);
    const cell = parseFloat(st.getPropertyValue("--cell")) || 6;
    H = parseInt(st.getPropertyValue("--rows"), 10) || 20;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    cs = Math.max(2, Math.round(cell * dpr));
    W = Math.ceil((root.clientWidth * dpr) / cs) + 1;
    canvas.width = W * cs; canvas.height = H * cs;
    canvas.style.width = (W * cs) / dpr + "px"; canvas.style.height = (H * cs) / dpr + "px";
    root.style.height = (H * cs) / dpr + "px";
    offX = Math.floor(W / 2);
    visible = cells.filter((c) => c.x + offX >= 0 && c.x + offX < W && H - 1 - c.y >= 0 && !(c.wireGap && occupied.has(c.x + "," + c.y)));
    schedule();
  }

  const easeOutBack = (p) => 1 + 2.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2);
  function block(x, y, key) {
    ctx.fillStyle = C[key]; ctx.fillRect(x, y, cs, cs);
    if (cs > 3 && EDGE[key]) { ctx.strokeStyle = EDGE[key]; ctx.lineWidth = 1; ctx.strokeRect(x + 0.5, y + 0.5, cs - 1, cs - 1); }
  }
  function draw(T) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const c of visible) {
      const px = (c.x + offX) * cs, py = (H - 1 - c.y) * cs;
      const p = (T - c.t) / c.d;
      if (p <= 0) {
        if (c.gh !== undefined && T > c.gh && c.t !== Infinity) { ctx.globalAlpha = Math.min(1, (T - c.gh) / 220); ctx.strokeStyle = GHOST; ctx.lineWidth = 1; ctx.strokeRect(px + 0.5, py + 0.5, cs - 1, cs - 1); }
        continue;
      }
      let y = py;
      if (p < 1) { if (c.k === 0) { ctx.globalAlpha = Math.min(1, p * 2.5); y = py - (1 - easeOutBack(p)) * cs * 3; } else ctx.globalAlpha = p; }
      else ctx.globalAlpha = 1;
      block(px, y, c.c);
      if (c.lt && T > c.lt.t) { ctx.globalAlpha *= Math.min(1, (T - c.lt.t) / 420); block(px, y, c.lt.c); }
    }
    ctx.globalAlpha = 1;
  }

  let t0 = 0, raf = 0, state = "idle";
  function frame(now) { const T = now - t0; draw(T); if (T < END) raf = requestAnimationFrame(frame); else state = "done"; }
  function play() {
    cancelAnimationFrame(raf);
    if (reduceMotion) { state = "done"; draw(Infinity); return; }
    state = "playing"; t0 = performance.now(); raf = requestAnimationFrame(frame);
  }

  setup();
  const freeze = /[?&]scene=(\d+)/.exec(location.search);
  if (freeze) { state = "done"; draw(+freeze[1]); return; }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((e) => { if (e.some((x) => x.isIntersecting)) { io.disconnect(); play(); } }, { threshold: 0.35 });
    io.observe(root);
  } else play();

  let lastWidth = root.clientWidth;
  new ResizeObserver(() => { if (root.clientWidth === lastWidth) return; lastWidth = root.clientWidth; setup(); if (state === "done") draw(Infinity); }).observe(root);
})();
