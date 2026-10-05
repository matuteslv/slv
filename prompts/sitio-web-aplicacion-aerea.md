# Prompt: sitio web de AgroAtom, aplicación aérea con DJI Agras T50

> **Cómo usarlo:**
> 1. Completá los `[PENDIENTE]` que puedas de la sección 1 (contacto, redes, dominio). Lo que falte, Claude lo deja marcado y se agrega después.
> 2. Abrí una sesión nueva de Claude Code en este repo. El logo ya está listo en `marca/` (ver `marca/LEEME.md`).
> 3. Adjuntá tus fotos o videos y las dos imágenes de referencia (el diseño de "Zenze Agri Solutions" y el checklist "20 de 20").
> 4. Pegá todo lo que está debajo de la línea.

---

## Rol

Sos un equipo senior completo: director de arte, diseñador UI/UX, redactor especializado en el agro y desarrollador front-end. Vas a diseñar, construir, revisar y publicar el sitio web de **AgroAtom**, una empresa de aplicación aérea con drone DJI Agras T50 con base en Lima, partido de Zárate, provincia de Buenos Aires.

El sitio es **informativo**: explica quiénes somos, qué hacemos, con qué equipo, dónde trabajamos y cómo contactarnos. Tiene que verse profesional, moderno y propio. No es una tienda ni una plataforma: es la carta de presentación de la empresa.

---

## 1. Datos de la empresa

- **Nombre comercial:** AgroAtom
- **Titular:** [PENDIENTE: nombre y apellido del titular] · **CUIT:** 20-48036218-8
- **Logo:** ya está profesionalizado y en vector en `marca/`. Es un sello circular con fondo crema, contorno azul marino, un drone con rotores dobles que pulveriza y lomas de cultivo en verde oliva. El nombre "AgroAtom" está en Manrope ExtraBold. Ver sección 6 para cómo usarlo.
- **Domicilio:** Cuartel V, Lima, partido de Zárate, provincia de Buenos Aires, Argentina.
- **Zona de trabajo:** hasta 100 km a la redonda de Zárate.
- **Trabajamos desde:** septiembre de 2025.
- **Equipo humano:** somos dos y los dos tenemos licencia de piloto a nivel provincial. Uno vuela y el otro se ocupa de [PENDIENTE: por ejemplo planificación, logística, atención a clientes].
- **Equipo:** 1 DJI Agras T50 · [PENDIENTE: equipos de apoyo, por ejemplo generador, baterías, camioneta o trailer]
- **Servicios:**
  - Pulverización de fitosanitarios (herbicidas, fungicidas, insecticidas)
  - Fertilización foliar
  - Esparcido de fertilizantes granulados
  - Siembra al voleo (por ejemplo, cultivos de servicio o de cobertura)
- **Cultivos principales:** soja, maíz, trigo, girasol, pasturas y frutales.
- **Habilitaciones y seguros:**
  - Licencia de piloto provincial (los dos integrantes).
  - Habilitación de transporte y aplicación de fitosanitarios.
  - Seguro [PENDIENTE: tipo de seguro, por ejemplo de responsabilidad civil].
- **Hectáreas aplicadas:** se agregan más adelante. Dejá el lugar preparado en la franja de datos (ver sección 7), oculto hasta que pasemos el número.
- **Contacto:** WhatsApp [PENDIENTE] · teléfono [PENDIENTE] · email [PENDIENTE] · horario [PENDIENTE]
- **Redes:** [PENDIENTE: Instagram, Facebook, etc.]
- **Dominio:** [PENDIENTE: por ejemplo agroatom.com.ar]
- **Trato al visitante:** de vos.
- **Material propio:** [PENDIENTE: fotos y videos del T50 trabajando]
- **Perfil de Empresa en Google:** [PENDIENTE: ya tenemos / no tenemos]

**Contexto importante:** la empresa es nueva (arrancó en septiembre de 2025). No inventes trayectoria. La confianza se construye con lo que sí tenemos:
- Equipo moderno.
- Licencias, habilitación y seguro.
- Conocimiento de la zona.
- Trato directo: hablás con los mismos que hacen el trabajo.

