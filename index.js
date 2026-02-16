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
    "streaming": "./streaming.html",
    "descuentos": "./descuentos.html",
    "chatgpt": "./chatgpt.html",
    "steam": "./steam.html",
    "edicion": "./edicion.html"
  };
  if (h && map[h]){
    // mantenemos historial limpio
    window.location.replace(map[h]);
    return;
  }

  // Nada más por ahora (inicio intencionalmente limpio)
})();
