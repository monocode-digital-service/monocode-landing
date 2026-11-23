/**
 * Evolução: the delivered solution stands on a plate, inside a loop that never
 * stops. A pulse runs the loop; each time it reaches one of the three gauges
 * standing on it, that gauge takes the bright stroke and settles at a new
 * height: the solution is watched every day and adjusted as the company
 * changes. At rest the gauge in front is the lit one. The slider is the pace,
 * in laps per ten seconds.
 *
 * The pattern: a continuous clock on a closed path, a spring per gauge.
 */
const {
  Cam, circ, facing, fit, poly, prism, proj, rings, rrect,
  spring, stepS, flatDot, mk, place, put, register, disposer, solid, reducedMotion,
} = HL;

const R = 52, HUB = 17, HUB_H = 22, G = 6.5, TAU = Math.PI * 2, NEAR = 0.26;
// Where each gauge stands on the loop, in degrees, and the heights it settles at, in turn.
// Two stand behind the hub, left and right; the third stands in front of it.
const GAUGES = [
  { at: 155, levels: [9, 17, 12] },
  { at: 295, levels: [15, 8, 19] },
  { at: 45, levels: [11, 20, 14] },
];

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.92);
  fit(C, [[-76, -76, -4], [76, 76, -4], [76, -76, -4], [-76, 76, -4], [0, 0, HUB_H + 4]], 200, 170);
  const P = proj(C), front = facing(C);
  let pace = value, active = -1;

  const g = mk("g", {}, svg);
  put(solid(g), prism(P, front, rrect(-76, -76, 76, 76, 16, 14), rrect(-73.8, -73.8, 73.8, 73.8, 13.8, 14), -4, 0));

  // The loop lies on the plate, so it and its pulse are painted before every solid.
  mk("path", { class: "nf", d: poly(circ(R, 72).map((q) => P(q.u, q.v, 0.6))) }, g);
  const pulse = flatDot(g, C, 2.4, "dot");

  const gauges = GAUGES.map((d, k) => {
    const a = (d.at * Math.PI) / 180, x = R * Math.cos(a), y = R * Math.sin(a);
    return { k, a, x, y, levels: d.levels, lv: 0, h: spring(d.levels[0], { k: 60, c: 13 }), drawn: -1, ring: rings(x - G, y - G, x + G, y + G, 2.6, 1), el: null };
  });

  // Back to front by x + y: the gauges behind the hub, the hub, the gauge in front of it.
  const order = [...gauges.map((q) => ({ q, d: q.x + q.y })), { q: null, d: 0 }].sort((m, n) => m.d - n.d);
  for (const { q } of order) {
    if (q) { q.el = solid(g); continue; }
    const hub = solid(g);
    put(hub, prism(P, front, ...rings(-HUB, -HUB, HUB, HUB, 6, 1.6), 0, HUB_H));
    mk("path", { class: "nf lo", d: poly(rrect(-9, -9, 9, 9, 3.5, 6).map((s) => P(s.u, s.v, HUB_H))) }, hub.g);
    place(flatDot(hub.g, C, 1.8, "dot"), P(0, 0, HUB_H));
  }

  function draw(q) {
    const h = q.h.x;
    if (Math.abs(h - q.drawn) < 0.02) return;
    q.drawn = h;
    put(q.el, prism(P, front, q.ring[0], q.ring[1], 0, h));
  }
  // The pulse reached a gauge: it takes the bright stroke and moves to its next height.
  function reach(k) {
    if (k === active) return;
    active = k;
    for (const q of gauges) q.el.sil.setAttribute("class", q.k === k ? "sil hi" : "sil");
    const q = gauges[k];
    q.lv = (q.lv + 1) % q.levels.length;
    q.h.t = q.levels[q.lv];
    read.textContent = "ajuste " + (k + 1);
  }

  // Starts just past the gauge in front, with that one lit.
  let th = gauges[2].a + 0.5;
  reach(2);

  const idle = !reducedMotion();
  const B = register(stage, (dt) => {
    if (idle) th = (th + (dt * pace * TAU) / 10) % TAU;
    place(pulse, P(R * Math.cos(th), R * Math.sin(th), 0.6));
    for (const q of gauges) {
      const d = Math.abs((((th - q.a) % TAU) + TAU + Math.PI) % TAU - Math.PI);
      if (d < NEAR) reach(q.k);
    }
    let moving = false;
    for (const q of gauges) {
      if (stepS(q.h, dt)) moving = true;
      draw(q);
    }
    return moving || idle;
  });
  bag.add(B.unregister);
  bag.add(() => svg.replaceChildren());

  return { set: (v) => { pace = v; B.wake(); }, destroy: bag.dispose };
}

hairline({
  name: "evolucao",
  means: "The delivered solution inside a loop that never stops; each gauge the pulse reaches settles at a new height.",
  rules: [1, 5, 6, 7],
  range: [0.8, 1.4, 2.5],
  mount,
});
