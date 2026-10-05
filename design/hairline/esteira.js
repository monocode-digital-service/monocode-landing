/**
 * Esteira: a short belt carries deliveries out of a feeder hood, through a
 * test gate and onto a production pad, where each one settles into its hatch.
 * Crates pick up a mark on the lid as they pass the gate: tested. The belt
 * never stops. Pointing at a crate lights it and slows the belt so it can be
 * followed to production; its number goes to the read-out. At rest the gate
 * is lit. The slider is the belt's pace, crates per second.
 *
 * The pattern: dilate time. A spring on the rate, every crate placed from one
 * phase, and a pick made on pointer moves only, never by the frame.
 */
const {
  Cam, clamp, facing, fit, lerp, open, poly, prism, proj, rings, rrect, seg, unproj,
  spring, stepS, flatDot, mk, place, pointer, put, register, disposer, solid, reducedMotion,
} = HL;

const HF = -70, N = 5, BX0 = -96, BX1 = 70, BW = 26, BZ = 7, CS = 15, CH = 12, GATE = -12, PAD = [70, 106], SLOW = 0.25;
const smooth = (t) => { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); };

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.78);
  fit(C, [[BX0 - 6, -BW / 2 - 6, 0], [PAD[1] + 6, BW / 2 + 6, 0], [PAD[1] + 6, -BW / 2 - 6, 0], [BX0 - 6, BW / 2 + 6, 0], [GATE, 0, BZ + 34]], 200, 170);
  const P = proj(C), front = facing(C);
  let pace = value, u = 0.35, pick = -1;
  const rate = spring(1);

  const g = mk("g", {}, svg);
  // the belt: a long slab with roller seams, and the production pad at its end, with its hatch
  put(solid(g), prism(P, front, rrect(BX0, -BW / 2, BX1, BW / 2, 5, 10), rrect(BX0 + 1.4, -BW / 2 + 1.4, BX1 - 1.4, BW / 2 - 1.4, 3.6, 10), 0, BZ));
  mk("path", { class: "nf lo", d: Array.from({ length: 14 }, (_, k) => seg(P(BX0 + 8 + k * 12, -BW / 2 + 3, BZ), P(BX0 + 8 + k * 12, BW / 2 - 3, BZ))).join("") }, g);
  const pad = solid(g);
  put(pad, prism(P, front, rrect(PAD[0], -BW / 2, PAD[1], BW / 2, 5, 10), rrect(PAD[0] + 1.4, -BW / 2 + 1.4, PAD[1] - 1.4, BW / 2 - 1.4, 3.6, 10), 0, BZ));
  const hx = (PAD[0] + PAD[1]) / 2;
  mk("path", { class: "nf", d: poly(rrect(hx - 9.5, -9.5, hx + 9.5, 9.5, 3, 8).map((q) => P(q.u, q.v, BZ))) }, pad.g);
  [-4, 0, 4].forEach((y) => place(flatDot(pad.g, C, 1.1, "dot m"), P(PAD[1] - 4, y, BZ)));

  // crates, then the gate and the hood painted in depth order with them
  const layer = mk("g", {}, g);
  const crates = Array.from({ length: N }, () => {
    const el = solid(layer), lid = flatDot(el.g, C, 1.3, "dot off");
    return { el, lid, drawn: "", vis: false };
  });
  const post = (x, y) => { const s = solid(layer); put(s, prism(P, front, ...rings(x - 2.5, y - 2.5, x + 2.5, y + 2.5, 1.2, 0.6), BZ, BZ + 30)); return s; };
  /** A sensor eye on a post's inner face, half way up: a short upright strip. */
  const eye = (post, y0, y1, behind) => {
    const [r, i] = rings(GATE - 1, y0, GATE + 1, y1, 0.4, 0.2), d = prism(P, front, r, i, BZ + 10, BZ + 22).sil;
    const el = mk("path", { class: "hi", d }, post.g);
    if (behind) post.g.prepend(el);
    return el;
  };
  const gateBack = post(GATE, -BW / 2 - 3), gateFront = post(GATE, BW / 2 + 3);
  const eyes = [eye(gateBack, -BW / 2 - 0.5, -BW / 2 + 0.6, false), eye(gateFront, BW / 2 - 0.6, BW / 2 + 0.5, true)];
  const beam = solid(layer);
  put(beam, prism(P, front, ...rings(GATE - 3, -BW / 2 - 6, GATE + 3, BW / 2 + 6, 2, 0.8), BZ + 30, BZ + 35));
  // the sensor: a thin strip under the beam, between the posts, painted before the beam
  const [sr, si] = rings(GATE - 1.6, -BW / 2, GATE + 1.6, BW / 2, 0.8, 0.4);
  const strip = prism(P, front, sr, si, BZ + 27.5, BZ + 30);
  const scan = mk("path", { class: "hi", d: strip.sil }, beam.g);
  beam.g.prepend(scan);
  const hood = solid(layer);
  put(hood, prism(P, front, ...rings(BX0, -BW / 2, BX0 + 26, BW / 2, 4, 1.2), BZ, BZ + 22));
  // the hood's mouth, on the face the crates come out of
  mk("path", { class: "nf", d: poly(rrect(-BW / 2 + 3, BZ + 1, BW / 2 - 3, BZ + 15, 3, 6).map((q) => P(BX0 + 26, q.u, q.v))) }, hood.g);

  const depth = (x, y, z) => 0.612 * (x + y) + 0.5 * z;
  /** Where crate k is along the belt, from 0 (inside the hood) to 1 (gone into the hatch). */
  const at = (k) => (u + k / N) % 1;
  /** The pad sits level with the belt, so a crate rolls straight onto it. */
  const floorAt = () => BZ;
  function place3(s) {
    const x = lerp(BX0 + 12, hx, clamp(s / 0.8, 0, 1));
    const sink = s < 0.8 ? 0 : (CH + 2) * smooth((s - 0.8) / 0.12);
    return [x, 0, floorAt(x) - sink];
  }
  // the gate's light curtain: a ring that rises over the crate passing under the beam
  const curtain = mk("path", { class: "nf hi" }, layer);

  let order = "";
  function frame() {
    const list = [[hood.g, -1e3], [gateBack.g, depth(GATE, -BW / 2 - 3, 20)], [gateFront.g, depth(GATE, BW / 2 + 3, 20)], [beam.g, depth(GATE, BW / 2 + 3, 20) + 0.5]];
    let ring = "";
    crates.forEach((c, k) => {
      const s = at(k), [x, y, z] = place3(s), lo = Math.max(z, floorAt(x)), top = z + CH;
      // only what has left the hood, and only what is above the floor, is drawn
      const x0 = Math.max(x - CS / 2, HF), x1 = x + CS / 2;
      const t = (x - (GATE - CS)) / (2 * CS);
      if (t > 0 && t < 1) ring = poly(rrect(x - CS / 2 - 2, y - CS / 2 - 2, x + CS / 2 + 2, y + CS / 2 + 2, 4, 6).map((q) => P(q.u, q.v, z + CH * smooth(t))));
      const key = [x, z, pick === k].map((v) => (+v).toFixed(2)).join();
      if (key !== c.drawn) {
        c.drawn = key;
        c.vis = !(top - lo < 0.5 || x1 - x0 < 1.5);
        if (!c.vis) { c.el.g.remove(); return; }
        const [r, i] = rings(x0, y - CS / 2, x1, y + CS / 2, Math.min(2.8, (x1 - x0) / 2), Math.min(1, (x1 - x0) / 4));
        put(c.el, prism(P, front, r, i, lo, top));
        c.el.sil.classList.toggle("hi", pick === k);
        place(c.lid, P(Math.max(x, x0 + 2), y, top));
        c.lid.setAttribute("class", x > GATE ? "dot m" : "dot off");
      }
      if (c.vis) list.push([c.el.g, depth(x, y, z + CH / 2)]);
    });
    curtain.setAttribute("d", ring);
    list.push([curtain, depth(GATE, BW / 2, BZ + CH) + 1]);
    list.sort((a, b) => a[1] - b[1]);
    const key = list.map(([el]) => [...layer.children].indexOf(el)).join();
    if (key !== order) { list.forEach(([el]) => layer.append(el)); order = list.map(([el]) => [...layer.children].indexOf(el)).join(); }
    const serial = (k) => Math.floor(u + k / N) * N + k + 1;
    scan.setAttribute("class", pick < 0 ? "hi" : "sil");
    eyes.forEach((e) => e.setAttribute("class", pick < 0 ? "hi" : "sil"));
    read.textContent = pick < 0 ? "rest" : `entrega ${serial(pick)}`;
    if (pick >= 0 && at(pick) > 0.97) { pick = -1; rate.t = 1; }
  }

  const B = register(stage, (dt) => {
    stepS(rate, dt);
    if (!reducedMotion()) u += dt * rate.x * (pace / N);
    frame();
    return true;
  });
  bag.add(B.unregister);

  /** The crate nearest the pointer along the belt, chosen when the pointer moves, never per frame. */
  bag.add(pointer(stage, {
    move: (p) => {
      let best = -1, bd = 12;
      for (const z of [BZ, BZ + CH]) {
        const [x, y] = unproj(C, p[0], p[1], z);
        if (Math.abs(y) > BW) continue;
        crates.forEach((c, k) => { const d = Math.abs(place3(at(k))[0] - x); if (d < bd && at(k) < 0.8 && at(k) > 0.08) { bd = d; best = k; } });
      }
      if (best >= 0) { pick = best; rate.t = SLOW; B.wake(); }
    },
    leave: () => { pick = -1; rate.t = 1; B.wake(); },
  }));
  bag.add(() => svg.replaceChildren());
  frame();

  return { set: (v) => { pace = v; }, destroy: bag.dispose };
}

hairline({
  name: "esteira",
  means: "Deliveries ride a belt through a test gate into production; point at one to follow it.",
  rules: [1, 5, 6, 7],
  range: [0.25, 0.45, 0.8],
  mount,
});
