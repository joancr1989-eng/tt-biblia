const JUGADORES = ["Miki", "Feme", "Jorge", "Marzal", "Humberto", "Joni", "Hugo", "Marc"];
const CATEGORIAS_TRIVIAL = [
  "Política", "Fútbol", "Tenis", "Basket", "Fórmula 1", "Geografía", "Historia"
];

const JUEGOS = [
  { id: "adivina_autor", nombre: "Adivina el autor", desc: "Frase aleatoria y quién lo dijo." },
  { id: "lo_dijo_o_no", nombre: "¿Lo dijo o no lo dijo?", desc: "Tres frases: dos ciertas y una falsa." },
  { id: "dato_justo", nombre: "El dato justo", desc: "Barra deslizante numérica con margen de error del ±15 %." },
  { id: "insultos", nombre: "Insultos", desc: "Frases y palabros míticos del grupo." },
  { id: "debattes", nombre: "DebaTTes", desc: "Preguntas sobre hilos polémicos del historial." },
  { id: "calfada", nombre: "La Calfada", desc: "Preguntas sobre frases de contenido sexual y calentón." }
];

const PREGUNTAS_BASE = [
  {
    categoria: "Fútbol",
    pregunta: "¿Quién soltó esta perla tras un partido de locos?",
    cita: "Eso es un pecheo histórico de manual, no me jodas.",
    opciones: ["Jorge", "Joni", "Miki", "Feme"],
    correcta: 0,
    explicacion: "Clásico de jornada futbolera en el grupo."
  },
  {
    categoria: "Política",
    pregunta: "¿Qué tema solía encender el chat a última hora?",
    cita: "Media hora hablando para no mojarse en nada.",
    opciones: ["Política", "Tenis", "Fórmula 1", "Geografía"],
    correcta: 0,
    explicacion: "Las tertulias políticas siempre levantaban ampollas."
  },
  {
    categoria: "Tenis",
    pregunta: "¿Qué tenista español protagonizó tardes de tensión en el chat?",
    cita: "Quinto set y tie-break comentado en directo.",
    opciones: ["Rafa Nadal", "Fernando Alonso", "Marc", "Hugo"],
    correcta: 0,
    explicacion: "Grandes tardes de tenis en el historial."
  },
  {
    categoria: "Basket",
    pregunta: "¿Qué deporte entraba en noches de eliminatorias y finales?",
    cita: "Último cuarto apretado y comentarios al instante.",
    opciones: ["Basket", "Geografía", "Historia", "Política"],
    correcta: 0,
    explicacion: "El baloncesto también ha tenido su hueco en el grupo."
  },
  {
    categoria: "Fórmula 1",
    pregunta: "¿Qué tema de motor marcó domingos de carrera?",
    cita: "Estrategias de gomas, lluvia y safety car.",
    opciones: ["Fórmula 1", "Tenis", "Basket", "Historia"],
    correcta: 0,
    explicacion: "Domingos de F1 en el archivo del TT."
  },
  {
    categoria: "Geografía",
    pregunta: "¿Qué destino o viaje dejó anécdotas propias?",
    cita: "Mapas, kilómetros y escapadas entre colegas.",
    opciones: ["Polonia", "El Bernabéu", "La Moncloa", "Roland Garros"],
    correcta: 0,
    explicacion: "Los viajes y estancias fuera siempre dejan historias."
  },
  {
    categoria: "Historia",
    pregunta: "¿Desde qué año arranca el historial del Triangulito Team?",
    cita: "Más de una década de mensajes y piques.",
    opciones: ["2012", "2016", "2018", "2020"],
    correcta: 0,
    explicacion: "El historial abarca de 2012 a 2026."
  }
];

const PREGUNTAS_LO_DIJO = [
  {
    pregunta: "¿Cuál de estas tres frases es FALSA?",
    opciones: [
      "«Hoy no voy a discutir de fútbol en todo el día»",
      "«Eso es un pecheo histórico de manual»",
      "«Qué lamentable es este panorama»"
    ],
    correcta: 0,
    explicacion: "Prometer paz futbolera eterna en el TT suena inventado."
  }
];

const PREGUNTAS_DEBATTES = [
  {
    pregunta: "En los debaTTes calientes del grupo, ¿qué pasaba tras una jugada polémica?",
    cita: "«No me jodas que defiendes eso ahora mismo»",
    opciones: [
      "Saltaban posturas enfrentadas al momento",
      "Todos coincidían a la primera",
      "Se cambiaba de tema sin decir nada",
      "Se cerraba el chat hasta el mes siguiente"
    ],
    correcta: 0,
    explicacion: "El choque de opiniones era el motor de los debaTTes."
  }
];

