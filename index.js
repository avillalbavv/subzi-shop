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
    "games": "./games.html"
  };
  if (h && map[h]){
    // mantenemos historial limpio
    window.location.replace(map[h]);
    return;
  }

  // Nada más por ahora (inicio intencionalmente limpio)

  // Popup "Cómo comprar" (5s) al inicio
  try{
    var pop = document.getElementById("howPopup");
    if (pop){
      pop.style.display = "";
      var t = setTimeout(function(){ pop.style.display = "none"; }, 5000);
      pop.addEventListener("click", function(){
        clearTimeout(t);
        pop.style.display = "none";
      });
    }
  }catch(e){}

})();