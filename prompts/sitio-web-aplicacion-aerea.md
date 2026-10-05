# Prompt: sitio web de aplicación aérea con DJI Agras T50

> **Cómo usarlo:**
> 1. Completá los campos entre corchetes de la sección 1. Lo que no sepas, dejalo así y Claude lo marca como pendiente.
> 2. Abrí una sesión nueva de Claude Code en este repo.
> 3. Adjuntá tu logo, tus fotos o videos y las dos imágenes de referencia (el diseño de "Zenze Agri Solutions" y el checklist "20 de 20").
> 4. Pegá todo lo que está debajo de la línea.

---

## Rol

Sos un equipo senior completo: director de arte, diseñador UI/UX, redactor especializado en el agro y desarrollador front-end. Vas a diseñar, construir, revisar y publicar el sitio web de **[NOMBRE DE LA EMPRESA]**, una empresa de aplicación aérea con drones DJI Agras T50.

El sitio es **informativo**: explica quiénes somos, qué hacemos, con qué equipo, dónde trabajamos y cómo contactarnos. Tiene que verse profesional, moderno y propio. No es una tienda ni una plataforma: es la carta de presentación de la empresa.

---

## 1. Datos de la empresa

- **Nombre comercial:** [NOMBRE]
- **Razón social y CUIT** (para el aviso legal): [RAZÓN SOCIAL] · [CUIT]
- **Logo:** [adjunto / no tengo: proponé un logotipo simple con una hoja o un drone y el nombre]
- **Base y zona de trabajo:** [ciudad, provincia, país] · cobertura: [radio en km, departamentos o provincias]
- **Desde cuándo trabajamos:** [año]
- **Equipo humano:** [cantidad de pilotos, ingeniero agrónomo asesor, etc.]
- **Equipos:** [cantidad] DJI Agras T50 · [generador, camioneta o trailer de apoyo, baterías, otros]
- **Servicios:** [elegí y completá]
  - Pulverización de fitosanitarios (herbicidas, fungicidas, insecticidas)
  - Fertilización foliar
  - Esparcido de fertilizantes granulados
  - Siembra al voleo de cultivos de servicio o cobertura
  - [otros]
- **Cultivos:** [soja, maíz, trigo, girasol, pasturas, frutales, etc.]
- **Habilitaciones y seguros:** [registros ante la autoridad aeronáutica, habilitación provincial o municipal de aplicadores, seguro de responsabilidad civil]. Solo lo que realmente tenemos.
- **Números reales (si los hay):** [hectáreas aplicadas, campañas, clientes]
- **Contacto:** WhatsApp [+54 9 ...] · teléfono [...] · email [...] · dirección [...] · horario [...]
- **Redes:** [Instagram, Facebook, YouTube, LinkedIn]
- **Dominio:** [ejemplo.com.ar / todavía no tengo]
- **Trato al visitante:** [vos / usted]
- **Material propio:** [fotos y videos del T50 trabajando: sí / no]
- **Perfil de Empresa en Google:** [ya tengo / no tengo]

---

## 2. Objetivo y medida de éxito

- En **10 segundos** un productor tiene que entender qué hacemos, en qué zona y con qué equipo, y ver cómo contactarnos.
- **Acción principal:** escribirnos por WhatsApp con un mensaje ya escrito.
- **Acciones secundarias:** llamar, mandar un email o completar el formulario.
- Cada sección tiene que acercar al visitante al contacto.

## 3. A quién le hablamos

Productores agropecuarios, contratistas rurales, ingenieros agrónomos y asesores, acopios, cooperativas y empresas del sector. La mayoría entra **desde el celular, en el campo y con poca señal**: el sitio tiene que ser liviano y pensado primero para el teléfono.

**Lo que les preocupa** (escribí con estas palabras):
- Lotes anegados o con piso blando donde no entra la pulverizadora terrestre (el mosquito).
- Pisoteo y huellas en cultivos altos, como el maíz avanzado.
- Perder la ventana de aplicación por clima o por falta de equipos.
- Deriva, dosis mal aplicadas, cobertura despareja.
- Lotes chicos, irregulares o con obstáculos.

