/**
 * Inicialización común (menu, cesto, WhatsApp, cupones, reveal).
 * ES5 para máxima compatibilidad.
 */
(function(){
  if (!window.SUBZI || !SUBZI.core) return;
  var core = SUBZI.core;

  function byId(id){ return document.getElementById(id); }

  // Menú
  var navMenu = byId("navMenu");
  var menuOverlay = byId("menuOverlay");
  var btnMenu = byId("btnMenu");

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
      if (navMenu && navMenu.classList.contains("open")) closeMenu();
      else openMenu();
    });
  }
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", function(e){
    if (e && e.key === "Escape") closeMenu();
  });

  // Cerrar menú al clickear un link
  if (navMenu){
    var links = navMenu.querySelectorAll("a");
    for (var i=0;i<links.length;i++){
      links[i].addEventListener("click", closeMenu);
    }
  }

  // WhatsApp (header + float + hero si existe)
  var waHead = byId("btnWhatsAppHeader");
  if (waHead) waHead.addEventListener("click", function(){ core.openWhatsApp(false); });

  var waHero = byId("btnWhatsAppHero");
  if (waHero) waHero.addEventListener("click", function(){ core.openWhatsApp(false); });

  var waFloat = byId("btnWhatsAppFloat");
  if (waFloat) waFloat.addEventListener("click", function(){ core.openWhatsApp(false); });

  // Cesto
  var btnCart = byId("btnCart");
  if (btnCart){
    btnCart.addEventListener("click", function(){
      closeMenu();
      core.openCart();
      core.renderCart();
    });
  }
  var ov = byId("overlay");
  if (ov) ov.addEventListener("click", core.closeCart);
  var closeBtn = byId("btnClose");
  if (closeBtn) closeBtn.addEventListener("click", core.closeCart);

  var checkout = byId("btnCheckout");
  if (checkout) checkout.addEventListener("click", function(){ core.openWhatsApp(true); });

  // Cupones
  var applyBtn = byId("btnApplyCoupon");
  if (applyBtn){
    applyBtn.addEventListener("click", function(){
      var inp = byId("couponInput");
      var code = inp ? String(inp.value || "").replace(/\s+/g,"").toUpperCase() : "";
      if (!code) return;
      core.applyCoupon(code);
      core.renderCart();
    });
  }

  // Render inicial
  core.renderCart();
  core.setupReveal();

  // Año
  try{
    var y = byId("year");
    if (y) y.textContent = String(new Date().getFullYear());
  }catch(e){}

})();
