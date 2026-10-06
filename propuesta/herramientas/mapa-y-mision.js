// Genera dos SVG para el boceto:
//  1. Mapa de cobertura: anillos de radar cada 25 km alrededor de Zárate y localidades
//     ubicadas por coordenadas (proyección simple, mapa orientativo).
//  2. Mapa del tablero "Misión de vuelo" (ejemplo): lote con obstáculos y ruta en zigzag.
// Uso: node mapa-y-mision.js salida.json
const fs = require('fs');
const r1 = (n) => Math.round(n * 10) / 10;

// ---------- 1. Zona de cobertura ----------
const ZARATE = { lat: -34.098, lon: -59.025 };
// Coordenadas aproximadas de las cabeceras (provincia de Buenos Aires)
const LOCALIDADES = [
  ['Lima', -34.043, -59.197, 'base'],
  ['Zárate', -34.098, -59.025],
  ['Campana', -34.168, -58.958],
  ['Capilla del Señor', -34.292, -59.103],
  ['Escobar', -34.347, -58.797],
  ['Pilar', -34.459, -58.914],
  ['San Antonio de Areco', -34.246, -59.471],
  ['San Andrés de Giles', -34.448, -59.445],
  ['Luján', -34.57, -59.105],
  ['General Rodríguez', -34.608, -58.952],
  ['Baradero', -33.811, -59.506],
  ['Capitán Sarmiento', -34.172, -59.79],
  ['San Pedro', -33.679, -59.666],
  ['Mercedes', -34.651, -59.431],
  ['Carmen de Areco', -34.377, -59.824],
  ['Arrecifes', -34.065, -60.103],
];
const km = (a, b) => {
  const R = 6371, rad = Math.PI / 180;
  const dLat = (b.lat - a.lat) * rad, dLon = (b.lon - a.lon) * rad;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * rad) * Math.cos(b.lat * rad) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};
const T = 640, C = T / 2, ESC = 275 / 100; // 100 km = 275 px
const KM_LAT = 111.32, KM_LON = 111.32 * Math.cos(ZARATE.lat * Math.PI / 180);
const xy = (lat, lon) => [C + (lon - ZARATE.lon) * KM_LON * ESC, C - (lat - ZARATE.lat) * KM_LAT * ESC];

const lista = LOCALIDADES.map(([n, lat, lon, tipo]) => ({ n, lat, lon, tipo, d: Math.round(km(ZARATE, { lat, lon })) }))
  .filter((l) => l.d <= 100).sort((a, b) => a.d - b.d);

// Posición de cada etiqueta para que no se pisen
const LADO = { 'Lima': 'izq', 'Zárate': 'der', 'Campana': 'der', 'Capilla del Señor': 'der', 'Escobar': 'der', 'Pilar': 'der', 'San Antonio de Areco': 'izq', 'San Andrés de Giles': 'izq', 'Luján': 'izq', 'General Rodríguez': 'der', 'Baradero': 'der', 'Capitán Sarmiento': 'der', 'San Pedro': 'der', 'Mercedes': 'izq', 'Carmen de Areco': 'der', 'Arrecifes': 'der' };
const puntos = lista.map((l) => {
  const [x, y] = xy(l.lat, l.lon);
  const izq = LADO[l.n] === 'izq';
  const base = l.tipo === 'base';
  return `<g class="loc${base ? ' loc--base' : ''}"><circle cx="${r1(x)}" cy="${r1(y)}" r="${base ? 6 : 4}"/>`
    + `<text x="${r1(x + (izq ? -10 : 10))}" y="${r1(y + 4)}" text-anchor="${izq ? 'end' : 'start'}">${l.n}</text></g>`;
}).join('');
const anillos = [25, 50, 75, 100].map((k) => `<circle cx="${C}" cy="${C}" r="${r1(k * ESC)}" class="anillo${k === 100 ? ' anillo--limite' : ''}"/>`
  + `<text x="${C + 6}" y="${r1(C - k * ESC - 6)}" class="anillo__km">${k} km</text>`).join('');
const mapa = `<svg class="mapa-zona" viewBox="0 0 ${T} ${T}" role="img" aria-labelledby="mapa-zona-t">
<title id="mapa-zona-t">Mapa orientativo: radio de 100 km alrededor de Zárate con las localidades de la zona</title>
<defs><radialGradient id="radar-barrido" cx="0" cy="0" r="1"><stop offset="0" stop-color="currentColor" stop-opacity=".0"/><stop offset="1" stop-color="currentColor" stop-opacity=".22"/></radialGradient></defs>
<g class="radar">
<path d="M${C} ${C} L${C} ${r1(C - 100 * ESC)} A${r1(100 * ESC)} ${r1(100 * ESC)} 0 0 1 ${r1(C + 100 * ESC * Math.sin(Math.PI / 5))} ${r1(C - 100 * ESC * Math.cos(Math.PI / 5))}Z" class="barrido"/>
</g>
<path d="M${C - 100 * ESC} ${C}H${C + 100 * ESC}M${C} ${C - 100 * ESC}V${C + 100 * ESC}" class="cruz"/>
${anillos}
${puntos}
</svg>`;