**Lo que quieren:** aplicar en el momento justo, sin pisar el cultivo, con dosis precisa y con un registro o mapa de lo que se aplicó.

**Lo que los frena:** ¿rinde suficientes hectáreas? ¿la calidad es buena? ¿es legal y está habilitado? ¿cuánto cuesta por hectárea? ¿qué pasa con viento?

Antes de diseñar, hacé una investigación corta: revisá entre 3 y 5 sitios de empresas de aplicación con drones o aeroaplicadores de [PAÍS], y foros o grupos de productores. Anotá qué hacen bien, qué hacen mal y qué palabras usa la gente. Usá eso en los textos.

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
- **Títulos grandes en dos líneas**: la primera en blanco hueso y la segunda en lima.
- **Tarjetas oscuras semitransparentes**, con borde fino de 1 px, esquinas redondeadas y un leve desenfoque cuando van sobre una foto.
- **Datos que se ven como tecnología:** una franja de estadísticas con íconos sobre la foto, una tarjeta flotante con barras de progreso y un panel tipo tablero de control.
- **Dibujos de líneas finas** (hojas) decorando las esquinas de algunas secciones, muy sutiles.
- Indicador de "Bajá para explorar" con un ícono de mouse al final de la portada.
- Mucho aire, grilla prolija y jerarquía clara.

**Cómo adaptamos cada bloque:**

| Bloque de Zenze | Nuestra versión |
|---|---|
| Logo con hoja + "Agri Solutions" | Nuestro logo + subtítulo chico "Aplicaciones aéreas" |
| Productor con tablet mirando el campo | **Piloto con el control mirando el T50 pulverizando sobre el cultivo al atardecer** (foto real) |
| "Smart solutions for a better tomorrow" | Píldora: "APLICACIÓN AÉREA CON DRONES · [ZONA]" |
| Título "Nurturing Nature. Empowering Farmers." | Ejemplo: "Precisión en cada lote." / "Sin pisar el cultivo." (segunda línea en lima) |
| "Explore Solutions" + "Watch Story" | "Pedí tu cotización →" (abre WhatsApp) + "▶ Mirá cómo trabajamos" (abre nuestro video en una ventana) |
| Franja: 25K+ farmers, 1.2M acres, 40%, 30% | Franja con **datos reales**: años en la zona, hectáreas aplicadas, localidades cubiertas. Si no hay números propios, datos del equipo: "40 L por vuelo", "hasta 21 ha/h (dato de DJI)" |
| Tarjeta "Live Farm Insights" (humedad del suelo, temperatura, lluvia) | Tarjeta **"Condiciones ahora en [CIUDAD BASE]"**: viento, temperatura y humedad, las variables que mira un aplicador. **Datos reales en vivo** de la API gratuita de Open-Meteo (sin clave), con la fuente indicada. Si la API falla, la tarjeta se oculta sola. |
| "Intelligent Solutions for Every Farm" + 4 tarjetas | "QUÉ HACEMOS": título a la izquierda, párrafo corto a la derecha y **4 tarjetas de servicios** con ícono en círculo de color y botón circular con flecha |
| "Data. AI. IoT. Better Together." + tablero "Farm Overview" | "NUESTRA TECNOLOGÍA": "DJI Agras T50." / "Precisión en cada pasada." con lista de beneficios con tildes lima, y a la derecha un **tablero de misión de vuelo** (ver sección 7) |
| Banner final con manos y plantín + "Join Zenze Today" | Banner con foto (el T50 al atardecer o manos con tierra), "Hagamos tu próxima aplicación." y botón de WhatsApp. Fotos de clientes solo si son reales y con permiso. Si no, sin fotos. |
| Botón de modo claro/oscuro | Oscuro por defecto, con opción de modo claro que se recuerda en el navegador |

---

## 6. Dirección visual

Partí de la referencia y antes de construir mostrame tu propuesta concreta (colores en código hex, tipografías y una captura del boceto de la portada). **Esperá mi aprobación.**

