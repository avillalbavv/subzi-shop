/**
 * Core SubZi (carrito, WhatsApp, helpers) - ES5 compatible.
 * Incluye: carrito por usuario, cupones, cashback (crédito) y pedidos (pendientes).
 */
(function(){
  try{
    var root = document.documentElement;
    if (root && root.classList){
      root.classList.remove("no-js");
      root.classList.add("js");
    }
  }catch(e){}
})();

window.SUBZI = window.SUBZI || {};

var WHATSAPP_NUMBER = SUBZI.WHATSAPP_NUMBER || "";
var products = SUBZI.products || [];
var coupons = SUBZI.coupons || {};
var categories = SUBZI.categories || [];
var categoryImages = SUBZI.categoryImages || {};
var cashbackCfg = SUBZI.cashback || {};

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel)); }

function escapeHtml(str){
  str = String(str == null ? "" : str);
  return str
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/\'/g,"&#039;");
}

function getCurrentUser(){
  try{
    if (window.SUBZI && SUBZI.authUser && SUBZI.authUser.id) return String(SUBZI.authUser.id);
  }catch(e){}
  var u = "";
  try{ u = localStorage.getItem("subzi_current_user") || ""; }catch(e){}
  u = String(u || "").trim();
  return u ? u : "guest";
}

function cartStorageKey(){ return "subzi_cart__" + getCurrentUser(); }
function discountStorageKey(){ return "subzi_discount__" + getCurrentUser(); }
function cashbackStorageKey(){ return "subzi_cashback__" + getCurrentUser(); }
function useCashbackKey(){ return "subzi_usecashback__" + getCurrentUser(); }
function ordersStorageKey(){ return "subzi_orders__" + getCurrentUser(); }

function money(n, cur){
  cur = cur || "PYG";
  if (!n || n === 0) return "Consultar";
  try{
    return new Intl.NumberFormat("es-PY", { style:"currency", currency: cur, maximumFractionDigits: 0 }).format(n);
  }catch(e){
    return String(n) + " " + cur;
  }
}

function moneyTextGs(n){
  if (!n || n === 0) return "Consultar";
  try{
    return new Intl.NumberFormat("es-PY", { maximumFractionDigits: 0 }).format(n) + " Gs";
  }catch(e){
    return String(n) + " Gs";
  }
}

function toast(msg){
  var el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  if (window.__t) clearTimeout(window.__t);
  window.__t = setTimeout(function(){ el.classList.remove("show"); }, 1800);
}


function maybeSync(){
  try{
    if (window.SUBZI && SUBZI.cloudSync && SUBZI.cloudSync.schedulePush) SUBZI.cloudSync.schedulePush();
  }catch(e){}
}

/* ===== Carrito / cupones ===== */
function saveCart(cart){
  try{ localStorage.setItem(cartStorageKey(), JSON.stringify(cart || [])); }catch(e){}
  maybeSync();
}
function loadCart(){
  try{ return JSON.parse(localStorage.getItem(cartStorageKey()) || "[]"); }
  catch(e){ return []; }
}
function saveDiscount(discount){
  try{ localStorage.setItem(discountStorageKey(), JSON.stringify(discount || null)); }catch(e){}
  maybeSync();
}
function loadDiscount(){
  try{ return JSON.parse(localStorage.getItem(discountStorageKey()) || "null"); }
  catch(e){ return null; }
}
function cartCount(cart){
  var total = 0;
  for (var i=0;i<cart.length;i++) total += (cart[i].qty || 0);
  return total;
}
function findProduct(id){
  for (var i=0;i<products.length;i++) if (products[i].id === id) return products[i];
  return null;
}
function findCategory(id){
  for (var i=0;i<categories.length;i++) if (categories[i].id === id) return categories[i];
  return null;
}

