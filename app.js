/**
 * SubZi - Home (inicio + secciones) - compatible
 */
var core = (window.SUBZI && window.SUBZI.core) ? window.SUBZI.core : null;
var products = (window.SUBZI && window.SUBZI.products) ? window.SUBZI.products : [];
var categories = (window.SUBZI && window.SUBZI.categories) ? window.SUBZI.categories : [];
var categoryImages = (window.SUBZI && window.SUBZI.categoryImages) ? window.SUBZI.categoryImages : {};

function renderCategoryTiles(){
  if (!core) return;
  var el = document.getElementById("categoryTiles");
  if (!el) return;

  el.innerHTML = "";
  for (var i=0;i<categories.length;i++){
    var c = categories[i];
    var card = document.createElement("a");
    card.className = "catTile reveal";
    card.href = c.anchor;

    var img = categoryImages[c.id] || categoryImages.streaming || "";
    card.innerHTML =
      '<div class="catImg"><img alt="' + core.escapeHtml(c.label) + '" src="' + core.escapeHtml(img) + '"></div>' +
      '<div class="catBody">' +
        '<b>' + core.escapeHtml(c.emoji) + ' ' + core.escapeHtml(c.label) + '</b>' +
        '<p>' + core.escapeHtml(c.desc) + '</p>' +
        '<span class="go">Ver ' + core.escapeHtml(c.label) + ' →</span>' +
      '</div>';

    (function(anchor){
      card.addEventListener("click", function(e){
        e.preventDefault();
        core.goToAnchor(anchor);
      });
    })(c.anchor);

    el.appendChild(card);
  }
}

function renderProductsGrid(categoryId, selector){
  if (!core) return;
  var container = document.querySelector(selector);
  if (!container) return;
  container.innerHTML = "";

  for (var i=0;i<products.length;i++){
    var p = products[i];
    if (p.category !== categoryId) continue;

    var el = document.createElement("div");
    el.className = "product reveal";

    var imgSrc = p.image || categoryImages[p.category] || categoryImages.streaming || "";

    el.innerHTML =
      '<div class="pimg">' +
        '<img loading="lazy" alt="' + core.escapeHtml(p.name) + '" src="' + core.escapeHtml(imgSrc) + '"' +
        ' onerror="this.src=SUBZI.categoryImages[\'' + p.category + '\'] || SUBZI.categoryImages.streaming;" />' +
      '</div>' +
      '<div class="pill">' + core.escapeHtml(p.badge) + '</div>' +
      '<div class="titleRow">' +
        '<div>' +
          '<h3 class="clickable" data-view="' + p.id + '">' + core.escapeHtml(p.name) + '</h3>' +
          '<p class="desc">' + core.escapeHtml(p.desc) + '</p>' +
        '</div>' +
        '<div class="price">' + core.money(p.price, p.currency) + '</div>' +
      '</div>' +
      '<ul class="features">' + (p.features || []).map(function(f){ return '<li>' + core.escapeHtml(f) + '</li>'; }).join("") + '</ul>' +
      '<div class="actions">' +
        '<button class="smallBtn" data-view="' + p.id + '">Ver info</button>' +
        '<button class="smallBtn add" data-add="' + p.id + '">Agregar</button>' +
      '</div>';

    container.appendChild(el);
  }

  var addBtns = document.querySelectorAll("[data-add]");
  for (var a=0;a<addBtns.length;a++){
    addBtns[a].addEventListener("click", function(){
      var id = this.getAttribute("data-add");
      core.addToCart(id, {open:true});
      core.renderCart();
    });
  }

  var viewBtns = document.querySelectorAll("[data-view]");
  for (var b=0;b<viewBtns.length;b++){
    viewBtns[b].addEventListener("click", function(){
      var id = this.getAttribute("data-view");
      window.location.href = "./product.html?id=" + encodeURIComponent(id);
    });
  }
}

document.addEventListener("DOMContentLoaded", function(){
  if (!core) return;

  // Menú dropdown
  var navMenu = document.getElementById("navMenu");
  var menuOverlay = document.getElementById("menuOverlay");
  var btnMenu = document.getElementById("btnMenu");

  function openMenu(){
    if (navMenu) navMenu.classList.add("open");
    if (menuOverlay) menuOverlay.classList.add("show");
    if (btnMenu) btnMenu.setAttribute("aria-expanded","true");
  }
  function closeMenu(){
    if (navMenu) navMenu.classList.remove("open");
    if (menuOverlay) menuOverlay.classList.remove("show");
    if (btnMenu) btnMenu.setAttribute("aria-expanded","false");
  }

  if (btnMenu){
    btnMenu.addEventListener("click", function(e){
      e.preventDefault();
      if (navMenu && navMenu.classList.contains("open")) closeMenu(); else openMenu();
    });
  }
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function(e){ if (e.key === "Escape") closeMenu(); });

  var anchorBtns = document.querySelectorAll("[data-anchor]");
  for (var i=0;i<anchorBtns.length;i++){
    anchorBtns[i].addEventListener("click", function(e){
      e.preventDefault();
      var a = this.getAttribute("data-anchor");
      if (a) core.goToAnchor(a);
      closeMenu();
    });
  }

  // WhatsApp
  var waHeader = document.getElementById("btnWhatsAppHeader");
  if (waHeader) waHeader.addEventListener("click", function(){ core.openWhatsApp(false); });
  var waHero = document.getElementById("btnWhatsAppHero");
  if (waHero) waHero.addEventListener("click", function(){ core.openWhatsApp(false); });
  var waFloat = document.getElementById("btnWhatsAppFloat");
  if (waFloat) waFloat.addEventListener("click", function(){ core.openWhatsApp(false); });

  // Carrito
  var btnCart = document.getElementById("btnCart");
  if (btnCart) btnCart.addEventListener("click", function(){ closeMenu(); core.openCart(); core.renderCart(); });
  var overlay = document.getElementById("overlay");
  if (overlay) overlay.addEventListener("click", core.closeCart);
  var btnClose = document.getElementById("btnClose");
  if (btnClose) btnClose.addEventListener("click", core.closeCart);
  var btnCheckout = document.getElementById("btnCheckout");
  if (btnCheckout) btnCheckout.addEventListener("click", function(){ core.openWhatsApp(true); });

  // Cupones
  var btnApply = document.getElementById("btnApplyCoupon");
  if (btnApply) btnApply.addEventListener("click", function(){
    var input = document.getElementById("couponInput");
    var code = input ? (input.value || "").trim().toUpperCase() : "";
    if (!code) return;
    core.applyCoupon(code);
    core.renderCart();
  });

  var btnApply2 = document.getElementById("btnApplyCoupon2");
  if (btnApply2) btnApply2.addEventListener("click", function(){
    var input = document.getElementById("couponInput2");
    var code = input ? (input.value || "").trim().toUpperCase() : "";
    if (!code) return;
    core.applyCoupon(code);
    core.renderCart();
  });

  var btnUse = document.getElementById("btnUseSUBZI10");
  if (btnUse) btnUse.addEventListener("click", function(){
    var ci = document.getElementById("couponInput2");
    if (ci) ci.value = "SUBZI10";
    core.applyCoupon("SUBZI10");
    core.renderCart();
    core.openCart();
  });

  // Render
  renderCategoryTiles();
  renderProductsGrid("streaming", "#gridStreaming");
  renderProductsGrid("descuentos", "#gridDescuentos");
  renderProductsGrid("chatgpt", "#gridChatgpt");
  renderProductsGrid("steam", "#gridSteam");
  renderProductsGrid("edicion", "#gridEdicion");

  core.renderCart();
  core.setupReveal();

  var y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
});
