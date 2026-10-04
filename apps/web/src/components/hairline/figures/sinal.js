// @ts-nocheck
// Gerado por design/hairline/export.mjs a partir de design/hairline/sinal.js. Não editar.
import HL from './kernel'

/**
 * Sinal: an agent hub on a plate, cabled to four things it works with: a phone
 * with a chat on its screen, a headset for the team, a database and a policy
 * sheet. Pulses run out along every cable all the time; the cable nearest the
 * pointer quickens and takes the bright stroke, and its device goes to the
 * read-out. At rest the headset's cable is lit: the agent knows when to call
 * someone. The slider is the lit cable's pace, in pulses per second.
 *
 * The pattern: a field picked on the ground plane, a spring per cable rate.
 */
const {
  Cam, circ, clamp, facing, fit, hull, open, poly, prism, proj, rings, ringAt, rrect, run, seg, unproj,
  spring, stepS, flatDot, mk, place, pointer, put, register, disposer, solid, reducedMotion,
} = HL;

const DEV = [
  { id: "whatsapp", at: [-56, 0] },
  { id: "time", at: [0, -56] },
  { id: "dados", at: [0, 56] },
  { id: "política", at: [56, 0] },
];
const REST = 1, IDLE = 0.22, PULSES = 3;
const shift = (ring, x, y) => ring.map((q) => ({ ...q, u: q.u + x, v: q.v + y }));

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.84);
  fit(C, [[-76, -76, -4], [76, 76, -4], [76, -76, -4], [-76, 76, -4], [0, -56, 30], [0, 0, 18]], 200, 170);
  const P = proj(C), front = facing(C);
  let pace = value, act = -1;

  const g = mk("g", {}, svg);
  const pr = rrect(-76, -76, 76, 76, 16, 14), pi = rrect(-73.8, -73.8, 73.8, 73.8, 13.8, 14);
  put(solid(g), prism(P, front, pr, pi, -4, 0));

  // Cables lie on the plate, so they are painted before every solid.
  const cables = DEV.map((d) => {
    const [x, y] = d.at, L = Math.hypot(x, y), ux = x / L, uy = y / L, nx = -uy, ny = ux;
    const a = [ux * 13, uy * 13], b = [x - ux * 13, y - uy * 13];
    const c1 = [a[0] + ux * 12 + nx * 14, a[1] + uy * 12 + ny * 14], c2 = [b[0] - ux * 12 - nx * 14, b[1] - uy * 12 - ny * 14];
    const at = (t) => { const s = 1 - t; return [0, 1].map((k) => s * s * s * a[k] + 3 * s * s * t * c1[k] + 3 * s * t * t * c2[k] + t * t * t * b[k]); };
    const path = mk("path", { class: "nf", d: open(Array.from({ length: 25 }, (_, k) => P(...at(k / 24), 0.8))) }, g);
    const dots = Array.from({ length: PULSES }, () => flatDot(g, C, 1.5, "dot off"));
    return { at, path, dots, ph: 0, rate: spring(IDLE) };
  });

  const ring = (x0, y0, x1, y1, r, b) => rings(x0, y0, x1, y1, r, b);
  const lines = (parent, d, cls) => mk("path", { class: cls, d }, parent);

  // Back to front by x + y: the phone and the headset, the hub, then the database and the sheet.
  // Phone: a thin slab, a screen, and three chat bubbles on it, alternating sides.
  const ph = solid(g), [qx, qy] = DEV[0].at;
  put(ph, prism(P, front, ...ring(qx - 9, qy - 17, qx + 9, qy + 17, 3.5, 1.2), 0, 3.5));
  const flat = (r, z) => poly(r.map((q) => P(q.u, q.v, z)));
  lines(ph.g, flat(rrect(qx - 6.5, qy - 13.5, qx + 6.5, qy + 13.5, 2.2, 4), 3.5), "nf lo");
  lines(ph.g, [[-5, -10, 1, -4], [-1, -2, 5, 4], [-5, 5, 1.5, 11]].map(([a, b, c, d]) => flat(rrect(qx + a, qy + b, qx + c, qy + d, 2, 3), 3.5)).join(""), "nf");

  // Team: a person, a body that tapers to the shoulders and a head wearing a headset.
  const [hx, hy] = DEV[1].at, hs = mk("g", {}, g), body = solid(hs);
  const e3 = [P(1, 0, 0), P(0, 1, 0), P(0, 0, 1)], o3 = P(0, 0, 0);
  const SC = Math.sqrt(e3.reduce((a, q) => a + (q[0] - o3[0]) ** 2 + (q[1] - o3[1]) ** 2, 0) / 2);
  const foot = rrect(hx - 11, hy - 7, hx + 11, hy + 7, 6, 10), top = rrect(hx - 8, hy - 5, hx + 8, hy + 5, 4.5, 10);
  const inner = rrect(hx - 7, hy - 4, hx + 7, hy + 4, 3.5, 10);
  put(body, { sil: poly(hull(ringAt(P, foot, 0).concat(ringAt(P, top, 14)))), crease: open(ringAt(P, run(inner, front), 14)) });
  const [ex, ey] = P(hx, hy, 21.5), HR = 6.4 * SC;
  mk("ellipse", { class: "sil", cx: ex, cy: ey, rx: HR, ry: HR }, hs);
  lines(hs, open(Array.from({ length: 13 }, (_, k) => { const t = Math.PI * (0.08 + (0.84 * k) / 12); return P(hx - 7.4 * Math.cos(t), hy, 21.5 + 7.4 * Math.sin(t)); })), "nf");
  lines(hs, open([P(hx - 7.4, hy + 1, 20), P(hx - 6, hy + 5, 17.5), P(hx - 2, hy + 6.5, 17)]), "nf lo");
  const mic = flatDot(hs, C, 1, "dot m"); place(mic, P(hx - 2, hy + 6.5, 17));

  // Hub: a rounded block with four ports and a status light on its lid.
  const hub = solid(g);
  put(hub, prism(P, front, ...ring(-12, -12, 12, 12, 5, 1.4), 0, 13));
  lines(hub.g, flat(rrect(-5, -5, 5, 5, 2.5, 4), 13), "nf lo");
  const light = flatDot(hub.g, C, 1.6, "dot"); place(light, P(0, 0, 13));

  // Database: a cylinder with two seams.
  const [dx, dy] = DEV[2].at, db = solid(g), dr = shift(circ(9.5, 48), dx, dy);
  put(db, prism(P, front, dr, shift(circ(8, 48), dx, dy), 0, 22));
  lines(db.g, [7.5, 15].map((z) => open(ringAt(P, run(dr, front), z))).join(""), "nf lo");

  // Policy: a clipboard, a sheet held by its clip, lines of text as rules and a signature line.
  const [sx, sy] = DEV[3].at, sh = solid(g);
  put(sh, prism(P, front, ...ring(sx - 13, sy - 17, sx + 13, sy + 17, 2.5, 1), 0, 2.4));
  lines(sh.g, flat(rrect(sx - 10, sy - 12, sx + 10, sy + 15, 1.5, 3), 2.4), "nf");
  lines(sh.g, [-7, -3, 1, 5].map((v) => seg(P(sx - 7, sy + v, 2.4), P(sx + (v > 2 ? 3 : 7), sy + v, 2.4))).join("") + seg(P(sx + 1, sy + 11, 2.4), P(sx + 7, sy + 11, 2.4)), "nf lo");
  const clip = solid(sh.g);
  put(clip, prism(P, front, ...ring(sx - 5, sy - 19, sx + 5, sy - 12, 2, 0.8), 2.4, 5.4));

  function choose(a) {
    if (a === act) return;
    act = a;
    const lit = a < 0 ? REST : a;
    cables.forEach((c, i) => {
      c.path.classList.toggle("hi", i === lit);
      c.dots.forEach((d) => d.setAttribute("class", i === lit ? "dot" : "dot off"));
      c.rate.t = i === a ? pace : IDLE;
    });
    read.textContent = a < 0 ? "rest" : DEV[a].id;
    B.wake();
  }

  const B = register(stage, (dt) => {
    for (const c of cables) {
      stepS(c.rate, dt);
      if (!reducedMotion()) c.ph = (c.ph + dt * c.rate.x) % 1;
      c.dots.forEach((d, k) => { const t = (c.ph + k / PULSES) % 1; place(d, P(...c.at(t), 0.8)); });
    }
    return true;
  });
  bag.add(B.unregister);

  /** The device nearest the pointer, read on the ground and at a device height, so a tall one is picked from its top too; none past 34 units. */
  const hit = (p) => {
    let best = -1, bd = 34;
    for (const z of [0, 14]) {
      const [x, y] = unproj(C, p[0], p[1], z);
      DEV.forEach((d, i) => { const dd = Math.hypot(x - d.at[0], y - d.at[1]); if (dd < bd) { bd = dd; best = i; } });
    }
    return best;
  };
  bag.add(pointer(stage, { move: (p) => choose(hit(p)), leave: () => choose(-1) }));
  bag.add(() => svg.replaceChildren());
  act = -2;
  choose(-1);

  return { set: (v) => { pace = clamp(v, 0.2, 3); if (act >= 0) cables[act].rate.t = pace; }, destroy: bag.dispose };
}

export default {
  name: "sinal",
  means: "An agent hub cabled to phone, team, data and policy; the cable nearest the pointer carries the signal.",
  rules: [1, 4, 7, 9],
  range: [0.5, 0.9, 1.5],
  mount,
};
