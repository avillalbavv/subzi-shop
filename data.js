/**
 * Datos y configuración de SubZi
 * Editá acá: WhatsApp, productos, textos, imágenes.
 */
window.SUBZI = window.SUBZI || {};

SUBZI.WHATSAPP_NUMBER = "595983929719"; // sin + para wa.me

SUBZI.categoryImages = {
  streaming: "./assets/products/streaming.png",
  descuentos: "./assets/products/descuentos.png",
  chatgpt: "./assets/products/chatgpt.png",
  steam: "./assets/products/steam.png",
  edicion: "./assets/products/edicion.png"
};

SUBZI.categories = [
  { id:"streaming", label:"Streaming", emoji:"📺", anchor:"#streaming", desc:"Netflix, Disney+, Max, Spotify y más." },
  { id:"descuentos", label:"Descuentos", emoji:"🏷️", anchor:"#descuentos", desc:"Combos y cupones (configurable)." },
  { id:"chatgpt", label:"ChatGPT / IA", emoji:"🤖", anchor:"#chatgpt", desc:"IA para estudio, trabajo y diseño." },
  { id:"steam", label:"Steam", emoji:"🎮", anchor:"#steam", desc:"Recargas y juegos (consulta)." },
  { id:"edicion", label:"Edición", emoji:"🎬", anchor:"#edicion", desc:"Apps de video, diseño y packs." }
];

SUBZI.coupons = {
  "SUBZI10": { type:"percent", value:10, note:"10% OFF en el total (si hay precios cargados)" },
  "COMBO15": { type:"percent", value:15, note:"15% OFF si llevás 2 o más items (si hay precios cargados)" }
};

