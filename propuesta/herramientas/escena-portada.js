// Escena de portada: el T50 real (recortado de la foto) pulverizando sobre un atardecer.
// El fondo es vectorial (cielo, sol, montes y cultivo); el drone es la foto recortada
// y las columnas de pulverización salen de la punta de sus dos atomizadores.
// Uso: node escena-portada.js salida.json [ruta-o-data-uri-del-recorte]
const fs = require('fs');

const r1 = (n) => Math.round(n);
const RECORTE = { ancho: 762, alto: 248, atomizadores: [[134, 189], [525, 188]] };
const SRC = process.argv[3] || 'img/t50-recorte.webp';

let semilla = 11;
const azar = () => (semilla = (semilla * 16807) % 2147483647) / 2147483647;

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

// Drone y pulverización. x, y: esquina del recorte en la escena; ancho: ancho del drone en la escena
const dron = ({ id, x, y, ancho, baseY }) => {
  const k = ancho / RECORTE.ancho;
  const alto = RECORTE.alto * k;
  const columnas = RECORTE.atomizadores.map(([ax, ay], i) => {
    const nx = x + ax * k, ny = y + ay * k;
    const largo = baseY - ny;
    const g = `${id}-col${i}`;
    const tronco = (arriba, abajo, deriva) =>
      `M${r1(nx - arriba)} ${r1(ny)} L${r1(nx + arriba)} ${r1(ny)} L${r1(nx + abajo + deriva)} ${r1(baseY)} L${r1(nx - abajo + deriva)} ${r1(baseY)}Z`;
    let gotas = '';
    for (let n = 0; n < 18; n++) {
      const t = ((n * 0.37) % 1) * 0.7;
      const gx = nx + ((n * 53) % 21 - 10) * ancho * 0.0022 * (0.4 + t * 2.4) + t * ancho * 0.04;
      gotas += `<ellipse class="gota" cx="${r1(gx)}" cy="${r1(ny + largo * t)}" rx="${(ancho / 520).toFixed(1)}" ry="${(ancho / 110).toFixed(1)}" style="animation-delay:-${(n * 0.11).toFixed(2)}s"/>`;
    }
    return `<linearGradient id="${g}" gradientUnits="userSpaceOnUse" x1="0" y1="${r1(ny)}" x2="0" y2="${r1(baseY)}"><stop offset="0" stop-color="#FFF8E4"/><stop offset=".35" stop-color="#FFE3A6" stop-opacity=".85"/><stop offset=".8" stop-color="#F6C574" stop-opacity=".35"/><stop offset="1" stop-color="#F2B35E" stop-opacity="0"/></linearGradient>`
      + `<radialGradient id="${g}-h"><stop offset="0" stop-color="#FFE3A6" stop-opacity=".5"/><stop offset="1" stop-color="#FFE3A6" stop-opacity="0"/></radialGradient>`
      + `<ellipse cx="${r1(nx + ancho * 0.05)}" cy="${r1(baseY - largo * 0.04)}" rx="${r1(ancho * 0.32)}" ry="${r1(ancho * 0.05)}" fill="url(#${g}-h)"/>`
      + `<path d="${tronco(ancho * 0.04, ancho * 0.22, ancho * 0.06)}" fill="url(#${g})" opacity=".6" filter="url(#${id}-bruma-f)"/>`
      + `<path d="${tronco(ancho * 0.018, ancho * 0.12, ancho * 0.04)}" fill="url(#${g})" filter="url(#${id}-difuso)"/>`
      + `<g class="gotas" fill="#FFF3D6">${gotas}</g>`;
  }).join('');
  return `<g class="t50"><g class="t50-columnas">${columnas}</g><image href="${SRC}" x="${r1(x)}" y="${r1(y)}" width="${r1(ancho)}" height="${r1(alto)}"/></g>`;
};

const escena = ({ id, ajuste = 'xMidYMid slice', W, H, hz, sol, d }) => {
  semilla = 11;
  const surcos = Array.from({ length: 40 }, (_, i) => `<path d="M${r1(sol.x)} ${hz} L${r1(sol.x + (i - 20) * W / 9)} ${H}"/>`).join('');
  const f = (n) => hz + (H - hz) * n;
  return `<svg class="escena" id="${id}" viewBox="0 0 ${W} ${H}" preserveAspectRatio="${ajuste}" role="img" aria-label="Drone DJI Agras T50 pulverizando un cultivo a contraluz, al atardecer">
<defs>
<linearGradient id="${id}-cielo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5B4E37"/><stop offset=".3" stop-color="#B58450"/><stop offset=".55" stop-color="#E9BC78"/><stop offset="${(hz / H).toFixed(2)}" stop-color="#FBE3AE"/></linearGradient>
<radialGradient id="${id}-sol" cx="${sol.x}" cy="${sol.y}" r="${W * 0.55}" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#FFFBEA"/><stop offset=".07" stop-color="#FFEBB8" stop-opacity=".95"/><stop offset=".3" stop-color="#F7C978" stop-opacity=".5"/><stop offset="1" stop-color="#F7C978" stop-opacity="0"/></radialGradient>
<linearGradient id="${id}-campo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#C2A065"/><stop offset=".12" stop-color="#7D7440"/><stop offset=".45" stop-color="#404826"/><stop offset="1" stop-color="#162011"/></linearGradient>
<linearGradient id="${id}-bruma" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7B5" stop-opacity="0"/><stop offset=".7" stop-color="#FFE7B5" stop-opacity=".75"/><stop offset="1" stop-color="#FFE7B5" stop-opacity="0"/></linearGradient>
<filter id="${id}-difuso" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="${(d.ancho / 160).toFixed(1)}"/></filter>
<filter id="${id}-bruma-f" x="-50%" y="-20%" width="200%" height="140%"><feGaussianBlur stdDeviation="${(d.ancho / 55).toFixed(1)}"/></filter>
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
<path d="M0 ${f(0.18)} C${W * 0.3} ${f(0.1)} ${W * 0.55} ${f(0.22)} ${W} ${f(0.12)} V${f(0.3)} C${W * 0.6} ${f(0.4)} ${W * 0.3} ${f(0.26)} 0 ${f(0.36)}Z" fill-opacity=".07"/>
<path d="M0 ${f(0.55)} C${W * 0.3} ${f(0.45)} ${W * 0.6} ${f(0.6)} ${W} ${f(0.48)} V${f(0.62)} C${W * 0.6} ${f(0.74)} ${W * 0.3} ${f(0.6)} 0 ${f(0.7)}Z" fill-opacity=".05"/>
</g>
<g stroke="#FFD58C" stroke-opacity=".07" stroke-width="1.2" fill="none">${surcos}</g>
${dron({ id, ...d })}
${cultivo(W, H)}
</svg>`;
};

const escritorio = escena({ id: 'esc-a', ajuste: 'xMaxYMid slice', W: 1600, H: 1000, hz: 600, sol: { x: 1240, y: 250 }, d: { x: 905, y: 215, ancho: 650, baseY: 860 } });
const movil = escena({ id: 'esc-m', W: 900, H: 620, hz: 400, sol: { x: 560, y: 110 }, d: { x: 90, y: 90, ancho: 720, baseY: 590 } });
fs.writeFileSync(process.argv[2], JSON.stringify({ escritorio, movil }));
console.log('escritorio', (escritorio.length / 1024).toFixed(1), 'KB · móvil', (movil.length / 1024).toFixed(1), 'KB');
