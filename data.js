/**
 * Datos y configuración de SubZi
 * Editá acá: WhatsApp, productos, textos, imágenes.
 */
window.SUBZI = window.SUBZI || {};

SUBZI.WHATSAPP_NUMBER = "595983929719"; // sin + para wa.me

SUBZI.BUILD = "v12";

SUBZI.categoryImages = {
  chatgpt: "./assets/products/chatgpt.png",
  games: "./assets/products/games.png",
  steam: "./assets/products/steam.png",
  streaming: "./assets/products/streaming.png",
};

// Categorías (solo navegación)
SUBZI.categories = [
  { id: "chatgpt", label: "ChatGPT", emoji: "🤖", page: "/chatgpt/" },
  { id: "games", label: "Juegos", emoji: "🎮", page: "/games/" },
  { id: "steam", label: "Steam Keys", emoji: "🔑", page: "/steam/" },
  { id: "streaming", label: "Streaming", emoji: "📺", page: "/streaming/" },
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
    id: "resident-evil-requiem",
    category: "steam",
    icon: "🧟",
    name: "Resident Evil Requiem",
    price: 0,
    currency: "PYG",
    badge: "Horror",
    desc: "Steam Key original con entrega inmediata por WhatsApp y canje directo en tu cuenta de Steam.",
    image: "./assets/products/resident-evil-requiem.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Resident Evil Requiem. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Resident Evil Requiem</h4>
  <p>Resident Evil Requiem está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "detroit-become-human",
    category: "steam",
    icon: "🤖",
    name: "Detroit Become Human",
    price: 0,
    currency: "PYG",
    badge: "Narrativa",
    desc: "Experiencia narrativa premium con Steam Key para activarla directamente en tu propia cuenta.",
    image: "./assets/products/detroit-become-human.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Detroit Become Human. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Detroit Become Human</h4>
  <p>Detroit Become Human está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "outlast-2",
    category: "steam",
    icon: "🩸",
    name: "Outlast 2",
    price: 0,
    currency: "PYG",
    badge: "Terror",
    desc: "Terror psicológico en PC con entrega inmediata de key según disponibilidad de stock.",
    image: "./assets/products/outlast-2.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Outlast 2. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Outlast 2</h4>
  <p>Outlast 2 está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "mortal-kombat-11-ultimate",
    category: "steam",
    icon: "🥋",
    name: "Mortal Kombat Ultimate",
    price: 0,
    currency: "PYG",
    badge: "Fighting",
    desc: "Edición completa para Steam con key digital y soporte para que la actives sin complicaciones.",
    image: "./assets/products/mortal-kombat-11-ultimate.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Mortal Kombat 11 Ultimate. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Mortal Kombat 11 Ultimate</h4>
  <p>Mortal Kombat 11 Ultimate está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "batman-arkham-origins",
    category: "steam",
    icon: "🦇",
    name: "Batman Arkham Origins",
    price: 0,
    currency: "PYG",
    badge: "Acción",
    desc: "Sumá Gotham a tu biblioteca con una Steam Key original y activación 100% en tu cuenta.",
    image: "./assets/products/batman-arkham-origins.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Batman Arkham Origins. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Batman Arkham Origins</h4>
  <p>Batman Arkham Origins está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "injustice-2-legendary-edition",
    category: "steam",
    icon: "⚡",
    name: "Injustice 2 Legendary Edition",
    price: 0,
    currency: "PYG",
    badge: "Legendary",
    desc: "La edición más completa de Injustice 2 lista para entrar a tu cuenta de Steam.",
    image: "./assets/products/injustice-2-legendary-edition.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Injustice 2 Legendary Edition. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Injustice 2 Legendary Edition</h4>
  <p>Injustice 2 Legendary Edition está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "assetto-corsa",
    category: "steam",
    icon: "🏎️",
    name: "Assetto Corsa",
    price: 0,
    currency: "PYG",
    badge: "Sim Racing",
    desc: "Simulador ideal para fanáticos del automovilismo con entrega digital inmediata.",
    image: "./assets/products/assetto-corsa.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Assetto Corsa. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Assetto Corsa</h4>
  <p>Assetto Corsa está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "human-fall-flat",
    category: "steam",
    icon: "🧩",
    name: "Human Fall Flat",
    price: 0,
    currency: "PYG",
    badge: "Co-op",
    desc: "Diversión cooperativa con Steam Key original y guía rápida de canje.",
    image: "./assets/products/human-fall-flat.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Human Fall Flat. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Human Fall Flat</h4>
  <p>Human Fall Flat está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "buckshot-roulette",
    category: "steam",
    icon: "🔫",
    name: "Buckshot Roulette",
    aliases: ["Bookshot Roulette", "Buckshot Roulette"],
    price: 0,
    currency: "PYG",
    badge: "Indie",
    desc: "Indie viral con entrega en key para activarlo al instante en tu biblioteca de Steam.",
    image: "./assets/products/buckshot-roulette.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Buckshot Roulette. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Buckshot Roulette</h4>
  <p>Buckshot Roulette está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "silent-hill-homecoming",
    category: "steam",
    icon: "👁️",
    name: "Silent Hill Homecoming",
    price: 0,
    currency: "PYG",
    badge: "Survival Horror",
    desc: "Terror clásico para PC con Steam Key lista para entrega inmediata.",
    image: "./assets/products/silent-hill-homecoming.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Silent Hill Homecoming. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Silent Hill Homecoming</h4>
  <p>Silent Hill Homecoming está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "tomb-raider-definitive-survival-trilogy",
    category: "steam",
    icon: "🏹",
    name: "Tomb Raider Definitive Survival Trilogy",
    price: 0,
    currency: "PYG",
    badge: "Trilogía",
    desc: "La trilogía de Lara Croft en una sola compra con activación directa en tu cuenta.",
    image: "./assets/products/tomb-raider-definitive-survival-trilogy.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Tomb Raider Definitive Survival Trilogy. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Tomb Raider Definitive Survival Trilogy</h4>
  <p>Tomb Raider Definitive Survival Trilogy está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "wrc-9",
    category: "steam",
    icon: "🏁",
    name: "WRC 9",
    price: 0,
    currency: "PYG",
    badge: "Rally",
    desc: "Rally competitivo para Steam con key digital y soporte postventa.",
    image: "./assets/products/wrc-9.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de WRC 9. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de WRC 9</h4>
  <p>WRC 9 está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "the-evil-within",
    category: "steam",
    icon: "🕯️",
    name: "The Evil Within",
    price: 0,
    currency: "PYG",
    badge: "Terror",
    desc: "Shinji Mikami en tu biblioteca con canje directo y sin compartir contraseñas.",
    image: "./assets/products/the-evil-within.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de The Evil Within. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de The Evil Within</h4>
  <p>The Evil Within está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },
  {
    id: "martha-is-dead",
    category: "steam",
    icon: "🪦",
    name: "Martha is Dead",
    price: 0,
    currency: "PYG",
    badge: "Thriller",
    desc: "Thriller oscuro con key oficial para activar en tu cuenta al terminar el pago.",
    image: "./assets/products/martha-is-dead.png",
    features: ["Entrega inmediata", "Steam Key", "Soporte de activación"],
    details: {
      plan: "Steam Key original de Martha is Dead. Stock disponible para venta inmediata.",
      pagos: "Precio a cargar. Por ahora se confirma y se coordina el pago por WhatsApp.",
      how: "Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, sin contraseñas. Vos la canjeás y queda en tu cuenta para siempre.",
      extraHtml: `<div class=\"pRich\">
  <h4>Entrega inmediata de Martha is Dead</h4>
  <p>Martha is Dead está disponible como <span class=\"pill\">Steam Key original</span> para venta inmediata. Tras el pago te vamos a mandar la key para que la canjees directamente en tu cuenta, <b>sin contraseñas</b>, y una vez activada queda en tu biblioteca para siempre.</p>
  <ul class=\"pChecks\">
    <li>✅ Key digital entregada por WhatsApp</li>
    <li>✅ Canje directo en tu propia cuenta de Steam</li>
    <li>✅ Sin cuentas compartidas y sin pasar contraseñas</li>
    <li>✅ Soporte durante el proceso de activación</li>
  </ul>
  <p class=\"pNote\">Cuando nos pases el comprobante, te enviamos la key y te guiamos si necesitás ayuda para canjearla.</p>
</div>`,
    },
  },

  // =========================
  // STREAMING
  // =========================
  {
    id: "netflix",
    category: "streaming",
    icon: "🎬",
    name: "Netflix",
    price: 0,
    currency: "PYG",
    badge: "Streaming",
    desc: "Servicio de streaming listo para coordinar por WhatsApp con la misma ficha visual que el resto del catálogo.",
    image: "./assets/products/netflix.png",
    features: ["Streaming", "Soporte", "Consulta rápida"],
    details: {
      plan: "Suscripción o acceso a Netflix según disponibilidad.",
      pagos: "Precio a cargar luego. Confirmación y pago por WhatsApp.",
      how: "Nos escribís, confirmamos el plan disponible y te guiamos para dejarlo activo.",
      extraHtml: `<div class=\"pRich\">
  <h4>Netflix en SubZi</h4>
  <p>Coordinamos tu acceso a <span class=\"pill\">Netflix</span> de forma simple, con asistencia por WhatsApp y entrega rápida según el plan disponible.</p>
  <ul class=\"pChecks\">
    <li>✅ Atención rápida por WhatsApp</li>
    <li>✅ Confirmación de disponibilidad antes de cobrar</li>
    <li>✅ Guía para dejarlo funcionando</li>
  </ul>
  <p class=\"pNote\">Los precios los cargamos después, pero el apartado ya queda listo para mostrar el servicio.</p>
</div>`,
    },
  },
  {
    id: "disney-plus",
    category: "streaming",
    icon: "✨",
    name: "Disney+",
    price: 0,
    currency: "PYG",
    badge: "Streaming",
    desc: "Disney+ para tu cuenta o acceso coordinado según disponibilidad.",
    image: "./assets/products/disney-plus.png",
    features: ["Streaming", "Soporte", "Consulta rápida"],
    details: {
      plan: "Suscripción o acceso a Disney+ según disponibilidad.",
      pagos: "Precio a cargar luego. Confirmación y pago por WhatsApp.",
      how: "Nos escribís, confirmamos el plan disponible y te guiamos para dejarlo activo.",
      extraHtml: `<div class=\"pRich\">
  <h4>Disney+ en SubZi</h4>
  <p>Coordinamos tu acceso a <span class=\"pill\">Disney+</span> de forma simple, con asistencia por WhatsApp y entrega rápida según el plan disponible.</p>
  <ul class=\"pChecks\">
    <li>✅ Atención rápida por WhatsApp</li>
    <li>✅ Confirmación de disponibilidad antes de cobrar</li>
    <li>✅ Guía para dejarlo funcionando</li>
  </ul>
  <p class=\"pNote\">Los precios los cargamos después, pero el apartado ya queda listo para mostrar el servicio.</p>
</div>`,
    },
  },
  {
    id: "paramount-plus",
    category: "streaming",
    icon: "🎞️",
    name: "Paramount+",
    price: 0,
    currency: "PYG",
    badge: "Streaming",
    desc: "Paramount+ con activación guiada y soporte simple por WhatsApp.",
    image: "./assets/products/paramount-plus.png",
    features: ["Streaming", "Soporte", "Consulta rápida"],
    details: {
      plan: "Suscripción o acceso a Paramount+ según disponibilidad.",
      pagos: "Precio a cargar luego. Confirmación y pago por WhatsApp.",
      how: "Nos escribís, confirmamos el plan disponible y te guiamos para dejarlo activo.",
      extraHtml: `<div class=\"pRich\">
  <h4>Paramount+ en SubZi</h4>
  <p>Coordinamos tu acceso a <span class=\"pill\">Paramount+</span> de forma simple, con asistencia por WhatsApp y entrega rápida según el plan disponible.</p>
  <ul class=\"pChecks\">
    <li>✅ Atención rápida por WhatsApp</li>
    <li>✅ Confirmación de disponibilidad antes de cobrar</li>
    <li>✅ Guía para dejarlo funcionando</li>
  </ul>
  <p class=\"pNote\">Los precios los cargamos después, pero el apartado ya queda listo para mostrar el servicio.</p>
</div>`,
    },
  },
  {
    id: "prime-video",
    category: "streaming",
    icon: "📦",
    name: "Prime Video",
    price: 0,
    currency: "PYG",
    badge: "Streaming",
    desc: "Prime Video listo para coordinar según el plan disponible en stock.",
    image: "./assets/products/prime-video.png",
    features: ["Streaming", "Soporte", "Consulta rápida"],
    details: {
      plan: "Suscripción o acceso a Prime Video según disponibilidad.",
      pagos: "Precio a cargar luego. Confirmación y pago por WhatsApp.",
      how: "Nos escribís, confirmamos el plan disponible y te guiamos para dejarlo activo.",
      extraHtml: `<div class=\"pRich\">
  <h4>Prime Video en SubZi</h4>
  <p>Coordinamos tu acceso a <span class=\"pill\">Prime Video</span> de forma simple, con asistencia por WhatsApp y entrega rápida según el plan disponible.</p>
  <ul class=\"pChecks\">
    <li>✅ Atención rápida por WhatsApp</li>
    <li>✅ Confirmación de disponibilidad antes de cobrar</li>
    <li>✅ Guía para dejarlo funcionando</li>
  </ul>
  <p class=\"pNote\">Los precios los cargamos después, pero el apartado ya queda listo para mostrar el servicio.</p>
</div>`,
    },
  },
  {
    id: "crunchyroll",
    category: "streaming",
    icon: "🍥",
    name: "Crunchyroll",
    price: 0,
    currency: "PYG",
    badge: "Anime",
    desc: "Crunchyroll para fans del anime con activación rápida y soporte.",
    image: "./assets/products/crunchyroll.png",
    features: ["Streaming", "Soporte", "Consulta rápida"],
    details: {
      plan: "Suscripción o acceso a Crunchyroll según disponibilidad.",
      pagos: "Precio a cargar luego. Confirmación y pago por WhatsApp.",
      how: "Nos escribís, confirmamos el plan disponible y te guiamos para dejarlo activo.",
      extraHtml: `<div class=\"pRich\">
  <h4>Crunchyroll en SubZi</h4>
  <p>Coordinamos tu acceso a <span class=\"pill\">Crunchyroll</span> de forma simple, con asistencia por WhatsApp y entrega rápida según el plan disponible.</p>
  <ul class=\"pChecks\">
    <li>✅ Atención rápida por WhatsApp</li>
    <li>✅ Confirmación de disponibilidad antes de cobrar</li>
    <li>✅ Guía para dejarlo funcionando</li>
  </ul>
  <p class=\"pNote\">Los precios los cargamos después, pero el apartado ya queda listo para mostrar el servicio.</p>
</div>`,
    },
  },
  {
    id: "hbo-max",
    category: "streaming",
    icon: "🍿",
    name: "HBO Max",
    price: 0,
    currency: "PYG",
    badge: "Streaming",
    desc: "HBO Max para sumar a tu cuenta con asistencia durante la activación.",
    image: "./assets/products/hbo-max.png",
    features: ["Streaming", "Soporte", "Consulta rápida"],
    details: {
      plan: "Suscripción o acceso a HBO Max según disponibilidad.",
      pagos: "Precio a cargar luego. Confirmación y pago por WhatsApp.",
      how: "Nos escribís, confirmamos el plan disponible y te guiamos para dejarlo activo.",
      extraHtml: `<div class=\"pRich\">
  <h4>HBO Max en SubZi</h4>
  <p>Coordinamos tu acceso a <span class=\"pill\">HBO Max</span> de forma simple, con asistencia por WhatsApp y entrega rápida según el plan disponible.</p>
  <ul class=\"pChecks\">
    <li>✅ Atención rápida por WhatsApp</li>
    <li>✅ Confirmación de disponibilidad antes de cobrar</li>
    <li>✅ Guía para dejarlo funcionando</li>
  </ul>
  <p class=\"pNote\">Los precios los cargamos después, pero el apartado ya queda listo para mostrar el servicio.</p>
</div>`,
    },
  },

];
