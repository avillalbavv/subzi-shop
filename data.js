/**
 * Datos y configuración de SubZi
 * Editá acá: WhatsApp, productos, textos, imágenes.
 */
window.SUBZI = window.SUBZI || {};

SUBZI.WHATSAPP_NUMBER = "595983929719"; // sin + para wa.me

SUBZI.categoryImages = {
  chatgpt: "./assets/products/chatgpt.png",
  games: "./assets/products/games.png",
  steam: "./assets/products/steam.png",
};

// Categorías (solo navegación)
SUBZI.categories = [
  { id: "chatgpt", label: "ChatGPT", emoji: "🤖", page: "./chatgpt.html" },
  { id: "games", label: "Juegos", emoji: "🎮", page: "./games.html" },
  { id: "steam", label: "Steam Keys", emoji: "🔑", page: "./steam.html" },
];

// Cupones opcionales
SUBZI.coupons = {
  SUBZI10: { type: "percent", value: 10, note: "10% OFF en el total (si hay precios cargados)" },
};

// Cashback (config)
SUBZI.cashback = {
  rate: 0.1, // 10%
  minOrderAmount: 50000, // mínimo para generar cashback
  redeemableCategories: ["games"], // dónde se puede usar
  maxRedeemPercent: 0.25, // máximo 25% del total por compra
  maxRedeemPerOrder: 20000, // tope absoluto por compra
  expiryDays: 30, // vence a los 30 días
  cooldownHours: 12, // anti-abuso: 1 acreditación cada 12h (por cuenta)
  nonTransferable: true,
  noCashOut: true,
  noCouponsWithCashback: false, // si querés, ponelo en true
};

