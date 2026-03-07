/**
 * Index (inicio limpio).
 * Nota: las tarjetas de categorías ya están en HTML como fallback.
 */
(function(){
  if (!window.SUBZI || !SUBZI.core) return;
  var core = SUBZI.core;

  // Si el usuario viene con hash, lo redirigimos a la página correcta.
  // Ej: /index.html#streaming => /streaming.html
  var h = (window.location.hash || "").replace("#","");
  var map = {
    "chatgpt": "./chatgpt.html",
    "games": "./games.html",
    "steam": "./steam.html",
    "streaming": "./streaming.html",
    "descuentos": "./descuentos.html"
  };
  if (h && map[h]){
    // mantenemos historial limpio
    window.location.replace(map[h]);
    return;
  }

  var steamBtn = document.getElementById("btnWhatsAppSteamBand");
  if (steamBtn){
    steamBtn.addEventListener("click", function(){
      SUBZI.core.openWhatsApp(false);
    });
  }

  var streamingBtn = document.getElementById("btnWhatsAppStreamingBand");
  if (streamingBtn){
    streamingBtn.addEventListener("click", function(){
      SUBZI.core.openWhatsApp(false);
    });
  }

  // Popup inicial manejado desde common.js

})();