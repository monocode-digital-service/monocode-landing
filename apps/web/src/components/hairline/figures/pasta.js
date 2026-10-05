// @ts-nocheck
// Gerado por design/hairline/export.mjs a partir de design/hairline/pasta.js. Não editar.
import HL from './kernel'

/**
 * Pasta: an open file folder with four dividers standing in it, each tab cut at
 * its own place along the top. Pointing at a
 * divider pulls it up and the ones around it lean away in turn; its name goes
 * to the read-out. Left alone, the dividers rise in turn, one at a time.
 * The slider is the stagger, in ms.
 *
 * The pattern: one of many. Tweens, a stagger by distance, picks on static
 * bands along the dividers' resting top edges.
 */
const {
  Cam, clamp, facing, fillet, fit, hull, open, poly, proj, rad, ringAt, rrect, run, seg,
  tdone, tset, tval, tween, disposer, mk, pointer, register, reducedMotion,
} = HL;

const NAMES = ["escopo", "investimento", "cronograma", "dados"];
const N = 4, W = 92, H = 58, G = 17, TW = 20, TH = 8, TABS = [6, 26, 46, 66], TK = 1.4;
const REST = -10, BACK = -22, FWD = 18, LIFT = 18;
const X0 = -6, X1 = W + 6, Y0 = -10, Y1 = (N - 1) * G + 10, WH = 22;

function divider(i) {
  const t0 = TABS[i];
  return fillet(
    [[0, 0], [W, 0], [W, H], [t0 + TW, H], [t0 + TW, H + TH], [t0, H + TH], [t0, H], [0, H]],
    [1, 1, 3.2, 1.8, 2.4, 2.4, 1.8, 3.2],
  );
}
function pose(P, i, shape, th, lift) {
  const yb = i * G, s = Math.sin(rad(th)), c = Math.cos(rad(th));
  const w = (u, v) => P(u, yb + v * s, v * c + lift), wb = (u, v) => P(u, yb + v * s - TK * c, v * c + TK * s + lift);
  return {
    back: poly(shape.map((p) => wb(p[0], p[1]))),
    face: poly(shape.map((p) => w(p[0], p[1]))),
    rules: [H - 12, H - 20, H - 28].map((v, k) => seg(w(8, v), w(W - (k === 2 ? 40 : 8), v))).join(""),
  };
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let stag = value;
  const C = Cam(45, 0.5, 1.92);
  fit(C, [[X0, Y0, 0], [X1, Y1, 0], [X1, Y0, 0], [X0, Y1, 0], [X0, Y0, H + TH + LIFT]], 200, 170);
  const P = proj(C), front = facing(C);
  const outer = rrect(X0, Y0, X1, Y1, 6, 8), inner = rrect(X0 + 2.4, Y0 + 2.4, X1 - 2.4, Y1 - 2.4, 3.6, 8);

  const g = mk("g", {}, svg);
  // the folder's back and floor, behind the dividers
  mk("path", { class: "sil", d: poly(hull(ringAt(P, outer, 0).concat(ringAt(P, outer, WH)))) }, g);
  mk("path", { class: "nf", d: poly(ringAt(P, inner, WH)) }, g);
  mk("path", { class: "nf lo", d: open(ringAt(P, run(inner, (q) => !front(q)), 2.5)) }, g);

  const cards = [];
  for (let i = 0; i < N; i++) {
    const grp = mk("g", {}, g);
    cards.push({
      shape: divider(i), back: mk("path", { class: "lo" }, grp), face: mk("path", { class: "sil" }, grp), rules: mk("path", { class: "nf lo" }, grp),
      a: tween(REST), z: tween(0),
    });
  }

  // the folder's near wall, over the dividers
  const LR = (pts) => (pts[0][0] <= pts[pts.length - 1][0] ? pts : pts.slice().reverse());
  const iF = LR(ringAt(P, run(inner, front), WH)), oT = LR(ringAt(P, run(outer, front), WH)), oB = LR(ringAt(P, run(outer, front), 0));
  mk("path", { class: "fo", d: poly([...iF, oT[oT.length - 1], ...oB.slice().reverse(), oT[0]]) }, g);
  mk("path", { class: "nf lo", d: open(oT) }, g);
  mk("path", { class: "nf", d: open(iF) }, g);
  mk("path", { class: "nf sil", d: open([oT[0], ...oB, oT[oT.length - 1]]) }, g);

  // hit bands along the resting top edges; nothing draws them
  const top = (i) => P(W / 2, i * G + H * Math.sin(rad(REST)), H * Math.cos(rad(REST)));
  const c0 = top(0), c1 = top(1), d = [c1[0] - c0[0], c1[1] - c0[1]];
  const px0 = P(0, 0, 0), px1 = P(1, 0, 0), ex = [px1[0] - px0[0], px1[1] - px0[1]];
  const HALF = W / 2 + 6, det = d[0] * ex[1] - d[1] * ex[0];
  function hit([x, y]) {
    const qx = x - c0[0], qy = y - c0[1];
    const s = (qx * ex[1] - qy * ex[0]) / det, r = (d[0] * qy - d[1] * qx) / det;
    if (Math.abs(r) > HALF || s < -0.5 || s > N + 0.5) return -1;
    return clamp(Math.round(s), 0, N - 1);
  }

  let act = -2;
  // Idle: with nobody pointing, one divider at a time half rises, in turn, so the folder breathes.
  const idle = !reducedMotion();
  let idleIdx = -1;
  function breathe(now) {
    const k = Math.floor(now / 2600) % N;
    if (k === idleIdx) return;
    idleIdx = k;
    cards.forEach((cd, i) => {
      tset(cd.a, i === k ? -2 : REST, now, 0);
      tset(cd.z, i === k ? LIFT * 0.45 : 0, now, 0);
      cd.face.classList.toggle("hi", i === k);
    });
  }
  const B = register(stage, (_dt, now) => {
    if (act < 0 && idle) breathe(now);
    let moving = act < 0 && idle;
    cards.forEach((cd, i) => {
      const q = pose(P, i, cd.shape, tval(cd.a, now), tval(cd.z, now));
      cd.back.setAttribute("d", q.back); cd.face.setAttribute("d", q.face); cd.rules.setAttribute("d", q.rules);
      if (!tdone(cd.a, now) || !tdone(cd.z, now)) moving = true;
    });
    return moving;
  });
  bag.add(B.unregister);

  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : Math.max(act, 0);
    act = a;
    idleIdx = -1;
    cards.forEach((cd, i) => {
      const delay = Math.abs(i - from) * stag;
      tset(cd.a, a < 0 ? REST : i < a ? BACK : i > a ? FWD : 0, now, delay);
      tset(cd.z, a === i ? LIFT : 0, now, delay);
      cd.face.classList.toggle("hi", i === (a < 0 ? 0 : a));
    });
    read.textContent = a < 0 ? "rest" : NAMES[a];
    B.wake();
  }
  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());
  setActive(-1);

  return { set: (v) => { stag = v; }, destroy: bag.dispose };
}

export default {
  name: "pasta",
  means: "A folder of four dividers, scope to data; the divider under the pointer comes up.",
  rules: [1, 2, 4, 8],
  range: [0, 45, 90],
  mount,
};
