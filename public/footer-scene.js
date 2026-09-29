// Footer scene: a pixel-block artist's table (easel with a folk tulip, written egg,
// bead loom, brushes, books, a UI screen, plants) that builds itself block by block
// when the footer scrolls into view. Pale greys only. One <canvas>, no dependencies;
// stops drawing when done and respects prefers-reduced-motion.
// Markup: <div class="footer-scene" data-footer-scene aria-hidden="true"><canvas></canvas></div>
// Cell size and row count come from CSS (--cell, --rows).
(() => {
  const root = document.querySelector("[data-footer-scene]");
  const canvas = root && root.querySelector("canvas");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Palette: pale greys on the parchment footer (#f5f5f7) ----------
  const C = {
    w0: "#ffffff",
    g1: "#ececef",
    g2: "#e1e1e5",
    g3: "#d4d4d9",
    g4: "#c6c6cc",
    g5: "#b7b7be",
  };
  const GHOST = "rgba(23,19,16,0.1)";
  const EDGE = { w0: "rgba(23,19,16,0.05)", g1: "", g2: "rgba(23,19,16,0.035)", g3: "rgba(255,255,255,0.3)", g4: "rgba(255,255,255,0.3)", g5: "rgba(255,255,255,0.3)" };

  // ---------- Deterministic randomness (same table on every visit) ----------
  let seed = 20260929;
  const rnd = () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const between = (a, b) => a + Math.round(rnd() * (b - a));

  // ---------- Shapes: cells in table coordinates (x right, y up, y=0 = first row above the table) ----------
  // pc / po: "paint" colour laid over the block after the object is built, po ms after it starts
  function shape() {
    const m = new Map();
    const s = {
      set(x, y, c, extra) { m.set(x + "," + y, { x, y, c, ...extra }); },
      rect(x, y, w, h, c, extra) { for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) s.set(x + i, y + j, c, extra); },
      paint(x, y, pc, po) { const k = x + "," + y; if (m.has(k)) Object.assign(m.get(k), { pc, po }); },
      ui(x, y, w, h, pc, po) { for (let i = 0; i < w; i++) for (let j = 0; j < h; j++) s.paint(x + i, y + j, pc, po); },
      cells: () => [...m.values()],
    };
    return s;
  }

  // folk tulip for the easel, drawn as the left half (centre column last) and mirrored
  const TULIP = [
    "........R", ".......RR", "..R...RRR", "..RR..RRR", "..RRR.RRD", "..RRRRRDD", "...RRRRDD",
    "....RRRRD", ".....RRRR", "......RRR", "........K", "........K", "..GG....K", ".GGGG...K",
    "..GGGG..K", "...GGGG.K", ".....GGGK", "........K", "........K", "......DDD", ".....DDDD",
  ].map((h) => h + [...h.slice(0, 8)].reverse().join(""));
  const TULIP_C = { R: "g4", D: "g5", K: "g5", G: "g3" };

  function easel() {
    const s = shape(), w = 30;
    s.rect(14, 0, 2, 46, "g5");
    for (let y = 0; y <= 45; y++) {
      const xl = Math.round(3 + y * 0.2), xr = Math.round(25 - y * 0.2);
      s.rect(xl, y, 2, 1, "g4");
      s.rect(xr, y, 2, 1, "g4");
    }
    s.rect(1, 14, 28, 2, "g4");
    s.rect(4, 16, 22, 26, "g5");
    s.rect(5, 17, 20, 24, "w0");
    s.rect(11, 42, 8, 2, "g5");
    TULIP.forEach((row, r) => {
      const y = 38 - r;
      [...row].forEach((ch, i) => {
        if (ch !== ".") s.paint(6 + i, y, TULIP_C[ch], (TULIP.length - r) * 55 + Math.round(rnd() * 90));
      });
    });
    return { w, cells: s.cells(), build: true };
  }

  function monitor() {
    const s = shape(), w = 32;
    s.rect(9, 0, 14, 1, "g5");
    s.rect(14, 1, 4, 5, "g4");
    s.rect(0, 6, 32, 21, "g5");
    s.rect(1, 7, 30, 19, "g3");
    s.ui(1, 24, 30, 2, "w0", 0);
    s.ui(3, 24, 4, 1, "g4", 80);
    for (let i = 0; i < 3; i++) s.ui(20 + i * 3, 24, 2, 1, "g2", 120 + i * 40);
    s.ui(3, 20, 13, 1, "w0", 260);
    s.ui(3, 18, 9, 1, "w0", 330);
    s.ui(3, 14, 7, 2, "g5", 450);
    s.ui(19, 13, 10, 9, "w0", 560);
    for (let i = 0; i < 3; i++) s.ui(3 + i * 9, 8, 8, 4, "w0", 720 + i * 120);
    return { w, cells: s.cells(), build: true };
  }

  function egg() {
    const s = shape(), w = 15, cy = 12;
    s.rect(3, 0, 9, 1, "g5");
    s.rect(5, 1, 5, 2, "g4");
    for (let yy = -9; yy <= 9; yy++) for (let xx = -7; xx <= 7; xx++) {
      const rx = 6.6 * (yy > 0 ? 1 - 0.14 * (yy / 9) : 1);
      if ((xx / rx) ** 2 + (yy / 9.3) ** 2 > 1) continue;
      s.set(7 + xx, cy + yy, "g3");
      const a = Math.abs(yy);
      const pc = a === 0 ? "w0" : a === 1 ? "g5" : a === 4 && xx % 2 === 0 ? "w0" : a === 6 ? "g5" : a >= 8 ? "g5" : null;
      if (pc) s.paint(7 + xx, cy + yy, pc, a * 70 + (xx + 7) * 12);
    }
    return { w, cells: s.cells(), build: true };
  }

  function loom() {
    const s = shape(), w = 34;
    s.rect(0, 0, 34, 2, "g4");
    s.rect(1, 2, 3, 12, "g4");
    s.rect(30, 2, 3, 12, "g4");
    s.rect(0, 14, 5, 1, "g5");
    s.rect(29, 14, 5, 1, "g5");
    s.rect(4, 12, 26, 1, "g3");
    s.rect(4, 4, 26, 1, "g3");
    s.rect(5, 5, 24, 6, "g2");
    for (let x = 5; x < 29; x++) for (let y = 5; y <= 10; y++) {
      const dx = (x - 5) % 8, d = Math.abs(dx - 3.5) + Math.abs(y - 7.5);
      const pc = y === 5 || y === 10 ? "g5" : d <= 1.5 ? "g5" : d <= 2.5 ? "w0" : "g3";
      s.paint(x, y, pc, (x - 5) * 32 + (y - 5) * 6);
    }
    return { w, cells: s.cells(), build: true };
  }

  function jar() {
    const s = shape(), w = 10;
    s.rect(1, 0, 8, 9, "g2");
    s.rect(0, 9, 10, 1, "g4");
    [[2, 18, -0.12], [4, 22, 0], [6, 16, 0.1], [7, 20, 0.2]].forEach(([bx, h, lean], n) => {
      for (let y = 10; y <= h; y++) {
        const x = bx + Math.round((y - 10) * lean);
        s.set(x, y, y > h - 2 ? "g5" : y > h - 4 ? "g3" : n % 2 ? "g5" : "g4");
        if (y === h - 1) s.set(x + 1, y, "g5");
      }
    });
    return { w, cells: s.cells(), build: true };
  }

  function books() {
    const s = shape(), w = between(17, 20);
    const stack = [[0, 3, "g4"], [1, 2, "g3"], [2, 3, "g5"], [1, 2, "g2"]];
    let y = 0;
    for (const [off, h, c] of stack) {
      const bw = w - off - between(0, 3);
      s.rect(off, y, bw, h, c);
      s.rect(off + bw - 1, y, 1, h, "w0");
      y += h;
    }
    return { w, cells: s.cells(), build: true };
  }

  function booksUp() {
    const s = shape(), n = between(4, 6), cols = ["g4", "g3", "g5", "g2"];
    let x = 0;
    for (let i = 0; i < n; i++) {
      const bw = between(2, 3), h = between(11, 17), c = cols[i % cols.length];
      s.rect(x, 0, bw, h, c);
      s.rect(x, h - 3, bw, 1, "w0");
      x += bw;
    }
    for (let y = 0; y < 14; y++) s.rect(x + Math.round(y * 0.4), y, 2, 1, "g4");
    return { w: x + 8, cells: s.cells(), build: true };
  }

  function cup() {
    const s = shape(), w = 7;
    s.rect(0, 0, 7, 7, "g3");
    s.rect(0, 7, 7, 1, "g4");
    [[1, 13, "g4"], [3, 16, "g2"], [5, 11, "g5"]].forEach(([x, h, c]) => {
      s.rect(x, 8, 1, h - 10, c);
      s.set(x, h - 2, "g2");
      s.set(x, h - 1, "g5");
    });
    return { w, cells: s.cells(), build: true };
  }

  function plant() {
    const s = shape(), w = 11;
    for (let y = 0; y < 6; y++) { const inset = y < 3 ? 1 : 0; s.rect(1 + inset, y, 9 - inset * 2, 1, "g4"); }
    s.rect(0, 6, 11, 1, "g5");
    const cx = 5, cy = 7;
    const leaves = [[92, 12], [66, 10], [118, 10], [40, 8], [142, 8], [78, 13]];
    leaves.forEach(([deg, L], n) => {
      const a = (deg * Math.PI) / 180, droop = 0.05;
      for (let d = 0; d <= L; d += 0.5) {
        const fx = Math.round(cx + Math.cos(a) * d), fy = Math.round(cy + Math.sin(a) * d - droop * d * d);
        s.set(fx, fy, n % 2 ? "g3" : "g4");
        if (d > 2 && d < L - 2 && Math.round(d) === d && d % 2 === 0) s.set(fx + (Math.cos(a) > 0 ? -1 : 1), fy, "g3");
      }
    });
    return { w, cells: s.cells() };
  }

  function yarn() {
    const s = shape(), r = 4, w = 14;
    for (let x = -r; x <= r; x++) for (let y = -r; y <= r; y++) {
      if (x * x + y * y <= r * r + 1) s.set(x + r, y + r, (x + y + 20) % 3 === 0 ? "g4" : "g3");
    }
    for (let x = 2 * r + 1; x < w; x++) s.set(x, 0, "g4");
    return { w, cells: s.cells() };
  }

  // ---------- Table layout: easel in the middle, the rest spreads both ways ----------
  const REACH = 380; // cells each side of centre (covers ~3800px wide screens at 5px)
  const makers = { easel, monitor, egg, loom, jar, books, booksUp, cup, plant, yarn };
  const RIGHT = ["jar", "monitor", "plant", "books", "yarn", "loom", "cup", "booksUp", "plant", "egg", "jar", "books", "plant", "monitor", "yarn", "booksUp"];
  const LEFT = ["egg", "books", "plant", "loom", "cup", "booksUp", "plant", "monitor", "yarn", "jar", "books", "plant", "egg", "loom", "cup", "plant"];
  const structures = [];
  const gapAfter = (kind) => (kind === "plant" || kind === "yarn" ? between(2, 4) : between(4, 8));
  const place = (kind, x) => {
    const st = makers[kind]();
    st.kind = kind;
    st.x = x;
    structures.push(st);
    return st;
  };
  place("easel", -15);
  for (let x = 15 + 4, i = 0; x < REACH; i++) {
    const kind = RIGHT[i % RIGHT.length];
    x += place(kind, x).w + gapAfter(kind);
  }
  for (let x = -15 - 4, i = 0; x > -REACH; i++) {
    const kind = LEFT[i % LEFT.length];
    const st = makers[kind]();
    x -= st.w;
    st.kind = kind;
    st.x = x;
    structures.push(st);
    x -= gapAfter(kind);
  }

  // ---------- Timeline: every cell gets a start time (ms) ----------
  // k: 0 = drop in (objects on the table), 1 = fade in (halo, folk border, table, plants)
  const cells = [];
  const add = (x, y, c, t, d, k, extra) => cells.push({ x, y, c, t, d, k, ...extra });

  // soft halo behind the easel, grows from its centre
  for (let x = -20; x <= 20; x++) for (let y = -20; y <= 20; y++) {
    if (x * x + y * y <= 400) add(x, y + 28, "g1", 60 + (x * x + y * y) * 1.4, 520, 1, { layer: 0 });
  }
  // embroidered folk border across the wall (wavy stem, tulips, dots), centre-out sweep
  for (let x = -REACH; x <= REACH; x++) {
    const y0 = 51 + Math.round(1.4 * Math.sin(x / 5));
    const t = 120 + Math.abs(x) * 2;
    add(x, y0, "g2", t, 420, 1, { layer: 1 });
    const m = ((x % 24) + 24) % 24;
    if (m === 12) {
      [[0, 1], [0, 2], [-1, 2], [1, 2], [-2, 3], [0, 3], [2, 3], [-1, 4], [1, 4]].forEach(([dx, dy]) => add(x + dx, y0 + dy, "g3", t + 200 + dy * 60, 420, 1, { layer: 1 }));
    } else if (m === 0) {
      add(x, y0 - 2, "g2", t + 200, 420, 1, { layer: 1 });
      add(x - 1, y0 - 3, "g2", t + 260, 420, 1, { layer: 1 });
      add(x + 1, y0 - 3, "g2", t + 260, 420, 1, { layer: 1 });
    } else if (m === 6 || m === 18) {
      add(x, y0 + (m === 6 ? 2 : -2), "g1", t + 150, 420, 1, { layer: 1 });
    }
    add(x, -1, "g4", Math.abs(x) * 1.5, 320, 1, { layer: 6 });
    add(x, -2, "g2", Math.abs(x) * 1.5, 320, 1, { layer: 6 });
  }

  // Objects go up one at a time (easel first, then alternating left / right outward);
  // their start times depend on which ones fit the screen, so they are set in schedule().
  // Plants and yarn are there from the start, fading in with the room.
  const builds = [];
  for (const st of structures) {
    const cxAbs = Math.abs(st.x + st.w / 2);
    if (st.build) {
      const top = Math.max(...st.cells.map((c) => c.y));
      const rowDelay = Math.min(24, 900 / top);
      st.span = top * rowDelay + 150; // the next object starts as this one's top row lands
      st.bcells = [];
      builds.push(st);
      for (const c of st.cells) {
        const cell = {
          x: st.x + c.x, y: c.y, c: c.c, t: Infinity, d: 340, k: 0, layer: 4,
          rt: c.y * rowDelay + rnd() * 150,
          gh: 380 + Math.abs(st.x + c.x) * 1.5 + c.y * 7,
          lt: c.pc ? { c: c.pc, r: st.span + 250 + c.po, t: Infinity } : undefined,
        };
        cells.push(cell);
        st.bcells.push(cell);
      }
    } else {
      for (const c of st.cells) add(st.x + c.x, c.y, c.c, 60 + cxAbs * 2 + c.y * 6, 380, 1, { layer: 5 });
    }
  }
  cells.sort((a, b) => a.layer - b.layer);
  let END = 0;

  function schedule() {
    const onScreen = (st) => st.x + st.w + offX >= 0 && st.x + offX < W;
    const vis = builds.filter(onScreen);
    const mid = vis.find((st) => st.kind === "easel") || vis[0];
    for (const st of builds) st.start = Infinity;
    END = 0;
    if (mid) {
      const left = vis.filter((st) => st.x < mid.x).sort((a, b) => b.x - a.x);
      const right = vis.filter((st) => st.x > mid.x).sort((a, b) => a.x - b.x);
      const order = [mid];
      while (left.length || right.length) {
        if (left.length) order.push(left.shift());
        if (right.length) order.push(right.shift());
      }
      let t = 900;
      for (const st of order) { st.start = t; t += st.span; }
    }
    for (const st of builds) for (const c of st.bcells) {
      c.t = st.start + c.rt;
      if (c.lt) c.lt.t = st.start + c.lt.r;
      if (st.start !== Infinity) END = Math.max(END, c.t + c.d, c.lt ? c.lt.t + 450 : 0);
    }
    END = Math.max(END, ...visible.filter((c) => c.k !== 0).map((c) => c.t + c.d));
  }

  // ---------- Rendering ----------
  let W = 0, H = 0, cs = 0, offX = 0, visible = [];
  function setup() {
    const st = getComputedStyle(root);
    const cell = parseFloat(st.getPropertyValue("--cell")) || 5;
    H = parseInt(st.getPropertyValue("--rows"), 10) || 60;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    cs = Math.max(2, Math.round(cell * dpr));
    W = Math.ceil((root.clientWidth * dpr) / cs) + 1;
    canvas.width = W * cs;
    canvas.height = H * cs;
    canvas.style.width = (W * cs) / dpr + "px";
    canvas.style.height = (H * cs) / dpr + "px";
    root.style.height = (H * cs) / dpr + "px";
    offX = Math.floor(W / 2);
    visible = cells.filter((c) => c.x + offX >= 0 && c.x + offX < W && H - 3 - c.y >= 0);
    schedule();
  }

  const easeOutBack = (p) => 1 + 2.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2);
  function block(x, y, key) {
    ctx.fillStyle = C[key];
    ctx.fillRect(x, y, cs, cs);
    if (cs > 3 && EDGE[key]) {
      ctx.strokeStyle = EDGE[key];
      ctx.lineWidth = 1;
      ctx.strokeRect(x + 0.5, y + 0.5, cs - 1, cs - 1);
    }
  }
  function draw(T) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const c of visible) {
      const px = (c.x + offX) * cs, py = (H - 3 - c.y) * cs;
      const p = (T - c.t) / c.d;
      if (p <= 0) {
        if (c.gh !== undefined && T > c.gh) {
          ctx.globalAlpha = Math.min(1, (T - c.gh) / 220);
          ctx.strokeStyle = GHOST;
          ctx.lineWidth = 1;
          ctx.strokeRect(px + 0.5, py + 0.5, cs - 1, cs - 1);
        }
        continue;
      }
      let y = py;
      if (p < 1) {
        if (c.k === 0) {
          ctx.globalAlpha = Math.min(1, p * 2.5);
          y = py - (1 - easeOutBack(p)) * cs * 3;
        } else ctx.globalAlpha = p;
      } else ctx.globalAlpha = 1;
      block(px, y, c.c);
      if (c.lt && T > c.lt.t) {
        ctx.globalAlpha *= Math.min(1, (T - c.lt.t) / 420);
        block(px, y, c.lt.c);
      }
    }
    ctx.globalAlpha = 1;
  }

  let t0 = 0, raf = 0, state = "idle"; // idle → playing → done
  function frame(now) {
    const T = now - t0;
    draw(T);
    if (T < END) raf = requestAnimationFrame(frame);
    else state = "done";
  }
  function play() {
    cancelAnimationFrame(raf);
    if (reduceMotion) { state = "done"; draw(Infinity); return; }
    state = "playing";
    t0 = performance.now();
    raf = requestAnimationFrame(frame);
  }

  setup();
  // test aid: ?scene=1800 freezes the build at 1800 ms (screenshots of in-between states);
  // a query parameter, because script.js reads location.hash as a selector
  const freeze = /[?&]scene=(\d+)/.exec(location.search);
  if (freeze) { state = "done"; draw(+freeze[1]); return; }
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) { io.disconnect(); play(); }
    }, { threshold: 0.35 });
    io.observe(root);
  } else play();

  let lastWidth = root.clientWidth;
  new ResizeObserver(() => {
    if (root.clientWidth === lastWidth) return;
    lastWidth = root.clientWidth;
    setup();
    if (state === "done") draw(Infinity);
  }).observe(root);
})();
