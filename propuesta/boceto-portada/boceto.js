/* AgroAtom · boceto: tema, navegación, video y clima para aplicar.
   Con ?muestra en la URL usa datos de ejemplo (para ver el boceto sin conexión). */
(() => {
  "use strict";

  const LUGAR = { lat: -34.05, lon: -59.2, zona: "America/Argentina/Buenos_Aires" };

  // [PENDIENTE: confirmar umbrales con el equipo y su asesor]
  const CRITERIOS = {
    viento: (v) => (v < 2 || v > 20 ? "no" : v < 4 || v > 15 ? "prec" : "ok"),
    rafagas: (v) => (v > 25 ? "no" : v > 20 ? "prec" : "ok"),
    deltat: (v) => (v > 10 ? "no" : v < 2 || v > 8 ? "prec" : "ok"),
    temp: (v) => (v > 32 ? "no" : v > 28 ? "prec" : "ok"),
    hum: (v) => (v < 40 ? "no" : v < 50 ? "prec" : "ok"),
    lluvia: (prob, mm) => (mm > 0.1 || prob > 60 ? "no" : prob >= 30 ? "prec" : "ok"),
  };
  const PESO = { ok: 0, prec: 1, no: 2 };
  const TEXTO_ESTADO = {
    ok: "Buenas condiciones para aplicar",
    prec: "Aplicar con precaución",
    no: "No conviene aplicar",
  };
  const NOMBRE = { viento: "viento", rafagas: "ráfagas", deltat: "Delta T", temp: "temperatura", hum: "humedad", lluvia: "lluvia" };
  const ICONO = { ok: "#i-ok", prec: "#i-prec", no: "#i-no" };
  const PUNTOS = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSO", "SO", "OSO", "O", "ONO", "NO", "NNO"];

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const num = (n, d = 0) => n.toLocaleString("es-AR", { minimumFractionDigits: d, maximumFractionDigits: d });
  const conComa = (texto) => {
    const [ent, dec] = texto.split(",");
    if (dec === undefined) return [document.createTextNode(texto)];
    const coma = document.createElement("span");
    coma.className = "coma";
    coma.textContent = ",";
    return [document.createTextNode(ent), coma, document.createTextNode(dec)];
  };
  const peor = (estados) => estados.reduce((a, b) => (PESO[b] > PESO[a] ? b : a), "ok");
  const punto = (grados) => PUNTOS[Math.round(grados / 22.5) % 16];

  // Temperatura de bulbo húmedo (Stull 2011) y Delta T
  const deltaT = (t, hr) => {
    const tw = t * Math.atan(0.151977 * Math.sqrt(hr + 8.313659)) + Math.atan(t + hr) - Math.atan(hr - 1.676331)
      + 0.00391838 * Math.pow(hr, 1.5) * Math.atan(0.023101 * hr) - 4.686035;
    return Math.max(0, t - tw);
  };

  /* ---------- Tema ---------- */
  const raiz = document.documentElement;
  const pintarTema = () => {
    const claro = raiz.dataset.theme === "light";
    $$("[data-tema]").forEach((b) => b.setAttribute("aria-label", claro ? "Cambiar a modo oscuro" : "Cambiar a modo claro"));
    $('meta[name="theme-color"]').content = claro ? "#F7F1E3" : "#0F1A13";
  };
  $$("[data-tema]").forEach((b) => b.addEventListener("click", () => {
    raiz.dataset.theme = raiz.dataset.theme === "light" ? "dark" : "light";
    try { localStorage.setItem("agroatom-tema", raiz.dataset.theme); } catch (e) { /* sin almacenamiento */ }
    pintarTema();
  }));
  pintarTema();

  /* ---------- Navegación ---------- */
  const nav = $("[data-nav]");
  const alBajar = () => nav.classList.toggle("is-compacta", window.scrollY > 24);
  addEventListener("scroll", alBajar, { passive: true });
  alBajar();

  const botonMenu = $("[data-menu]");
  const menu = $("#menu-movil");
  const abrirMenu = (abrir) => {
    menu.hidden = !abrir;
    botonMenu.setAttribute("aria-expanded", String(abrir));
    botonMenu.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
    $("use", botonMenu).setAttribute("href", abrir ? "#i-cerrar" : "#i-menu");
    nav.classList.toggle("is-compacta", abrir || window.scrollY > 24);
    document.body.style.overflow = abrir ? "hidden" : "";
  };
  botonMenu.addEventListener("click", () => abrirMenu(menu.hidden));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) abrirMenu(false); });
  addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu.hidden) { abrirMenu(false); botonMenu.focus(); } });

  /* ---------- Video: se carga solo al tocar ---------- */
  const dialogo = $("[data-dialogo-video]");
  $("[data-video]").addEventListener("click", () => dialogo.showModal());
  $("[data-cerrar]", dialogo).addEventListener("click", () => dialogo.close());
  dialogo.addEventListener("click", (e) => { if (e.target === dialogo) dialogo.close(); });

  /* ---------- Clima ---------- */
  const evaluarHora = (h) => {
    const dt = deltaT(h.temp, h.hum);
    const est = {
      viento: CRITERIOS.viento(h.viento),
      rafagas: CRITERIOS.rafagas(h.rafagas),
      deltat: CRITERIOS.deltat(dt),
      temp: CRITERIOS.temp(h.temp),
      hum: CRITERIOS.hum(h.hum),
      lluvia: CRITERIOS.lluvia(h.prob3h ?? h.prob, h.mm),
    };
    return { ...h, dt, est, estado: peor(Object.values(est)) };
  };

  const normalizar = (datos) => {
    const hh = datos.hourly;
    const ahoraMs = Date.parse(datos.current.time);
    const horas = hh.time.map((t, i) => ({
      t, ms: Date.parse(t),
      temp: hh.temperature_2m[i], hum: hh.relative_humidity_2m[i],
      viento: hh.wind_speed_10m[i], rafagas: hh.wind_gusts_10m[i], dir: hh.wind_direction_10m[i],
      mm: hh.precipitation[i], prob: hh.precipitation_probability[i] ?? 0,
    }));
    horas.forEach((h, i) => { h.prob3h = Math.max(...horas.slice(i, i + 3).map((x) => x.prob)); });
    const desde = horas.findIndex((h) => h.ms + 3600e3 > ahoraMs);
    const proximas = horas.slice(Math.max(0, desde), Math.max(0, desde) + 24).map(evaluarHora);
    const c = datos.current;
    const ahora = evaluarHora({
      t: c.time, temp: c.temperature_2m, hum: c.relative_humidity_2m, viento: c.wind_speed_10m,
      rafagas: c.wind_gusts_10m, dir: c.wind_direction_10m, mm: c.precipitation ?? 0,
      prob: proximas[0] ? proximas[0].prob3h : 0,
    });
    return { ahora, proximas };
  };

  const etiquetaHora = (t) => `${Number(t.slice(11, 13))} h`;

  // Tramos de 2 h o más seguidas en buenas condiciones, en orden
  const tramosBuenos = (proximas) => {
    const tramos = [];
    let ini = null;
    proximas.forEach((h, i) => {
      if (h.estado === "ok" && ini === null) ini = i;
      const ultimo = i === proximas.length - 1;
      if ((h.estado !== "ok" || ultimo) && ini !== null) {
        const fin = h.estado === "ok" ? i : i - 1;
        if (fin - ini + 1 >= 2) tramos.push([ini, fin]);
        ini = null;
      }
    });
    return tramos;
  };
  const textoTramo = ([a, b], proximas) => {
    const hoy = proximas[0].t.slice(0, 10);
    const desde = Number(proximas[a].t.slice(11, 13));
    const hasta = Number(proximas[b].t.slice(11, 13)) + 1;
    return `${etiquetaDia(proximas[a].t, hoy).toLowerCase()} de ${desde} a ${hasta} h`;
  };
  const etiquetaDia = (t, hoy) => (t.slice(0, 10) === hoy ? "Hoy" : "Mañana");

  const pintarEstado = (el, estado) => {
    el.dataset.estado = estado;
    const uso = $("use", el);
    if (uso) uso.setAttribute("href", ICONO[estado]);
  };

  const pintarPortada = ({ ahora, proximas }, fuente) => {
    const tarjeta = $("[data-ahora]");
    if (!tarjeta) return;
    const est = $("[data-ahora-estado]", tarjeta);
    pintarEstado(est, ahora.estado);
    $("span", est).textContent = TEXTO_ESTADO[ahora.estado];
    const filas = {
      viento: [`${num(ahora.viento)} km/h ${punto(ahora.dir)}`, ahora.viento / 30, ahora.est.viento],
      temp: [`${num(ahora.temp)} °C`, ahora.temp / 40, ahora.est.temp],
      hum: [`${num(ahora.hum)} %`, ahora.hum / 100, ahora.est.hum],
    };
    Object.entries(filas).forEach(([k, [txt, v, e]]) => {
      const fila = $(`[data-fila="${k}"]`, tarjeta);
      $("[data-v]", fila).textContent = txt;
      fila.dataset.estado = e;
      $(".barra i", fila).style.setProperty("--v", Math.min(1, Math.max(0.02, v)));
    });
    const ventana = $("[data-ahora-ventana]", tarjeta);
    const [primero] = tramosBuenos(proximas);
    if (primero) {
      const fuerte = document.createElement("strong");
      fuerte.textContent = textoTramo(primero, proximas);
      ventana.replaceChildren(document.createTextNode(primero[0] === 0 ? "Buena ventana ahora: " : "Próxima ventana buena: "), fuerte);
      ventana.hidden = false;
    }
    $("[data-ahora-fuente]", tarjeta).replaceChildren(document.createTextNode(fuente));
    tarjeta.hidden = false;
  };

  const pintarTablero = ({ ahora, proximas }, actualizado, muestra) => {
    const tablero = $("[data-tablero]");
    tablero.classList.remove("is-cargando");
    $("[data-actualizado]", tablero).textContent = actualizado;

    // Estado actual y motivo
    const grande = $("[data-estado-ahora]", tablero);
    pintarEstado(grande, ahora.estado);
    $("[data-estado-texto]", grande).textContent = TEXTO_ESTADO[ahora.estado];
    const motivos = Object.entries(ahora.est).filter(([, e]) => e !== "ok").map(([k]) => NOMBRE[k]);
    $("[data-estado-motivo]", grande).textContent = motivos.length ? `Por ${motivos.join(", ")}` : "Todas las variables en rango";

    const valores = {
      viento: [`${num(ahora.viento)}`, "km/h"],
      rafagas: [`${num(ahora.rafagas)}`, "km/h"],
      deltat: [`${num(ahora.dt, 1)}`, "°C"],
      temp: [`${num(ahora.temp)}`, "°C"],
      hum: [`${num(ahora.hum)}`, "%"],
      lluvia: [`${num(ahora.prob)}`, "% de probabilidad"],
    };
    Object.entries(valores).forEach(([k, [v, u]]) => {
      const item = $(`[data-var="${k}"]`, tablero);
      pintarEstado(item, ahora.est[k]);
      const destino = $("[data-v]", item);
      const unidad = document.createElement("small");
      unidad.textContent = u;
      destino.replaceChildren(...conComa(v), unidad);
    });
    $('[data-var="viento"] [data-nota]', tablero).textContent = `Del ${punto(ahora.dir)}, sopla hacia el ${punto((ahora.dir + 180) % 360)}`;
    $("[data-flecha]", tablero).style.setProperty("--rot", `${ahora.dir}deg`);
    $("[data-marca]", tablero).style.setProperty("--v", Math.min(1, ahora.dt / 14));

    const hoy = proximas[0].t.slice(0, 10);
    const tramos = tramosBuenos(proximas);
    const ventanas = $("[data-ventanas]", tablero);
    ventanas.replaceChildren();
    if (tramos.length) {
      [...tramos].sort((a, b) => (b[1] - b[0]) - (a[1] - a[0])).slice(0, 2).sort((a, b) => a[0] - b[0]).forEach((tramo, i) => {
        const p = document.createElement("p");
        const fuerte = document.createElement("strong");
        const texto = textoTramo(tramo, proximas);
        fuerte.textContent = texto[0].toUpperCase() + texto.slice(1);
        const largo = tramo[1] - tramo[0] + 1;
        p.append(document.createTextNode(i === 0 ? "Ventana buena: " : "Otra ventana: "), fuerte, document.createTextNode(` (${largo} h seguidas)`));
        ventanas.append(p);
      });
    } else {
      const p = document.createElement("p");
      p.className = "sin";
      p.textContent = "No hay ventanas claras en las próximas 24 horas. Escribinos y lo vemos con el pronóstico extendido.";
      ventanas.append(p);
    }

    // Gráfico de barras
    const maxEje = Math.max(30, Math.ceil(Math.max(...proximas.map((h) => h.viento)) / 10) * 10);
    const grilla = $("[data-grilla]", tablero);
    grilla.replaceChildren(...[0, 10, 20, 30, 40].filter((v) => v <= maxEje).map((v) => {
      const d = document.createElement("div");
      d.style.setProperty("--y", v / maxEje);
      const s = document.createElement("span");
      s.textContent = v;
      d.append(s);
      return d;
    }));
    const barras = $("[data-barras]", tablero);
    const horas = $("[data-horas]", tablero);
    const lluvias = $("[data-lluvias]", tablero);
    const angosto = matchMedia("(max-width: 560px)").matches;
    barras.replaceChildren();
    horas.replaceChildren();
    lluvias.replaceChildren();
    proximas.forEach((h, i) => {
      const b = document.createElement("div");
      b.className = "hora";
      b.dataset.estado = h.estado;
      b.dataset.i = i;
      b.style.setProperty("--n", i);
      if (i > 0 && h.t.slice(11, 13) === "00") b.classList.add("medianoche");
      b.setAttribute("aria-label", `${etiquetaDia(h.t, hoy)} ${etiquetaHora(h.t)}: ${TEXTO_ESTADO[h.estado].toLowerCase()}. Viento ${num(h.viento)} km/h, ráfagas ${num(h.rafagas)}, Delta T ${num(h.dt, 1)}, lluvia ${num(h.prob)} %.`);
      b.setAttribute("role", "img");
      const i_ = document.createElement("i");
      i_.style.setProperty("--v", Math.min(1, h.viento / maxEje));
      b.append(i_);
      barras.append(b);
      const s = document.createElement("span");
      const cada = angosto ? 6 : 3;
      s.textContent = i % cada === 0 ? Number(h.t.slice(11, 13)) : "";
      horas.append(s);
      const ll = document.createElement("span");
      const gota = document.createElement("i");
      gota.style.setProperty("--v", h.prob / 100);
      ll.append(gota);
      lluvias.append(ll);
    });

    // Tooltip con mouse y teclado
    const tip = $("[data-tooltip]", tablero);
    const area = $(".grafico__area", tablero);
    let activa = 0;
    const mostrar = (i) => {
      const h = proximas[i];
      $$(".hora", barras).forEach((x) => x.classList.toggle("is-activa", Number(x.dataset.i) === i));
      const filas = [
        ["viento", `${num(h.viento)} km/h ${punto(h.dir)}`], ["ráfagas", `${num(h.rafagas)} km/h`],
        ["Delta T", `${num(h.dt, 1)} °C`], ["temperatura", `${num(h.temp)} °C`], ["humedad", `${num(h.hum)} %`], ["lluvia", `${num(h.prob)} %`],
      ];
      const titulo = document.createElement("b");
      titulo.textContent = `${etiquetaDia(h.t, hoy)} ${etiquetaHora(h.t)} · ${TEXTO_ESTADO[h.estado]}`;
      tip.replaceChildren(titulo, ...filas.map(([k, v]) => {
        const d = document.createElement("div");
        const f = document.createElement("strong");
        f.append(...conComa(v));
        d.append(f, document.createTextNode(` ${k}`));
        return d;
      }));
      const barra = barras.children[i];
      const x = barra.offsetLeft + barra.offsetWidth / 2;
      const ancho = 180;
      tip.style.left = `${Math.min(Math.max(0, x - ancho / 2), area.clientWidth - ancho)}px`;
      tip.style.top = "-8px";
      tip.style.transform = "translateY(-100%)";
      tip.classList.add("is-visible");
    };
    const ocultar = () => { tip.classList.remove("is-visible"); $$(".hora", barras).forEach((x) => x.classList.remove("is-activa")); };
    barras.tabIndex = 0;
    barras.onpointermove = (e) => { const b = e.target.closest(".hora"); if (b) { activa = Number(b.dataset.i); mostrar(activa); } };
    barras.onpointerleave = ocultar;
    barras.onfocus = () => mostrar(activa);
    barras.onblur = ocultar;
    barras.onkeydown = (e) => {
      const paso = { ArrowRight: 1, ArrowLeft: -1, Home: -99, End: 99 }[e.key];
      if (paso === undefined) return;
      e.preventDefault();
      activa = Math.min(proximas.length - 1, Math.max(0, activa + paso));
      mostrar(activa);
    };

    // Tabla accesible con los mismos datos
    const tabla = document.createElement("table");
    tabla.className = "tabla-horas";
    const cab = ["Hora", "Estado", "Viento km/h", "Ráfagas", "Dir.", "Delta T", "Temp. °C", "Hum. %", "Lluvia %"];
    const thead = tabla.createTHead().insertRow();
    cab.forEach((c) => { const th = document.createElement("th"); th.scope = "col"; th.textContent = c; thead.append(th); });
    const tbody = tabla.createTBody();
    proximas.forEach((h) => {
      const r = tbody.insertRow();
      [`${etiquetaDia(h.t, hoy)} ${etiquetaHora(h.t)}`, TEXTO_ESTADO[h.estado], num(h.viento), num(h.rafagas), punto(h.dir), num(h.dt, 1), num(h.temp), num(h.hum), num(h.prob)]
        .forEach((v) => { r.insertCell().textContent = v; });
    });
    $("[data-tabla]", tablero).replaceChildren(tabla);

    if (muestra) {
      const m = document.createElement("span");
      m.className = "muestra";
      m.textContent = "Datos de muestra";
      $("[data-actualizado]", tablero).append(" ", m);
    }
  };

  const errorTablero = () => {
    const tablero = $("[data-tablero]");
    tablero.classList.remove("is-cargando");
    const cuerpo = $(".tablero__cuerpo", tablero);
    const p = document.createElement("p");
    p.className = "tablero__error";
    p.textContent = "No pudimos cargar el pronóstico en este momento. Escribinos y te pasamos las condiciones para tu lote.";
    cuerpo.replaceWith(p);
    $("[data-actualizado]", tablero).textContent = "Sin datos";
  };

  const url = "https://api.open-meteo.com/v1/forecast?" + new URLSearchParams({
    latitude: LUGAR.lat, longitude: LUGAR.lon, timezone: LUGAR.zona, forecast_days: 2, wind_speed_unit: "kmh",
    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation",
    hourly: "temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,precipitation_probability",
  });

  const muestra = new URLSearchParams(location.search).has("muestra");

  const cargar = async () => {
    let datos;
    if (muestra) {
      datos = window.AGROATOM_MUESTRA;
    } else {
      const control = new AbortController();
      const corte = setTimeout(() => control.abort(), 6000);
      const r = await fetch(url, { signal: control.signal });
      clearTimeout(corte);
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      datos = await r.json();
    }
    if (!datos || !datos.current || !datos.hourly) throw new Error("respuesta incompleta");
    const listo = normalizar(datos);
    if (!listo.proximas.length) throw new Error("sin horas");
    const hora = datos.current.time.slice(11, 16);
    pintarPortada(listo, muestra ? "Datos de muestra" : `Open-Meteo · ${hora}`);
    pintarTablero(listo, `Actualizado ${hora}`, muestra);
  };

  const iniciar = () => cargar().catch(() => errorTablero());
  if (muestra && !window.AGROATOM_MUESTRA) {
    const s = document.createElement("script");
    s.src = "muestra.js";
    s.onload = iniciar;
    s.onerror = errorTablero;
    document.head.append(s);
  } else {
    iniciar();
  }
})();
