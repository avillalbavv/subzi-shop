/**
 * Página de categoría: renderiza productos según body[data-category]
 */
(function(){
  if (!window.SUBZI || !SUBZI.core) return;

  var core = SUBZI.core;
  var products = SUBZI.products || [];
  var categoryImages = SUBZI.categoryImages || {};

  function byId(id){ return document.getElementById(id); }

  function render(){
    var body = document.body;
    var cat = body ? body.getAttribute("data-category") : null;
    var grid = byId("categoryGrid");
    if (!grid || !cat) return;

    grid.innerHTML = "";

    for (var i=0;i<products.length;i++){
      var p = products[i];
      if (!p || p.category !== cat) continue;

      var card = document.createElement("div");
      card.className = "product reveal";

      var imgSrc = p.image || categoryImages[p.category] || categoryImages.streaming;

      var featuresHtml = "";
      var feats = p.features || [];
      for (var f=0; f<feats.length; f++){
        featuresHtml += "<li>" + core.escapeHtml(feats[f]) + "</li>";
      }

      card.innerHTML =
        '<div class="pimg"><img loading="lazy" alt="' + core.escapeHtml(p.name) + '" src="' + core.escapeHtml(imgSrc) + '" /></div>' +
        '<div class="pill">' + core.escapeHtml(p.badge) + "</div>" +
        '<div class="titleRow">' +
          "<div>" +
            '<h3 class="clickable" data-view="' + core.escapeHtml(p.id) + '">' + core.escapeHtml(p.name) + "</h3>" +
            '<p class="desc">' + core.escapeHtml(p.desc) + "</p>" +
          "</div>" +
          '<div class="price">' + core.money(p.price, p.currency) + "</div>" +
        "</div>" +
        '<ul class="features">' + featuresHtml + "</ul>" +
        '<div class="actions">' +
          '<button class="smallBtn" data-view="' + core.escapeHtml(p.id) + '">Ver info</button>' +
          '<button class="smallBtn add" data-add="' + core.escapeHtml(p.id) + '">Agregar</button>' +
        "</div>";

      grid.appendChild(card);
    }

    // Events
    var adds = grid.querySelectorAll("[data-add]");
    for (var j=0;j<adds.length;j++){
      adds[j].addEventListener("click", function(){
        var id = this.getAttribute("data-add");
        core.addToCart(id, {open:true});
        core.renderCart();
      });
    }

    var views = grid.querySelectorAll("[data-view]");
    for (var k=0;k<views.length;k++){
      views[k].addEventListener("click", function(){
        var id2 = this.getAttribute("data-view");
        window.location.href = "./product.html?id=" + encodeURIComponent(id2);
      });
    }

    core.setupReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();

})();