**Paleta de punto de partida** (ajustala con las fotos reales):
- Fondo: verde bosque muy oscuro (por ejemplo `#0E1A13`). Nunca negro puro.
- Superficies y tarjetas: un verde apenas más claro (`#15251B`) con borde `rgba(255,255,255,0.08)`.
- Acento: verde lima (`#A3D95B`), usado poco: botones principales, palabras clave y datos.
- Texto: blanco hueso (`#EEF2EA`). Texto secundario: verde grisáceo (`#A9B5A6`).
- Apoyo para íconos de servicios: celeste apagado, ocre tierra y ámbar, siempre en círculos con poca saturación.
- Contraste mínimo AA en todo, incluido el texto oscuro sobre los botones lima.

**Tipografía:** una sans geométrica y limpia como la de la referencia (por ejemplo Manrope, Plus Jakarta Sans o General Sans) para títulos y texto, y una monoespaciada para los números del tablero y las etiquetas. Nada de Inter, Roboto ni Arial como display. Máximo 3 familias.

**Elemento distintivo propio:** la **ruta de vuelo en zigzag** que el drone recorre sobre el lote, en líneas SVG finas color lima. Se dibuja sola al hacer scroll en el tablero de misión y aparece de forma sutil como separador o detalle de fondo. Convive con las líneas de hojas de la referencia.

**Reglas:**
- Íconos propios en SVG con un mismo trazo fino. Nada de emojis como íconos.
- Prohibido el look genérico de IA: degradés violetas, vidrio esmerilado en todos lados, gotas 3D flotando.
- **Fotos:** priorizá siempre fotos reales de nuestro T50, nuestro equipo y nuestros lotes, en clave cálida de hora dorada como la referencia. Los productores conocen los equipos: una foto de stock de otro drone o una imagen generada con el T50 deformado nos quita credibilidad. Si no hay fotos, dejá marcadores claros y armá la lista de fotos a sacar (sección 11).
- **Movimiento:** sutil y con propósito. Animaciones de interfaz de menos de 300 ms con curvas de easing propias, entrada suave de cada bloque al aparecer, barras y anillos que se llenan al entrar en pantalla, números que cuentan solo si son reales y la ruta de vuelo que se dibuja. Todo respeta `prefers-reduced-motion`.

---

## 7. Estructura y contenido

Una sola página con anclas, más las páginas de aviso legal, privacidad y 404. El orden sigue a la referencia.

1. **Barra de navegación:** logo + "Aplicaciones aéreas" · Inicio · Servicios · Tecnología · Nosotros · Preguntas · Contacto. El link activo se subraya en lima. A la derecha, botón píldora lima "Cotizá →" que abre WhatsApp y el botón de modo claro/oscuro. Fija y más compacta al bajar. Menú propio en celular.
2. **Portada (hero):** como se describe en la sección 5: píldora con etiqueta, título en dos líneas, párrafo concreto (ejemplo: "Pulverizamos y fertilizamos con DJI Agras T50 en [ZONA]. Llegamos donde no entra el mosquito y aplicamos en el momento justo."), dos botones, franja de datos abajo a la izquierda, tarjeta de condiciones en vivo abajo a la derecha e indicador de scroll. En celular, la tarjeta de condiciones pasa debajo de la franja o se oculta.
3. **Qué hacemos:** las 4 tarjetas de servicios (pulverización, fertilización foliar, granulados, siembra de cobertura). Cada una dice qué es, cuándo conviene y en qué cultivos. La flecha abre más detalle.
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
6. **Cómo trabajamos:** 4 pasos numerados con línea que los une: 1) nos contactás y nos pasás los datos del lote · 2) receta agronómica y planificación del vuelo (mapa del lote, obstáculos, pronóstico) · 3) aplicación controlando viento, temperatura y humedad · 4) informe con el registro de lo aplicado. Ajustalo a lo que realmente hacemos.
7. **Quiénes somos:** la historia, el equipo y que somos de la zona y conocemos los lotes. Foto del equipo.
8. **Zona de cobertura:** mapa liviano en estilo oscuro (imagen estática o mapa que carga solo al llegar a esa parte) y lista de localidades.
9. **Seguridad y habilitaciones:** registros, seguro, buenas prácticas de aplicación y trabajo con receta agronómica. Solo datos reales.
10. **Preguntas frecuentes** (acordeón): ¿cuántas hectáreas hacen por día? · ¿cuánto cuesta por hectárea? (si no hay precio fijo, explicá de qué depende y llevá al WhatsApp) · ¿qué productos aplican? · ¿qué pasa con viento o lluvia? · ¿necesito receta agronómica? · ¿qué datos necesitan para cotizar? · ¿tienen seguro? Dejá las respuestas marcadas para que yo las confirme.
11. **Banner final:** como en la referencia, foto a la izquierda, frase y botón de WhatsApp.
12. **Contacto:**
    - Botón grande de WhatsApp con mensaje ya escrito: `https://wa.me/[NÚMERO SIN + NI ESPACIOS]?text=Hola,%20quiero%20cotizar%20una%20aplicación%20para%20___%20ha%20de%20___%20en%20___`
    - Teléfono que se marca con un toque, email, dirección y horario.
    - Formulario en tarjeta oscura: nombre, teléfono, localidad, cultivo, hectáreas, servicio y mensaje, con protección contra spam (punto 17 del checklist). Decime con claridad a dónde llegan los mensajes (Formspree o similar a mi email) y armá el mensaje de "gracias" según eso.
