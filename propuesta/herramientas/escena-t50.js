// Escena de portada: DJI Agras T50 pulverizando a contraluz, hora dorada.
// El drone se modela en 3D con las proporciones oficiales (2800 x 3085 x 820 mm desplegado,
// hélices de 1371,6 mm, rotores coaxiales) y se proyecta en perspectiva a SVG.
const fs = require('fs');

const V = (x, y, z) => ({ x, y, z });
const sum = (a, b) => V(a.x + b.x, a.y + b.y, a.z + b.z);
const sub = (a, b) => V(a.x - b.x, a.y - b.y, a.z - b.z);
const mul = (a, s) => V(a.x * s, a.y * s, a.z * s);
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const cross = (a, b) => V(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
const unit = (a) => mul(a, 1 / Math.hypot(a.x, a.y, a.z));
const r1 = (n) => Math.round(n);

// ---------- Cámara ----------
const AZ = -36 * Math.PI / 180;   // adelante a la izquierda del drone
const EL = -7 * Math.PI / 180;    // apenas por debajo, mirando un poco hacia arriba
const DIST = 9;
const OBJ = V(0, 0, 0.45);
const pos = V(DIST * Math.cos(EL) * Math.sin(AZ), DIST * Math.cos(EL) * Math.cos(AZ), OBJ.z + DIST * Math.sin(EL));
const fwd = unit(sub(OBJ, pos));
const der = unit(cross(fwd, V(0, 0, 1)));
const arr = cross(der, fwd);
const proy = (p, s) => { const d = sub(p, pos); const z = dot(d, fwd); return { x: s * dot(d, der) / z, y: -s * dot(d, arr) / z, z }; };

// Contraluz: el sol queda detrás del drone, alto
const LUZ = unit(V(0.45, -0.55, 0.7));
const hex = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const tono = (base, n, brillo = 1) => {
  const d = Math.max(0, dot(n, LUZ));
  const cal = hex('#FFD49A');
  const amb = 0.5 * brillo, dif = 0.62 * brillo;
  const c = hex(base).map((v, i) => Math.min(255, v * (amb + dif * d) + cal[i] * 0.28 * d * d));
  return '#' + c.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
};

// ---------- Primitivas ----------
const caras = [];
const cara = (pts, n, color, extra = {}) => {
  const c = mul(pts.reduce(sum, V(0, 0, 0)), 1 / pts.length);
  if (dot(n, sub(pos, c)) <= 0) return; // de espaldas a la cámara
  caras.push({ pts, n, color, prof: dot(sub(c, pos), fwd), ...extra });
};
const caja = (c, t, color, extra) => {
  const [hx, hy, hz] = t.map((v) => v / 2);
  const p = (sx, sy, sz) => V(c.x + sx * hx, c.y + sy * hy, c.z + sz * hz);
  cara([p(-1, -1, 1), p(1, -1, 1), p(1, 1, 1), p(-1, 1, 1)], V(0, 0, 1), color, extra);
  cara([p(-1, -1, -1), p(-1, 1, -1), p(1, 1, -1), p(1, -1, -1)], V(0, 0, -1), color, extra);
  cara([p(1, -1, -1), p(1, 1, -1), p(1, 1, 1), p(1, -1, 1)], V(1, 0, 0), color, extra);
  cara([p(-1, -1, -1), p(-1, -1, 1), p(-1, 1, 1), p(-1, 1, -1)], V(-1, 0, 0), color, extra);
  cara([p(-1, 1, -1), p(-1, 1, 1), p(1, 1, 1), p(1, 1, -1)], V(0, 1, 0), color, extra);
  cara([p(-1, -1, -1), p(1, -1, -1), p(1, -1, 1), p(-1, -1, 1)], V(0, -1, 0), color, extra);
};
const tubo = (a, b, r, color, seg = 10, tapas = true) => {
  const eje = unit(sub(b, a));
  const u = unit(cross(eje, Math.abs(eje.z) < 0.9 ? V(0, 0, 1) : V(1, 0, 0)));
  const w = cross(eje, u);
  const anillo = (o) => Array.from({ length: seg }, (_, i) => {
    const t = (i / seg) * Math.PI * 2;
    return sum(o, sum(mul(u, Math.cos(t) * r), mul(w, Math.sin(t) * r)));
  });
  const A = anillo(a), B = anillo(b);
  for (let i = 0; i < seg; i++) {
    const j = (i + 1) % seg;
    const n = unit(sub(mul(sum(A[i], A[j]), 0.5), a));
    cara([A[i], A[j], B[j], B[i]], n, color);
  }
  if (tapas) { cara([...B].reverse(), eje, color); cara(A, mul(eje, -1), color); }
};
const cilindro = (base, r, h, color, seg = 16) => tubo(base, sum(base, V(0, 0, h)), r, color, seg);

// ---------- DJI Agras T50 ----------
const MOT = [[-0.72, 0.86], [0.72, 0.86], [-0.72, -0.86], [0.72, -0.86]];
const Z_BRAZO = 0.62;
const NEGRO = '#1D201E', GRIS = '#3A3F3B', GRIS_C = '#565C57', BLANCO = '#E6E4DC';

// Cuerpo, batería, radar y antena
caja(V(0, 0, 0.6), [0.46, 0.8, 0.2], GRIS);
caja(V(0, -0.12, 0.77), [0.32, 0.38, 0.14], GRIS_C);
caja(V(0, 0.44, 0.58), [0.32, 0.07, 0.17], NEGRO);
caja(V(0, -0.44, 0.58), [0.26, 0.06, 0.13], NEGRO);
cilindro(V(0, 0.16, 0.7), 0.035, 0.1, NEGRO, 10);
cilindro(V(0, 0.16, 0.8), 0.07, 0.025, NEGRO, 14);
// Tanque de 40 L con nervaduras
caja(V(0, 0.02, 0.37), [0.42, 0.5, 0.28], BLANCO, { brillo: 1.35 });
for (const z of [0.29, 0.37, 0.45]) caja(V(0, 0.02, z), [0.43, 0.51, 0.014], '#C9C7BE', { brillo: 1.3 });
cilindro(V(0, 0.02, 0.2), 0.06, 0.04, NEGRO, 12);
// Brazos plegables con bisagra
for (const [mx, my] of MOT) {
  const ini = V(Math.sign(mx) * 0.2, Math.sign(my) * 0.3, Z_BRAZO);
  const fin = V(mx, my, Z_BRAZO);
  tubo(ini, fin, 0.042, NEGRO, 10);
  caja(sum(ini, mul(sub(fin, ini), 0.22)), [0.11, 0.11, 0.1], GRIS);
}
// Motores coaxiales (dos por brazo), uno arriba y otro abajo
for (const [mx, my] of MOT) {
  cilindro(V(mx, my, 0.66), 0.09, 0.1, NEGRO);
  cilindro(V(mx, my, 0.5), 0.09, 0.1, NEGRO);
  cilindro(V(mx, my, 0.6), 0.06, 0.06, GRIS);
  cilindro(V(mx, my, 0.76), 0.045, 0.02, GRIS_C, 12);
  cilindro(V(mx, my, 0.48), 0.045, 0.02, GRIS_C, 12);
}
// Luces delanteras
for (const [mx, my] of MOT.slice(0, 2)) caja(V(mx, my + 0.1, 0.56), [0.05, 0.04, 0.03], '#E2503C', { brillo: 1.6 });
// Atomizadores centrífugos bajo los brazos traseros
for (const [mx, my] of MOT.slice(2)) {
  tubo(V(mx, my, 0.5), V(mx, my, 0.36), 0.022, NEGRO, 8, false);
  cilindro(V(mx, my, 0.3), 0.05, 0.07, GRIS, 14);
  cilindro(V(mx, my, 0.28), 0.075, 0.02, GRIS_C, 16);
}
// Tren de aterrizaje
for (const s of [-1, 1]) {
  const x = s * 0.31, xp = s * 0.36;
  for (const y of [-0.26, 0.26]) tubo(V(x, y, 0.47), V(xp, y * 1.35, 0.03), 0.026, NEGRO, 8, false);
  tubo(V(xp, -0.5, 0.03), V(xp, 0.5, 0.03), 0.028, NEGRO, 8);
  tubo(V(x * 0.95, -0.3, 0.25), V(x * 0.95, 0.3, 0.25), 0.018, NEGRO, 8, false);
}

// ---------- Discos de las hélices (movimiento) ----------
const disco = (c, r, n = 56) => Array.from({ length: n }, (_, i) => {
  const t = (i / n) * Math.PI * 2;
  return V(c.x + Math.cos(t) * r, c.y + Math.sin(t) * r, c.z);
});
const ruta = (pts, s) => 'M' + pts.map((p) => { const q = proy(p, s); return `${r1(q.x)} ${r1(q.y)}`; }).join('L') + 'Z';
const arco = (c, r, a0, a1, s) => {
  const pts = Array.from({ length: 12 }, (_, i) => { const t = a0 + (a1 - a0) * i / 11; return V(c.x + Math.cos(t) * r, c.y + Math.sin(t) * r, c.z); });
  return 'M' + pts.map((p) => { const q = proy(p, s); return `${r1(q.x)} ${r1(q.y)}`; }).join('L');
};
const R_HELICE = 0.686;
const helices = (z, s, k) => MOT.map(([mx, my], i) => {
  const c = V(mx, my, z);
  const a = (i * 1.7 + k) % (Math.PI * 2);
  return `<path d="${ruta(disco(c, R_HELICE), s)}" fill="#1D201E" fill-opacity=".15" stroke="#FFD9A0" stroke-opacity=".3" stroke-width="1.2"/>`
    + `<path d="${arco(c, R_HELICE * 0.92, a, a + 0.7, s)}" fill="none" stroke="#1D201E" stroke-opacity=".45" stroke-width="2.4" stroke-linecap="round"/>`
    + `<path d="${arco(c, R_HELICE * 0.92, a + Math.PI, a + Math.PI + 0.7, s)}" fill="none" stroke="#1D201E" stroke-opacity=".45" stroke-width="2.4" stroke-linecap="round"/>`;
}).join('');

// ---------- Pulverización ----------
const casco = (pts) => {
  pts = [...pts].sort((a, b) => a.x - b.x || a.y - b.y);
  const cr = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
  const lo = [], hi = [];
  for (const p of pts) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
  for (const p of [...pts].reverse()) { while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], p) <= 0) hi.pop(); hi.push(p); }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
};
const Z_CULTIVO = -1.6;
const columnas = (s, id) => MOT.slice(2).map(([mx, my], i) => {
  const cono = (r0, r1_, atras) => casco([
    ...disco(V(mx, my, 0.27), r0, 16).map((p) => proy(p, s)),
    ...disco(V(mx, my - atras, Z_CULTIVO), r1_, 28).map((p) => proy(p, s)),
  ]);
  const camino = (h) => `M${h.map((p) => `${r1(p.x)} ${r1(p.y)}`).join('L')}Z`;
  const top = proy(V(mx, my, 0.27), s), base = proy(V(mx, my - 0.25, Z_CULTIVO), s);
  const g = `${id}-col${i}`;
  const halo = disco(V(mx, my - 0.25, Z_CULTIVO), 1.1, 32).map((p) => proy(p, s));
  const hx = halo.reduce((m, p) => m + p.x, 0) / halo.length, hy = halo.reduce((m, p) => m + p.y, 0) / halo.length;
  const hr = Math.max(...halo.map((p) => Math.abs(p.x - hx)));
  let gotas = '';
  for (let k = 0; k < 18; k++) {
    const t = ((k * 0.37) % 1) * 0.75;
    const x = top.x + (base.x - top.x) * t + ((k * 53) % 21 - 10) * (0.25 + t * 1.6);
    const y = top.y + (base.y - top.y) * t;
    gotas += `<ellipse class="gota" cx="${r1(x)}" cy="${r1(y)}" rx="1.1" ry="5" style="animation-delay:-${(k * 0.11).toFixed(2)}s"/>`;
  }
  return `<linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="0" y1="${r1(top.y)}" x2="0" y2="${r1(base.y)}"><stop offset="0" stop-color="#FFF8E4" stop-opacity="1"/><stop offset=".35" stop-color="#FFE3A6" stop-opacity=".85"/><stop offset=".8" stop-color="#F6C574" stop-opacity=".4"/><stop offset="1" stop-color="#F2B35E" stop-opacity=".08"/></linearGradient>`
    + `<radialGradient id="${g}-h"><stop offset="0" stop-color="#FFE3A6" stop-opacity=".45"/><stop offset="1" stop-color="#FFE3A6" stop-opacity="0"/></radialGradient>`
    + `<ellipse cx="${r1(hx)}" cy="${r1(hy)}" rx="${r1(hr * 1.3)}" ry="${r1(hr * 0.32)}" fill="url(#${g}-h)"/>`
    + `<path d="${camino(cono(0.45, 1.3, 0.35))}" fill="url(#${g})" opacity=".6" filter="url(#${id}-bruma-f)"/>`
    + `<path d="${camino(cono(0.28, 0.85, 0.25))}" fill="url(#${g})" filter="url(#${id}-difuso)"/>`
    + `<g class="gotas" fill="#FFF3D6">${gotas}</g>`;
}).join('');