function computeTotals(cart, discount){
  var subtotal = 0;
  for (var i=0;i<cart.length;i++){
    var it = cart[i];
    var p = findProduct(it.id);
    var price = (p && typeof p.price === "number") ? p.price : 0;
    subtotal += price * (it.qty || 1);
  }

  var discountValue = 0;
  var applied = null;

  if (discount && discount.code && coupons[discount.code]){
    var c = coupons[discount.code];
    var okCombo = discount.code !== "COMBO15" || cartCount(cart) >= 2;
    if (okCombo && subtotal > 0 && c.type === "percent"){
      discountValue = Math.round(subtotal * (c.value / 100));
      applied = c;
    }
  }

  var total = Math.max(0, subtotal - discountValue);
  return { subtotal: subtotal, discountValue: discountValue, total: total, applied: applied };
}

/* ===== Cashback =====
   Nota: Como el pago se realiza fuera (WhatsApp), el cashback se acredita al CONFIRMAR la compra.
   Sin backend no se puede evitar 100% el abuso, pero agregamos límites + “cooldown”.
*/
function cfg(key, def){
  var v = cashbackCfg[key];
  return (v === undefined || v === null) ? def : v;
}
function getCashbackConfig(){
  return {
    rate: Number(cfg("rate", 0.10)) || 0.10,
    minOrderAmount: Number(cfg("minOrderAmount", 50000)) || 50000,
    redeemableCategories: cfg("redeemableCategories", ["games"]) || ["games"],
    maxRedeemPercent: Number(cfg("maxRedeemPercent", 0.25)) || 0.25,
    maxRedeemPerOrder: Number(cfg("maxRedeemPerOrder", 20000)) || 20000,
    expiryDays: Number(cfg("expiryDays", 30)) || 30,
    cooldownHours: Number(cfg("cooldownHours", 12)) || 12,
    nonTransferable: !!cfg("nonTransferable", true),
    noCashOut: !!cfg("noCashOut", true),
    noCouponsWithCashback: !!cfg("noCouponsWithCashback", false)
  };
}

// state: { buckets:[{id, remaining, original, createdAt, expiresAt, sourceOrderId}], lastEarnAt:number }
function loadCashback(){
  var st = { buckets: [], lastEarnAt: 0 };
  try{ st = JSON.parse(localStorage.getItem(cashbackStorageKey()) || "null") || st; }catch(e){}
  if (!st.buckets) st.buckets = [];
  if (!st.lastEarnAt) st.lastEarnAt = 0;

  // prune expired
  var now = Date.now();
  var kept = [];
  for (var i=0;i<st.buckets.length;i++){
    var b = st.buckets[i];
    if (!b) continue;
    if (b.expiresAt && b.expiresAt < now) continue;
    if (!b.remaining || b.remaining <= 0) continue;
    kept.push(b);
  }
  st.buckets = kept;
  saveCashback(st);
  return st;
}
function saveCashback(st){
  try{ localStorage.setItem(cashbackStorageKey(), JSON.stringify(st || {buckets:[], lastEarnAt:0})); }catch(e){}
  maybeSync();
}
function cashbackBalance(st){
  st = st || loadCashback();
  var sum = 0;
  for (var i=0;i<st.buckets.length;i++) sum += (st.buckets[i].remaining || 0);
  return Math.max(0, Math.round(sum));
}
function getUseCashback(){
  try{ return JSON.parse(localStorage.getItem(useCashbackKey()) || "false") === true; }
  catch(e){ return false; }
}
function setUseCashback(v){
  try{ localStorage.setItem(useCashbackKey(), JSON.stringify(!!v)); }catch(e){}
  maybeSync();
}

// Cashback solo si TODO el carrito pertenece a categorías permitidas (anti-abuso simple)
function cartEligibleForCashbackUse(cart){
  var c = getCashbackConfig();
  var allowed = {};
  for (var i=0;i<c.redeemableCategories.length;i++) allowed[c.redeemableCategories[i]] = true;
  if (!cart || cart.length === 0) return false;

  for (var j=0;j<cart.length;j++){
    var p = findProduct(cart[j].id);
    if (!p || !p.category || !allowed[p.category]) return false;
  }
  return true;
}