---

## 2. Objetivo y medida de éxito

- En **10 segundos** un productor tiene que entender qué hacemos, en qué zona y con qué equipo, y ver cómo contactarnos.
- **Acción principal:** escribirnos por WhatsApp con un mensaje ya escrito.
- **Acciones secundarias:** llamar, mandar un email o completar el formulario.
- Cada sección tiene que acercar al visitante al contacto.

## 3. A quién le hablamos

Productores agropecuarios, contratistas rurales, ingenieros agrónomos y asesores, acopios, cooperativas y empresas del sector en Zárate y la zona norte de la provincia de Buenos Aires. La mayoría entra **desde el celular, en el campo y con poca señal**: el sitio tiene que ser liviano y pensado primero para el teléfono.

**Lo que les preocupa** (escribí con estas palabras):
- Lotes anegados o con piso blando donde no entra la pulverizadora terrestre (el mosquito).
- Pisoteo y huellas en cultivos altos, como el maíz avanzado.
- Perder la ventana de aplicación por clima o por falta de equipos.
- Deriva, dosis mal aplicadas, cobertura despareja.
- Lotes chicos, irregulares o con obstáculos.

**Lo que quieren:** aplicar en el momento justo, sin pisar el cultivo, con dosis precisa y con un registro o mapa de lo que se aplicó.

**Lo que los frena:** ¿rinde suficientes hectáreas? ¿la calidad es buena? ¿es legal y está habilitado? ¿cuánto cuesta por hectárea? ¿qué pasa con viento?

Antes de diseñar, hacé una investigación corta: revisá entre 3 y 5 sitios de empresas de aplicación con drones o aeroaplicadores de Argentina, y foros o grupos de productores. Anotá qué hacen bien, qué hacen mal y qué palabras usa la gente. Usá eso en los textos.

---

## 4. Skills y en qué orden usarlas

Usá estas skills en este orden. Si alguna no está instalada, seguí con las demás y avisame cuál faltó. No inventes lo que haría una skill que no tenés.

| Etapa | Skills |
|---|---|
| Entender y planificar | `superpowers:brainstorming`, `superpowers:writing-plans` |
| Dirección de diseño | `frontend-design:frontend-design`, `design-taste-frontend` (Taste), `ui-ux-pro-max` (corré su buscador con `"agricultural drone aerial spraying service agtech dark premium" --design-system`), `impeccable` (`/impeccable shape`, después `/impeccable craft`) |
| Documentación de librerías | `context7`, cada vez que uses la API de una librería |
| Animación | `emil-design-eng`, `animate`, después `review-animations` |
| Construcción | Plan de `superpowers:executing-plans` |
| Revisión de diseño | `/impeccable critique`, `/impeccable audit`, `/impeccable polish`, `web-design-guidelines` |
| Accesibilidad y velocidad | `chrome-devtools-mcp:a11y-debugging`, `chrome-devtools-mcp:debug-optimize-lcp`, auditoría Lighthouse |
| Pruebas visuales | `playwright`: capturas a 375, 768 y 1440 px, clic en todos los botones, prueba del formulario y del link de WhatsApp |
| SEO | `searchfit-seo:seo-audit`, `searchfit-seo:on-page-seo`, `searchfit-seo:technical-seo`, `/searchfit-seo:generate-schema`, `searchfit-seo:ai-visibility` |
| Código | `/code-review`, `/simplify`, `superpowers:verification-before-completion` |
| Publicación | `/vercel:deploy` (primero vista previa, después producción) |

Opcional: `huashu-design` si después queremos una presentación PPTX o un video corto para mostrar a clientes.

---

## 5. Referencia de diseño: "Zenze Agri Solutions"

Te adjunto una captura de un sitio agro llamado Zenze. **Tomala como inspiración de formato y estilo, no como algo para copiar:** no uses sus textos, su marca ni sus íconos, y adaptá cada bloque a la aplicación con drones. Si la imagen no llegó, esta descripción alcanza.