// ---------- 2. Misión de vuelo (ejemplo) ----------
const W = 520, H = 340;
// Lote de ejemplo y área de trabajo (con zonas de exclusión por la cortina de árboles y el tendido)
const LOTE = [[40, 40], [470, 28], [492, 300], [60, 312]];
const TRABAJO = [[62, 74], [455, 62], [474, 214], [392, 288], [80, 290]];
const PASO = 15;
const cortes = (y, poly) => {
  const xs = [];
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i], [x2, y2] = poly[(i + 1) % poly.length];
    if ((y >= Math.min(y1, y2)) && (y < Math.max(y1, y2))) xs.push(x1 + (y - y1) * (x2 - x1) / (y2 - y1));
  }
  return xs.sort((a, b) => a - b);
};
const pts = [];
let ida = true;
for (let y = 74 + PASO / 2; y < 290; y += PASO) {
  const xs = cortes(y, TRABAJO);
  if (xs.length < 2) continue;
  const [a, b] = [xs[0] + 6, xs[xs.length - 1] - 6];
  if (ida) pts.push([a, y], [b, y]); else pts.push([b, y], [a, y]);
  ida = !ida;
}
const ruta = 'M' + pts.map(([x, y]) => `${r1(x)} ${r1(y)}`).join('L');
let largo = 0;
for (let i = 1; i < pts.length; i++) largo += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
// Posición del drone al 62 % del recorrido
const AVANCE = 0.62;
let falta = largo * AVANCE, dron = pts[0];
for (let i = 1; i < pts.length; i++) {
  const seg = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
  if (falta <= seg) { const t = falta / seg; dron = [pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * t, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * t]; break; }
  falta -= seg;
}
const arboles = Array.from({ length: 9 }, (_, i) => `<circle cx="${r1(52 + i * 2.2)}" cy="${r1(60 + i * 26)}" r="${7 + (i % 3)}"/>`).join('');
const mision = `<svg class="mision__mapa" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="mision-mapa-t">
<title id="mision-mapa-t">Ejemplo de mapa de un lote con la ruta de vuelo en zigzag, la cortina de árboles y el tendido eléctrico marcados como obstáculos</title>
<path d="M${LOTE.map((p) => p.join(' ')).join('L')}Z" class="lote"/>
<path d="M${TRABAJO.map((p) => p.join(' ')).join('L')}Z" class="trabajo"/>
<g class="arboles">${arboles}</g>
<path d="M392 300 L500 200" class="tendido-zona"/>
<path d="M392 300 L500 200" class="tendido"/>
<g class="torres"><rect x="${409 - 4}" y="${284 - 4}" width="8" height="8"/><rect x="${465 - 4}" y="${232 - 4}" width="8" height="8"/></g>
<path d="${ruta}" class="ruta-pendiente" pathLength="1"/>
<path d="${ruta}" class="ruta-hecha" pathLength="1" style="--avance:${AVANCE}"/>
<g class="dron-pos" transform="translate(${r1(dron[0])} ${r1(dron[1])})"><circle r="11" class="dron-halo"/><circle r="5"/></g>
<g class="mision__ref"><text x="70" y="330">Cortina de árboles</text><text x="470" y="322" text-anchor="end">Tendido eléctrico</text></g>
</svg>`;

// ---------- 3. Mapa animado de "Cómo trabaja un dron agrícola" ----------
// Mismo lote de ejemplo. La animación (boceto.js) dibuja el lote, muestra la ruta, mueve el drone
// por la ruta pintando lo aplicado y al final marca el lote como completo.
const surcos = Array.from({ length: 30 }, (_, i) => {
  const x = 60 + i * 14.5;
  return `M${r1(x)} ${r1(44 - i * 0.4)}L${r1(x + 18)} ${r1(306 - i * 0.1)}`;
}).join('');
const dronArriba = [[-9, -9], [9, -9], [-9, 9], [9, 9]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="6.5" class="f-rotor"/>`).join('')
  + '<path d="M-9 -9L9 9M9 -9L-9 9" class="f-brazos"/><rect x="-5" y="-6" width="10" height="12" rx="3" class="f-cuerpo"/>';
const funciona = `<svg class="f-mapa" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="f-mapa-t">
<title id="f-mapa-t">Ejemplo animado de una aplicación: se marca el lote, se carga la ruta, el drone recorre el lote en zigzag y al final queda todo el lote cubierto</title>
<defs><clipPath id="f-recorte"><path d="M${LOTE.map((p) => p.join(' ')).join('L')}Z"/></clipPath></defs>
<g clip-path="url(#f-recorte)"><path d="${surcos}" class="f-surcos"/></g>
<path d="M${TRABAJO.map((p) => p.join(' ')).join('L')}Z" class="f-area"/>
<path d="M${LOTE.map((p) => p.join(' ')).join('L')}Z" class="f-lote" pathLength="1"/>
<g class="f-obst">${arboles}<path d="M392 300 L500 200" class="f-tendido-zona"/><path d="M392 300 L500 200" class="f-tendido"/><rect x="405" y="280" width="8" height="8"/><rect x="461" y="228" width="8" height="8"/></g>
<path d="${ruta}" class="f-ruta"/>
<path d="${ruta}" class="f-hecha" pathLength="1"/>
<g class="f-dron" transform="translate(${r1(pts[0][0])} ${r1(pts[0][1])})"><circle r="22" class="f-rocio"/><g class="f-dron-cuerpo">${dronArriba}</g></g>
</svg>`;

fs.writeFileSync(process.argv[2], JSON.stringify({ mapa, mision, funciona, lista: lista.map(({ n, d, tipo }) => ({ n, d, tipo })) }));
console.log(lista.map((l) => `${l.n} ${l.d} km`).join(' · '));
