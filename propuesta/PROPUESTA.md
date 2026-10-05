# AgroAtom · Propuesta visual (punto de control ⛔ 3)

> **Qué necesito de vos:** que apruebes (o corrijas) la paleta, las tipografías y el boceto de la portada y del tablero de clima, y que contestes las preguntas de la sección 7. Con eso arranco la versión 1 completa.

Boceto navegable: `propuesta/boceto-portada/index.html` (abrilo con `?muestra` al final de la dirección para ver el tablero con datos de ejemplo sin conexión).
Capturas: `propuesta/capturas/`.

---

## 1. Skills: qué había y qué faltó

En esta sesión en la nube no quedó instalado ningún plugin (el `settings.json` del repo los activa, pero la lista de instalados está vacía). Esto es lo que pasó con cada etapa:

| Etapa | Skill pedida | Estado |
|---|---|---|
| Planificar | `superpowers:brainstorming`, `superpowers:writing-plans` | **Faltan.** Planifiqué sin ellas. |
| Dirección de diseño | `frontend-design:frontend-design` | **No instalada, pero leí su `SKILL.md`** desde el catálogo oficial descargado y seguí su método (plan de tokens, revisión contra el brief, capturas para criticar). |
| Dirección de diseño | `design-taste-frontend`, `ui-ux-pro-max`, `impeccable` | **Faltan.** No corrí el buscador de `ui-ux-pro-max` ni `/impeccable shape`. |
| Gráficos del tablero | `dataviz` | **Usada.** Validé los colores del semáforo con su script de daltonismo y seguí sus reglas de barras, leyenda, tooltip y tabla accesible. |
| Documentación de librerías | `context7` | **Falta.** No usé librerías externas; los parámetros de Open-Meteo los verifiqué en su documentación con el buscador. |
| Animación | `emil-design-eng`, `animate`, `review-animations` | **Faltan.** |
| Pruebas visuales | `playwright` | **El plugin falta, pero Playwright y Chromium están instalados** en el entorno: con eso saqué las capturas, revisé la consola y el scroll horizontal. |
| Accesibilidad y velocidad | `chrome-devtools-mcp` | **Falta.** Para Lighthouse voy a usar la herramienta de línea de comandos en la etapa de revisión. |
| SEO | `searchfit-seo:*` | **Faltan** (son de tu cuenta de claude.ai, no llegan a la nube). |
| Código | `/code-review`, `/simplify` | **Disponibles**, los uso en la revisión. |
| Publicación | `/vercel:deploy` | **Falta.** Vamos a necesitar un token de Vercel o que conectes el repo desde vercel.com. |

También está en el repo la skill `10k-websites`, pero no la usé: arma el sitio con imágenes y videos generados por IA y publica en Hostinger, y tu brief pide fotos reales del T50 y Vercel.

**Red:** este entorno bloquea casi todos los sitios externos (DJI, Agrofy, Open-Meteo, mapas). Investigué con el buscador web, que sí funciona. Si querés que la próxima ronda lea los sitios completos y pruebe Open-Meteo en vivo, hay que agregar esos dominios en la configuración de red del entorno (menú del entorno en la barra de la sesión, Editar, Acceso a red). Pasos: https://code.claude.com/docs/en/cloud-environments#network-access

---

## 2. Investigación en 5 puntos

Revisé (a través del buscador) los sitios de **FlyDron**, **Rinde Aéreo**, **AgroVuelos**, **RuFFel Agro Dron** y **Agro Misión** (Henderson), notas de Agrofy News, Bichos de Campo, el blog de AgroSpray y material del INTA.