// Productos
// - image: "./assets/products/mi-imagen.png" (opcional)
// - details: { plan, pagos, how, extraHtml } (editable)
SUBZI.products = [
  // =========================
  // CHATGPT
  // =========================
  {
    id: "chatgpt-plus",
    category: "chatgpt",
    icon: "✨",
    name: "ChatGPT Plus",
    price: 39000,
    currency: "PYG",
    badge: "Suscripción",
    desc: "Suscripción ChatGPT Plus (consulta disponibilidad).",
    image: "./assets/products/chatgpt-plus.png",
    features: ["Soporte", "Guía inicial", "Renovación"],
    details: {
      plan: "Suscripción Plus. Beneficios según el plan vigente.",
      pagos: "Pago por período (mensual) a coordinar por WhatsApp.",
      how: "Agregás al cesto y enviás el pedido por WhatsApp. Te guiamos con la activación/uso.",
    },
  },
  {
    id: "chatgpt-pro",
    category: "chatgpt",
    icon: "⚡",
    name: "ChatGPT Pro",
    price: 39000,
    currency: "PYG",
    badge: "Suscripción",
    desc: "Plan Pro para tu cuenta — te enviamos invitación al correo del cliente.",
    image: "./assets/products/chatgpt-pro.png",
    features: ["Prioridad", "Más límites", "Soporte"],
    details: {
      plan: "ChatGPT Pro (beneficios según el plan vigente).",
      pagos: "Pago por período a coordinar por WhatsApp.",
      how: "Nos pasás tu correo. Te enviamos la invitación al email del cliente y te guiamos para dejarlo funcionando.",
            extraHtml: `<div class="pRich richText">
  <h4>¿Qué es ChatGPT Pro?</h4>
  <p class="fine">Información sobre nuestro plan de suscripción de pago, <span class="pill">Pro</span>.</p>
  <p class="fine"><b>Última actualización:</b> el mes pasado</p>

  <div class="pDivider"></div>

  <h4>Beneficios de ChatGPT Pro</h4>
  <p><b>Todo lo incluido en ChatGPT Plus:</b> respuestas más rápidas, acceso prioritario, modo de voz, GPT personalizados, generación de imágenes, investigación profunda, agente de ChatGPT y más.</p>

  <ul>
    <li>✅ <b>Acceso ilimitado</b> a GPT-5 y a algunos modelos heredados.</li>
    <li>✅ <b>Acceso ilimitado</b> a voz avanzada.</li>
    <li>✅ Incluye <b>límites más altos</b> para video y compartir pantalla.</li>
    <li>✅ <b>Tráfico priorizado</b> y sin límites en horas pico.</li>
    <li>✅ <b>Interrupciones minimizadas</b>, incluso en momentos de mayor demanda.</li>
    <li>✅ <b>Acceso anticipado</b> a nuevas funciones y modelos.</li>
    <li>✅ Sé de los primeros en probar nuevas capacidades cuando se lancen.</li>
    <li>✅ <b>Acceso ampliado</b> a investigación profunda y al agente de ChatGPT.</li>
    <li>✅ Usa razonamiento para sintetizar grandes cantidades de información en línea y completar tareas de investigación de varios pasos.</li>
    <li>✅ <b>Acceso ampliado</b> a la generación de video con Sora.</li>
    <li>✅ Acceso a la vista previa de investigación del agente Codex.</li>
  </ul>

  <div class="pDivider"></div>

  <h4>📩 Activación en tu propia cuenta</h4>
  <p class="pNote">Nos pasás tu correo y te enviamos la <b>invitación al email del cliente</b>. Te guiamos por WhatsApp para activarlo en tu cuenta.</p>
  <p class="fine">*Beneficios sujetos al plan vigente y pueden variar con el tiempo.</p>
</div>`,
    },
  },

  // =========================
  // JUEGOS
  // =========================
  {
    id: "god-of-war-2018",
    category: "games",
    icon: "🪓",
    name: "God of War Ragnarök Deluxe Edition",
    price: 30000,
    currency: "PYG",
    badge: "Juego",
    desc: "Activación offline (PC) — Edición Deluxe.",
    image: "./assets/products/god-of-war-2018.png",
    features: ["Entrega digital", "Soporte", "Activación offline"],
    details: {
      plan: "Edición Deluxe (PC) — activación offline.",
      pagos: "Pago a coordinar por WhatsApp.",
      how: "Agregás al cesto y finalizás por WhatsApp. Confirmamos stock y te guiamos con la activación.",
      extraHtml: `<div class="pRich">
  <h4>🔥 ¿Qué incluye la <span class="pill">Edición Deluxe</span>?</h4>
  <ul class="pBullets">
    <li>👉 Versión completa de <b>God of War Ragnarök</b> para PC</li>
    <li>👉 DLC <b>Valhalla</b></li>
    <li>👉 Banda sonora digital oficial</li>
    <li>👉 Mini artbook digital (Dark Horse)</li>
    <li>👉 Armadura <b>Darkdale</b> para Kratos</li>
    <li>👉 Atuendo <b>Darkdale</b> para Atreus</li>
    <li>👉 Empuñadura del hacha <b>Darkdale</b></li>
    <li>👉 Empuñaduras de las espadas <b>Darkdale</b></li>
  </ul>

  <div class="pDivider"></div>

  <h4>⁉️ ¿Por qué elegir nuestras <span class="pill">activaciones offline</span>?</h4>
  <ul class="pChecks">
    <li>✅ <b>Mejor precio</b>: disfrutá sin costos extra.</li>
    <li>✅ <b>Bonos y juegos extra</b>: regalos para variar tu experiencia.</li>
    <li>✅ <b>Cuenta Steam licenciada</b>: solo cuentas oficiales.</li>
    <li>✅ <b>Sin límite de tiempo</b>: acceso permanente para jugar offline cuando quieras.</li>
    <li>✅ <b>Acceso a actualizaciones</b>: disfrutá updates sin perder acceso.</li>
    <li>✅ <b>Garantía</b>: acceso continuo al juego y sus actualizaciones.</li>
  </ul>

  <p class="pNote">Además del juego, te llevás una experiencia completa y extras. ¡Aprovechá la oportunidad! 🚀 🎮</p>
</div>`,
    },
  },
  {
    id: "silent-hill-f",
    category: "games",
    icon: "🩸",
    name: "Silent Hill f",
    price: 45000,
    currency: "PYG",
    badge: "Juego",
    desc: "Activación offline (PC) — consultá stock.",
    image: "./assets/products/silent-hill-f.png",
    features: ["Entrega digital", "Soporte", "Activación offline"],
    details: {
      plan: "Silent Hill f (PC) — activación offline.",
      pagos: "Pago a coordinar por WhatsApp.",
      how: "Agregás al cesto y finalizás por WhatsApp. Confirmamos stock y te guiamos con la activación.",
    },
  },
  {
    id: "fc-26",
    category: "games",
    icon: "⚽",
    name: "EA SPORTS FC 26",
    price: 0,
    currency: "PYG",
    badge: "Juego",
    desc: "Activación offline (PC) — consultá stock y precio.",
    image: "./assets/products/fc-26.png",
    features: ["Entrega digital", "Soporte", "Consultar"],
    details: {
      plan: "EA SPORTS FC 26 (PC) — activación offline.",
      pagos: "Pago a coordinar por WhatsApp.",
      how: "Confirmamos stock/precio y te guiamos con la activación.",
    },
  },
  {
    id: "spiderman-remastered",
    category: "games",
    icon: "🕷️",
    name: "Marvel’s Spider-Man Remastered (2018)",
    price: 0,
    currency: "PYG",
    badge: "Juego",
    desc: "Activación offline (PC) — consultá stock y precio.",
    image: "./assets/products/spiderman-remastered.png",
    features: ["Entrega digital", "Soporte", "Consultar"],
    details: {
      plan: "Marvel’s Spider-Man Remastered (PC) — activación offline.",
      pagos: "Pago a coordinar por WhatsApp.",
      how: "Confirmamos stock/precio y te guiamos con la activación.",
    },
  },
  {
    id: "sons-of-the-forest",
    category: "games",
    icon: "🌲",
    name: "Sons of the Forest",
    price: 0,
    currency: "PYG",
    badge: "Juego",
    desc: "Activación offline (PC) — consultá stock y precio.",
    image: "./assets/products/sons-of-the-forest.png",
    features: ["Entrega digital", "Soporte", "Consultar"],
    details: {
      plan: "Sons of the Forest (PC) — activación offline.",
      pagos: "Pago a coordinar por WhatsApp.",
      how: "Confirmamos stock/precio y te guiamos con la activación.",
    },
  },
  // =========================
  // STEAM KEYS
  // =========================
  {
    id: "steam-key-a-pedido",
    category: "steam",
    icon: "🔑",
    name: "Steam Key a pedido",
    price: 0,
    currency: "PYG",
    badge: "Steam Key",
    desc: "Pedinos cualquier juego de Steam y te cotizamos la key según disponibilidad.",
    image: "./assets/products/steam.png",
    features: ["Entrega digital", "Soporte", "Consulta rápida"],
    details: {
      plan: "Key digital para activar directamente en Steam.",
      pagos: "Precio y pago a coordinar por WhatsApp según el juego que busques.",
      how: "Nos escribís qué juego querés, te confirmamos disponibilidad, te pasamos el total y te entregamos la key con guía de activación.",
      extraHtml: `<div class="pRich">
  <h4>🎯 Steam Keys por pedido</h4>
  <p>Ideal si querés comprar un juego puntual sin depender de cuentas compartidas. Te cotizamos la <span class="pill">key oficial</span> según stock y región disponible.</p>
  <ul class="pChecks">
    <li>✅ Activación directa en tu cuenta de Steam</li>
    <li>✅ Entrega digital y soporte por WhatsApp</li>
    <li>✅ Consultá lanzamientos, ofertas y juegos AAA</li>
  </ul>
</div>`,
    },
  },
  {
    id: "steam-key-aaa",
    category: "steam",
    icon: "🚀",
    name: "Steam Keys AAA",
    price: 0,
    currency: "PYG",
    badge: "Top ventas",
    desc: "Consultá por lanzamientos, precompras y juegos AAA con activación en Steam.",
    image: "./assets/products/steam.png",
    features: ["AAA", "Preventa", "Steam"],
    details: {
      plan: "Keys para títulos premium y lanzamientos nuevos.",
      pagos: "Cotización variable según juego y disponibilidad.",
      how: "Agregás al cesto o escribís por WhatsApp con el nombre del juego. Te respondemos con stock, precio y entrega.",
    },
  },
  {
    id: "steam-key-ofertas",
    category: "steam",
    icon: "🔥",
    name: "Steam Keys en oferta",
    price: 0,
    currency: "PYG",
    badge: "Ofertas",
    desc: "Bundles, ofertas y keys recomendadas para jugar en PC con mejor precio.",
    image: "./assets/products/steam.png",
    features: ["Bundles", "Ofertas", "PC"],
    details: {
      plan: "Selección de keys en oferta y recomendaciones para PC.",
      pagos: "Se confirma según la promo disponible al momento de tu consulta.",
      how: "Te mostramos opciones activables en Steam y cerrás el pedido por WhatsApp.",
    },
  },

];