function computeTotalsWithCashback(cart, discount){
  var totals = computeTotals(cart, discount);
  var c = getCashbackConfig();
  var st = loadCashback();
  var bal = cashbackBalance(st);

  var use = getUseCashback();

  // reglas
  var eligible = cartEligibleForCashbackUse(cart);
  var canUse = (use && eligible && totals.total > 0 && bal > 0);

  // opcional: no permitir con cupón
  if (c.noCouponsWithCashback && discount && discount.code) canUse = false;

  var cashbackUse = 0;
  if (canUse){
    var capByPercent = Math.round(totals.total * c.maxRedeemPercent);
    cashbackUse = Math.min(bal, capByPercent, c.maxRedeemPerOrder);
  }

  var total2 = Math.max(0, totals.total - cashbackUse);

  return {
    subtotal: totals.subtotal,
    discountValue: totals.discountValue,
    appliedCoupon: totals.applied,
    cashbackUse: cashbackUse,
    cashbackBalance: bal,
    cashbackEligible: eligible,
    total: total2
  };
}

// Consume buckets (de más viejo a más nuevo)
function consumeCashback(amount, orderId){
  amount = Math.max(0, Math.round(amount || 0));
  if (amount <= 0) return 0;

  var st = loadCashback();
  var need = amount;
  for (var i=0;i<st.buckets.length && need > 0;i++){
    var b = st.buckets[i];
    if (!b || !b.remaining) continue;
    var take = Math.min(b.remaining, need);
    b.remaining -= take;
    need -= take;
  }
  st.buckets = st.buckets.filter(function(b){ return b && b.remaining > 0; });
  saveCashback(st);

  // log simple
  try{
    var logKey = "subzi_cashback_log__" + getCurrentUser();
    var log = JSON.parse(localStorage.getItem(logKey) || "[]");
    log.unshift({ type:"use", amount: amount, orderId: orderId, at: Date.now() });
    localStorage.setItem(logKey, JSON.stringify(log));
  }catch(e){}

  return amount;
}

function earnCashback(amount, orderId){
  amount = Math.max(0, Math.round(amount || 0));
  if (amount <= 0) return 0;

  var c = getCashbackConfig();
  var st = loadCashback();
  var now = Date.now();
  var expiresAt = now + (c.expiryDays * 86400000);

  var bucket = {
    id: "cb_" + now + "_" + Math.floor(Math.random()*100000),
    original: amount,
    remaining: amount,
    createdAt: now,
    expiresAt: expiresAt,
    sourceOrderId: orderId
  };
  st.buckets.unshift(bucket);
  st.lastEarnAt = now;
  saveCashback(st);

  // log simple
  try{
    var logKey = "subzi_cashback_log__" + getCurrentUser();
    var log = JSON.parse(localStorage.getItem(logKey) || "[]");
    log.unshift({ type:"earn", amount: amount, orderId: orderId, at: now, expiresAt: expiresAt });
    localStorage.setItem(logKey, JSON.stringify(log));
  }catch(e){}

  return amount;
}

/* ===== Pedidos (pendientes/confirmados) ===== */
function loadOrders(){
  try{ return JSON.parse(localStorage.getItem(ordersStorageKey()) || "[]"); }
  catch(e){ return []; }
}
function saveOrders(list){
  try{ localStorage.setItem(ordersStorageKey(), JSON.stringify(list || [])); }catch(e){}
  maybeSync();
}

function createOrderFromCart(cart, discount){
  var c = getCashbackConfig();
  var totals = computeTotalsWithCashback(cart, discount);

  // order id
  var now = Date.now();
  var orderId = "SZ" + String(now).slice(-6) + String(Math.floor(Math.random()*90)+10);

  // cashback a acreditar (solo si cumple mínimo y respeta cooldown)
  var earn = 0;
  var note = "";
  if (totals.subtotal >= c.minOrderAmount && totals.subtotal > 0){
    var st = loadCashback();
    var cooldownMs = c.cooldownHours * 3600000;
    if (st.lastEarnAt && (now - st.lastEarnAt) < cooldownMs){
      note = "Cashback no acreditado por cooldown (anti-abuso).";
    } else {
      earn = Math.round(totals.subtotal * c.rate);
    }
  }

  // si usa cashback, lo consumimos al generar pedido (evita doble uso)
  var used = 0;
  if (totals.cashbackUse > 0){
    used = consumeCashback(totals.cashbackUse, orderId);
  }

  var order = {
    id: orderId,
    createdAt: now,
    status: "pending",
    items: cart,
    subtotal: totals.subtotal,
    discountCode: (discount && discount.code) ? discount.code : "",
    cashbackUsed: used,
    cashbackToEarn: earn,
    note: note
  };

  var orders = loadOrders();
  orders.unshift(order);
  saveOrders(orders);

  return order;
}