1. **Todos dicen lo mismo con las mismas palabras.** "Precisión milimétrica", "drones de última generación", "maximizar el rendimiento", "ahorro de hasta 30 %, 40 % o 70 %" sin decir de dónde sale el número. Ninguno muestra a las personas, la zona exacta ni cuándo **no** conviene el drone. Ahí está nuestro lugar: datos concretos, gente con nombre, zona con mapa y honestidad.
2. **Lo que hacen bien y vamos a hacer:** lista clara de servicios (pulverización, fertilización, siembra al voleo), el modelo de DJI a la vista, "entra cuando el suelo no deja entrar la maquinaria después de una lluvia" (AgroVuelos) y "registro de cada vuelo" (Rinde Aéreo).
3. **Las palabras del productor:** pisoteo ("cuando entra un equipo terrestre se pisa entre el 1 % y el 5 % del cultivo", Agrofy), lote anegado, piso blando, mosquito, ventana de aplicación, deriva, receta, Delta T, "¿cuántas hectáreas hacen por día?" y "¿cuánto sale la hectárea?". El INTA calculó un costo operativo de referencia de US$ 3,34/ha con más de mil vuelos, y la misma nota aclara que la tarifa real suma logística, traslados y tiempos muertos: sirve para la pregunta frecuente de precios sin inventar uno.
4. **Lo que frena:** dudas sobre deriva (hay notas de denuncias en pueblos de la provincia) y sobre si es legal. En la provincia de Buenos Aires rigen la Ley 10.699, su Decreto 499/91 y la Resolución MDA 246/2018; además SENASA habilitó que los fitosanitarios se registren como "aptos para uso con drones" en el marbete. Mostrar las habilitaciones, la receta y el control de clima es lo que más confianza da.
5. **El clima decide todo.** Las guías de buenas prácticas hablan de viento entre 4 y 15 km/h y de Delta T entre 2 y 8 (INTA EEA Oliveros). Ningún competidor muestra el clima. Un **tablero de "Clima para aplicar"** con la ventana de las próximas 24 horas es útil para el productor, nos diferencia y lleva directo al WhatsApp ("¿Ves una ventana? Reservala").

---

## 3. Datos del DJI Agras T50 (verificados con la página oficial de DJI)

| Dato | Valor oficial | Uso en el sitio |
|---|---|---|
| Tanque de pulverización | 40 L | Franja de datos y lista de tecnología |
| Esparcido | Tanque de 75 L, carga de 50 kg | "Esparcido de hasta 50 kg" |
| Caudal | 16 L/min con 2 atomizadores, 24 L/min con 4 | Lista de tecnología |
| Rendimiento | 21 ha/h (dato de DJI en campo, condiciones ideales) | Franja, aclarado "según DJI" |
| Esparcido | Hasta 1,5 t/h | Opcional en granulados |
| Gota | 50 a 500 μm, regulable | "Tamaño de gota regulable" |
| Ancho efectivo | 4 a 11 m a 3 m sobre el cultivo | Tablero de misión |
| Sensores | Radar de arreglo en fase delantero y trasero (1 a 50 m) y visión binocular | Lista de tecnología |
| Relieve | Sigue el terreno hasta 50° de pendiente | Lista de tecnología |
| Viento máximo | 6 m/s (21,6 km/h) | Criterio del semáforo |
| Temperatura de operación | -20 a 50 °C | No hace falta mostrarlo |

