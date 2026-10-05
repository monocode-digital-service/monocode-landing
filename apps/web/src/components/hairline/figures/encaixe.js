// @ts-nocheck
// Gerado por design/hairline/export.mjs a partir de design/hairline/encaixe.js. Não editar.
import HL from './kernel'

/**
 * Encaixe: an app window lies on the bench with a ruler along its edge; three
 * parts made for it, a button, a chart and a form, hover over the slots cut to
 * their shape. The pointer's x closes the gap until each part sits in its slot;
 * its y picks the part that takes the bright edge and goes to the read-out.
 * Left alone, the parts settle into their slots and lift again, slowly, and
 * the lit part moves on each time. The slider is the
 * widest gap, in world units.
 *
 * The pattern: scrub and pick. A spring for the gap, a pick by static screen
 * bands taken from the rest pose, dashed drops painted behind each part.
 */
const {
  Cam, clamp, facing, fit, lerp, open, poly, prism, proj, rings, rrect, seg, extremes,
  spring, stepS, flatDot, mk, place, pointer, put, register, disposer, solid, reducedMotion,
} = HL;

const WZ = 5, PT = 4, REST_GAP = 0.55, REST_PICK = 1;
const PARTS = [
  { id: "botão", x0: -9, y0: -25, x1: 23, y1: -15, r: 4, lift: 1.25 },
  { id: "gráfico", x0: 5, y0: 2, x1: 29, y1: 26, r: 3, lift: 1.0 },
  { id: "formulário", x0: -33, y0: -8, x1: -9, y1: 24, r: 3, lift: 0.8 },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let G = value, pick = -1, idleLit = -1;
  const C = Cam(45, 0.5, 2.45);
  fit(C, [[-44, -36, 0], [44, 36, 0], [44, -36, 0], [-44, 36, 0], [60, -36, 0], [60, 36, 0], [-33, -25, WZ + 34 * 1.25 + PT]], 200, 170);
  const P = proj(C), front = facing(C);
  const gap = spring(REST_GAP);

  const g = mk("g", {}, svg);
  const flat = (r, z) => poly(r.map((q) => P(q.u, q.v, z)));

  // The window: a slab with a title bar, three lights, and the slots cut to each part.
  const win = solid(g);
  put(win, prism(P, front, rrect(-44, -36, 44, 36, 6, 10), rrect(-42.4, -34.4, 42.4, 34.4, 4.4, 10), 0, WZ));
  mk("path", { class: "nf lo", d: seg(P(-41, -28, WZ), P(41, -28, WZ)) }, win.g);
  [-38, -34, -30].forEach((x) => place(flatDot(win.g, C, 0.9, "dot off"), P(x, -32, WZ)));
  mk("path", { class: "nf lo", d: PARTS.map((p) => flat(rrect(p.x0 - 1, p.y0 - 1, p.x1 + 1, p.y1 + 1, p.r + 1, 8), WZ)).join("") }, win.g);

  // The ruler along the near edge, its ticks every 4 units and longer every 16.
  const rl = solid(g);
  put(rl, prism(P, front, ...rings(48, -36, 58, 36, 2, 0.8), 0, 2.4));
  mk("path", { class: "nf lo", d: Array.from({ length: 18 }, (_, k) => seg(P(48, -34 + k * 4, 2.4), P(k % 4 ? 51 : 53.5, -34 + k * 4, 2.4))).join("") }, rl.g);

  // Parts, back to front by the centre of their footprint.
  const parts = PARTS.map((p, i) => ({ ...p, i })).sort((a, b) => a.x0 + a.y0 + a.x1 + a.y1 - (b.x0 + b.y0 + b.x1 + b.y1)).map((p) => {
    const drops = mk("path", { class: "dash" }, g), el = solid(g), marks = mk("path", { class: "nf lo" }, el.g);
    const ring = rrect(p.x0, p.y0, p.x1, p.y1, p.r, 8), inner = rrect(p.x0 + 1, p.y0 + 1, p.x1 - 1, p.y1 - 1, p.r - 1, 8);
    return { ...p, ring, inner, drops, el, marks, drawn: NaN };
  });
  const byId = (i) => parts.find((p) => p.i === i);

  /** What a part carries on its lid, so it reads as itself: a label bar, three bars, three fields. */
  function lid(p, z) {
    const cx = (p.x0 + p.x1) / 2, cy = (p.y0 + p.y1) / 2;
    if (p.i === 0) return flat(rrect(p.x0 + 6, cy - 1.4, p.x1 - 6, cy + 1.4, 1.4, 3), z);
    if (p.i === 1) return [[-6, 3], [0, 7], [6, 5]].map(([dx, h]) => open([P(cx + dx - 2, p.y1 - 5, z), P(cx + dx - 2, p.y1 - 5 - h * 1.8, z), P(cx + dx + 2, p.y1 - 5 - h * 1.8, z), P(cx + dx + 2, p.y1 - 5, z)])).join("") + seg(P(p.x0 + 4, p.y1 - 5, z), P(p.x1 - 4, p.y1 - 5, z));
    return [6, 13, 20].map((v) => flat(rrect(p.x0 + 4, p.y0 + v - 2.4, p.x1 - 4, p.y0 + v + 2.4, 1.2, 3), z)).join("");
  }
  function draw() {
    for (const p of parts) {
      const z0 = WZ - 2 + Math.max(0, gap.x) * G * p.lift;
      if (z0 === p.drawn) continue;
      p.drawn = z0;
      put(p.el, prism(P, front, p.ring, p.inner, z0, z0 + PT));
      p.marks.setAttribute("d", lid(p, z0 + PT));
      p.drops.setAttribute("d", z0 - WZ < 1.5 ? "" : extremes(P, p.ring).map((q) => seg(P(q.u, q.v, WZ), P(q.u, q.v, z0))).join(""));
    }
  }
  function choose(i) {
    if (i === pick) return;
    pick = i;
    idleLit = -1;
    const lit = i < 0 ? REST_PICK : i;
    parts.forEach((p) => p.el.sil.classList.toggle("hi", p.i === lit));
    read.textContent = i < 0 ? "rest" : byId(i).id;
  }

  // Idle: with nobody pointing, the parts slowly settle into their slots and lift again,
  // and the lit part moves to the next one each time they come up.
  const idle = !reducedMotion();
  function breathe(now) {
    const t = now / 1000, w = 0.55;
    gap.t = 0.45 + 0.4 * Math.sin(t * w);
    const k = ((Math.floor((t * w) / (2 * Math.PI) + 0.25) % 3) + 3) % 3;
    if (k === idleLit) return;
    idleLit = k;
    parts.forEach((p) => p.el.sil.classList.toggle("hi", p.i === k));
  }
  const B = register(stage, (dt, now) => {
    if (pick < 0 && idle) breathe(now);
    const m = stepS(gap, dt);
    draw();
    return m || (pick < 0 && idle);
  });
  bag.add(B.unregister);

  // Pick bands: the screen height of each part's centre at rest, which never moves.
  const bands = PARTS.map((p, i) => [i, P((p.x0 + p.x1) / 2, (p.y0 + p.y1) / 2, WZ + REST_GAP * 24 * p.lift)[1]]);
  const [L, R] = [P(-44, 36, 0)[0], P(58, -36, 0)[0]];
  bag.add(pointer(stage, {
    move: ([x, y]) => {
      gap.t = clamp((x - L) / (R - L), 0, 1);
      choose(bands.reduce((a, b) => (Math.abs(b[1] - y) < Math.abs(a[1] - y) ? b : a))[0]);
      B.wake();
    },
    leave: () => { gap.t = REST_GAP; choose(-1); B.wake(); },
  }));
  bag.add(() => svg.replaceChildren());
  pick = -2;
  choose(-1);
  draw();

  return { set: (v) => { G = v; parts.forEach((p) => (p.drawn = NaN)); B.wake(); }, destroy: bag.dispose };
}

export default {
  name: "encaixe",
  means: "Parts made to measure hover over an app window; move across to set them into their slots.",
  rules: [1, 3, 6, 8],
  range: [14, 24, 34],
  mount,
};