function confirmOrder(orderId){
  var orders = loadOrders();
  for (var i=0;i<orders.length;i++){
    if (orders[i].id === orderId){
      if (orders[i].status === "confirmed") return orders[i];
      orders[i].status = "confirmed";
      orders[i].confirmedAt = Date.now();

      if (orders[i].cashbackToEarn && orders[i].cashbackToEarn > 0){
        earnCashback(orders[i].cashbackToEarn, orders[i].id);
      }
      saveOrders(orders);
      return orders[i];
    }
  }
  return null;
}

/* ===== WhatsApp ===== */
function makeGreetingFromCart(cart){
  if (!cart || cart.length === 0) return "Hola, quiero consultar por productos en SubZi.";

  var cats = {};
  for (var i=0;i<cart.length;i++){
    var p = findProduct(cart[i].id);
    if (p && p.category) cats[p.category] = true;
  }
  var list = Object.keys(cats);

  if (list.length === 1){
    var c = list[0];
    if (c === "chatgpt") return "Hola, quiero ChatGPT.";
    if (c === "games") return "Hola, quiero un juego.";
  }
  return "Hola, quiero estos productos:";
}

function buildWhatsAppMessage(cart, discount, order){
  var lines = [];
  lines.push(makeGreetingFromCart(cart));
  lines.push("");

  if (!cart || cart.length === 0){
    lines.push("No tengo items en el carrito. Quisiera consultar precios/disponibilidad.");
  } else {
    lines.push("Mi pedido:");
    for (var i=0;i<cart.length;i++){
      var it = cart[i];
      var p = findProduct(it.id);
      var cat = findCategory(p ? p.category : "");
      lines.push("- " + it.qty + " x " + (p ? p.name : it.id) + (cat ? " ("+cat.label+")" : ""));
    }

    var totals = computeTotalsWithCashback(cart, discount);
    lines.push("");

    if (totals.subtotal === 0){
      lines.push("(Precios a confirmar) Me confirmas disponibilidad y total?");
    } else {
      lines.push("Subtotal: " + moneyTextGs(totals.subtotal));
      if (totals.appliedCoupon) lines.push("Descuento (" + discount.code + "): -" + moneyTextGs(totals.discountValue));
      if (totals.cashbackUse > 0) lines.push("Cashback usado: -" + moneyTextGs(totals.cashbackUse));
      lines.push("Total: " + moneyTextGs(totals.total));
      lines.push("Me confirmas disponibilidad y el total final?");
    }

    if (order && order.cashbackToEarn && order.cashbackToEarn > 0){
      lines.push("");
      lines.push("Cashback a acreditar (al confirmar pago): " + moneyTextGs(order.cashbackToEarn));
    }
  }

  if (order) {
    lines.push("");
    lines.push("Pedido: " + order.id);
  }
  if (discount && discount.code) lines.push("Cupón: " + discount.code);

  lines.push("");
  lines.push("Gracias.");
  return encodeURIComponent(lines.join("\n"));
}

function openWhatsApp(withCart){
  if (!WHATSAPP_NUMBER){
    toast("Configurá WHATSAPP_NUMBER en data.js");
    return;
  }

  if (withCart){
    var cart = loadCart();
    var discount = loadDiscount();

    // Crear pedido (para cashback / referencia)
    var order = createOrderFromCart(cart, discount);

    var text = buildWhatsAppMessage(cart, discount, order);
    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
    window.open(url, "_blank");
    toast("Pedido listo (WhatsApp)");
  } else {
    var text2 = encodeURIComponent("Hola, quiero consultar por productos en SubZi.");
    var url2 = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text2;
    window.open(url2, "_blank");
  }
}

function openWhatsAppForProduct(productId){
  if (!WHATSAPP_NUMBER){
    toast("Configurá WHATSAPP_NUMBER en data.js");
    return;
  }
  var p = findProduct(productId);
  var text = encodeURIComponent("Hola, quiero " + (p ? p.name : "un producto") + ".");
  var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
  window.open(url, "_blank");
}