**Lo que hace bien y queremos igual:**
- Fondo **verde bosque muy oscuro**, casi negro pero verde, en todo el sitio.
- Un solo color de acento **verde lima** para botones, palabras destacadas, etiquetas y barras de progreso.
- **Foto cinematográfica a la hora dorada** de punta a punta en la portada, con un degradé oscuro del lado del texto para que se lea perfecto.
- **Botones tipo píldora** (bien redondeados) con flecha →. El principal es lima con texto oscuro y el secundario es un círculo con ícono de play y texto al lado.
- **Etiquetas chicas en mayúsculas** arriba de cada título ("QUÉ HACEMOS", "NUESTRA TECNOLOGÍA"), en lima y con letras espaciadas. En la portada, la etiqueta va dentro de una píldora con borde fino.
- **Títulos grandes en dos líneas**: la primera en crema y la segunda en lima.
- **Tarjetas oscuras semitransparentes**, con borde fino de 1 px, esquinas redondeadas y un leve desenfoque cuando van sobre una foto.
- **Datos que se ven como tecnología:** una franja de estadísticas con íconos sobre la foto, una tarjeta flotante con barras de progreso y un panel tipo tablero de control.
- **Dibujos de líneas finas** (hojas) decorando las esquinas de algunas secciones, muy sutiles.
- Indicador de "Bajá para explorar" con un ícono de mouse al final de la portada.
- Mucho aire, grilla prolija y jerarquía clara.

**Cómo adaptamos cada bloque:**

| Bloque de Zenze | Nuestra versión |
|---|---|
| Logo con hoja + "Agri Solutions" | Sello de AgroAtom + "AgroAtom" + subtítulo chico "Aplicaciones aéreas" |
| Productor con tablet mirando el campo | **Piloto con el control mirando el T50 pulverizando sobre el cultivo al atardecer** (foto real) |
| "Smart solutions for a better tomorrow" | Píldora: "APLICACIÓN AÉREA CON DRONES · ZÁRATE Y ZONA" |
| Título "Nurturing Nature. Empowering Farmers." | Ejemplo: "Precisión en cada lote." / "Sin pisar el cultivo." (segunda línea en lima) |
| "Explore Solutions" + "Watch Story" | "Pedí tu cotización →" (abre WhatsApp) + "▶ Mirá cómo trabajamos" (abre nuestro video en una ventana) |
| Franja: 25K+ farmers, 1.2M acres, 40%, 30% | Franja con datos reales: "100 km de cobertura desde Zárate", "40 L por vuelo", "Hasta 21 ha/h (dato de DJI)" y "Licencia y habilitación provincial". Lugar preparado y oculto para "hectáreas aplicadas", que se suma después. |
| Tarjeta "Live Farm Insights" (humedad del suelo, temperatura, lluvia) | Tarjeta **"Condiciones ahora en Lima, Zárate"**: viento, temperatura y humedad, las variables que mira un aplicador. **Datos reales en vivo** de la API gratuita de Open-Meteo (sin clave), con la fuente indicada. Si la API falla, la tarjeta se oculta sola. |
| "Intelligent Solutions for Every Farm" + 4 tarjetas | "QUÉ HACEMOS": título a la izquierda, párrafo corto a la derecha y **4 tarjetas de servicios** con ícono en círculo de color y botón circular con flecha |
| "Data. AI. IoT. Better Together." + tablero "Farm Overview" | "NUESTRA TECNOLOGÍA": "DJI Agras T50." / "Precisión en cada pasada." con lista de beneficios con tildes lima, y a la derecha un **tablero de misión de vuelo** (ver sección 7) |
| Banner final con manos y plantín + "Join Zenze Today" | Banner con foto (el T50 al atardecer o manos con tierra), "Hagamos tu próxima aplicación." y botón de WhatsApp. Sin fotos de clientes. |
| Botón de modo claro/oscuro | Oscuro por defecto, con opción de modo claro que se recuerda en el navegador |

---

## 6. Dirección visual

