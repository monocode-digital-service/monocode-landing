/**
 * Raio-x: a plate holding the operation as a grid of blocks, some taller than
 * others. A scanner frame hovers over it; the blocks under it lose their lids
 * and turn to dashed outlines. One block hides the bottleneck: it only shows,
 * bright, when the scanner reveals it. The pointer moves the
 * scanner over the ground; the read-out says whether it sits on the
 * bottleneck. Left alone, the scanner patrols the plate on a slow loop. The
 * slider is the scanner's size, in cells.
 *
 * The pattern: a field. A spring per axis for the scanner, a hit on the ground
 * plane (which never moves), a reveal that falls off at the scanner's edge.
 */
const {
  Cam, clamp, facing, fit, open, poly, prism, proj, rings, rrect, seg, unproj,
  spring, stepS, flatDot, mk, place, pointer, put, register, disposer, solid, reducedMotion,
} = HL;

const NX = 5, NY = 4, CELL = 21, FOOT = 15, SZ = 25, PB = 5, HOT = [2, 1], REST = [2.25, 1.55];
const EXT_X = NX * CELL, EXT_Y = NY * CELL;
const H = (i, j) => 6 + 7 * Math.abs(Math.sin(i * 1.7 + j * 2.3)) + (i + j === 3 ? 3 : 0);

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 2.05);
  fit(C, [[-8, -8, -PB], [EXT_X + 8, EXT_Y + 8, -PB], [EXT_X + 8, -8, -PB], [-8, EXT_Y + 8, -PB], [0, 0, SZ + 4]], 200, 168);
  const P = proj(C), front = facing(C);
  let span = value, over = null;
  const sx = spring(REST[0] * CELL), sy = spring(REST[1] * CELL);

  const g = mk("g", {}, svg);
  put(solid(g), prism(P, front, rrect(-8, -8, EXT_X + 8, EXT_Y + 8, 10, 14), rrect(-6, -6, EXT_X + 6, EXT_Y + 6, 8, 14), -PB, 0));
  const shadow = mk("path", { class: "nf lo" }, g);

  // Blocks, diagonal by diagonal from the back corner. Each keeps its closed and its open drawing.
  const cells = [];
  for (let s = 0; s <= NX + NY - 2; s++) for (let i = 0; i < NX; i++) {
    const j = s - i;
    if (j < 0 || j >= NY) continue;
    const x0 = i * CELL + (CELL - FOOT) / 2, y0 = j * CELL + (CELL - FOOT) / 2, h = H(i, j), hot = i === HOT[0] && j === HOT[1];
    const [ring, inner] = rings(x0, y0, x0 + FOOT, y0 + FOOT, 2.6, 1);
    const el = solid(g), cx = x0 + FOOT / 2, cy = y0 + FOOT / 2;
    put(el, prism(P, front, ring, inner, 0, h));
    cells.push({ i, j, cx, cy, h, hot, el, open: false, silCls: el.sil.getAttribute("class") || "", crCls: el.cr.getAttribute("class") || "" });
  }

  // The scanner: a frame hovering above the plate, its four drops dashed, its reach dim on the plate.
  const drops = mk("path", { class: "nf dash hi" }, g), frame = mk("path", { class: "nf sil" }, g), inner = mk("path", { class: "nf lo" }, g);
  const rr = (x, y, r, k) => rrect(x - r, y - r, x + r, y + r, 4, 8).map((q) => P(q.u, q.v, k));

  let drawn = "";
  function draw() {
    const x = sx.x, y = sy.x, r = (span * CELL) / 2, key = [x, y, r].map((v) => v.toFixed(2)).join();
    if (key === drawn) return;
    drawn = key;
    shadow.setAttribute("d", poly(rr(x, y, r, 0)));
    frame.setAttribute("d", poly(rr(x, y, r, SZ)));
    inner.setAttribute("d", poly(rr(x, y, r - 3, SZ)));
    drops.setAttribute("d", [[-1, -1], [1, -1], [1, 1], [-1, 1]].map(([a, b]) => seg(P(x + a * r, y + b * r, SZ), P(x + a * r, y + b * r, 0))).join(""));
    for (const c of cells) {
      const open = Math.abs(c.cx - x) < r && Math.abs(c.cy - y) < r;
      if (open === c.open) continue;
      c.open = open;
      // open: the body turns to a dashed outline; the bottleneck turns bright instead
      c.el.sil.setAttribute("class", open ? (c.hot ? "hi" : "nf dash") : c.silCls);
      c.el.cr.setAttribute("class", open ? "nf lo" : c.crCls);
    }
  }

  // Idle: with nobody pointing, the scanner patrols the plate on a slow loop that crosses the bottleneck.
  const idle = !reducedMotion();
  const B = register(stage, (dt, now) => {
    if (!over && idle) {
      const r = (span * CELL) / 2, t = now / 1000;
      sx.t = EXT_X / 2 + (EXT_X / 2 - r) * 0.8 * Math.sin(t * 0.33);
      sy.t = EXT_Y / 2 + (EXT_Y / 2 - r) * 0.75 * Math.sin(t * 0.47 + 1.1);
    }
    const a = stepS(sx, dt), b = stepS(sy, dt);
    draw();
    return a || b || (!over && idle);
  });
  bag.add(B.unregister);

  function aim() {
    const r = (span * CELL) / 2;
    const [tx, ty] = over ? over : [REST[0] * CELL, REST[1] * CELL];
    sx.t = clamp(tx, r - 4, EXT_X - r + 4); sy.t = clamp(ty, r - 4, EXT_Y - r + 4);
    const hot = cells.find((c) => c.hot), on = Math.abs(hot.cx - sx.t) < r && Math.abs(hot.cy - sy.t) < r;
    read.textContent = over ? (on ? "gargalo" : "ok") : "rest";
    B.wake();
  }
  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 0); aim(); },
    leave: () => { over = null; aim(); },
  }));
  bag.add(() => svg.replaceChildren());
  aim();
  draw();

  return { set: (v) => { span = v; drawn = ""; aim(); }, destroy: bag.dispose };
}

hairline({
  name: "raiox",
  means: "A scanner over the operation shows what each block holds; one of them hides the bottleneck.",
  rules: [1, 3, 5, 6],
  range: [1.5, 2.2, 3],
  mount,
});
