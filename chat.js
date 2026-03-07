/**
 * Chatbot SubZi (quick replies + input)
 * Categorías: ChatGPT + Juegos + Steam Keys
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

  function goPage(url){
    window.location.href = url;
  }

  function answerQuick(key){
    addChatMsg(key, "me");

    if (key === "Hablar"){
      addChatMsg("Dale, abrimos WhatsApp para atenderte.", "bot");
      core.openWhatsApp(false);
      return;
    }

    if (key === "ChatGPT"){
      addChatMsg("Perfecto 🤖 Te llevo a suscripciones de ChatGPT.", "bot");
      goPage("./chatgpt.html");
      return;
    }

    if (key === "Juegos"){
      addChatMsg("Genial 🎮 Te llevo a Juegos.", "bot");
      goPage("./games.html");
      return;
    }

    if (key === "Steam Keys"){
      addChatMsg("Vamos 🔑 Te llevo a Steam Keys.", "bot");
      goPage("./steam.html");
      return;
    }

    if (key === "Precios"){
      addChatMsg("Los precios dependen de disponibilidad. Decime qué suscripción, juego o Steam Key querés y te cotizo por WhatsApp.", "bot");
      return;
    }

    addChatMsg("Decime si querés ChatGPT, Juegos o Steam Keys. También podés escribir el nombre del juego.", "bot");
  }

  function handleChatInput(text){
    var t = String(text || "").trim();
    if (!t) return;
    addChatMsg(t, "me");

    var low = t.toLowerCase();

    if (low.indexOf("whatsapp") !== -1 || low.indexOf("wpp") !== -1 || low.indexOf("wasap") !== -1){
      addChatMsg("Perfecto, abro WhatsApp 👇", "bot");
      core.openWhatsApp(false);
      return;
    }

    if (low.indexOf("chatgpt") !== -1 || low.indexOf("plus") !== -1 || low.indexOf("pro") !== -1){
      addChatMsg("Dale 🤖 Te llevo a ChatGPT.", "bot");
      goPage("./chatgpt.html");
      return;
    }

    if (low.indexOf("god") !== -1 || low.indexOf("gow") !== -1){
      addChatMsg("Dale ✅ Te abro God of War (2018).", "bot");
      goPage("./product.html?id=god-of-war-2018");
      return;
    }

    if (low.indexOf("silent") !== -1 || low.indexOf("hill") !== -1){
      addChatMsg("Dale ✅ Te abro Silent Hill f.", "bot");
      goPage("./product.html?id=silent-hill-f");
      return;
    }

    if (low.indexOf("steam") !== -1 || low.indexOf("key") !== -1 || low.indexOf("keys") !== -1){
      addChatMsg("Vamos 🔑 Te llevo a Steam Keys.", "bot");
      goPage("./steam.html");
      return;
    }

    if (low.indexOf("juego") !== -1 || low.indexOf("games") !== -1){
      addChatMsg("Genial 🎮 Te llevo a Juegos.", "bot");
      goPage("./games.html");
      return;
    }

    if (low.indexOf("precio") !== -1 || low.indexOf("cuanto") !== -1 || low.indexOf("cuánto") !== -1){
      addChatMsg("Decime qué suscripción, juego o Steam Key querés y te cotizo por WhatsApp.", "bot");
      return;
    }

    addChatMsg("Decime si querés ChatGPT, Juegos o Steam Keys. También podés escribir: God of War, Silent Hill o F1.", "bot");
  }

  document.addEventListener("DOMContentLoaded", function(){
    var chatPanel = byId("chatPanel");
    var fab = byId("chatFab");
    if (!chatPanel || !fab) return;

    fab.addEventListener("click", function(){
      chatPanel.classList.toggle("show");
      if (chatPanel.classList.contains("show") && byId("chatBody") && byId("chatBody").children.length === 0){
        addChatMsg("Hola 👋 Soy el asistente de SubZi.", "bot");
        addChatMsg("Escribime o tocá una opción rápida.", "bot");
      }
      var inp = byId("chatInput");
      if (chatPanel.classList.contains("show") && inp) inp.focus();
    });

    var closeBtn = byId("chatClose");
    if (closeBtn) closeBtn.addEventListener("click", function(){ chatPanel.classList.remove("show"); });

    var qs = document.querySelectorAll("[data-q]");
    for (var i=0;i<qs.length;i++){
      qs[i].addEventListener("click", function(){ answerQuick(this.getAttribute("data-q")); });
    }

    var chatInput = byId("chatInput");
    var chatSend = byId("chatSend");
    function send(){
      var v = (chatInput && chatInput.value) ? String(chatInput.value).trim() : "";
      if (!v) return;
      if (chatInput) chatInput.value = "";
      handleChatInput(v);
    }
    if (chatSend) chatSend.addEventListener("click", send);
    if (chatInput){
      chatInput.addEventListener("keydown", function(e){
        if (e && e.key === "Enter") send();
      });
    }
  });
})();