Partí de la referencia y del logo. Antes de construir, mostrame tu propuesta concreta (colores en código hex, tipografías y una captura del boceto de la portada). **Esperá mi aprobación.**

**El logo manda en los colores.** Estos son sus tonos reales:
- Crema `#FDF1DB`.
- Azul marino `#062636`.
- Verde oliva `#526337`.

La paleta del sitio combina el estilo oscuro de la referencia con esos tonos.

**Paleta de punto de partida** (ajustala con las fotos reales):
- **Fondo:** verde bosque muy oscuro, de la familia del oliva del logo (por ejemplo `#0F1A13`). Nunca negro puro.
- **Superficies y tarjetas:** un verde apenas más claro (`#18261C`) con borde `rgba(253,241,219,0.08)`.
- **Acento:** verde lima sacado del mismo tono que el oliva del logo, más claro y vivo (por ejemplo `#A4D161`). Usalo poco: botones principales, palabras clave y datos.
- **Texto principal:** el crema del logo (`#F6EDDA`), en lugar de blanco.
- **Texto secundario:** verde grisáceo (`#AAB5A2`).
- **Azul marino del logo:** para el texto sobre los botones lima y para el modo claro.
- **Verde oliva del logo:** para los círculos de íconos, las lomas y los detalles de líneas.
- Contraste mínimo AA en todo.

**Uso del logo** (ya está terminado, no lo rediseñes; los archivos y colores están en `marca/LEEME.md`):
- **Barra del sitio:** `marca/agroatom-horizontal-oscuro.svg` (en modo claro, `agroatom-horizontal.svg`).
- **Favicon y íconos:** generalos a partir de `marca/agroatom-icono.svg`, que es la versión simplificada para tamaños chicos.
- **Pie de página, página 404 e imagen para compartir (Open Graph):** `marca/agroatom-sello.svg`.
- Copiá a `assets/` solo los archivos que uses. La carpeta `marca/` no se publica.
- El sello crema funciona como una medalla sobre el fondo oscuro.

**Tipografía del sitio:** usá **Manrope**, la misma del logo, para títulos y texto. Sumá una monoespaciada para los números del tablero y las etiquetas. Nada de Inter, Roboto ni Arial. Máximo 2 o 3 familias.

**Elemento distintivo propio:**
- La **ruta de vuelo en zigzag** que el drone recorre sobre el lote, en líneas SVG finas color lima. Se dibuja sola al hacer scroll en el tablero de misión y aparece de forma sutil como separador o detalle de fondo.
- Las **lomas de líneas curvas del logo**, como trazos decorativos finos en las esquinas de algunas secciones, en lugar de las hojas de la referencia. Así el sitio y el logo se sienten de la misma familia.

**Reglas:**
- Íconos propios en SVG con un mismo trazo fino. Nada de emojis como íconos.
- Prohibido el look genérico de IA: degradés violetas, vidrio esmerilado en todos lados, gotas 3D flotando.
- **Fotos:** priorizá siempre fotos reales de nuestro T50, nuestro equipo y nuestros lotes, en clave cálida de hora dorada como la referencia. Los productores conocen los equipos: una foto de stock de otro drone o una imagen generada con el T50 deformado nos quita credibilidad. Si no hay fotos, dejá marcadores claros y armá la lista de fotos a sacar (sección 11).
- **Movimiento:** sutil y con propósito. Animaciones de interfaz de menos de 300 ms con curvas de easing propias, entrada suave de cada bloque al aparecer, barras y anillos que se llenan al entrar en pantalla y la ruta de vuelo que se dibuja. Todo respeta `prefers-reduced-motion`.

---

## 7. Estructura y contenido

Una sola página con anclas, más las páginas de aviso legal, privacidad y 404. El orden sigue a la referencia.

