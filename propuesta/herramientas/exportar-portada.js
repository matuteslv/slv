// Exporta la portada compuesta en AVIF, WebP y JPG (compu y recorte para celular).
// Uso: node exportar-portada.js portada-compuesta.png carpeta-img [ruta-a-sharp]
const sharp = require(process.argv[4] || 'sharp');
const [src, dest] = process.argv.slice(2);
(async () => {
  const salida = async (img, nombre) => {
    await img.clone().avif({ quality: 52, effort: 6 }).toFile(`${dest}/${nombre}.avif`);
    await img.clone().webp({ quality: 78 }).toFile(`${dest}/${nombre}.webp`);
    await img.clone().jpeg({ quality: 80, mozjpeg: true }).toFile(`${dest}/${nombre}.jpg`);
  };
  for (const w of [1620, 1080]) await salida(sharp(src).resize({ width: w }), `portada-${w}`);
  const movil = sharp(src).extract({ left: 780, top: 222, width: 740, height: 510 });
  for (const w of [740, 480]) await salida(movil.clone().resize({ width: w }), `portada-movil-${w}`);
  console.log('listo');
})();
