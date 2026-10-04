// @ts-nocheck
// Gerado por design/hairline/export.mjs a partir de design/hairline/turno.js. Não editar.
import HL from './kernel'

/**
 * Turno: an industrial arm on a plinth works a shift on its own. It lifts data
 * blocks off five pads, carries each to a tower and stacks it; the tower sinks
 * one level into its hatch and the emptied pad rises a new block. Pointing at
 * a pad lights its block and sends the arm for it next, a little faster; at
 * rest the block in the gripper is the bright one. The slider is the pace,
 * blocks per 10 s.
 *
 * The pattern: one of many on an ambient clock. A spring on the rate, picks
 * on the ground plane against the pads (which never move), and every pose
 * derived from one phase, so nothing drifts.
 */
const {
  Cam, clamp, unproj, facing, fit, hull, lerp, poly, prism, proj, rings, rrect, circ,
  spring, stepS, flatDot, mk, place, pointer, put, register, disposer, solid, reducedMotion,
} = HL;

const PICK = 16, FAST = 1.8;
const BS = 13, BH = 11, LG = 10, H0 = 24, L1 = 42, L2 = 40, HOV = 15, REST_U = 0.62;
const TW = [44, -40], SLOTS = [[-50, 6], [-30, 40], [4, 52], [-56, -30], [34, 34]], ORDER = [0, 2, 4, 1, 3];
const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };
const seg01 = (s, a, b) => smooth((s - a) / (b - a));

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.72);
  fit(C, [[-72, -70, -5], [70, 72, -5], [70, -70, -5], [-72, 72, -5], [0, 0, H0 + L1 + 6], [TW[0], TW[1], 5 * BH + HOV]], 200, 170);
  const P = proj(C), front = facing(C);
  const e = [P(1, 0, 0), P(0, 1, 0), P(0, 0, 1)], o = P(0, 0, 0);
  const SC = Math.sqrt(e.reduce((a, p) => a + (p[0] - o[0]) ** 2 + (p[1] - o[1]) ** 2, 0) / 2);
  let pace = value, u = REST_U, aim = -1, curK = -1, curJ = ORDER[0], auto = 1;
  const rate = spring(1);

  const g = mk("g", {}, svg);
  const pr = rrect(-72, -70, 70, 72, 12, 14), pi = rrect(-69.8, -67.8, 67.8, 69.8, 9.8, 14);
  put(solid(g), prism(P, front, pr, pi, -5, 0));
  const pads = mk("path", { class: "nf lo" }, g), hatch = mk("path", { class: "nf" }, g);
  pads.setAttribute("d", SLOTS.map(([x, y]) => poly(rrect(x - 10, y - 10, x + 10, y + 10, 3, 8).map((q) => P(q.u, q.v, 0)))).join(""));
  hatch.setAttribute("d", poly(rrect(TW[0] - 10, TW[1] - 10, TW[0] + 10, TW[1] + 10, 3, 8).map((q) => P(q.u, q.v, 0))));
  const layer = mk("g", {}, g);

  /** A data block: a rounded solid with a 3 × 2 cell code on its lid; `n` lights its own cell. */
  function block(n) {
    const el = solid(layer), cells = [];
    for (let k = 0; k < 6; k++) cells.push(flatDot(el.g, C, 0.7, k === n ? "dot m" : "dot off"));
    return { el, cells, drawn: "" };
  }
  function drawBlock(b, x, y, z0, hi) {
    const lo = Math.max(0, z0), top = z0 + BH, key = [x, y, z0, hi].map((v) => +v || 0).join();
    if (key === b.drawn) return b.el.g.isConnected;
    b.drawn = key;
    const show = top - lo > 0.4;
    if (!show) { b.el.g.remove(); return false; }
    const [r, i] = rings(x - BS / 2, y - BS / 2, x + BS / 2, y + BS / 2, 2.6, 0.9);
    put(b.el, prism(P, front, r, i, lo, top));
    b.el.sil.classList.toggle("hi", hi);
    b.cells.forEach((c, k) => place(c, P(x + ((k % 3) - 1) * 3.4, y + (Math.floor(k / 3) - 0.5) * 3.6, top)));
    return true;
  }
  const floor = SLOTS.map((_, j) => block(j)), tower = [0, 1, 2].map(() => block(-1)), held = SLOTS.map((_, j) => block(j));

  // The arm: turret, two links and a gripper, each a capsule (a hull of two circles) with a dim inner line.
  const ring16 = (c, r) => Array.from({ length: 36 }, (_, k) => [c[0] + r * Math.cos((k * Math.PI) / 18), c[1] + r * Math.sin((k * Math.PI) / 18)]);
  const capsule = (a, b, r) => poly(hull(ring16(P(...a), r * SC).concat(ring16(P(...b), r * SC))));
  const part = () => { const p = mk("g", {}, layer); return { g: p, sil: mk("path", { class: "sil" }, p), cr: mk("path", { class: "nf lo" }, p) }; };
  const base = solid(layer), turret = solid(layer), upper = part(), fore = part(), grip = part();
  const joint = (grp) => ({ a: mk("ellipse", { class: "sil" }, grp), b: mk("ellipse", { class: "nf lo" }, grp) });
  const joints = [joint(upper.g), joint(fore.g)];
  const fingers = mk("path", { class: "nf" }, grip.g);
  put(base, prism(P, front, circ(15, 48), circ(13, 48), 0, 7));
  put(turret, prism(P, front, circ(8.5, 48), circ(7, 48), 7, H0 - 2));

  const depth = (x, y, z) => 0.612 * (x + y) + 0.5 * z;
  function arm(tip) {
    const yaw = Math.atan2(tip[1], tip[0]), wz = tip[2] + LG, r = Math.hypot(tip[0], tip[1]);
    const d = clamp(Math.hypot(r, wz - H0), Math.abs(L1 - L2) + 1, L1 + L2 - 0.5);
    const th = Math.atan2(wz - H0, r) + Math.acos(clamp((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
    const er = L1 * Math.cos(th), ez = H0 + L1 * Math.sin(th), cy = Math.cos(yaw), sy = Math.sin(yaw);
    const S = [0, 0, H0], E = [er * cy, er * sy, ez], W = [tip[0], tip[1], wz];
    upper.sil.setAttribute("d", capsule(S, E, 7)); upper.cr.setAttribute("d", capsule(S, E, 3.2));
    fore.sil.setAttribute("d", capsule(E, W, 5.4)); fore.cr.setAttribute("d", capsule(E, W, 2.2));
    grip.sil.setAttribute("d", capsule(W, [tip[0], tip[1], tip[2] + 3], 3.2)); grip.cr.setAttribute("d", "");
    const f = (dx, dy) => [P(tip[0] + dx, tip[1] + dy, tip[2] + 3), P(tip[0] + dx, tip[1] + dy, tip[2] - 1)];
    fingers.setAttribute("d", [f(-3.4 * sy, 3.4 * cy), f(3.4 * sy, -3.4 * cy)].map(([a, b]) => `M${a}L${b}`).join(""));
    [S, E].forEach((p, k) => { const [sx, sy2] = P(...p), rr = (k ? 6.4 : 8) * SC; for (const [el, f] of [[joints[k].a, 1], [joints[k].b, 0.45]]) { el.setAttribute("cx", sx); el.setAttribute("cy", sy2); el.setAttribute("rx", rr * f); el.setAttribute("ry", rr * f); } });
    return [[turret.g, depth(0, 0, 12)], [upper.g, depth(0, 0, H0) + 0.2], [fore.g, depth(0, 0, H0) + 0.4], [grip.g, depth(...W) + 2]];
  }

  /** Where the gripper tip is at phase s of a cycle that serves pad j. */
  function tipAt(s, j) {
    const [px, py] = SLOTS[j], A = [TW[0], TW[1], 4 * BH + HOV], Bh = [px, py, BH + HOV], Bd = [px, py, BH], T = [TW[0], TW[1], 4 * BH];
    const travel = (a, b, t) => { const q = smooth(t); return [lerp(a[0], b[0], q), lerp(a[1], b[1], q), lerp(a[2], b[2], q) + 12 * Math.sin(Math.PI * q)]; };
    if (s < 0.3) return travel(A, Bh, s / 0.3);
    if (s < 0.38) return [px, py, lerp(Bh[2], Bd[2], seg01(s, 0.3, 0.38))];
    if (s < 0.46) return [px, py, lerp(Bd[2], Bh[2], seg01(s, 0.38, 0.46))];
    if (s < 0.76) return travel(Bh, [TW[0], TW[1], 4 * BH + HOV], (s - 0.46) / 0.3);
    if (s < 0.84) return [TW[0], TW[1], lerp(4 * BH + HOV, T[2], seg01(s, 0.76, 0.84))];
    return [TW[0], TW[1], lerp(T[2], A[2], seg01(s, 0.84, 0.94))];
  }

  let order = "";
  function frame() {
    const k = Math.floor(u), s = u - k;
    if (k !== curK) { if (curK >= 0) curJ = aim >= 0 ? aim : ORDER[auto++ % ORDER.length]; curK = k; }
    const j = curJ, tip = tipAt(s, j);
    const sink = BH * seg01(s, 0.88, 1), list = arm(tip);
    floor.forEach((b, i) => {
      const z = i !== j ? 0 : s < 0.38 ? 0 : s < 0.5 ? -BH : -BH * (1 - seg01(s, 0.5, 0.9));
      if (drawBlock(b, SLOTS[i][0], SLOTS[i][1], z, false)) list.push([b.el.g, depth(SLOTS[i][0], SLOTS[i][1], z + BH / 2)]);
    });
    tower.forEach((b, i) => { if (drawBlock(b, TW[0], TW[1], i * BH - sink, false)) list.push([b.el.g, depth(TW[0], TW[1], i * BH - sink + BH / 2)]); });
    held.forEach((b, i) => {
      const on = i === j && s >= 0.38, z = s < 0.84 ? tip[2] - BH : 3 * BH - sink;
      if (!on) { b.el.g.remove(); b.drawn = ""; return; }
      const x = s < 0.84 ? tip[0] : TW[0], y = s < 0.84 ? tip[1] : TW[1];
      if (drawBlock(b, x, y, z, aim < 0)) list.push([b.el.g, s < 0.84 ? depth(...tip) + 1.9 : depth(x, y, z + BH / 2)]);
    });
    floor.forEach((b, i) => b.el.sil.classList.toggle("hi", aim >= 0 ? i === aim : i === j && s < 0.38));
    list.unshift([base.g, -1e3]);
    list.sort((a, b) => a[1] - b[1]);
    const key = list.map(([el]) => [...layer.children].indexOf(el)).join();
    if (key !== order) { list.forEach(([el]) => layer.append(el)); order = list.map(([el]) => [...layer.children].indexOf(el)).join(); }
    read.textContent = aim >= 0 ? `bloco ${aim + 1}` : "rest";
  }

  const B = register(stage, (dt) => {
    stepS(rate, dt);
    if (!reducedMotion()) u += dt * rate.x * (pace / 10);
    frame();
    return true;
  });
  bag.add(B.unregister);
  bag.add(pointer(stage, {
    move: (p) => {
      let best = -1, bd = PICK;
      for (const z of [0, BH]) {
        const [x, y] = unproj(C, p[0], p[1], z);
        SLOTS.forEach(([sx, sy], i) => { const d = Math.hypot(x - sx, y - sy); if (d < bd) { bd = d; best = i; } });
      }
      aim = best; rate.t = best >= 0 ? FAST : 1; B.wake();
    },
    leave: () => { aim = -1; rate.t = 1; B.wake(); },
  }));
  bag.add(() => svg.replaceChildren());
  frame();

  return { set: (v) => { pace = v; }, destroy: bag.dispose };
}

export default {
  name: "turno",
  means: "An arm stacks data blocks on its own; point at a block and it fetches that one next.",
  rules: [5, 6, 7, 8],
  range: [1.5, 2.5, 4],
  mount,
};