1. **Barra de navegación:** logo horizontal · Inicio · Servicios · Tecnología · Nosotros · Preguntas · Contacto. El link activo se subraya en lima. A la derecha, botón píldora lima "Cotizá →" que abre WhatsApp y el botón de modo claro/oscuro. Fija y más compacta al bajar. Menú propio en celular.
2. **Portada (hero):**
   - Como se describe en la sección 5: píldora con etiqueta, título en dos líneas, párrafo concreto, dos botones, franja de datos abajo a la izquierda, tarjeta de condiciones en vivo abajo a la derecha e indicador de scroll.
   - Párrafo de ejemplo: "Pulverizamos, fertilizamos y sembramos al voleo con DJI Agras T50, hasta 100 km de Zárate. Llegamos donde no entra el mosquito y aplicamos en el momento justo."
   - En celular, la tarjeta de condiciones pasa debajo de la franja o se oculta.
3. **Qué hacemos:** las 4 tarjetas de servicios (pulverización, fertilización foliar, granulados y siembra al voleo). Cada una dice qué es, cuándo conviene y en qué cultivos (soja, maíz, trigo, girasol, pasturas y frutales). La flecha abre más detalle.
4. **Nuestra tecnología, DJI Agras T50:** a la izquierda, título, párrafo y lista con tildes:
   - Tanque de pulverización de 40 L y de esparcido de 50 kg.
   - Caudal de hasta 16 L/min con 2 atomizadores, o 24 L/min con 4.
   - Rendimiento de hasta 21 ha/h en cultivos extensivos (dato de DJI en condiciones ideales).
   - Radar y visión binocular para esquivar obstáculos y seguir el relieve.
   - Tamaño de gota regulable.

   **Verificá cada dato en la página oficial de DJI antes de publicarlo.** Si tenemos números propios de campo, van primero y se aclara cuáles son del fabricante.

   A la derecha, el **tablero "Misión de vuelo"**, hecho en HTML, CSS y SVG (no una imagen, así se ve nítido, pesa poco y se puede animar). Lleva:
   - Barra lateral de íconos.
   - Tarjetas de superficie del lote (ha), dosis (L/ha) y ancho de trabajo.
   - Anillo de progreso de la aplicación.
   - Lista de actividad reciente ("Lote 3 aplicado, hace 2 h").
   - **Mapa del lote con la ruta en zigzag** que se dibuja y marcas de obstáculos (árboles, tendido eléctrico).
   - Tarjeta de clima con viento, humedad y temperatura.

   Usá valores realistas, marcados con una etiqueta visible **"Ejemplo de misión"**, y pasámelos para que los revise.
5. **Por qué con drone:** sin pisoteo ni huellas, entra en lotes anegados o con barro, sirve en cultivos altos, sigue el relieve y aplica con un plan de vuelo preciso. Sumá un bloque honesto de **"cuándo conviene el drone y cuándo no"**: la honestidad genera confianza.
6. **Cómo trabajamos:** 4 pasos numerados con una línea que los une: 1) nos contactás y nos pasás los datos del lote · 2) receta agronómica y planificación del vuelo (mapa del lote, obstáculos, pronóstico) · 3) aplicación controlando viento, temperatura y humedad · 4) informe con el registro de lo aplicado. Pasame los pasos para que confirme que es como trabajamos.
7. **Quiénes somos:**
   - Somos dos, de Lima (Zárate), los dos con licencia de piloto provincial. Uno vuela y el otro organiza todo lo demás.
   - Arrancamos en septiembre de 2025 con un DJI Agras T50.
   - El valor está en el **trato directo**: hablás con los mismos que hacen el trabajo, que conocen la zona y los lotes.
   - Foto de los dos con el equipo.
   - Contalo con orgullo y sin exagerar.
8. **Zona de cobertura:**
   - Mapa liviano en estilo oscuro, centrado en Zárate, con un **anillo de 100 km** en lima que recuerda a un radar (imagen estática o mapa que carga solo al llegar a esa parte).
   - Lista de localidades dentro del radio para que yo confirme, por ejemplo Zárate, Lima, Campana, Escobar, Exaltación de la Cruz, Pilar, Baradero, San Antonio de Areco, San Andrés de Giles, Luján y San Pedro.
   - Ojo: nuestras licencias son de la provincia de Buenos Aires. Dentro de los 100 km también hay parte de Entre Ríos: no la incluyas salvo que yo te confirme que estamos habilitados ahí.
