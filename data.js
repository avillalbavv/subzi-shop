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
    name: "God of War (2018)",
    price: 0,
    currency: "USD",
    badge: "Juego",
    desc: "Compra digital (consulta plataforma y disponibilidad).",
    image: "./assets/products/god-of-war-2018.png",
    features: ["Entrega digital", "Soporte", "Cotización"],
    details: {
      plan: "Juego God of War (2018). Plataforma a confirmar.",
      pagos: "Pago a coordinar por WhatsApp (transferencia u otro método).",
      how: "Nos indicás plataforma y región. Te cotizamos y coordinamos entrega."
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
  },
    }
];