const PREGUNTAS_CALFADA = [
  {
    pregunta: "¿Qué define a La Calfada dentro de los juegos?",
    cita: "Frases y bromas pasadas de rosca en el historial.",
    opciones: [
      "Preguntas sobre frases de contenido sexual y calentón",
      "Resumen de presupuestos municipales",
      "Estadísticas de petanca",
      "Guía de riego de plantas"
    ],
    correcta: 0,
    explicacion: "El bloque dedicado a las salidas de tono sexuales del chat."
  }
];

const DATOS_JUSTOS = [
  {
    pregunta: "¿Cuántos mensajes totales suma el historial analizado (2012–2026)?",
    objetivo: 384482,
    min: 50000,
    max: 700000,
    paso: 1000,
    unidad: "mensajes"
  },
  {
    pregunta: "¿Cuántas palabras totales se han contabilizado en todo el archivo?",
    objetivo: 1860352,
    min: 200000,
    max: 3500000,
    paso: 10000,
    unidad: "palabras"
  }
];

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildPool(count, label) {
  const out = [];
  let bag = shuffle(PREGUNTAS_BASE);
  for (let i = 0; i < count; i++) {
    if (i > 0 && i % PREGUNTAS_BASE.length === 0) bag = shuffle(PREGUNTAS_BASE);
    const q = bag[i % bag.length];
    out.push({
      ...q,
      pregunta: count > PREGUNTAS_BASE.length ? `${q.pregunta} (${label} #${i + 1})` : q.pregunta
    });
  }
  return out;
}

let bancoEfemeride150 = buildPool(150, "Efeméride");
let efemerideOffset = 0;

function getTodayInfo() {
  const d = new Date();
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return { label: `${dd}/${mm}`, mmdd: `${mm}-${dd}` };
}

async function loadExternalData() {
  try {
    const r = await fetch("./data/stats_arcade.json", { cache: "no-store" });
    if (r.ok) {
      const stats = await r.json();
      if (stats.resumen_global) {
        document.getElementById("hero-total-msgs").textContent =
          Number(stats.resumen_global.total_mensajes).toLocaleString("es-ES");
        document.getElementById("hero-total-words").textContent =
          Number(stats.resumen_global.total_palabras).toLocaleString("es-ES");
      }
    }
  } catch (_) {}

  const hoy = getTodayInfo();
  try {
    const rEf = await fetch(`./data/efemerides/${hoy.mmdd}.json`, { cache: "no-store" });
    if (rEf.ok) {
      const ef = await rEf.json();
      if (Array.isArray(ef.preguntas) && ef.preguntas.length > 0) {
        const exp = [];
        for (let i = 0; i < 150; i++) exp.push(ef.preguntas[i % ef.preguntas.length]);
        bancoEfemeride150 = exp;
        startEfemerideQuiz(0);
      }
    }
  } catch (_) {}
}

function renderLogin() {
  const box = document.getElementById("player-buttons");
  box.innerHTML = "";
  JUGADORES.forEach((nombre) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "player-btn";
    btn.textContent = nombre;
    btn.onclick = () => selectUser(nombre);
    box.appendChild(btn);
  });
}

function selectUser(nombre) {
  localStorage.setItem("tt_biblia_user", nombre);
  initApp(nombre);
}

function logoutUser() {
  localStorage.removeItem("tt_biblia_user");
  document.getElementById("app-screen").style.display = "none";
  document.getElementById("bottom-nav").style.display = "none";
  document.getElementById("login-screen").style.display = "flex";
}

function initApp(nombre) {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("app-screen").style.display = "block";
  document.getElementById("bottom-nav").style.display = "flex";
  document.getElementById("current-user-label").textContent = nombre;

  const hoy = getTodayInfo();
  document.getElementById("efem-badge").textContent = `Efeméride • ${hoy.label}`;
  document.getElementById("efem-corner-title").textContent = `Tal día como hoy (${hoy.label})`;
  document.getElementById("efem-heading").textContent = `Efeméride: tal día como hoy (${hoy.label})`;

  startEfemerideQuiz(0);
  startRetoQuiz();
  renderTrivialCategories();
  renderJuegos();
  loadExternalData();
}