9. **Seguridad y habilitaciones:** licencia de piloto provincial de los dos integrantes, habilitación de transporte y aplicación de fitosanitarios, seguro, trabajo con receta agronómica y control de clima en cada aplicación. Cada punto con un ícono propio, sin inventar números de registro.
10. **Preguntas frecuentes** (acordeón): ¿cuántas hectáreas hacen por día? · ¿cuánto cuesta por hectárea? (si no hay precio fijo, explicá de qué depende y llevá al WhatsApp) · ¿qué productos aplican? · ¿qué pasa con viento o lluvia? · ¿necesito receta agronómica? · ¿qué datos necesitan para cotizar? · ¿tienen seguro y habilitación? · ¿hasta dónde viajan? Dejá las respuestas marcadas para que yo las confirme.
11. **Banner final:** como en la referencia, foto a la izquierda, frase y botón de WhatsApp.
12. **Contacto:**
    - Botón grande de WhatsApp con mensaje ya escrito: `https://wa.me/[PENDIENTE: NÚMERO SIN + NI ESPACIOS]?text=Hola%20AgroAtom,%20quiero%20cotizar%20una%20aplicación%20para%20___%20ha%20de%20___%20en%20___`
    - Teléfono que se marca con un toque, email, ubicación (Lima, Zárate) y horario.
    - Formulario en tarjeta oscura: nombre, teléfono, localidad, cultivo, hectáreas, servicio y mensaje, con protección contra spam (punto 17 del checklist). Decime con claridad a dónde llegan los mensajes (Formspree o similar a nuestro email) y armá el mensaje de "gracias" según eso.
13. **Pie de página:** logo, datos de contacto, redes, habilitaciones, CUIT, links a aviso legal y privacidad, y año.
14. **Botón flotante de WhatsApp** en celular, que no tape contenido importante.

---

## 8. Cómo escribir los textos

- Español de Argentina, tono profesional y cercano, tratando de vos.
- Frases cortas y concretas, con el vocabulario del productor: lote, campaña, mosquito, pisoteo, anegado, deriva, ventana de aplicación, receta.
- Cada beneficio con un hecho concreto, no con un adjetivo.
- **Palabras prohibidas:** soluciones integrales, innovador, de vanguardia, líderes, sinergia, potenciar, revolucionar, experiencia única, calidad premium, excelencia, a tu medida.
- Sin rayas largas (—). Usá comas y puntos.
- Se escribe **"al voleo"**, con v.
- **No inventes nada:** ni números, ni testimonios, ni clientes, ni certificaciones, ni precios, ni años de experiencia. Donde falte un dato, poné `[PENDIENTE: qué falta]` y sumalo a la lista final.

---

## 9. Requisitos técnicos

- **Stack:** HTML, CSS y JavaScript sin frameworks ni paso de compilación: `index.html`, `aviso-legal.html`, `privacidad.html`, `404.html` y una carpeta `assets/`. La carpeta `marca/` (archivos fuente del logo) no se publica. Si proponés otra cosa, explicá por qué.
- **Celular primero:** funciona bien desde 360 px de ancho. Botones de al menos 44 px. Sin scroll horizontal.
- **Velocidad (en celular con 4G):** LCP menor a 2,5 s, CLS menor a 0,1, INP menor a 200 ms y Lighthouse de 95 o más en las cuatro categorías.
- **Foto de portada:** precargada, en AVIF o WebP con `srcset`, de 250 KB como máximo en celular. El resto de las imágenes se cargan cuando el visitante llega a ellas y declaran su ancho y alto.
- **Video de "Mirá cómo trabajamos":** se carga solo cuando el visitante toca el botón, nunca al abrir la página.
- **Fuentes:** propias o de Google Fonts con `display=swap`, precargando solo la principal.
- **Accesibilidad (WCAG 2.2 AA):** HTML semántico, foco visible en lima, navegación con teclado, acordeón y ventana de video accesibles, y movimiento reducido.
- **SEO local:**
  - Búsquedas a cubrir: "aplicación con drones Zárate", "pulverización con drone Zárate", "fumigación con drone Zárate", "drone agrícola Campana", "aplicación con drones Baradero", "siembra al voleo con drone", "DJI T50 zona norte Buenos Aires".
  - El nombre, la ubicación y el teléfono tienen que ser **idénticos** en el sitio, el JSON-LD y la ficha de Google.

