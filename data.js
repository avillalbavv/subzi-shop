/**
 * Datos y configuración de SubZi
 * Editá acá: WhatsApp, productos, textos, imágenes.
 */
window.SUBZI = window.SUBZI || {};

SUBZI.WHATSAPP_NUMBER = "595983929719"; // sin + para wa.me

SUBZI.categoryImages = {
  chatgpt: "./assets/products/chatgpt.png",
  games: "./assets/products/games.png"
};

SUBZI.categories = [
  { id:"chatgpt", label:"ChatGPT", emoji:"🤖", page:"./chatgpt.html" },
  { id:"games", label:"Juegos", emoji:"🎮", page:"./games.html" }
  ,
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
      how: "Confirmamos stock/precio y te guiamos con la activación."
    }
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
      how: "Confirmamos stock/precio y te guiamos con la activación."
    }
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
      how: "Confirmamos stock/precio y te guiamos con la activación."
    }
  }

];

// Cupones opcionales
SUBZI.coupons = {
  "SUBZI10": { type:"percent", value:10, note:"10% OFF en el total (si hay precios cargados)" }
};

// Cashback (config)
SUBZI.cashback = {
  rate: 0.10,                 // 10%
  minOrderAmount: 50000,      // mínimo para generar cashback
  redeemableCategories: ["games"], // dónde se puede usar
  maxRedeemPercent: 0.25,     // máximo 25% del total por compra
  maxRedeemPerOrder: 20000,   // tope absoluto por compra
  expiryDays: 30,             // vence a los 30 días
  cooldownHours: 12,          // anti-abuso: 1 acreditación cada 12h (por cuenta)
  nonTransferable: true,
  noCashOut: true,
  noCouponsWithCashback: false // si querés, ponelo en true
};


// Productos
// - image: "./assets/products/mi-imagen.png" (opcional)
// - details: { plan, pagos, how } (editable)
SUBZI.products = [
  // CHATGPT
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
      how: "Agregás al cesto y enviás el pedido por WhatsApp. Te guiamos con la activación/uso."
    }
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
      extraHtml: `<div class="pRich">
  <h4>🚀 <span class="pill">ChatGPT Pro</span> — lo mejor del plan</h4>
  <ul class="pChecks">
    <li>✅ <b>Prioridad</b> en horas pico (más estabilidad).</li>
    <li>✅ <b>Más límites</b> y uso intensivo (según plan vigente).</li>
    <li>✅ <b>Funciones avanzadas</b> disponibles en el plan.</li>
    <li>✅ <b>Experiencia premium</b> y respuestas más fluidas.</li>
    <li>✅ <b>Soporte</b> y guía de configuración.</li>
  </ul>

  <div class="pDivider"></div>

  <h4>📩 Activación en tu propia cuenta</h4>
  <p class="pNote">Te enviamos la <b>invitación al correo del cliente</b> para que se active en su cuenta. Coordinamos por WhatsApp y te guiamos paso a paso.</p>
</div>`
    }
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
      how: "Confirmamos stock/precio y te guiamos con la activación."
    }
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
      how: "Confirmamos stock/precio y te guiamos con la activación."
    }
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
      how: "Confirmamos stock/precio y te guiamos con la activación."
    }
  }

];
