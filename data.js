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
    price: 0,
    currency: "USD",
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
    price: 0,
    currency: "USD",
    badge: "Suscripción",
    desc: "Suscripción ChatGPT Pro (consulta disponibilidad).",
    image: "./assets/products/chatgpt-pro.png",
    features: ["Soporte", "Configuración", "Renovación"],
    details: {
      plan: "Suscripción Pro. Beneficios según el plan vigente.",
      pagos: "Pago por período a coordinar por WhatsApp.",
      how: "Te asesoramos según tu necesidad y te ayudamos con la activación."
    }
  },

  // JUEGOS
  {
    id: "god-of-war-2018",
    category: "games",
    icon: "🪓",
    name: "God of War Ragnarök Deluxe Edition",
    price: 0,
    currency: "USD",
    badge: "Juego",
    desc: "Activación offline en cuenta Steam (PC) — incluye extras Deluxe.",
    image: "./assets/products/god-of-war-2018.png",
    features: ["Entrega digital", "Soporte", "Cotización"],
    details: {
      plan: "God of War Ragnarök Deluxe Edition (PC) — activación offline en cuenta Steam.",
      pagos: "Pago a coordinar por WhatsApp (transferencia u otro método).",
      how: "Agregás al cesto y finalizás por WhatsApp. Te guiamos paso a paso con la activación y el acceso.",
      extraHtml: `<div class="pRich">
  <h4>🔥 ¿Qué incluye la <span class="pill">Edición Deluxe</span>?</h4>
  <ul class="pBullets">
    <li>👉 Versión completa de <b>God of War Ragnarök</b> para <b>PC</b>.</li>
    <li>👉 DLC <b>Valhalla</b>.</li>
    <li>👉 Banda sonora digital oficial de God of War Ragnarök.</li>
    <li>👉 Mini artbook digital (Dark Horse).</li>
    <li>👉 Armadura <b>Darkdale</b> para Kratos.</li>
    <li>👉 Atuendo <b>Darkdale</b> para Atreus.</li>
    <li>👉 Empuñadura del hacha <b>Darkdale</b>.</li>
    <li>👉 Empuñaduras de las espadas <b>Darkdale</b>.</li>
  </ul>

  <div class="pDivider"></div>

  <h4>⁉️ ¿Por qué elegir nuestras <span class="pill">activaciones offline</span>?</h4>
  <ul class="pChecks">
    <li>✅ <b>Mejor precio</b>: disfrutá sin costos extra.</li>
    <li>✅ <b>Bonos y juegos extra</b>: te regalamos títulos adicionales para variar.</li>
    <li>✅ <b>Cuenta Steam licenciada</b>: solo cuentas oficiales.</li>
    <li>✅ <b>Sin límite de tiempo</b>: acceso permanente para jugar offline cuando quieras.</li>
    <li>✅ <b>Acceso a actualizaciones</b>: disfrutá de updates sin perder acceso.</li>
    <li>✅ <b>Garantía</b>: acceso continuo al juego y sus actualizaciones.</li>
  </ul>

  <p class="pNote">Además del juego, te llevás una experiencia completa y extras. ¡Aprovechá la oportunidad! 🚀🎮</p>
</div>`
    }
  },
  {
    id: "silent-hill-f",
    category: "games",
    icon: "👻",
    name: "Silent Hill f",
    price: 0,
    currency: "USD",
    badge: "Juego",
    desc: "Reserva/compra (consulta fecha y disponibilidad).",
    image: "./assets/products/silent-hill-f.png",
    features: ["Preventa/stock", "Soporte", "Cotización"],
    details: {
      plan: "Silent Hill f. Estado (preventa/stock) según disponibilidad.",
      pagos: "Pago a coordinar por WhatsApp.",
      how: "Confirmamos estado, precio y forma de entrega."
    }
  }
];