---

## 10. Checklist de lanzamiento: 20 de 20

El sitio no está terminado hasta que estén los 20 puntos. Al final, mostrámelo como **"20 de 20"** con un ✓ por punto y una línea de cómo verificaste cada uno.

| # | Punto | Qué tiene que tener |
|---|---|---|
| 01 | **Aviso legal** | Página `aviso-legal.html` con titular, CUIT 20-48036218-8, domicilio (Cuartel V, Lima, partido de Zárate, Buenos Aires), contacto y propiedad del contenido. |
| 02 | **Política de privacidad** | Página `privacidad.html` en lenguaje claro: qué datos junta el formulario, para qué, dónde se guardan, la analítica y cómo pedir que se borren, según la Ley 25.326 de Protección de Datos Personales. |
| 03 | **Aviso de cookies** | Cartel discreto y accesible con "Aceptar" y "Rechazar" y link a privacidad. Si la analítica usa cookies, no se carga hasta que el visitante acepta. |
| 04 | **Forzar HTTPS** | Redirección de http a https y una sola versión del dominio (con o sin www), encabezado HSTS en la configuración del hosting y nada cargado por http. |
| 05 | **Meta títulos y descripciones** | Título (hasta 60 caracteres) y descripción (hasta 155) únicos por página, más Open Graph y Twitter con imagen de 1200×630, para que al compartir por WhatsApp se vea bien. |
| 06 | **Datos estructurados** | JSON-LD con `LocalBusiness` (nombre, `address` en Lima, Zárate, `areaServed` con radio de 100 km desde Zárate, `geo`, `telephone`, `openingHours`, `sameAs`, `logo`, `foundingDate` 2025-09), un `Service` por servicio y `FAQPage`. Validado con la Prueba de resultados enriquecidos de Google. |
| 07 | **Sitemap y robots.txt** | `sitemap.xml` con todas las páginas y `robots.txt` que lo indique. |
| 08 | **Ficha de Google** | Preparame todo para el Perfil de Empresa de Google: nombre, categoría principal y secundarias, descripción de hasta 750 caracteres, servicios, zona de servicio (sin dirección visible si preferimos), horario y lista de fotos. Dame los pasos para crearla y verificarla, porque eso lo hago yo con mi cuenta. En el sitio, link para dejarnos una reseña. |
| 09 | **Favicon** | A partir de `marca/agroatom-icono.svg`: SVG, ICO de 32 px, `apple-touch-icon` de 180 px, `manifest.webmanifest` con íconos de 192 y 512 px y `theme-color` verde oscuro. |
| 10 | **Texto alternativo en las imágenes** | Descripción real en español en cada imagen que informa, y `alt=""` en las decorativas. |
| 11 | **Imágenes comprimidas** | AVIF o WebP con `srcset`, sin imágenes de más de 250 KB salvo justificación. |
| 12 | **Velocidad de carga optimizada** | Las metas de la sección 9, medidas con Lighthouse en celular y mostradas. |
| 13 | **Contraste de colores** | Mínimo 4,5:1 en texto normal y 3:1 en texto grande e íconos, revisado en modo oscuro y claro. |
| 14 | **Que se vea bien en el móvil** | Probado a 360, 390, 768, 1024 y 1440 px, con capturas. |
| 15 | **Página 404 personalizada** | Con el mismo diseño, un mensaje amable con humor del rubro (ejemplo: "Este lote no figura en el mapa") y botones a inicio y WhatsApp. |
| 16 | **Enlaces rotos arreglados** | Revisión automática de todos los links internos, externos y anclas, con cero errores. |
| 17 | **Formularios protegidos contra spam** | Campo trampa oculto, tiempo mínimo de llenado, validación y el filtro del servicio de formularios (o Cloudflare Turnstile). Sin captchas molestos. |
| 18 | **Botón de WhatsApp visible** | En la barra, la portada, el banner final, el contacto y flotante en celular. Mensaje ya escrito, probado en celular y en computadora. |
| 19 | **Analítica instalada** | Vercel Web Analytics (sin cookies) o GA4 con modo de consentimiento. Medir clics en WhatsApp, clics en el teléfono y envíos del formulario. |
| 20 | **Google Search Console** | Dominio verificado y sitemap enviado. Dame los pasos si tengo que hacer algo yo. |

