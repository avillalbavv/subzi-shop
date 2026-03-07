/**
 * Inicialización común (menu, cuenta Supabase, cesto, WhatsApp, cupones, reveal).
 * Mantiene modo "guest" si Supabase no está configurado.
 */
(function(){
  function byId(id){ return document.getElementById(id); }

  // Helper de rutas: soporta páginas en carpetas (/streaming, /steam, etc.)
  function P(p){
    try{ if (window.SUBZI && SUBZI.core && SUBZI.core.path) return SUBZI.core.path(p); }
    catch(e){}
    return p;
  }

  // Título fijo (pestaña)
  try{ document.title = "SubZi | Tienda Online"; }catch(e){}

  // ===== POPUP INICIAL (compacto, nuevo y 5s) =====

function shouldShowStartupPopup(){
  try{
    var p = (location.pathname || "").split("/").pop();
    return !p || p === "index.html";
  }catch(e){ return false; }
}

function showStartupPopup(){
  if (document.getElementById("startPopupOverlay")) return;

  var ov = document.createElement("div");
  ov.id = "startPopupOverlay";
  ov.className = "startPopupOverlay";
  ov.innerHTML =
    '<div class="startPopup startPopupCompact" role="dialog" aria-modal="true" aria-label="Bienvenido a SubZi">' +
      '<button class="startPopupClose" id="startPopupClose" type="button" aria-label="Cerrar">✕</button>' +
      '<div class="startPopupHeaderLine"></div>' +
      '<div class="startPopupShell">' +
        '<img class="startPopupLogo compact" src="' + P('assets/favicon.png') + '" alt="SubZi" />' +
        '<div class="startPopupCopy">' +
          '<div class="startPopupKicker">SubZi Store</div>' +
          '<div class="startPopupTitle">Comprá rápido y sin vueltas</div>' +
          '<p class="startPopupSub">Entrá a <b>Descuentos</b>, elegí tu plan de <b>ChatGPT</b>, tus <b>Steam Keys</b> o <b>Juegos</b>, agregá al cesto y cerrá por WhatsApp. Streaming queda en su apartado propio.</p>' +
          '<div class="startPopupTags">' +
            '<span>⚡ Entrega rápida</span>' +
            '<span>🧺 Cesto</span>' +
            '<span>💬 Soporte</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="startPopupActions compact">' +
        '<a class="btn primary startPopupCta" href="' + P('descuentos/') + '">Ver descuentos</a>' +
        '<button class="btn ghost startSkipBtn" id="startPopupSkip" type="button">Cerrar</button>' +
      '</div>' +
      '<div class="startPopupTimer"><span>Se cierra sola en 5 segundos</span><div class="startPopupProgress"><i></i></div></div>' +
    '</div>';

  document.body.appendChild(ov);
  try{ document.body.classList.add("popupOpen"); }catch(e){}

  var closed = false;
  function close(immediate){
    if (closed) return;
    closed = true;
    ov.classList.remove("show");
    try{ document.body.classList.remove("popupOpen"); }catch(e){}
    var done = function(){ try{ ov.remove(); }catch(e){} };
    if (immediate) done();
    else setTimeout(done, 180);
  }

  ov.addEventListener("click", function(e){ if (e && e.target === ov) close(true); });
  var skip = document.getElementById("startPopupSkip");
  if (skip) skip.addEventListener("click", function(e){ if(e){ e.preventDefault(); e.stopPropagation(); } close(true); });
  var closeBtn = document.getElementById("startPopupClose");
  if (closeBtn) closeBtn.addEventListener("click", function(e){ if(e){ e.preventDefault(); e.stopPropagation(); } close(true); });

  function escHandler(e){
    if (e && e.key === "Escape"){
      close(true);
      document.removeEventListener("keydown", escHandler);
    }
  }
  document.addEventListener("keydown", escHandler);

  requestAnimationFrame(function(){ ov.classList.add("show"); });
  setTimeout(function(){ close(false); }, 5000);
}

function currentPageName(){
  try{
    var p = (location.pathname || "").split("/").pop();
    return p || "index.html";
  }catch(e){ return "index.html"; }
}


function getSteamStockItems(){
  try{
    var all = (window.SUBZI && Array.isArray(SUBZI.products)) ? SUBZI.products : [];
    var out = [];
    for (var i=0;i<all.length;i++){
      var p = all[i];
      if (!p || p.category !== "steam") continue;
      out.push({ id: p.id, name: p.name });
    }
    return out;
  }catch(e){ return []; }
}

function ensureSteamMenuStock(){
  var nav = byId("navMenu");
  if (!nav || nav.querySelector(".steamMenuShelf")) return;
  var items = getSteamStockItems();
  if (!items.length) return;

  var shelf = document.createElement("div");
  shelf.className = "steamMenuShelf";
  shelf.innerHTML =
    '<div class="steamMenuShelfHead">' +
      '<strong>Steam Keys en stock</strong>' +
      '<span>Acceso directo a todos los juegos disponibles desde el menú.</span>' +
    '</div>' +
    '<div class="steamMenuShelfRow"></div>';

  var row = shelf.querySelector('.steamMenuShelfRow');
  for (var i=0;i<items.length;i++){
    var a = document.createElement('a');
    a.className = 'steamMenuChip';
    a.href = P('product.html?id=' + encodeURIComponent(items[i].id));
    a.innerHTML = '<span class="steamMenuChipIcon">SK</span><span class="steamMenuChipText"><span class="steamMenuChipLabel">' + items[i].name + '</span><small class="steamMenuChipMeta">Steam Key original · entrega inmediata</small></span>';
    row.appendChild(a);
  }

  nav.appendChild(shelf);
}

function ensureSteamPageStockRail(){
  var body = document.body;
  if (!body || body.getAttribute('data-category') !== 'steam') return;
  var rail = byId('steamStockRail');
  if (!rail || rail.getAttribute('data-hydrated') === '1') return;
  var items = getSteamStockItems();
  if (!items.length) return;

  rail.innerHTML = '';
  for (var i=0;i<items.length;i++){
    var a = document.createElement('a');
    a.className = 'steamStockCard';
    a.href = P('product.html?id=' + encodeURIComponent(items[i].id));
    a.innerHTML = '<span class="steamStockCardKicker">Disponible ahora</span><strong class="steamStockCardName">' + items[i].name + '</strong><small class="steamStockCardMeta">Steam Key original · canje directo en tu cuenta</small>';
    rail.appendChild(a);
  }
  rail.setAttribute('data-hydrated', '1');
}

function socialSVG(kind){
  if (kind === "tiktok") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#25F4EE" d="M15.3 2v11.1a4.2 4.2 0 1 1-4.2-4.2c.3 0 .6 0 .9.1v2.4a1.9 1.9 0 1 0 .9 1.7V2h2.4Z"/><path fill="#FE2C55" d="M16.3 2c.4 2.2 1.8 4.1 3.7 5.2v2.6a8.6 8.6 0 0 1-3.7-1.3v4.6a5.1 5.1 0 1 1-5.1-5.1h.2v2.4h-.2a2.8 2.8 0 1 0 2.8 2.8V2h2.3Z"/><path fill="#fff" d="M18.6 4.9c.9 1.1 2 1.9 3.4 2.3v2.6a8.4 8.4 0 0 1-4.6-1.8v5a5.4 5.4 0 1 1-5.4-5.4V10a3 3 0 1 0 3 3V2h3.6c0 1 .3 2 .9 2.9Z"/></svg>';
  if (kind === "facebook") return '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#1877F2" d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.6 4.5-4.6 1.3 0 2.6.2 2.6.2V8h-1.5c-1.5 0-2 1-2 2V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z"/></svg>';
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><defs><linearGradient id="ig-subzi" x1="0%" x2="100%" y1="100%" y2="0%"><stop offset="0%" stop-color="#F58529"/><stop offset="35%" stop-color="#DD2A7B"/><stop offset="70%" stop-color="#8134AF"/><stop offset="100%" stop-color="#515BD4"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#ig-subzi)"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" stroke-width="2"/><circle cx="17.2" cy="6.8" r="1.2" fill="#fff"/></svg>';
}

function getFooterSocialHTML(){
  // Footer minimalista: solo iconos (logos), sin texto ni botones.
  return `
    <a class="soc socIconOnly" href="https://www.tiktok.com/@subzi.py" target="_blank" rel="noopener" aria-label="TikTok de SubZi" title="TikTok">
      <span class="socIcon"><img class="socialLogo" alt="" src="${P('assets/social/tiktok.svg')}" /></span>
    </a>
    <a class="soc socIconOnly" href="https://www.facebook.com/profile.php?id=61588504561058" target="_blank" rel="noopener" aria-label="Facebook de SubZi" title="Facebook">
      <span class="socIcon"><img class="socialLogo" alt="" src="${P('assets/social/facebook.svg')}" /></span>
    </a>
    <a class="soc socIconOnly" href="https://www.instagram.com/subzishop/" target="_blank" rel="noopener" aria-label="Instagram de SubZi" title="Instagram">
      <span class="socIcon"><img class="socialLogo" alt="" src="${P('assets/social/instagram.svg')}" /></span>
    </a>`;
}


function ensurePageTabs(){
  var header = document.querySelector("header");
  if (!header || header.querySelector(".pageTabsWrap")) return;

  var current = currentPageName();
  var nav = document.createElement("div");
  nav.className = "wrap pageTabsWrap";
  nav.innerHTML =
    '<nav class="pageTabs" aria-label="Secciones">' +
      '<a class="pageTab' + ((current === 'index.html') ? ' active' : '') + '" href="' + P('index.html') + '">Inicio</a>' +
      '<a class="pageTab' + ((current === 'descuentos.html') ? ' active' : '') + '" href="' + P('descuentos/') + '">Descuentos</a>' +
      '<a class="pageTab' + ((current === 'chatgpt.html') ? ' active' : '') + '" href="' + P('chatgpt/') + '">ChatGPT</a>' +
      '<a class="pageTab' + ((current === 'games.html') ? ' active' : '') + '" href="' + P('games/') + '">Juegos</a>' +
      '<a class="pageTab' + ((current === 'steam.html') ? ' active' : '') + '" href="' + P('steam/') + '">Steam Keys</a>' +
      '<a class="pageTab' + ((current === 'streaming.html') ? ' active' : '') + '" href="' + P('streaming/') + '">Streaming</a>' +
      '<a class="pageTab' + ((current === 'cashback.html') ? ' active' : '') + '" href="' + P('cashback/') + '">Cashback</a>'  +
    '</nav>';
  header.appendChild(nav);
}

function ensureFooterLayout(){
  var foot = document.querySelector("footer .foot");
  if (!foot) return;
  // Footer minimalista: solo derechos + redes.
  foot.classList.add("footMinimal");

  // Quitar elementos extra si existen (crédito, links rápidos, etc.)
  var credit = foot.querySelector('.credit');
  if (credit) credit.remove();
  var quick = foot.querySelector('.footQuickLinks');
  if (quick) quick.remove();

  var social = foot.querySelector(".social");
  if (social){
    social.innerHTML = getFooterSocialHTML();
  }
}

function ensureUtilityShell(){
  if (!document.getElementById("btnWhatsAppFloat")) {
    var wa = document.createElement("div");
    wa.className = "waFloat";
    wa.id = "btnWhatsAppFloat";
    wa.title = "Abrir WhatsApp";
    wa.innerHTML = '<div class="waDot"></div><span>WhatsApp</span>';
    document.body.appendChild(wa);
  }

  if (!document.getElementById("chatFab")) {
    var fab = document.createElement("button");
    fab.className = "chatFab";
    fab.id = "chatFab";
    fab.setAttribute("aria-label", "Abrir chatbot");
    fab.title = "Chatbot";
    fab.textContent = '🤖';
    document.body.appendChild(fab);
  }

  if (!document.getElementById("chatPanel")) {
    var panel = document.createElement("div");
    panel.className = "chatPanel";
    panel.id = "chatPanel";
    panel.setAttribute("aria-label", "Chatbot");
    panel.innerHTML =
      '<div class="chatHead">' +
        '<div class="t"><b>Asistente SubZi</b><small>FAQ + navegación + WhatsApp</small></div>' +
        '<button class="closeBtn" id="chatClose" aria-label="Cerrar chat">✕</button>' +
      '</div>' +
      '<div class="chatBody" id="chatBody"></div>' +
      '<div class="chatQuick">' +
        '<div class="q" data-q="Descuentos">Descuentos</div>' +
        '<div class="q" data-q="ChatGPT">ChatGPT</div>' +
        '<div class="q" data-q="Juegos">Juegos</div>' +
        '<div class="q" data-q="Steam Keys">Steam Keys</div>' +
        '<div class="q" data-q="Streaming">Streaming</div>' +
        '<div class="q" data-q="Hablar">WhatsApp</div>' +
      '</div>' +
      '<div class="chatInputRow">' +
        '<input class="chatInput" id="chatInput" placeholder="Ej: quiero una key de Steam" />' +
        '<button class="chatSend" id="chatSend" aria-label="Enviar">Enviar</button>' +
      '</div>';
    document.body.appendChild(panel);
  }

  if (!document.getElementById("overlay") && window.SUBZI && SUBZI.core) {
    var ov = document.createElement("div");
    ov.className = "overlay";
    ov.id = "overlay";
    document.body.appendChild(ov);
  }

  if (!document.getElementById("drawer") && window.SUBZI && SUBZI.core) {
    var drawer = document.createElement("aside");
    drawer.className = "drawer";
    drawer.id = "drawer";
    drawer.setAttribute("aria-label", "Cesto de compras");
    drawer.innerHTML =
      '<div class="drawerHead">' +
        '<h3>Tu cesto</h3>' +
        '<button class="closeBtn" id="btnClose" aria-label="Cerrar">✕</button>' +
      '</div>' +
      '<div class="drawerBody" id="cartItems"></div>' +
      '<div class="drawerFoot">' +
        '<div class="totals"><div class="label">Subtotal</div><div class="val" id="subtotalValue">A confirmar</div></div>' +
        '<div class="totals"><div class="label">Descuento</div><div class="val" id="discountValue">—</div></div>' +
        '<div class="totals"><div class="label">Cashback</div><div class="val" id="cashbackApplied">—</div></div>' +
        '<div class="cashbackRow" id="cashbackRow">' +
          '<label class="chk"><input type="checkbox" id="useCashback" /> Usar cashback</label>' +
          '<div class="cashInfo"><span class="cashBal">Saldo: <b id="cashbackBalance">0</b></span><span class="cashHint" id="cashbackHint">Disponible para juegos</span></div>' +
        '</div>' +
        '<div class="totals"><div class="label">Total</div><div class="val" id="totalValue">A confirmar</div></div>' +
        '<div class="discountRow"><input class="input" id="couponInput" placeholder="Cupón (ej: SUBZI10)" /><button class="btn ghost" id="btnApplyCoupon">Aplicar</button></div>' +
        '<button class="btn primary" style="width:100%; justify-content:center;" id="btnCheckout">Finalizar por WhatsApp <span aria-hidden="true">📲</span></button>' +
        '<p class="note">Nota: Si el precio está en “Consultar”, te confirmamos por WhatsApp.</p>' +
      '</div>';
    document.body.appendChild(drawer);
  }
}


  // Migración desde versiones viejas (una vez)
  try{
    var oldCart = localStorage.getItem("subzi_cart");
    if (oldCart && !localStorage.getItem("subzi_cart__guest")){
      localStorage.setItem("subzi_cart__guest", oldCart);
      localStorage.removeItem("subzi_cart");
    }
    var oldDisc = localStorage.getItem("subzi_discount");
    if (oldDisc && !localStorage.getItem("subzi_discount__guest")){
      localStorage.setItem("subzi_discount__guest", oldDisc);
      localStorage.removeItem("subzi_discount");
    }
  }catch(e){}

  // ===== MENU (sin depender de SUBZI.core) =====
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

  try{
    if (btnMenu && btnMenu.getAttribute("data-bound-menu") !== "1"){
      btnMenu.setAttribute("data-bound-menu","1");
      btnMenu.addEventListener("click", function(e){
        if (e) e.preventDefault();
        if (navMenu && navMenu.classList.contains("open")) closeMenu();
        else openMenu();
      });
    }
  }catch(e){}
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", function(e){ if (e && e.key === "Escape") closeMenu(); });

  if (navMenu){
    var links = navMenu.querySelectorAll("a");
    for (var i=0;i<links.length;i++){
      links[i].addEventListener("click", closeMenu);
    }
  }

  // ===== CUENTA (Supabase Auth) =====
  function sb(){ return (window.SUBZI && SUBZI.supabase) ? SUBZI.supabase : null; }

  function setLabel(txt){
    var label = byId("userLabel");
    if (label) label.textContent = txt || "Cuenta";
  }

  function setCurrentUserId(id){
    try{
      if (!id) localStorage.removeItem("subzi_current_user");
      else localStorage.setItem("subzi_current_user", id);
    }catch(e){}
  }

  function ensureAuthModal(){
    if (byId("authOverlay")) return;

    var wrap = document.createElement("div");
    wrap.id = "authOverlay";
    wrap.className = "authOverlay";
    wrap.innerHTML =
      '<div class="authModal" role="dialog" aria-label="Cuenta">' +
        '<div class="authHead">' +
          '<b>Cuenta</b>' +
          '<button class="closeBtn" id="authClose" aria-label="Cerrar">✕</button>' +
        '</div>' +

        '<div class="authBody">' +
          '<div class="authTabs">' +
            '<button class="authTab active" id="tabLogin" type="button">Ingresar</button>' +
            '<button class="authTab" id="tabRegister" type="button">Registrarse</button>' +
            '<button class="authTab" id="tabRecover" type="button">Recuperar</button>' +
          '</div>' +

          '<div id="authLogged" style="display:none;">' +
            '<p style="margin:0 0 10px; color: rgba(255,255,255,0.78);">Sesión iniciada: <b id="authUserName"></b></p>' +

            '<div class="cashPanel">' +
              '<div class="cashLine"><span>Saldo cashback:</span> <b id="cashUserBal">0</b></div>' +
              '<a class="soc" href="' + P('cashback/') + '" target="_blank" rel="noopener">Ver normas</a>' +
              '<div class="ordersWrap">' +
                '<div class="ordersTitle">Pedidos</div>' +
                '<div class="orderList" id="orderList"></div>' +
                '<div class="cashSmall">Confirmá el pago para acreditar cashback.</div>' +
              '</div>' +
            '</div>' +

            '<div class="authActions">' +
              '<button class="btn ghost" id="btnLogout" type="button">Cerrar sesión</button>' +
            '</div>' +
          '</div>' +

          '<form id="formLogin" autocomplete="on">' +
            '<div class="authRow"><label>Email</label><input class="authInput" id="loginEmail" type="email" placeholder="tu@email.com" /></div>' +
            '<div class="authRow"><label>Contraseña</label><input class="authInput" id="loginPass" type="password" placeholder="••••••••" /></div>' +
            '<div class="authActions">' +
              '<button class="btn primary" id="btnDoLogin" type="submit">Entrar</button>' +
            '</div>' +
          '</form>' +

          '<form id="formRegister" style="display:none;" autocomplete="on">' +
            '<div class="authRow"><label>Nombre</label><input class="authInput" id="regFirst" placeholder="Nombre" /></div>' +
            '<div class="authRow"><label>Apellido</label><input class="authInput" id="regLast" placeholder="Apellido" /></div>' +
            '<div class="authRow"><label>Email</label><input class="authInput" id="regEmail" type="email" placeholder="tu@email.com" /></div>' +
            '<div class="authRow"><label>Contraseña</label><input class="authInput" id="regPass" type="password" placeholder="Mínimo 6 caracteres" /></div>' +
            '<div class="authActions">' +
              '<button class="btn primary" id="btnDoRegister" type="submit">Crear cuenta</button>' +
            '</div>' +
          '</form>' +

          '<form id="formRecover" style="display:none;" autocomplete="on">' +
            '<div class="authRow"><label>Email</label><input class="authInput" id="recEmail" type="email" placeholder="tu@email.com" /></div>' +
            '<div class="authActions">' +
              '<button class="btn primary" id="btnDoRecover" type="submit">Enviar enlace</button>' +
            '</div>' +
            '<p class="note" style="margin:8px 0 0;">Te llega un email para cambiar la contraseña. En el plan por defecto de Supabase puede haber límite de envíos.</p>' +
          '</form>' +

          '<div class="authMsg" id="authMsg"></div>' +
        '</div>' +
      '</div>';

    document.body.appendChild(wrap);

    // Close handlers
    wrap.addEventListener("click", function(e){ if (e && e.target === wrap) closeAuth(); });
    var c = byId("authClose");
    if (c) c.addEventListener("click", closeAuth);

    // Tabs
    var tabLogin = byId("tabLogin");
    var tabReg = byId("tabRegister");
    var tabRec = byId("tabRecover");
    var formLogin = byId("formLogin");
    var formReg = byId("formRegister");
    var formRec = byId("formRecover");

    function clearMsg(){
      var msg = byId("authMsg");
      if (msg){ msg.textContent=""; msg.className="authMsg"; }
    }

    function setTab(which){
      clearMsg();
      if (tabLogin) tabLogin.classList.remove("active");
      if (tabReg) tabReg.classList.remove("active");
      if (tabRec) tabRec.classList.remove("active");

      if (formLogin) formLogin.style.display = "none";
      if (formReg) formReg.style.display = "none";
      if (formRec) formRec.style.display = "none";

      if (which === "login"){
        if (tabLogin) tabLogin.classList.add("active");
        if (formLogin) formLogin.style.display = "";
      } else if (which === "register"){
        if (tabReg) tabReg.classList.add("active");
        if (formReg) formReg.style.display = "";
      } else {
        if (tabRec) tabRec.classList.add("active");
        if (formRec) formRec.style.display = "";
      }
    }

    if (tabLogin) tabLogin.addEventListener("click", function(){ setTab("login"); });
    if (tabReg) tabReg.addEventListener("click", function(){ setTab("register"); });
    if (tabRec) tabRec.addEventListener("click", function(){ setTab("recover"); });

    // Helpers
    function showMsg(txt, ok){
      var msg = byId("authMsg");
      if (!msg) return;
      msg.textContent = txt || "";
      msg.className = ok ? "authMsg ok" : "authMsg err";
    }

    function showLoggedUI(user){
      var logged = byId("authLogged");
      if (logged) logged.style.display = user ? "" : "none";
      // Ocultar tabs cuando hay sesión (en móvil queda “pegado” si se muestran)
      var tabsWrap = document.querySelector(".authTabs");
      if (tabsWrap) tabsWrap.style.display = user ? "none" : "";


      if (formLogin) formLogin.style.display = user ? "none" : "";
      if (formReg) formReg.style.display = "none";
      if (formRec) formRec.style.display = "none";

      if (tabLogin) tabLogin.classList.add("active");
      if (tabReg) tabReg.classList.remove("active");
      if (tabRec) tabRec.classList.remove("active");

      var name = byId("authUserName");
      if (name) name.textContent = user ? (user.email || user.id) : "";

      // extras: cashback + pedidos
      renderAccountExtras();
    }

    function renderAccountExtras(){
      if (!window.SUBZI || !SUBZI.core) return;
      var core = SUBZI.core;

      // Cashback
      var balEl = byId("cashUserBal");
      try{
        var st = core.loadCashback();
        var bal = core.cashbackBalance(st);
        if (balEl) balEl.textContent = String(bal);
      }catch(e){
        if (balEl) balEl.textContent = "0";
      }

      // Orders
      var listEl = byId("orderList");
      if (!listEl) return;
      listEl.innerHTML = "";

      var orders = [];
      try{ orders = core.loadOrders() || []; }catch(e){ orders = []; }

      if (!orders.length){
        listEl.innerHTML = '<div class="orderEmpty">Aún no hay pedidos.</div>';
        return;
      }

      for (var i=0;i<orders.length;i++){
        (function(order){
          var row = document.createElement("div");
          row.className = "orderItem";

          var status = order.status || "pending";
          var cb = order.cashbackToEarn ? order.cashbackToEarn : 0;

          row.innerHTML =
            '<div class="orderTop">' +
              '<b>Pedido ' + (order.id || "") + '</b>' +
              '<span class="orderStatus ' + (status === "confirmed" ? "ok" : "pend") + '">' + (status === "confirmed" ? "Confirmado" : "Pendiente") + '</span>' +
            '</div>' +
            '<div class="orderMeta">Subtotal: ' + (order.subtotal ? order.subtotal : 0) + ' · Cashback a acreditar: ' + (cb ? cb : 0) + '</div>' +
            (status === "pending"
              ? '<button class="btn ghost orderBtn" data-confirm="' + (order.id || "") + '" type="button">Confirmar pago</button>'
              : '<div class="orderOk">Cashback acreditado (si aplicaba).</div>'
            );

          listEl.appendChild(row);

          var btn = row.querySelector("[data-confirm]");
          if (btn){
            btn.addEventListener("click", function(){
              core.confirmOrder(order.id);
              core.toast("Pedido confirmado ✅ Cashback acreditado");
              renderAccountExtras();
              core.renderCart();
            });
          }
        })(orders[i]);
      }
    }

    function afterAuth(user){
      SUBZI.authUser = user || null;

      if (user && user.id){
        setCurrentUserId(user.id);
        setLabel("Hola, " + (user.email || "Usuario"));
        // traer estado desde la nube
        if (SUBZI.cloudSync && SUBZI.cloudSync.pullNow){
          SUBZI.cloudSync.pullNow().then(function(){
            if (window.SUBZI && SUBZI.core){
              SUBZI.core.renderCart();
            }
            renderAccountExtras();
          });
        } else {
          if (window.SUBZI && SUBZI.core) SUBZI.core.renderCart();
          renderAccountExtras();
        }
      } else {
        setCurrentUserId("guest");
        setLabel("Cuenta");
        if (window.SUBZI && SUBZI.core) SUBZI.core.renderCart();
      }

      showLoggedUI(user);
    }

    // Login
    if (formLogin){
      formLogin.addEventListener("submit", function(e){
        if (e) e.preventDefault();
        var email = (byId("loginEmail") ? byId("loginEmail").value : "").trim();
        var pass = (byId("loginPass") ? byId("loginPass").value : "");

        if (!email || !pass){
          showMsg("Completá email y contraseña.", false);
          return;
        }

        var client = sb();
        if (!client){
          showMsg("Falta configurar Supabase (config.js).", false);
          return;
        }

        client.auth.signInWithPassword({ email: email, password: pass }).then(function(res){
          if (res.error){
            showMsg(res.error.message || "No se pudo iniciar sesión.", false);
            return;
          }
          var user = res.data ? res.data.user : null;
          clearMsg();
          closeAuth();
          afterAuth(user);
          if (window.SUBZI && SUBZI.core) SUBZI.core.toast("Sesión iniciada ✅");
        });
      });
    }

    // Register
    if (formReg){
      formReg.addEventListener("submit", function(e){
        if (e) e.preventDefault();
        var first = (byId("regFirst") ? byId("regFirst").value : "").trim();
        var last = (byId("regLast") ? byId("regLast").value : "").trim();
        var email = (byId("regEmail") ? byId("regEmail").value : "").trim();
        var pass = (byId("regPass") ? byId("regPass").value : "");

        if (!first || !last || !email || !pass){
          showMsg("Completá nombre, apellido, email y contraseña.", false);
          return;
        }
        if (pass.length < 6){
          showMsg("La contraseña debe tener al menos 6 caracteres.", false);
          return;
        }

        var client = sb();
        if (!client){
          showMsg("Falta configurar Supabase (config.js).", false);
          return;
        }

        client.auth.signUp({
          email: email,
          password: pass,
          options: {
            data: { first_name: first, last_name: last },
            // Asegura que la confirmación vuelva a tu sitio (no a localhost)
            emailRedirectTo: (window.location.origin + '/index.html')
          }
        }).then(function(res){
          if (res.error){
            var m = (res.error.message || "").toString();
            var ml = m.toLowerCase();
            
// Rate limit (429): Supabase limita los emails de confirmación/recuperación
if ((res.error.status && String(res.error.status) === "429") || ml.includes("rate limit") || ml.includes("too many")){
  showMsg("Límite de emails alcanzado (Supabase). Para seguir: usá un email ya registrado e iniciá sesión, o desactivá temporalmente la confirmación por email en Supabase → Auth → Providers (solo para pruebas), o configurá SMTP / aumentá rate limits.", false);
  setTab("login");
  return;
}

// Supabase suele responder con textos tipo "User already registered" / "already exists"
            // Pediste: si el email ya está registrado, no permitir re-registro.
            if (ml.includes("already") && (ml.includes("registered") || ml.includes("exists") || ml.includes("exist"))){
              showMsg("Ese email ya está registrado. Iniciá sesión o usá \"Recuperar\" para cambiar la contraseña.", false);
              setTab("login");
              return;
            }
            if (ml.includes("email") && (ml.includes("registered") || ml.includes("exists"))){
              showMsg("Ese email ya está registrado. Iniciá sesión o usá \"Recuperar\".", false);
              setTab("login");
              return;
            }
            showMsg(m || "No se pudo registrar.", false);
            return;
          }

          // Si la confirmación por email está activa, puede venir sin sesión
          var user = res.data ? res.data.user : null;
          var session = res.data ? res.data.session : null;

          if (session && user){
            // Intentar guardar profile (si RLS lo permite)
            client.from("profiles").upsert({ id: user.id, email: email, first_name: first, last_name: last }, { onConflict: "id" }).then(function(){});
            clearMsg();
            closeAuth();
            afterAuth(user);
            if (window.SUBZI && SUBZI.core) SUBZI.core.toast("Cuenta creada ✅");
          } else {
            // Cuando la confirmación por email está activa, suele venir sin sesión.
            // Si por algún motivo no viene user/session (algunos setups devuelven éxito por seguridad),
            // avisamos que no se puede re-registrar si ya existe.
            if (!user && !session){
              showMsg("Si este email ya está registrado, no se puede crear otra cuenta. Iniciá sesión o usá \"Recuperar\". Si es nuevo, revisá tu email para confirmar.", true);
            } else {
              showMsg("Cuenta creada ✅ Revisá tu email para confirmar y luego iniciá sesión.", true);
            }
            setTab("login");
          }
        });
      });
    }

    // Recover
    if (formRec){
      formRec.addEventListener("submit", function(e){
        if (e) e.preventDefault();
        var email = (byId("recEmail") ? byId("recEmail").value : "").trim();
        if (!email){
          showMsg("Ingresá tu email.", false);
          return;
        }
        var client = sb();
        if (!client){
          showMsg("Falta configurar Supabase (config.js).", false);
          return;
        }
        var cfg = (window.SUBZI && SUBZI.supabaseConfig) ? SUBZI.supabaseConfig : {};
        var redirectTo = (cfg.redirectTo || "").trim();

        client.auth.resetPasswordForEmail(email, redirectTo ? { redirectTo: redirectTo } : {}).then(function(res){
          if (res.error){
  var m = (res.error.message || "").toString();
  var ml = m.toLowerCase();
  if ((res.error.status && String(res.error.status) === "429") || ml.includes("rate limit") || ml.includes("too many")){
    showMsg("Límite de emails alcanzado (Supabase). Evitá pedir varios enlaces seguidos. Para pruebas podés desactivar confirmación por email o configurar SMTP / rate limits en Supabase.", false);
    return;
  }
  showMsg(m || "No se pudo enviar el email.", false);
  return;
}
          showMsg("Listo ✅ Te enviamos un enlace al email.", true);
        });
      });
    }

    // Logout
    var btnLogout = byId("btnLogout");
    if (btnLogout){
      btnLogout.addEventListener("click", function(){
        var client = sb();
        if (!client){
          // modo guest
          SUBZI.authUser = null;
          setCurrentUserId("guest");
          setLabel("Cuenta");
          showLoggedUI(null);
          closeAuth();
          if (window.SUBZI && SUBZI.core) SUBZI.core.toast("Sesión cerrada ✅");
          return;
        }

        client.auth.signOut().then(function(){
          SUBZI.authUser = null;
          setCurrentUserId("guest");
          setLabel("Cuenta");
          showLoggedUI(null);
          closeAuth();
          if (window.SUBZI && SUBZI.core) SUBZI.core.toast("Sesión cerrada ✅");
        });
      });
    }

    // Expose
    SUBZI._auth = { afterAuth: afterAuth, showLoggedUI: showLoggedUI, renderAccountExtras: renderAccountExtras };
  }

  function openAuth(){
    ensureAuthModal();
    var wrap = byId("authOverlay");
    if (wrap) wrap.classList.add("show");
  }

  function closeAuth(){
    var wrap = byId("authOverlay");
    if (wrap) wrap.classList.remove("show");
  }

  // Bind account button
  var btnUser = byId("btnUser");
  if (btnUser){
    btnUser.addEventListener("click", function(){
      closeMenu();
      openAuth();
    });
  }

  // Init auth state
  function initAuth(){
    var client = sb();
    if (!client){
      setLabel("Cuenta");
      return;
    }

    client.auth.getSession().then(function(res){
      var session = res && res.data ? res.data.session : null;
      var user = session ? session.user : null;
      if (user){
        SUBZI.authUser = user;
        setCurrentUserId(user.id);
        setLabel("Hola, " + (user.email || "Usuario"));
        if (SUBZI.cloudSync && SUBZI.cloudSync.pullNow){
          SUBZI.cloudSync.pullNow().then(function(){
            if (SUBZI.core) SUBZI.core.renderCart();
          });
        } else {
          if (SUBZI.core) SUBZI.core.renderCart();
        }
      } else {
        setLabel("Cuenta");
      }
    });

    // Listen auth changes
    client.auth.onAuthStateChange(function(event, session){
      var user = session ? session.user : null;
      if (SUBZI._auth && SUBZI._auth.afterAuth) SUBZI._auth.afterAuth(user);
    });
  }

  // ===== Si core existe, inicializamos el resto =====
  function initCoreBits(){
    if (!window.SUBZI || !SUBZI.core) return;
    var core = SUBZI.core;

    // WhatsApp
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
  }


  // ===== Header fijo: evitar que tape el contenido (offset dinámico) =====
  function initMotionFX(){
    var cards = document.querySelectorAll("[data-tilt]");
    var finePointer = false;
    try{ finePointer = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches; }catch(e){}

    for (var i = 0; i < cards.length; i++){
      (function(card){
        if (!card || card.getAttribute("data-tilt-bound") === "1") return;
        card.setAttribute("data-tilt-bound", "1");

        if (finePointer){
          card.addEventListener("pointermove", function(e){
            var r = card.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width;
            var py = (e.clientY - r.top) / r.height;
            var rx = (0.5 - py) * 8;
            var ry = (px - 0.5) * 10;
            card.style.setProperty("--tilt-x", rx.toFixed(2) + "deg");
            card.style.setProperty("--tilt-y", ry.toFixed(2) + "deg");
            card.style.setProperty("--spot-x", (px * 100).toFixed(2) + "%");
            card.style.setProperty("--spot-y", (py * 100).toFixed(2) + "%");
          });
          card.addEventListener("pointerleave", function(){
            card.style.removeProperty("--tilt-x");
            card.style.removeProperty("--tilt-y");
            card.style.removeProperty("--spot-x");
            card.style.removeProperty("--spot-y");
          });
        }
      })(cards[i]);
    }

    var revealNodes = document.querySelectorAll(".reveal");
    for (var j = 0; j < revealNodes.length; j++){
      revealNodes[j].style.setProperty("--reveal-delay", ((j % 8) * 0.05).toFixed(2) + "s");
    }

    var hero = document.querySelector(".heroMain");
    if (hero && hero.getAttribute("data-parallax-bound") !== "1" && finePointer){
      hero.setAttribute("data-parallax-bound", "1");
      hero.addEventListener("pointermove", function(e){
        var r = hero.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        hero.style.setProperty("--hero-x", ((px - 0.5) * 18).toFixed(2) + "px");
        hero.style.setProperty("--hero-y", ((py - 0.5) * 18).toFixed(2) + "px");
      });
      hero.addEventListener("pointerleave", function(){
        hero.style.removeProperty("--hero-x");
        hero.style.removeProperty("--hero-y");
      });
    }
  }

  function syncHeaderOffset(){
    var header = document.querySelector("header");
    if (!header) return;
    // altura real del header (incluye safe-area si aplica)
    var h = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty("--header-h", h + "px");
  }

  // Run init
  document.addEventListener("DOMContentLoaded", function(){
    try{ ensurePageTabs(); }catch(e){}
    try{ ensureFooterLayout(); }catch(e){}
    try{ ensureUtilityShell(); }catch(e){}
    // Menú limpio: no inyectar la banda horizontal de stock en el desplegable.
    // (El stock queda visible en la página de Steam Keys.)
    // try{ ensureSteamMenuStock(); }catch(e){}
    try{ ensureSteamPageStockRail(); }catch(e){}

    try{ syncHeaderOffset(); }catch(e){}
    window.addEventListener("resize", function(){ try{ syncHeaderOffset(); }catch(e){} });
    window.addEventListener("orientationchange", function(){ try{ syncHeaderOffset(); }catch(e){} });
    setTimeout(function(){ try{ syncHeaderOffset(); }catch(e){} }, 200);
    setTimeout(function(){ try{ syncHeaderOffset(); }catch(e){} }, 900);

    initAuth();
    initCoreBits();

    try{
      var promoBtn = byId("btnPromoWhatsApp");
      if (promoBtn && window.SUBZI && SUBZI.core){
        promoBtn.addEventListener("click", function(){ SUBZI.core.openWhatsApp(false); });
      }
    }catch(e){}

    try{ if (shouldShowStartupPopup()) showStartupPopup(); }catch(e){}
    try{ initMotionFX(); }catch(e){}

    try{
      var y = byId("year");
      if (y) y.textContent = String(new Date().getFullYear());
    }catch(e){}
  });

})();
