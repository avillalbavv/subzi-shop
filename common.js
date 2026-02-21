/**
 * Inicialización común (menu, cuenta Supabase, cesto, WhatsApp, cupones, reveal).
 * Mantiene modo "guest" si Supabase no está configurado.
 */
(function(){
  function byId(id){ return document.getElementById(id); }

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
              '<a class="soc" href="./cashback.html" target="_blank" rel="noopener">Ver normas</a>' +
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
          options: { data: { first_name: first, last_name: last } }
        }).then(function(res){
          if (res.error){
            showMsg(res.error.message || "No se pudo registrar.", false);
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
            showMsg("Cuenta creada ✅ Revisá tu email para confirmar y luego iniciá sesión.", true);
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
            showMsg(res.error.message || "No se pudo enviar el email.", false);
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

  // Run init
  document.addEventListener("DOMContentLoaded", function(){
    initAuth();
    initCoreBits();

    // Año
    try{
      var y = byId("year");
      if (y) y.textContent = String(new Date().getFullYear());
    }catch(e){}
  });

})();