---

## 11. Proceso con puntos de control

Pará y esperá mi respuesta en cada ⛔.

1. Leé todo este brief, mirá la imagen de referencia y el logo (`marca/lamina-logo.png`). Si faltan datos críticos, haceme **una sola lista corta** de preguntas.
2. Investigación breve (sección 3) y resumen en 5 puntos.
3. ⛔ **Propuesta visual:** paleta en hex, tipografías, cómo adaptás cada bloque de la referencia y una captura del boceto de la portada con el logo puesto.
4. Si no hay fotos propias, entregame la **lista de fotos y videos para sacar**, siempre a la hora dorada (amanecer o atardecer), en horizontal y con buena resolución:
   - Foto de portada: piloto de espaldas con el control y el T50 pulverizando el cultivo a contraluz.
   - T50 en vuelo con la nube de pulverización.
   - T50 esparciendo granulado o semilla al voleo.
   - Despegue desde la camioneta o el trailer.
   - Carga del tanque.
   - Baterías y generador.
   - Plan de vuelo en la pantalla del control.
   - Detalle de los atomizadores.
   - Los dos integrantes con el equipo.
   - Lote terminado.
   - Video corto de una aplicación para "Mirá cómo trabajamos".
5. Construcción de la versión 1 completa.
6. **Auto-revisión** con las skills de la sección 4: capturas en 3 tamaños, consola sin errores, todos los links y botones probados, formulario y WhatsApp funcionando, Lighthouse medido, y búsqueda de palabras prohibidas y rayas largas hasta que no quede ninguna.
7. ⛔ Me pasás el link de vista previa y las capturas al lado de la referencia. Rondas de cambios.
8. Revisión de SEO, datos estructurados y checklist de 20 puntos.
9. ⛔ Publicación de prueba en Vercel. Con mi OK, producción, dominio, HTTPS, Search Console y analítica.
10. **Entrega:**
    - Link en vivo.
    - Puntajes de Lighthouse.
    - Checklist "20 de 20".
    - Texto listo para la ficha de Google.
    - Lista de `[PENDIENTE]`.
    - Cómo pedir cambios.

---

## 12. Criterios de aceptación

- [ ] Se nota la inspiración en la referencia (verde oscuro, acento lima, foto dorada, tarjetas con datos y tablero), pero con identidad propia y sin copiar.
- [ ] El sitio y el logo se sienten de la misma familia (crema, oliva, marino y las lomas).
- [ ] Se entiende qué hacemos, dónde y cómo contactarnos sin hacer scroll en un celular.
- [ ] El WhatsApp abre con el mensaje ya escrito, en celular y en computadora.
- [ ] La tarjeta de condiciones muestra clima real o se oculta. Nunca muestra datos falsos.
- [ ] El tablero de misión está marcado como ejemplo.
- [ ] Ningún dato inventado: todo lo que falta está marcado como `[PENDIENTE]`.
- [ ] Los datos del T50 están verificados con la fuente oficial.
- [ ] Ninguna palabra prohibida ni raya larga en todo el sitio.
- [ ] Checklist de lanzamiento completo: **20 de 20**.
- [ ] Revisamos el sitio y dijimos que se ve como lo imaginábamos.