13. **Pie de página:** logo, datos de contacto, redes, habilitaciones, links a aviso legal y privacidad, y año.
14. **Botón flotante de WhatsApp** en celular, que no tape contenido importante.

---

## 8. Cómo escribir los textos

- Español de [PAÍS], tono profesional y cercano, tratando de [vos / usted].
- Frases cortas y concretas, con el vocabulario del productor: lote, campaña, mosquito, pisoteo, anegado, deriva, ventana de aplicación, receta.
- Cada beneficio con un hecho concreto, no con un adjetivo.
- **Palabras prohibidas:** soluciones integrales, innovador, de vanguardia, líderes, sinergia, potenciar, revolucionar, experiencia única, calidad premium, excelencia, a tu medida.
- Sin rayas largas (—). Usá comas y puntos.
- **No inventes nada:** ni números, ni testimonios, ni clientes, ni certificaciones, ni precios. Donde falte un dato, poné `[PENDIENTE: qué falta]` y sumalo a la lista final.

---

## 9. Requisitos técnicos

- **Stack:** HTML, CSS y JavaScript sin frameworks ni paso de compilación: `index.html`, `aviso-legal.html`, `privacidad.html`, `404.html` y una carpeta `assets/`. Si proponés otra cosa, explicá por qué.
- **Celular primero:** funciona bien desde 360 px de ancho. Botones de al menos 44 px. Sin scroll horizontal.
- **Velocidad (en celular con 4G):** LCP menor a 2,5 s, CLS menor a 0,1, INP menor a 200 ms y Lighthouse de 95 o más en las cuatro categorías.
- **Foto de portada:** precargada, en AVIF o WebP con `srcset`, de 250 KB como máximo en celular. El resto de las imágenes se cargan cuando el visitante llega a ellas y declaran su ancho y alto.
- **Video de "Mirá cómo trabajamos":** se carga solo cuando el visitante toca el botón, nunca al abrir la página.
- **Fuentes:** propias o de Google Fonts con `display=swap`, precargando solo la principal.
- **Accesibilidad (WCAG 2.2 AA):** HTML semántico, foco visible en lima, navegación con teclado, acordeón y ventana de video accesibles, y movimiento reducido.
- **SEO local:**
  - Búsquedas a cubrir: "aplicación con drones [zona]", "pulverización con drone [zona]", "fumigación con drone [zona]", "DJI T50 [zona]".
  - El nombre, la dirección y el teléfono tienen que ser **idénticos** en el sitio, el JSON-LD y la ficha de Google.