/* ===== Drawer ===== */
function openCart(){
  var ov = $("#overlay");
  var dr = $("#drawer");
  if (ov) ov.classList.add("show");
  if (dr) dr.classList.add("open");
  document.body.classList.add("lock");
}
function closeCart(){
  var ov = $("#overlay");
  var dr = $("#drawer");
  if (ov) ov.classList.remove("show");
  if (dr) dr.classList.remove("open");
  document.body.classList.remove("lock");
}

/* ===== CRUD carrito ===== */
function addToCart(productId, opts){
  opts = opts || {};
  var open = (opts.open !== false);

  var cart = loadCart();
  var found = false;
  for (var i=0;i<cart.length;i++){
    if (cart[i].id === productId){
      cart[i].qty += 1;
      found = true;
      break;
    }
  }
  if (!found) cart.push({ id: productId, qty: 1 });

  saveCart(cart);
  if (open) openCart();
  toast("Agregado al cesto ✅");
  return cart;
}
function inc(productId){
  var cart = loadCart();
  for (var i=0;i<cart.length;i++){
    if (cart[i].id === productId){ cart[i].qty += 1; break; }
  }
  saveCart(cart);
  return cart;
}
function dec(productId){
  var cart = loadCart();
  for (var i=0;i<cart.length;i++){
    if (cart[i].id === productId){
      cart[i].qty -= 1;
      if (cart[i].qty <= 0){ cart.splice(i,1); }
      break;
    }
  }
  saveCart(cart);
  return cart;
}
function removeItem(productId){
  var cart = loadCart();
  for (var i=cart.length-1;i>=0;i--){
    if (cart[i].id === productId) cart.splice(i,1);
  }
  saveCart(cart);
  return cart;
}

function applyCoupon(code){
  code = String(code || "").toUpperCase().trim();
  if (!code || !coupons[code]){
    saveDiscount(null);
    toast("Cupón inválido ❌");
    return null;
  }
  saveDiscount({ code: code });
  toast("Cupón " + code + " aplicado 🏷️");
  return { code: code };
}

