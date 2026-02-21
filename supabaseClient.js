// Inicializa Supabase (cliente)
window.SUBZI = window.SUBZI || {};

(function(){
  try{
    var cfg = SUBZI.supabaseConfig || {};
    var url = (cfg.url || "").trim();
    var key = (cfg.anonKey || "").trim();

    if (!url || !key || url.indexOf("PASTE_") === 0 || key.indexOf("PASTE_") === 0){
      SUBZI.supabase = null;
      return;
    }

    if (window.supabase && typeof window.supabase.createClient === "function"){
      SUBZI.supabase = window.supabase.createClient(url, key);
    } else {
      SUBZI.supabase = null;
    }
  }catch(e){
    SUBZI.supabase = null;
  }
})();