---

## 10. Checklist de lanzamiento: 20 de 20

El sitio no está terminado hasta que estén los 20 puntos. Al final, mostrámelo como **"20 de 20"** con un ✓ por punto y una línea de cómo verificaste cada uno.

| # | Punto | Qué tiene que tener |
|---|---|---|
| 01 | **Aviso legal** | Página `aviso-legal.html` con razón social, CUIT, domicilio, contacto y propiedad del contenido. |
| 02 | **Política de privacidad** | Página `privacidad.html` en lenguaje claro: qué datos junta el formulario, para qué, dónde se guardan, la analítica y cómo pedir que se borren, según la ley de [PAÍS] (en Argentina, la Ley 25.326 de Protección de Datos Personales). |
| 03 | **Aviso de cookies** | Cartel discreto y accesible con "Aceptar" y "Rechazar" y link a privacidad. Si la analítica usa cookies, no se carga hasta que el visitante acepta. |
| 04 | **Forzar HTTPS** | Redirección de http a https y una sola versión del dominio (con o sin www), encabezado HSTS en la configuración del hosting y nada cargado por http. |
| 05 | **Meta títulos y descripciones** | Título (hasta 60 caracteres) y descripción (hasta 155) únicos por página, más Open Graph y Twitter con imagen de 1200×630, para que al compartir por WhatsApp se vea bien. |
| 06 | **Datos estructurados** | JSON-LD con `LocalBusiness` (`areaServed`, `geo`, `telephone`, `openingHours`, `sameAs`, `logo`), un `Service` por servicio y `FAQPage`, validado con la Prueba de resultados enriquecidos de Google. |
| 07 | **Sitemap y robots.txt** | `sitemap.xml` con todas las páginas y `robots.txt` que lo indique. |
| 08 | **Ficha de Google** | Preparame todo para el Perfil de Empresa de Google: nombre, categoría principal y secundarias, descripción de hasta 750 caracteres, servicios, zona, horario y lista de fotos. Dame los pasos para crearla y verificarla, porque eso lo hago yo con mi cuenta. En el sitio, link para dejarnos una reseña. |
| 09 | **Favicon** | SVG, ICO de 32 px, `apple-touch-icon` de 180 px, `manifest.webmanifest` con íconos de 192 y 512 px y `theme-color` verde oscuro. |
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

1. Leé todo este brief y mirá la imagen de referencia. Si faltan datos críticos, haceme **una sola lista corta** de preguntas.
2. Investigación breve (sección 3) y resumen en 5 puntos.
3. ⛔ **Propuesta visual:** paleta en hex, tipografías, cómo adaptás cada bloque de la referencia y una captura del boceto de la portada.
4. Si no hay fotos propias, entregame la **lista de fotos y videos para sacar**, siempre a la hora dorada (amanecer o atardecer), en horizontal y con buena resolución:
   - Foto de portada: piloto de espaldas con el control y el T50 pulverizando el cultivo a contraluz.
   - T50 en vuelo con la nube de pulverización.
   - Despegue desde la camioneta o el trailer.
   - Carga del tanque.
   - Baterías y generador.
   - Plan de vuelo en la pantalla del control.
   - Detalle de los atomizadores.
   - Equipo completo.
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
- [ ] Se entiende qué hacemos, dónde y cómo contactarnos sin hacer scroll en un celular.
- [ ] El WhatsApp abre con el mensaje ya escrito, en celular y en computadora.
- [ ] La tarjeta de condiciones muestra clima real o se oculta. Nunca muestra datos falsos.
- [ ] El tablero de misión está marcado como ejemplo.
- [ ] Ningún dato inventado: todo lo que falta está marcado como `[PENDIENTE]`.
- [ ] Los datos del T50 están verificados con la fuente oficial.
- [ ] Ninguna palabra prohibida ni raya larga en todo el sitio.
- [ ] Checklist de lanzamiento completo: **20 de 20**.
- [ ] Yo revisé el sitio y dije que se ve como lo imaginaba.