// Productos
// - image: "./assets/products/mi-imagen.png" (opcional)
// - details: { plan, pagos, how } (editable)
SUBZI.products = [
  // STREAMING
  {
    id: "netflix-premium",
    category: "streaming",
    name: "Netflix Premium",
    price: 0,
    currency: "ARS",
    badge: "Cuenta / Perfil",
    desc: "Acceso premium con soporte por WhatsApp.",
    features: ["Activación rápida", "Soporte", "Guía de uso"],
    details: {
      plan: "Perfil/plan sujeto a disponibilidad. Ideal para ver series y películas en alta calidad.",
      pagos: "Pago por período (mensual u otro) a coordinar por WhatsApp. Renovación con aviso.",
      how: "Elegís el servicio, agregás al cesto y enviás el pedido por WhatsApp. Te guiamos para activar y acceder."
    }
  },
  {
    id: "disney-plus",
    category: "streaming",
    name: "Disney+",
    price: 0,
    currency: "ARS",
    badge: "Streaming",
    desc: "Plan para series y pelis. Consultá disponibilidad.",
    features: ["Activación", "Soporte", "Renovación"],
    details: {
      plan: "Acceso a catálogo Disney/Pixar/Marvel/Star (según disponibilidad).",
      pagos: "Pago por período a coordinar. Renovación con aviso.",
      how: "Te pasamos instrucciones y soporte por WhatsApp para el inicio de sesión."
    }
  },
  {
    id: "spotify-premium",
    category: "streaming",
    name: "Spotify Premium",
    price: 0,
    currency: "ARS",
    badge: "Música",
    desc: "Música sin anuncios. Ideal para uso diario.",
    features: ["Sin anuncios", "Descargas", "Soporte"],
    details: {
      plan: "Premium según disponibilidad (individual u otra modalidad).",
      pagos: "Pago por período a coordinar por WhatsApp.",
      how: "Te guiamos para activar y verificar la cuenta."
    }
  },
  {
    id: "max-hbo",
    category: "streaming",
    name: "Max (HBO)",
    price: 0,
    currency: "ARS",
    badge: "Streaming",
    desc: "Series y estrenos. Consultá promos vigentes.",
    features: ["HD/4K (según plan)", "Soporte", "Renovación"],
    details: {
      plan: "Catálogo de series y estrenos. Calidad según plan.",
      pagos: "Pago por período, promos según disponibilidad.",
      how: "Te asistimos con acceso y configuración."
    }
  },
  {
    id: "paramount",
    category: "streaming",
    name: "Paramount+",
    price: 0,
    currency: "ARS",
    badge: "Streaming",
    desc: "Catálogo variado. Preguntá por combos.",
    features: ["Activación", "Soporte", "Renovación"],
    details: {
      plan: "Acceso a contenido Paramount+. Sujeto a disponibilidad.",
      pagos: "Pago por período a coordinar.",
      how: "Te guiamos por WhatsApp para activar e ingresar."
    }
  },

  // DESCUENTOS / COMBOS
  {
    id: "combo-streaming",
    category: "descuentos",
    name: "Combo 2 Servicios",
    price: 0,
    currency: "ARS",
    badge: "Oferta",
    desc: "Armamos un combo a medida con precio especial.",
    features: ["Precio mejorado", "Soporte", "Personalizable"],
    details: {
      plan: "Elegís 2 servicios y armamos un combo.",
      pagos: "Pago por período a coordinar.",
      how: "Te confirmamos disponibilidad, total y renovación por WhatsApp."
    }
  },
  {
    id: "combo-streaming-3",
    category: "descuentos",
    name: "Combo 3 Servicios",
    price: 0,
    currency: "ARS",
    badge: "Oferta",
    desc: "Combo grande para familia/compartir.",
    features: ["Mejor precio", "Soporte", "Renovación"],
    details: {
      plan: "Elegís 3 servicios y armamos un combo.",
      pagos: "Pago por período a coordinar.",
      how: "Te confirmamos disponibilidad y condiciones por WhatsApp."
    }
  },

  // CHATGPT / IA
  {
    id: "chatgpt-plus",
    category: "chatgpt",
    name: "ChatGPT Plus (consulta)",
    price: 0,
    currency: "ARS",
    badge: "IA",
    desc: "Consultá disponibilidad y modalidad. Te asesoramos por WhatsApp.",
    features: ["Soporte", "Guía inicial", "Renovación"],
    details: {
      plan: "Modalidad a definir según disponibilidad. Te orientamos para tu caso de uso.",
      pagos: "Pago por período a coordinar por WhatsApp.",
      how: "Contanos tu objetivo (estudio/trabajo) y te proponemos la mejor opción."
    }
  },
  {
    id: "ia-pack",
    category: "chatgpt",
    name: "Pack IA (herramientas)",
    price: 0,
    currency: "ARS",
    badge: "IA / Pack",
    desc: "Opciones de IA según tu uso (trabajo, estudio, diseño).",
    features: ["Recomendación", "Soporte", "Configuración"],
    details: {
      plan: "Pack de herramientas de IA (a medida).",
      pagos: "Pago por período a coordinar.",
      how: "Te asesoramos y ayudamos con configuración/inicio."
    }
  },

  // STEAM
  {
    id: "steam-wallet",
    category: "steam",
    name: "Steam Wallet (carga)",
    price: 0,
    currency: "ARS",
    badge: "Gaming",
    desc: "Cargas de saldo / recargas. Consultá montos.",
    features: ["Rápido", "Seguro", "Soporte"],
    details: {
      plan: "Recargas de saldo en Steam (montos a coordinar).",
      pagos: "Pago previo / método a coordinar por WhatsApp.",
      how: "Te pedimos tu usuario y confirmamos la carga."
    }
  },
  {
    id: "steam-game",
    category: "steam",
    name: "Juego Steam (consulta)",
    price: 0,
    currency: "ARS",
    badge: "Gaming",
    desc: "Pedime el juego y te paso precio/entrega.",
    features: ["Cotización", "Entrega", "Soporte"],
    details: {
      plan: "Cotización del juego que necesites.",
      pagos: "Pago y entrega a coordinar.",
      how: "Nos pasás el nombre/link del juego y te respondemos por WhatsApp."
    }
  },

  // EDICIÓN
  {
    id: "capcut-pro",
    category: "edicion",
    name: "CapCut Pro (consulta)",
    price: 0,
    currency: "ARS",
    badge: "Edición",
    desc: "Edición de video y plantillas. Consultá plan.",
    features: ["Activación", "Soporte", "Renovación"],
    details: {
      plan: "Acceso Pro según disponibilidad.",
      pagos: "Pago por período a coordinar.",
      how: "Te guiamos para activar y usar funciones Pro."
    }
  },
  {
    id: "canva-pro",
    category: "edicion",
    name: "Canva Pro (consulta)",
    price: 0,
    currency: "ARS",
    badge: "Diseño",
    desc: "Diseño y branding. Ideal para redes.",
    features: ["Acceso pro", "Soporte", "Guía"],
    details: {
      plan: "Acceso Pro según disponibilidad.",
      pagos: "Pago por período a coordinar.",
      how: "Te ayudamos con acceso y primeros pasos."
    }
  },
  {
    id: "edit-pack",
    category: "edicion",
    name: "Apps de edición (consulta)",
    price: 0,
    currency: "ARS",
    badge: "Edición / Pack",
    desc: "Opciones según tu necesidad (video, foto, diseño).",
    features: ["Asesoría", "Soporte", "Renovación"],
    details: {
      plan: "Pack a medida (video/foto/diseño).",
      pagos: "Pago por período a coordinar.",
      how: "Contanos qué querés hacer y armamos tu pack."
    }
  }
];