Fuentes: [Especificaciones T50](https://ag.dji.com/t50/specs), [Agras T50 Top Features](https://ag.dji.com/newsroom/agras-t50-top-features), [Soporte T50](https://www.dji.com/support/product/t50). Ojo: como el sitio de DJI está bloqueado en este entorno, los leí en los extractos del buscador de esas páginas oficiales. Antes de publicar lo vuelvo a chequear con acceso directo, o lo podés abrir vos con esos links.

---

## 4. Propuesta visual

### Paleta (sale del logo)

**Modo oscuro (por defecto)**

| Rol | Hex | Contraste |
|---|---|---|
| Fondo, verde bosque de la familia del oliva | `#0F1A13` | |
| Superficie de tarjetas | `#18261C` | |
| Superficie elevada | `#1F3024` | |
| Borde fino | `rgba(253,241,219,0.09)` | |
| Texto principal, crema del logo | `#F6EDDA` | 15,3:1 |
| Texto secundario, verde grisáceo | `#AAB5A2` | 8,4:1 |
| Texto terciario (fuentes, ejes) | `#8C9A86` | 6,0:1 |
| Acento lima | `#A4D161` | 10,1:1 |
| Texto sobre botón lima, marino del logo | `#062636` | 8,9:1 |
| Oliva del logo (lomas, círculos de íconos, decoración) | `#526337` | solo decorativo |

**Modo claro (se recuerda en el navegador)**

| Rol | Hex | Contraste |
|---|---|---|
| Fondo | `#F7F1E3` | |
| Superficie | `#FFFBF2` | |
| Texto principal, marino | `#062636` | 13,9:1 |
| Texto secundario | `#46574A` | 6,9:1 |
| Acento para texto (lima oscurecido hacia el oliva) | `#4A6B1F` | 5,5:1 |
| Botón principal | lima `#A4D161` con texto marino | 8,9:1 |

La portada va siempre sobre la foto, así que conserva los tonos oscuros en los dos modos.

**Semáforo del clima** (validado con el script de daltonismo de la skill `dataviz`; siempre va con ícono y texto, nunca solo color, y "No conviene" además va rayado):

| Estado | Oscuro | Claro |
|---|---|---|
| Buenas condiciones | `#A4D161` | `#3E7B19` |
| Con precaución | `#C27A12` | `#DB9A16` |
| No conviene | `#FF8FA3` rayado | `#A8326E` rayado |

Resultado de la validación: separación para daltonismo ΔE 8,4 en oscuro y 9,7 en claro (meta: 8 o más), visión normal ΔE 18,9 y 25,4 (mínimo 15). El ámbar en modo claro queda en 2,35:1 contra el fondo: por eso cada barra tiene su texto en el tooltip, la leyenda y la tabla.

### Tipografías

- **Manrope** (la del logo) para títulos y texto. Variable de 200 a 800, alojada en el propio sitio (25 KB, la única que se precarga). Títulos en ExtraBold con interletra cerrada.
- **B612 Mono** para números del tablero, etiquetas y datos. La diseñó Airbus para las pantallas de cabina de los aviones: está hecha para leer instrumentos rápido, que es justo lo que pide un tablero de vuelo y clima. 19 KB por peso.
- Escala: H1 de 38 px (celular) a 72 px (compu), H2 de 32 a 56 px, texto de 16 a 19 px, etiquetas de 10 a 12 px en mayúsculas espaciadas.

### Elementos propios

- **Lomas del logo** como líneas finas en las esquinas (se ven arriba a la derecha del tablero de clima), en lugar de las hojas de la referencia.
- **Ruta de vuelo en zigzag** en lima: se dibuja al hacer scroll en el tablero de misión de la sección Tecnología y aparece sutil como separador. Va en la versión 1.
- **Semáforo de clima** en la portada y el tablero: es el momento "tecnológico" del sitio y además es útil de verdad.

### Cómo adapto cada bloque de la referencia

| Referencia (Zenze) | AgroAtom | En el boceto |
|---|---|---|
| Logo con hoja | Logo horizontal oscuro (en modo claro cambia solo a marino y oliva) | Sí |
| Productor con tablet | Piloto de espaldas con el control y el T50 pulverizando a contraluz | Marcador con guía de encuadre |
| Píldora "Smart solutions" | "Aplicación aérea con drones · Zárate y zona" | Sí |
| Título en dos líneas | "Precisión en cada lote." / "Sin pisar el cultivo." en lima | Sí |
| Dos botones | "Pedí tu cotización →" (WhatsApp) y "▶ Mirá cómo trabajamos" (video que carga recién al tocar) | Sí |
| Franja de estadísticas | 100 km, 40 L, 21 ha/h (según DJI), licencia y habilitación. Lugar oculto para hectáreas aplicadas | Sí |
| Tarjeta "Live Farm Insights" | **"Condiciones ahora"** con semáforo, viento, temperatura, humedad y la próxima ventana buena | Sí, con datos de muestra |
| 4 tarjetas de soluciones | 4 servicios con ícono en círculo oliva y flecha | Versión 1 |
| Tablero "Farm Overview" | Tablero "Misión de vuelo" con mapa del lote y ruta en zigzag, marcado "Ejemplo de misión" | Versión 1 |
| (no existe) | **Sección nueva "Clima para aplicar"** con la ventana de 24 horas (lo pediste recién) | Sí |
| Banner final | Foto del T50 al atardecer, "Hagamos tu próxima aplicación." y WhatsApp | Versión 1 |
| Modo claro/oscuro | Oscuro por defecto, el claro se recuerda | Sí |

### Capturas

| Archivo | Qué muestra |
|---|---|
| `capturas/01-portada-1440.png` | Portada en compu |
| `capturas/02-portada-375.png` | Primera pantalla en celular chico: se ve qué hacemos, dónde y el botón de cotizar sin bajar |
| `capturas/08-portada-360.png` | Celular de 360 px |
| `capturas/06-portada-768.png` | Tablet |
| `capturas/03-portada-390-completa.png` | Portada y tablero completos en celular |
| `capturas/04-tablero-1440.png` | Tablero de clima con el tooltip de una hora |
| `capturas/05-tablero-1440-claro.png` | Tablero en modo claro |
| `capturas/07-pagina-1440-completa.png` | Todo el boceto en compu |

Sin errores en la consola y sin scroll horizontal en ningún tamaño.

---

## 5. El tablero "Clima para aplicar" (tu pedido nuevo)

**Qué muestra:**
- **Ahora:** semáforo grande ("Buenas condiciones para aplicar", "Aplicar con precaución" o "No conviene aplicar") con el motivo ("Por viento, ráfagas"), y seis variables con su propio estado: viento con brújula (de dónde viene y hacia dónde sopla, clave para la deriva), ráfagas, **Delta T** con su banda ideal de 2 a 8, temperatura, humedad y lluvia de las próximas 3 horas.
- **Próximas 24 horas:** una barra por hora; la altura es el viento y el color, el estado. Arriba dice en palabras cuáles son las ventanas buenas ("Hoy de 20 a 24 h, 4 h seguidas"). Se recorre con el mouse o con las flechas del teclado, y los mismos datos están en una tabla.
- **Cómo lo calculamos:** desplegable con los umbrales y qué es el Delta T.
- **Aviso honesto:** es una guía con pronóstico; en el lote medimos antes de cada vuelo y la decisión final es del aplicador con la receta.
- **Botón "Reservá tu ventana"** que abre el WhatsApp.
- En la portada, si ahora no conviene, la tarjeta muestra igual la **próxima ventana buena**, así nunca queda solo un "no".

**Criterios que usé (a confirmar con ustedes y su asesor):**

| Variable | Buenas | Precaución | No conviene |
|---|---|---|---|
| Viento | 4 a 15 km/h | 2 a 4 o 15 a 20 km/h | menos de 2 o más de 20 km/h (el T50 aguanta hasta 21,6) |
| Ráfagas | hasta 20 km/h | 20 a 25 km/h | más de 25 km/h |
| Delta T | 2 a 8 °C | menos de 2 o 8 a 10 °C | más de 10 °C |
| Temperatura | hasta 28 °C | 28 a 32 °C | más de 32 °C |
| Humedad | 50 % o más | 40 a 50 % | menos de 40 % |
| Lluvia | menos de 30 % en 3 h | 30 a 60 % | más de 60 % o lloviendo |

Cada hora toma el peor estado de todas las variables. Si la fuente del clima falla, el tablero muestra "No pudimos cargar el pronóstico" con el botón de WhatsApp y la tarjeta de la portada se oculta. Nunca muestra datos inventados.

**⚠️ Tema a decidir: la fuente del clima.** Open-Meteo, la que pedía el brief, es gratis **solo para uso no comercial**, y sus términos dicen que mostrarlo en un sitio que promociona un negocio cuenta como comercial. Opciones:

1. **MET Norway (instituto meteorológico de Noruega), gratis y con uso comercial permitido** citando la fuente. Tiene cobertura mundial y trae viento, ráfagas, temperatura, humedad y lluvia. Pide identificarse en cada consulta, así que se llama desde una función chiquita en Vercel que además guarda la respuesta 15 minutos (el sitio carga más rápido y no saturamos el servicio). **Es mi recomendación.** La probabilidad de lluvia por hora puede no venir para Argentina; si falta, uso los milímetros previstos.
2. **Open-Meteo con plan pago** (API Standard). Es la más completa y la más simple de conectar. El precio está en https://open-meteo.com/en/pricing.
3. Sacar el tablero y dejar solo un link al pronóstico. No lo recomiendo: es lo que más nos diferencia.

---

## 6. Decisiones técnicas que propongo

- **Carpeta `sitio/` como raíz de la publicación en Vercel.** Así `marca/`, `prompts/`, `instalador-windows/` y `propuesta/` nunca se publican. Adentro va exactamente lo del brief: `index.html`, `aviso-legal.html`, `privacidad.html`, `404.html` y `assets/`.
- **HTML, CSS y JavaScript sin frameworks ni compilación**, como pide el brief. La única excepción sería la función del clima (un archivo en `api/`, sin compilación).
- **Fuentes y logo alojados en el sitio** (sin pedidos a Google ni cookies de terceros, mejor para la Ley 25.326 y para la velocidad).
- **Logo en línea en la barra**, optimizado de 23 KB a 6 KB, que cambia de colores con el modo claro sin descargar otro archivo.
- **Peso del boceto:** HTML 7,5 KB, CSS 6,6 KB y JS 5,9 KB comprimidos.

---

## 7. Preguntas (una sola lista)

1. **Contacto:** número de WhatsApp (¿es el mismo teléfono para llamar?), email y horario de atención.
2. **Datos legales y equipo:** nombre y apellido del titular, qué hace el segundo integrante, equipos de apoyo (generador, baterías, camioneta, trailer) y tipo de seguro.
3. **Clima:** ¿vamos con MET Norway gratis (mi recomendación) o con Open-Meteo pago? ¿Los umbrales del semáforo están bien o los ajustan con su asesor?
4. **Formulario:** ¿a qué email llegan los mensajes? Propongo Formspree (tiene plan gratis con límite mensual de envíos), más campo trampa y tiempo mínimo de llenado.
5. **Dominio y Vercel:** ¿ya tienen `agroatom.com.ar` u otro? ¿Tienen cuenta de Vercel, o la creamos y conectamos el repo?
6. **Entre Ríos:** ¿están habilitados para trabajar ahí? Si no, el mapa y la lista de localidades quedan solo en Buenos Aires.
7. **Redes y Google:** links de Instagram y Facebook, y si ya tienen Perfil de Empresa en Google.
8. **Material y números:** ¿tienen alguna foto o video del T50 trabajando, aunque sea de celular? ¿Cuántas hectáreas hacen en un día normal y cómo arman el precio (por hectárea, mínimo de hectáreas, traslado)? Lo uso en las preguntas frecuentes sin inventar valores.

La imagen de referencia de Zenze no llegó a esta sesión: trabajé con tu descripción, que alcanzó.

---

## 8. Fotos y videos para sacar

Siempre a la hora dorada (amanecer o atardecer), en horizontal, con buena resolución (idealmente 4000 px de ancho o más), sin filtros. Si es con celular, en el modo de foto normal (no retrato) y limpiando la lente.

| # | Toma | Para qué sección | Consejos |
|---|---|---|---|
| 1 | **Piloto de espaldas con el control, T50 pulverizando el cultivo a contraluz** | Portada | Sol bajo detrás del drone. Dejá el lado izquierdo del cuadro con cielo o cultivo (ahí va el texto). Sacá también una versión vertical para celular. |
| 2 | T50 en vuelo con la nube de pulverización | Servicios, tecnología | Lateral, con el cultivo debajo. Varias tomas en ráfaga. |
| 3 | T50 esparciendo granulado o semilla al voleo | Servicios | Que se vea el abanico de grano. |
| 4 | Despegue desde la camioneta o el trailer | Cómo trabajamos | Plano abierto, que se vea el equipo de apoyo. |
| 5 | Carga del tanque | Seguridad | Con elementos de protección puestos. |
| 6 | Baterías y generador | Tecnología | Ordenados, de día o al atardecer. |
| 7 | Plan de vuelo en la pantalla del control | Tecnología, cómo trabajamos | Sin reflejos, con el mapa del lote visible (sin datos privados de clientes). |
| 8 | Detalle de los atomizadores | Tecnología | Primer plano, puede ser con el drone en el piso. |
| 9 | Los dos integrantes con el equipo | Quiénes somos | Mirando a cámara, el T50 detrás, luz cálida de costado. |
| 10 | Lote terminado | Banner final | Plano abierto, sin huellas en el cultivo. |
| 11 | **Video corto de una aplicación** (30 a 60 s) | "Mirá cómo trabajamos" | Despegue, pasada sobre el lote, vista desde el piloto. Horizontal, 1080p o 4K, sin música de fondo con derechos. |

---

## 9. Lista de `[PENDIENTE]` hasta ahora

- Nombre del titular (aviso legal).
- WhatsApp, teléfono, email, horario.
- Rol del segundo integrante, equipos de apoyo, tipo de seguro.
- Redes, dominio, Perfil de Empresa en Google.
- Fotos y video propios (sección 8).
- Hectáreas aplicadas (lugar oculto ya preparado en la franja de datos).
- Fuente del clima y confirmación de los umbrales del semáforo.
- Destino del formulario.
- Habilitación en Entre Ríos (sí o no).

## 10. Después de tu OK

1. Versión 1 completa en `sitio/`: todas las secciones, tablero de misión con la ruta en zigzag, mapa de cobertura, preguntas frecuentes, contacto, páginas legales y 404.
2. Auto-revisión: capturas en 360, 390, 768, 1024 y 1440 px, consola, links, formulario, WhatsApp, Lighthouse, y búsqueda de palabras prohibidas y rayas largas.
3. Vista previa en Vercel para tu revisión (⛔ 7).