// ---------- Dibujo del drone ----------
const dron = (s, id) => {
  const piezas = [...caras].sort((a, b) => b.prof - a.prof).map((f) => {
    const col = tono(f.color, f.n, f.brillo || 1);
    const d = 'M' + f.pts.map((p) => { const q = proy(p, s); return `${r1(q.x)} ${r1(q.y)}`; }).join('L') + 'Z';
    return `<path d="${d}" fill="${col}" stroke="${col}" stroke-width=".6" stroke-linejoin="round"/>`;
  }).join('');
  // Marca "T50" sobre el costado izquierdo del cuerpo
  const p0 = proy(V(-0.231, 0.22, 0.56), s), p1 = proy(V(-0.231, -0.1, 0.56), s), p2 = proy(V(-0.231, 0.22, 0.66), s);
  const m = [(p1.x - p0.x) / 32, (p1.y - p0.y) / 32, (p2.x - p0.x) / -10, (p2.y - p0.y) / -10, p0.x, p0.y].map((v) => v.toFixed(3));
  const marca = `<text transform="matrix(${m.join(' ')})" font-family="Manrope, sans-serif" font-weight="800" font-size="9.5" fill="#E9E4D6" fill-opacity=".9">T50</text>`;
  return `<g class="t50-columnas">${columnas(s, id)}</g>${helices(0.49, s, 0.4)}${piezas}${marca}${helices(0.775, s, 2.1)}`;
};

