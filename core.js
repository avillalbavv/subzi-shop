/**
 * Core SubZi (carrito, WhatsApp, helpers) - compatible (sin optional chaining).
 * Usado por index y product.
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

var WHATSAPP_NUMBER = SUBZI.WHATSAPP_NUMBER;
var products = SUBZI.products || [];
var coupons = SUBZI.coupons || {};
var categories = SUBZI.categories || [];
var categoryImages = SUBZI.categoryImages || {};

function $(sel){ return document.querySelector(sel); }
function $all(sel){ return Array.prototype.slice.call(document.querySelectorAll(sel)); }

function escapeHtml(str){
  str = String(str == null ? "" : str);
  return str
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;")
    .replace(/'/g,"&#039;");
}

function money(n, cur){
  cur = cur || "ARS";
  if (!n || n === 0) return "Consultar";
  try{
    return new Intl.NumberFormat("es-AR", { style:"currency", currency: cur, maximumFractionDigits: 0 }).format(n);
  }catch(e){
    return String(n) + " " + cur;
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

function saveCart(cart){ localStorage.setItem("subzi_cart", JSON.stringify(cart)); }
function loadCart(){
  try{ return JSON.parse(localStorage.getItem("subzi_cart") || "[]"); }
  catch(e){ return []; }
}

function saveDiscount(discount){ localStorage.setItem("subzi_discount", JSON.stringify(discount)); }
function loadDiscount(){
  try{ return JSON.parse(localStorage.getItem("subzi_discount") || "null"); }
  catch(e){ return null; }
}

function cartCount(cart){
  var total = 0;
  for (var i=0;i<cart.length;i++) total += cart[i].qty;
  return total;
}

function findProduct(id){
  for (var i=0;i<products.length;i++){
    if (products[i].id === id) return products[i];
  }
  return null;
}

function findCategory(id){
  for (var i=0;i<categories.length;i++){
    if (categories[i].id === id) return categories[i];
  }
  return null;
}

function computeTotals(cart, discount){
  var subtotal = 0;
  for (var i=0;i<cart.length;i++){
    var it = cart[i];
    var p = findProduct(it.id);
    var price = (p && typeof p.price === "number") ? p.price : 0;
    subtotal += price * it.qty;
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

function makeGreetingFromCart(cart){
  if (!cart || cart.length === 0) return "Hola 👋 quiero consultar por servicios en SubZi.";

  var cats = {};
  for (var i=0;i<cart.length;i++){
    var p = findProduct(cart[i].id);
    if (p && p.category) cats[p.category] = true;
  }
  var list = Object.keys(cats);

  if (list.length === 1){
    var c = list[0];
    if (c === "chatgpt") return "Hola 👋 quiero ChatGPT.";
    if (c === "steam") return "Hola 👋 quiero algo de Steam.";
    if (c === "edicion") return "Hola 👋 quiero una app de edición.";
    if (c === "descuentos") return "Hola 👋 quiero un combo/descuento.";
    return "Hola 👋 quiero un servicio de streaming.";
  }
  return "Hola 👋 quiero estos servicios:";
}

function buildWhatsAppMessage(cart, discount){
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

    var totals = computeTotals(cart, discount);
    lines.push("");

    if (totals.subtotal === 0){
      lines.push("✅ (Precios a confirmar) ¿Me confirmás disponibilidad y total?");
    } else {
      lines.push("Subtotal: " + money(totals.subtotal, "ARS"));
      if (totals.applied) lines.push("Descuento (" + discount.code + "): -" + money(totals.discountValue, "ARS"));
      lines.push("Total: " + money(totals.total, "ARS"));
      lines.push("¿Me confirmás disponibilidad y el total final?");
    }
  }

  if (discount && discount.code) lines.push("\nCupón: " + discount.code);

  lines.push("");
  lines.push("Gracias!");
  return encodeURIComponent(lines.join("\n"));
}

function openWhatsApp(withCart){
  if (withCart === undefined) withCart = true;
  var cart = loadCart();
  var discount = loadDiscount();
  var text = withCart
    ? buildWhatsAppMessage(cart, discount)
    : encodeURIComponent("Hola 👋 Quiero consultar por servicios (Streaming/IA/Steam/Edición) en SubZi.");
  var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
  window.open(url, "_blank");
}

function openWhatsAppForProduct(productId){
  var p = findProduct(productId);
  var text = encodeURIComponent("Hola 👋 quiero " + (p ? p.name : "un servicio") + ".");
  var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text;
  window.open(url, "_blank");
}

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

function addToCart(productId, opts){
  opts = opts || {};
  var shouldOpen = (opts.open !== false);

  var cart = loadCart();
  var existing = null;
  for (var i=0;i<cart.length;i++){
    if (cart[i].id === productId){ existing = cart[i]; break; }
  }
  if (existing) existing.qty += 1;
  else cart.push({ id: productId, qty: 1 });

  saveCart(cart);
  if (shouldOpen) openCart();
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
      if (cart[i].qty <= 0){
        cart.splice(i,1);
      }
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
  var c = coupons[code];
  if (!c){
    saveDiscount(null);
    toast("Cupón inválido ❌");
    return null;
  }
  var discount = { code: code };
  saveDiscount(discount);
  toast("Cupón " + code + " aplicado 🏷️");
  return discount;
}

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
    empty.innerHTML = "<h3>Tu cesto está vacío</h3><p>Agregá un servicio y finalizá por WhatsApp.</p>";
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
          '<p class="meta">' + escapeHtml(cat ? cat.label : "Servicio") + ' · ' + escapeHtml(p ? (p.badge || "") : "") + ' · ' + money(p ? p.price : 0, p ? p.currency : "ARS") + '</p>' +
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

  var totals = computeTotals(cart, discount);
  var subtotalEl = $("#subtotalValue");
  var discountEl = $("#discountValue");
  var totalEl = $("#totalValue");
  var couponEl = $("#couponState");

  if (subtotalEl) subtotalEl.textContent = totals.subtotal > 0 ? money(totals.subtotal, "ARS") : "A confirmar";
  if (discountEl) discountEl.textContent = totals.applied ? ("-" + money(totals.discountValue, "ARS")) : "—";
  if (totalEl) totalEl.textContent = totals.subtotal > 0 ? money(totals.total, "ARS") : "A confirmar";
  if (couponEl) couponEl.textContent = (discount && discount.code) ? discount.code : "—";

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

function goToAnchor(anchor){
  var el = document.querySelector(anchor);
  if (!el) return;
  el.scrollIntoView({ behavior:"smooth", block:"start" });

  var navMenu = document.getElementById("navMenu");
  var menuOverlay = document.getElementById("menuOverlay");
  var btnMenu = document.getElementById("btnMenu");
  if (navMenu) navMenu.classList.remove("open");
  if (menuOverlay) menuOverlay.classList.remove("show");
  if (btnMenu) btnMenu.setAttribute("aria-expanded","false");
}

/* Reveal on scroll */
function setupReveal(){
  var nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  // Si no hay soporte o si algo falla, mostramos todo.
  if (typeof IntersectionObserver === "undefined"){
    for (var i=0;i<nodes.length;i++) nodes[i].classList.add("in");
    return;
  }

  try{
    var io = new IntersectionObserver(function(entries){
      for (var j=0;j<entries.length;j++){
        if (entries[j].isIntersecting) entries[j].target.classList.add("in");
      }
    }, { threshold: 0.12 });

    for (var k=0;k<nodes.length;k++) io.observe(nodes[k]);

    // “Seguro”: si por algún motivo no dispara, mostramos todo igual.
    setTimeout(function(){
      for (var x=0;x<nodes.length;x++){
        if (!nodes[x].classList.contains("in")) nodes[x].classList.add("in");
      }
    }, 900);
  }catch(e){
    for (var y=0;y<nodes.length;y++) nodes[y].classList.add("in");
  }
}

SUBZI.core = {
  $: $, $all: $all, escapeHtml: escapeHtml, money: money, toast: toast,
  loadCart: loadCart, saveCart: saveCart, loadDiscount: loadDiscount, saveDiscount: saveDiscount,
  openWhatsApp: openWhatsApp, openWhatsAppForProduct: openWhatsAppForProduct,
  openCart: openCart, closeCart: closeCart,
  addToCart: addToCart, inc: inc, dec: dec, removeItem: removeItem,
  applyCoupon: applyCoupon, renderCart: renderCart, computeTotals: computeTotals,
  goToAnchor: goToAnchor, setupReveal: setupReveal
};
