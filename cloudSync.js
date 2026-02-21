// Sincronización a Supabase (carrito, cashback, pedidos) por usuario
window.SUBZI = window.SUBZI || {};

(function(){
  var timer = null;

  function getSB(){ return (window.SUBZI && SUBZI.supabase) ? SUBZI.supabase : null; }

  function safeJSONParse(s, fallback){
    try{ return JSON.parse(s); }catch(e){ return fallback; }
  }

  function key(prefix, userId){ return prefix + "__" + userId; }

  function getUserId(){
    try{
      if (SUBZI.authUser && SUBZI.authUser.id) return String(SUBZI.authUser.id);
    }catch(e){}
    try{
      var sb = getSB();
      if (!sb) return null;
    }catch(e){}
    return null;
  }

  function readLocalState(userId){
    var cart = safeJSONParse(localStorage.getItem(key("subzi_cart", userId)) || "[]", []);
    var discount = safeJSONParse(localStorage.getItem(key("subzi_discount", userId)) || "null", null);
    var cashback = safeJSONParse(localStorage.getItem(key("subzi_cashback", userId)) || "null", null);
    var useCb = safeJSONParse(localStorage.getItem(key("subzi_usecashback", userId)) || "false", false) === true;
    var orders = safeJSONParse(localStorage.getItem(key("subzi_orders", userId)) || "[]", []);
    return { cart: cart, discount: discount, cashback: cashback, use_cashback: useCb, orders: orders };
  }

  function writeLocalState(userId, state){
    try{
      if (state.cart != null) localStorage.setItem(key("subzi_cart", userId), JSON.stringify(state.cart));
      if (state.discount !== undefined) localStorage.setItem(key("subzi_discount", userId), JSON.stringify(state.discount));
      if (state.cashback !== undefined) localStorage.setItem(key("subzi_cashback", userId), JSON.stringify(state.cashback));
      if (state.use_cashback !== undefined) localStorage.setItem(key("subzi_usecashback", userId), JSON.stringify(!!state.use_cashback));
      if (state.orders != null) localStorage.setItem(key("subzi_orders", userId), JSON.stringify(state.orders));
    }catch(e){}
  }

  function schedulePush(){
    if (timer) clearTimeout(timer);
    timer = setTimeout(pushNow, 700);
  }

  function pushNow(){
    timer = null;
    var sb = getSB();
    if (!sb) return;

    var userId = getUserId();
    if (!userId) return;

    var st = readLocalState(userId);

    sb.from("user_state")
      .upsert({
        user_id: userId,
        cart: st.cart,
        discount: st.discount,
        cashback: st.cashback,
        use_cashback: st.use_cashback,
        orders: st.orders,
        updated_at: new Date().toISOString()
      }, { onConflict: "user_id" })
      .then(function(res){
        // silent
      });
  }

  function pullNow(){
    var sb = getSB();
    if (!sb) return Promise.resolve(false);

    // ensure we have user
    return sb.auth.getUser().then(function(r){
      var user = r && r.data ? r.data.user : null;
      if (!user) return false;
      SUBZI.authUser = user;
      try{ localStorage.setItem("subzi_current_user", user.id); }catch(e){}

      return sb.from("user_state").select("*").eq("user_id", user.id).maybeSingle()
        .then(function(res){
          if (res && res.data){
            writeLocalState(user.id, res.data);
            return true;
          }

          // if no row yet, create from current local state
          var st = readLocalState(user.id);
          return sb.from("user_state")
            .upsert({
              user_id: user.id,
              cart: st.cart,
              discount: st.discount,
              cashback: st.cashback,
              use_cashback: st.use_cashback,
              orders: st.orders,
              updated_at: new Date().toISOString()
            }, { onConflict: "user_id" })
            .then(function(){ return true; });
        });
    });
  }

  SUBZI.cloudSync = {
    schedulePush: schedulePush,
    pushNow: pushNow,
    pullNow: pullNow
  };
})();