const horizonte = (s) => { const h = unit(V(fwd.x, fwd.y, 0)); return proy(sum(pos, mul(h, 1e4)), s).y; };

// ---------- Paisaje ----------
let semilla = 11;
const azar = () => (semilla = (semilla * 16807) % 2147483647) / 2147483647;
const lomas = (ancho, base, alto, paso, color, op = 1) => {
  let d = `M0 ${base}`;
  let x = 0;
  while (x < ancho) {
    const w = paso * (0.6 + azar() * 0.9), hh = alto * (0.4 + azar() * 0.7);
    d += ` Q${r1(x + w / 2)} ${r1(base - hh * 2)} ${r1(x + w)} ${base}`;
    x += w;
  }
  return `<path d="${d} L${ancho} ${base + 400} L0 ${base + 400}Z" fill="${color}" fill-opacity="${op}"/>`;
};

// Montes de árboles sobre el horizonte (la pampa es plana)
const montes = (W, hz, H, color, op, alto, capa) => {
  let d = '';
  const grupos = capa ? [0.04, 0.3, 0.47, 0.83] : [0.12, 0.22, 0.62, 0.72, 0.95];
  for (const g of grupos) {
    const cx = g * W, ancho = W * (0.05 + azar() * 0.06);
    for (let x = cx - ancho / 2; x < cx + ancho / 2; x += W * 0.006) {
      const r = H * alto * (0.5 + azar() * 0.6);
      d += `M${r1(x - r)} ${hz} A${r1(r)} ${r1(r * 1.3)} 0 0 1 ${r1(x + r)} ${hz}Z`;
    }
  }
  return `<path d="${d}" fill="${color}" fill-opacity="${op}"/>`;
};
// Cultivo en primer plano, a contraluz
const cultivo = (W, H) => {
  let d = `M0 ${H}`;
  for (let x = 0; x <= W; x += W / 260) {
    const h = H * (0.025 + azar() * 0.035);
    d += ` L${r1(x)} ${r1(H - h * 0.35)} L${r1(x + W / 520)} ${r1(H - h)}`;
  }
  return `<path d="${d} L${W} ${H}Z" fill="#141B10"/>`;
};