/* ===== Render cart ===== */
function renderCart(){
  var cart = loadCart();
  var discount = loadDiscount();

  var badge = $("#cartBadge");
  if (badge) badge.textContent = String(cartCount(cart));

  var body = $("#cartItems");
  if (!body) return;

  body.innerHTML = "";

  if (cart.length === 0){
    var empty = document.createElement("div");
    empty.className = "mini";
    empty.innerHTML = "<h3>Tu cesto está vacío</h3><p>Agregá un producto y finalizá por WhatsApp.</p>";
    body.appendChild(empty);
  } else {
    for (var i=0;i<cart.length;i++){
      var it = cart[i];
      var p = findProduct(it.id);
      var cat = findCategory(p ? p.category : "");

      var item = document.createElement("div");
      item.className = "cartItem";
      item.innerHTML =
        '<div>' +
          '<h4>' + escapeHtml(p ? p.name : it.id) + '</h4>' +
          '<p class="meta">' + escapeHtml(cat ? cat.label : "Producto") + ' · ' + escapeHtml(p ? (p.badge || "") : "") + ' · ' + money(p ? p.price : 0, p ? p.currency : "ARS") + '</p>' +
          '<div class="remove" data-remove="' + it.id + '">Quitar</div>' +
        '</div>' +
        '<div style="display:flex; flex-direction:column; align-items:flex-end;">' +
          '<div class="qtyRow">' +
            '<button class="qtyBtn" data-dec="' + it.id + '" aria-label="Restar">−</button>' +
            '<div class="qty">' + it.qty + '</div>' +
            '<button class="qtyBtn" data-inc="' + it.id + '" aria-label="Sumar">+</button>' +
          '</div>' +
        '</div>';
      body.appendChild(item);
    }
  }

  // totals
  var totals = computeTotalsWithCashback(cart, discount);

  var subtotalEl = $("#subtotalValue");
  var discountEl = $("#discountValue");
  var totalEl = $("#totalValue");
  var couponEl = $("#couponState");
  var cbAppliedEl = $("#cashbackApplied");
  var cbBalEl = $("#cashbackBalance");
  var cbHintEl = $("#cashbackHint");
  var cbCheck = $("#useCashback");

  if (subtotalEl) subtotalEl.textContent = totals.subtotal > 0 ? moneyTextGs(totals.subtotal) : "A confirmar";
  if (discountEl) discountEl.textContent = totals.appliedCoupon ? ("-" + moneyTextGs(totals.discountValue)) : "—";
  if (totalEl) totalEl.textContent = totals.subtotal > 0 ? moneyTextGs(totals.total) : "A confirmar";
  if (couponEl) couponEl.textContent = (discount && discount.code) ? discount.code : "—";

  if (cbAppliedEl) cbAppliedEl.textContent = (totals.cashbackUse > 0) ? ("-" + moneyTextGs(totals.cashbackUse)) : "—";
  if (cbBalEl) cbBalEl.textContent = String(totals.cashbackBalance || 0);

  if (cbHintEl){
    cbHintEl.textContent = totals.cashbackEligible ? "Disponible para juegos" : "Solo para compras de juegos";
  }

  if (cbCheck){
    // disable if not eligible or subtotal 0
    cbCheck.disabled = !(totals.cashbackEligible && totals.subtotal > 0 && totals.cashbackBalance > 0);
    cbCheck.checked = getUseCashback() && !cbCheck.disabled;

    if (cbCheck.getAttribute("data-bound") !== "1"){
      cbCheck.setAttribute("data-bound","1");
      cbCheck.addEventListener("change", function(){
        setUseCashback(!!cbCheck.checked);
        renderCart();
      });
    }
  }

  // binds
  var incBtns = $all("[data-inc]");
  for (var a=0;a<incBtns.length;a++){
    (function(btn){
      btn.addEventListener("click", function(){ inc(btn.getAttribute("data-inc")); renderCart(); });
    })(incBtns[a]);
  }
  var decBtns = $all("[data-dec]");
  for (var b=0;b<decBtns.length;b++){
    (function(btn){
      btn.addEventListener("click", function(){ dec(btn.getAttribute("data-dec")); renderCart(); });
    })(decBtns[b]);
  }
  var rmBtns = $all("[data-remove]");
  for (var c=0;c<rmBtns.length;c++){
    (function(btn){
      btn.addEventListener("click", function(){ removeItem(btn.getAttribute("data-remove")); renderCart(); });
    })(rmBtns[c]);
  }
}

/* ===== Scroll / reveal ===== */
function goToAnchor(anchor){
  var el = document.querySelector(anchor);
  if (!el) return;
  el.scrollIntoView({ behavior:"smooth", block:"start" });
  var nav = document.getElementById("navMenu");
  var ov = document.getElementById("menuOverlay");
  var bm = document.getElementById("btnMenu");
  if (nav) nav.classList.remove("open");
  if (ov) ov.classList.remove("show");
  if (bm) bm.setAttribute("aria-expanded","false");
}

function setupReveal(){
  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  if (typeof IntersectionObserver === "undefined"){
    for (var i=0;i<nodes.length;i++) nodes[i].classList.add("in");
    return;
  }

  var io = new IntersectionObserver(function(entries){
    for (var i=0;i<entries.length;i++){
      if (entries[i].isIntersecting) entries[i].target.classList.add("in");
    }
  }, { threshold: 0.12 });

  for (var j=0;j<nodes.length;j++) io.observe(nodes[j]);
}

/* Expose */
SUBZI.core = {
  $, $all, escapeHtml, money, toast,
  getCurrentUser,
  saveCart, loadCart, saveDiscount, loadDiscount,
  openWhatsApp, openWhatsAppForProduct,
  openCart, closeCart,
  addToCart, inc, dec, removeItem,
  applyCoupon, renderCart,
  computeTotalsWithCashback: computeTotalsWithCashback,
  loadCashback: loadCashback,
  cashbackBalance: cashbackBalance,
  getUseCashback: getUseCashback,
  setUseCashback: setUseCashback,
  loadOrders: loadOrders,
  confirmOrder: confirmOrder,
  goToAnchor, setupReveal
};
