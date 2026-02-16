/**
 * Chatbot SubZi (quick replies + input) - ES5
 */
(function(){
  if (!window.SUBZI || !SUBZI.core) return;

  var core = SUBZI.core;

  function byId(id){ return document.getElementById(id); }

  function addChatMsg(text, who){
    who = who || "bot";
    var body = byId("chatBody");
    if (!body) return;
    var bubble = document.createElement("div");
    bubble.className = "msg " + who;
    bubble.textContent = text;
    body.appendChild(bubble);
    body.scrollTop = body.scrollHeight;
  }

  function goPage(page){
    window.location.href = page;
  }

  function answerQuick(key){
    addChatMsg(key, "me");

    var map = {
      "Precios": "Los precios dependen del servicio y disponibilidad. Decime cuál te interesa y te paso el valor.",
      "Descuentos": "Tenemos combos y cupones. ¿Querés un combo de 2 o 3 servicios?",
      "Streaming": "Perfecto: te llevo a Streaming. Elegí el servicio y agregalo al cesto.",
      "IA": "Te llevo a ChatGPT/IA. Decime qué necesitás (estudio, trabajo, diseño) y lo vemos.",
      "Steam": "Te llevo a Steam. Pedime juego o carga y te cotizo.",
      "Edición": "Te llevo a Edición. Decime si es video, foto o diseño.",
      "Hablar": "Dale, abrimos WhatsApp para atenderte.",
    };

    if (key === "Hablar"){
      addChatMsg(map[key], "bot");
      core.openWhatsApp(false);
      return;
    }

    addChatMsg(map[key] || "Perfecto. ¿Qué servicio querés?", "bot");

    if (key === "Streaming") goPage("./streaming.html");
    if (key === "Descuentos") goPage("./descuentos.html");
    if (key === "IA") goPage("./chatgpt.html");
    if (key === "Steam") goPage("./steam.html");
    if (key === "Edición") goPage("./edicion.html");
  }

  function handleChatInput(text){
    var t = String(text || "").trim();
    if (!t) return;
    addChatMsg(t, "me");

    var low = t.toLowerCase();

    if (low.indexOf("whatsapp") >= 0 || low.indexOf("wpp") >= 0 || low.indexOf("wasap") >= 0){
      addChatMsg("Perfecto, abro WhatsApp 👇", "bot");
      core.openWhatsApp(false);
      return;
    }

    if (low.indexOf("netflix") >= 0){
      addChatMsg("Dale ✅ Te abro el detalle de Netflix.", "bot");
      window.location.href = "./product.html?id=netflix-premium";
      return;
    }

    if (low.indexOf("chatgpt") >= 0 || low.indexOf("ia") >= 0 || low.indexOf("inteligencia") >= 0){
      addChatMsg("Dale ✅ Te llevo a ChatGPT/IA.", "bot");
      goPage("./chatgpt.html");
      return;
    }

    if (low.indexOf("steam") >= 0 || low.indexOf("wallet") >= 0 || low.indexOf("juego") >= 0){
      addChatMsg("Genial 🎮 Te llevo a Steam.", "bot");
      goPage("./steam.html");
      return;
    }

    if (low.indexOf("capcut") >= 0 || low.indexOf("canva") >= 0 || low.indexOf("adobe") >= 0 || low.indexOf("edicion") >= 0 || low.indexOf("edición") >= 0){
      addChatMsg("Perfecto 🎬 Te llevo a Edición.", "bot");
      goPage("./edicion.html");
      return;
    }

    if (low.indexOf("descuento") >= 0 || low.indexOf("cupon") >= 0 || low.indexOf("cupón") >= 0 || low.indexOf("combo") >= 0){
      addChatMsg("Buenísimo 🏷️ Te llevo a Descuentos.", "bot");
      goPage("./descuentos.html");
      return;
    }

    if (low.indexOf("spotify") >= 0 || low.indexOf("disney") >= 0 || low.indexOf("paramount") >= 0 || low.indexOf("max") >= 0 || low.indexOf("hbo") >= 0 || low.indexOf("stream") >= 0){
      addChatMsg("Dale 📺 Te llevo a Streaming.", "bot");
      goPage("./streaming.html");
      return;
    }

    addChatMsg("Decime qué buscás (Streaming / ChatGPT/IA / Steam / Edición) o tocá una opción rápida 👇", "bot");
  }

  function init(){
    var chatPanel = byId("chatPanel");
    var fab = byId("chatFab");
    if (!chatPanel || !fab) return;

    fab.addEventListener("click", function(){
      if (chatPanel.classList.contains("show")) chatPanel.classList.remove("show");
      else chatPanel.classList.add("show");

      var body = byId("chatBody");
      if (chatPanel.classList.contains("show") && body && body.children && body.children.length === 0){
        addChatMsg("Hola 👋 Soy el asistente de SubZi.", "bot");
        addChatMsg("Escribime o tocá una opción rápida.", "bot");
      }
      if (chatPanel.classList.contains("show")){
        var inp = byId("chatInput");
        if (inp) inp.focus();
      }
    });

    var close = byId("chatClose");
    if (close) close.addEventListener("click", function(){ chatPanel.classList.remove("show"); });

    var quick = document.querySelectorAll("[data-q]");
    for (var i=0;i<quick.length;i++){
      quick[i].addEventListener("click", function(){
        answerQuick(this.getAttribute("data-q"));
      });
    }

    var input = byId("chatInput");
    var send = byId("chatSend");
    function doSend(){
      var v = input ? String(input.value || "").trim() : "";
      if (!v) return;
      if (input) input.value = "";
      handleChatInput(v);
    }
    if (send) send.addEventListener("click", doSend);
    if (input) input.addEventListener("keydown", function(e){
      if (e && e.key === "Enter") doSend();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

})();