function switchTab(tab) {
  document.querySelectorAll(".tab-panel").forEach((p) => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.remove("active"));

  const panel = document.getElementById(`panel-${tab}`);
  if (panel) panel.classList.add("active");
  const nav = document.querySelector(`.nav-btn[data-tab="${tab}"]`);
  if (nav) nav.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function mountQuiz(containerId, preguntas, titulo) {
  const container = document.getElementById(containerId);
  let idx = 0;
  let score = 0;

  function renderQ() {
    if (idx >= preguntas.length) {
      container.innerHTML = `
        <div style="text-align:center; padding:16px;">
          <h3>¡Tanda completada!</h3>
          <p class="muted" style="margin:8px 0 14px;">${titulo}: <strong>${score}</strong> de <strong>${preguntas.length}</strong> aciertos.</p>
          <button type="button" class="btn" id="${containerId}-retry">Repetir tanda</button>
        </div>
      `;
      document.getElementById(`${containerId}-retry`).onclick = () => { idx = 0; score = 0; renderQ(); };
      return;
    }

    const q = preguntas[idx];
    container.innerHTML = `
      <div class="quiz-meta">
        <span>Pregunta ${idx + 1} / ${preguntas.length}</span>
        <span>Aciertos: ${score}</span>
      </div>
      <div style="font-size:18px; font-weight:700;">${q.pregunta}</div>
      ${q.cita ? `<div class="quote-box">${q.cita}</div>` : ""}
      <div class="options-list" id="${containerId}-opts"></div>
      <div class="feedback-box" id="${containerId}-fb"></div>
      <div style="margin-top:12px; display:flex; justify-content:flex-end;">
        <button type="button" class="btn secondary" id="${containerId}-next" style="display:none;">Siguiente →</button>
      </div>
    `;

    const opts = document.getElementById(`${containerId}-opts`);
    const fb = document.getElementById(`${containerId}-fb`);
    const next = document.getElementById(`${containerId}-next`);

    q.opciones.forEach((op, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "opt-btn";
      b.textContent = op;
      b.onclick = () => {
        opts.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
        if (i === q.correcta) {
          b.classList.add("correct");
          score++;
          fb.innerHTML = `<strong>¡Bien!</strong> ${q.explicacion || ""}`;
        } else {
          b.classList.add("wrong");
          opts.querySelectorAll("button")[q.correcta].classList.add("correct");
          fb.innerHTML = `<strong>Fallo.</strong> Era <strong>${q.opciones[q.correcta]}</strong>. ${q.explicacion || ""}`;
        }
        fb.style.display = "block";
        next.style.display = "inline-block";
      };
      opts.appendChild(b);
    });

    next.onclick = () => { idx++; renderQ(); };
  }

  renderQ();
}

function mountDatoJusto(containerId) {
  const container = document.getElementById(containerId);
  let idx = 0;
  let hits = 0;

  function renderDato() {
    if (idx >= DATOS_JUSTOS.length) {
      container.innerHTML = `
        <div style="text-align:center; padding:16px;">
          <h3>Ronda terminada</h3>
          <p class="muted" style="margin:8px 0 14px;">Has clavado <strong>${hits}</strong> de <strong>${DATOS_JUSTOS.length}</strong> dentro del ±15 %.</p>
          <button type="button" class="btn" id="dj-retry">Jugar de nuevo</button>
        </div>
      `;
      document.getElementById("dj-retry").onclick = () => { idx = 0; hits = 0; renderDato(); };
      return;
    }

    const item = DATOS_JUSTOS[idx];
    const mid = Math.round(((item.min + item.max) / 2) / item.paso) * item.paso;
    container.innerHTML = `
      <div class="quiz-meta">
        <span>Dato ${idx + 1} / ${DATOS_JUSTOS.length} • Margen ±15 %</span>
        <span>Aciertos: ${hits}</span>
      </div>
      <div style="font-size:18px; font-weight:700;">${item.pregunta}</div>
      <div class="slider-box">
        <div id="dj-val" class="slider-val">${mid.toLocaleString("es-ES")} ${item.unidad}</div>
        <input id="dj-range" type="range" min="${item.min}" max="${item.max}" step="${item.paso}" value="${mid}" />
      </div>
      <button type="button" class="btn" id="dj-check">Confirmar cifra</button>
      <div id="dj-fb" class="feedback-box"></div>
      <div style="margin-top:12px; display:flex; justify-content:flex-end;">
        <button type="button" class="btn secondary" id="dj-next" style="display:none;">Siguiente →</button>
      </div>
    `;

    const range = document.getElementById("dj-range");
    const val = document.getElementById("dj-val");
    const check = document.getElementById("dj-check");
    const fb = document.getElementById("dj-fb");
    const next = document.getElementById("dj-next");

    range.oninput = () => { val.textContent = `${Number(range.value).toLocaleString("es-ES")} ${item.unidad}`; };
    check.onclick = () => {
      range.disabled = true;
      check.disabled = true;
      const guess = Number(range.value);
      const margin = item.objetivo * 0.15;
      const ok = Math.abs(guess - item.objetivo) <= margin;
      if (ok) hits++;
      fb.innerHTML = `
        ${ok ? "<strong>¡Dentro del ±15 %!</strong>" : "<strong>Fuera del ±15 %.</strong>"}
        Dato exacto: <strong>${item.objetivo.toLocaleString("es-ES")} ${item.unidad}</strong>
        (válido entre ${Math.round(item.objetivo - margin).toLocaleString("es-ES")} y ${Math.round(item.objetivo + margin).toLocaleString("es-ES")}).
      `;
      fb.style.display = "block";
      next.style.display = "inline-block";
    };
    next.onclick = () => { idx++; renderDato(); };
  }

  renderDato();
}

function startEfemerideQuiz(customOffset = null) {
  if (customOffset !== null) efemerideOffset = customOffset;
  const slice = [];
  for (let i = 0; i < 30; i++) slice.push(bancoEfemeride150[(efemerideOffset + i) % bancoEfemeride150.length]);
  mountQuiz("efemeride-quiz-container", slice, "Efeméride");
}

function reloadEfemerideBatch() {
  efemerideOffset = (efemerideOffset + 30) % bancoEfemeride150.length;
  startEfemerideQuiz(efemerideOffset);
}

function startRetoQuiz() {
  mountQuiz("reto-quiz-container", buildPool(30, "Reto"), "El Reto del Día");
}

function renderTrivialCategories() {
  const grid = document.getElementById("trivial-categories");
  grid.innerHTML = "";
  CATEGORIAS_TRIVIAL.forEach((cat, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "cat-btn" + (i === 0 ? " active" : "");
    b.textContent = cat;
    b.onclick = () => {
      grid.querySelectorAll("button").forEach((x) => x.classList.remove("active"));
      b.classList.add("active");
      const filtradas = PREGUNTAS_BASE.filter((p) => p.categoria === cat);
      mountQuiz("trivial-quiz-container", filtradas.length ? filtradas : PREGUNTAS_BASE, `TTrivial • ${cat}`);
    };
    grid.appendChild(b);
  });
  const inicial = PREGUNTAS_BASE.filter((p) => p.categoria === CATEGORIAS_TRIVIAL[0]);
  mountQuiz("trivial-quiz-container", inicial.length ? inicial : PREGUNTAS_BASE, `TTrivial • ${CATEGORIAS_TRIVIAL[0]}`);
}

function renderJuegos() {
  const grid = document.getElementById("minigames-list");
  const stage = document.getElementById("minigame-stage");
  grid.innerHTML = "";

  JUEGOS.forEach((jg) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "hub-card";
    card.innerHTML = `<strong>${jg.nombre}</strong><span>${jg.desc}</span>`;
    card.onclick = () => {
      stage.style.display = "block";
      stage.innerHTML = `<h2>${jg.nombre}</h2><p class="muted" style="margin-bottom:14px;">${jg.desc}</p><div id="minigame-runner"></div>`;
      if (jg.id === "dato_justo") {
        mountDatoJusto("minigame-runner");
      } else if (jg.id === "lo_dijo_o_no") {
        mountQuiz("minigame-runner", PREGUNTAS_LO_DIJO, jg.nombre);
      } else if (jg.id === "debattes") {
        mountQuiz("minigame-runner", PREGUNTAS_DEBATTES, jg.nombre);
      } else if (jg.id === "calfada") {
        mountQuiz("minigame-runner", PREGUNTAS_CALFADA, jg.nombre);
      } else {
        mountQuiz("minigame-runner", buildPool(10, jg.nombre), jg.nombre);
      }
      stage.scrollIntoView({ behavior: "smooth" });
    };
    grid.appendChild(card);
  });
}

renderLogin();
const saved = localStorage.getItem("tt_biblia_user");
if (saved && JUGADORES.includes(saved)) initApp(saved);