const escena = ({ id, ajuste = 'xMidYMid slice', W, H, cx, cy, s, sol }) => {
  const hz = Math.round(cy + horizonte(s));
  semilla = 11;
  const surcos = Array.from({ length: 40 }, (_, i) => {
    const xb = sol.x + (i - 20) * W / 9;
    return `<path d="M${r1(sol.x)} ${hz} L${r1(xb)} ${H}"/>`;
  }).join('');
  return `<svg class="escena" id="${id}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="${ajuste}" role="img" aria-label="Ilustración de un DJI Agras T50 pulverizando un cultivo a contraluz, al atardecer">
<defs>
<linearGradient id="${id}-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5B4E37"/><stop offset=".3" stop-color="#B58450"/><stop offset=".55" stop-color="#E9BC78"/><stop offset="${(hz / H).toFixed(2)}" stop-color="#FBE3AE"/></linearGradient>
<radialGradient id="${id}-sol" cx="${sol.x}" cy="${sol.y}" r="${W * 0.55}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFFBEA"/><stop offset=".07" stop-color="#FFEBB8" stop-opacity=".95"/><stop offset=".3" stop-color="#F7C978" stop-opacity=".5"/><stop offset="1" stop-color="#F7C978" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}-campo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C2A065"/><stop offset=".12" stop-color="#7D7440"/><stop offset=".45" stop-color="#404826"/><stop offset="1" stop-color="#162011"/></linearGradient>
<linearGradient id="${id}-bruma" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7B5" stop-opacity="0"/><stop offset=".7" stop-color="#FFE7B5" stop-opacity=".75"/><stop offset="1" stop-color="#FFE7B5" stop-opacity="0"/></linearGradient>
<filter id="${id}-difuso" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="${(s / 260).toFixed(1)}"/></filter>
<filter id="${id}-bruma-f" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="${(s / 90).toFixed(1)}"/></filter>
<filter id="${id}-nube" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="${(W / 90).toFixed(1)}"/></filter>
</defs>
<rect width="${W}" height="${H}" fill="url(#${id}-cielo)"/>
<g filter="url(#${id}-nube)" fill="#FFE2A8" fill-opacity=".45">
<ellipse cx="${W * 0.18}" cy="${hz * 0.42}" rx="${W * 0.2}" ry="${H * 0.03}"/>
<ellipse cx="${W * 0.55}" cy="${hz * 0.3}" rx="${W * 0.16}" ry="${H * 0.025}"/>
<ellipse cx="${W * 0.9}" cy="${hz * 0.52}" rx="${W * 0.18}" ry="${H * 0.03}"/>
</g>
<rect width="${W}" height="${H}" fill="url(#${id}-sol)"/>
<g fill="#FFF0C8" fill-opacity=".07"><path d="M${sol.x} ${sol.y} L${sol.x - W * 0.5} ${H} L${sol.x - W * 0.38} ${H}Z"/><path d="M${sol.x} ${sol.y} L${sol.x - W * 0.2} ${H} L${sol.x - W * 0.1} ${H}Z"/><path d="M${sol.x} ${sol.y} L${sol.x + W * 0.12} ${H} L${sol.x + W * 0.24} ${H}Z"/></g>
${montes(W, hz, H, '#C9A56B', 0.7, 0.012, 0)}
${montes(W, hz + 2, H, '#8C7745', 0.9, 0.02, 1)}
<rect y="${hz - H * 0.05}" width="${W}" height="${H * 0.08}" fill="url(#${id}-bruma)"/>
<rect y="${hz + 3}" width="${W}" height="${H - hz}" fill="url(#${id}-campo)"/>
<g fill="#FFD58C">
<path d="M0 ${hz + (H - hz) * 0.18} C${W * 0.3} ${hz + (H - hz) * 0.1} ${W * 0.55} ${hz + (H - hz) * 0.22} ${W} ${hz + (H - hz) * 0.12} V${hz + (H - hz) * 0.3} C${W * 0.6} ${hz + (H - hz) * 0.4} ${W * 0.3} ${hz + (H - hz) * 0.26} 0 ${hz + (H - hz) * 0.36}Z" fill-opacity=".07"/>
<path d="M0 ${hz + (H - hz) * 0.55} C${W * 0.3} ${hz + (H - hz) * 0.45} ${W * 0.6} ${hz + (H - hz) * 0.6} ${W} ${hz + (H - hz) * 0.48} V${hz + (H - hz) * 0.62} C${W * 0.6} ${hz + (H - hz) * 0.74} ${W * 0.3} ${hz + (H - hz) * 0.6} 0 ${hz + (H - hz) * 0.7}Z" fill-opacity=".05"/>
</g>
<g stroke="#FFD58C" stroke-opacity=".07" stroke-width="1.2" fill="none">${surcos}</g>
<g transform="translate(${cx} ${cy})"><g class="t50">${dron(s, id)}</g></g>
${cultivo(W, H)}
</svg>`;
};

const escritorio = escena({ id: 'esc-a', ajuste: 'xMaxYMid slice', W: 1600, H: 1000, cx: 1240, cy: 330, s: 1720, sol: { x: 1380, y: 230 } });
const movil = escena({ id: 'esc-m', W: 900, H: 620, cx: 470, cy: 210, s: 1400, sol: { x: 640, y: 120 } });
fs.writeFileSync(process.argv[2], JSON.stringify({ escritorio, movil }));
// Uso: node escena-t50.js salida.json
console.log('escritorio', (escritorio.length / 1024).toFixed(1), 'KB · móvil', (movil.length / 1024).toFixed(1), 'KB · caras', caras.length);
