/**
 * Página de categoría: renderiza productos según body[data-category]
 * Layout tipo "tarjeta semicuadrada" con animación hover (estilo store).
 */
(function(){
  if (!window.SUBZI || !SUBZI.core) return;

  var core = SUBZI.core;
  var products = SUBZI.products || [];
  var categoryImages = SUBZI.categoryImages || {};

  function byId(id){ return document.getElementById(id); }

  function getImg(p){
    return p.image || categoryImages[p.category] || categoryImages.games || categoryImages.chatgpt || "";
  }

  function renderIconHTML(icon){
    if (!icon) return "";
    // si parece una ruta de imagen
    if (icon.indexOf("/") !== -1 || icon.indexOf(".") !== -1){
      return '<div class="pIconBadge"><img alt="" src="' + core.escapeHtml(icon) + '" /></div>';
    }
    return '<div class="pIconBadge">' + core.escapeHtml(icon) + '</div>';
  }

  function isInside(el, className){
    // busca hacia arriba si el target está dentro de un elemento con esa clase
    while (el){
      if (el.classList && el.classList.contains(className)) return true;
      el = el.parentNode;
    }
    return false;
  }

  function render(){
    var body = document.body;
    var cat = body ? body.getAttribute("data-category") : null;
    var grid = byId("categoryGrid");
    if (!grid || !cat) return;

    grid.innerHTML = "";

    for (var i=0;i<products.length;i++){
      var p = products[i];
      if (!p || p.category !== cat) continue;

      var card = document.createElement("article");
      card.className = "pTile reveal";
      card.setAttribute("data-open", p.id);

      var imgSrc = getImg(p);

      card.innerHTML =
        '<div class="pCover">' +
          renderIconHTML(p.icon) +
          '<img loading="lazy" alt="' + core.escapeHtml(p.name) + '" src="' + core.escapeHtml(imgSrc) + '" />' +
          '<div class="pActions pAct">' +
            '<button class="pBtn primary" data-add="' + core.escapeHtml(p.id) + '">Añadir al cesto</button>' +
            '<button class="pBtn ghost" data-view="' + core.escapeHtml(p.id) + '">Explorar</button>' +
          '</div>' +
        '</div>' +
        '<div class="pMeta">' +
          '<div class="pTopRow">' +
            '<span class="pBadge">' + core.escapeHtml(p.badge) + '</span>' +
            '<span class="pPrice">' + core.money(p.price, p.currency) + '</span>' +
          '</div>' +
          '<h3 class="pTitle">' + core.escapeHtml(p.name) + '</h3>' +
          '<p class="pDesc">' + core.escapeHtml(p.desc) + '</p>' +
        '</div>';

      grid.appendChild(card);
    }

    // Add
    var adds = grid.querySelectorAll("[data-add]");
    for (var j=0;j<adds.length;j++){
      adds[j].addEventListener("click", function(e){
        if (e) e.stopPropagation();
        var id = this.getAttribute("data-add");
        core.addToCart(id, {open:true});
        core.renderCart();
      });
    }

    // View
    var views = grid.querySelectorAll("[data-view]");
    for (var k=0;k<views.length;k++){
      views[k].addEventListener("click", function(e){
        if (e) e.stopPropagation();
        var id2 = this.getAttribute("data-view");
        window.location.href = "./product.html?id=" + encodeURIComponent(id2);
      });
    }

    // Card click open
    var opens = grid.querySelectorAll("[data-open]");
    for (var t=0;t<opens.length;t++){
      opens[t].addEventListener("click", function(e){
        var target = e ? e.target : null;
        if (target && (target.tagName === "BUTTON" || isInside(target, "pAct"))) return;
        var id3 = this.getAttribute("data-open");
        window.location.href = "./product.html?id=" + encodeURIComponent(id3);
      });
    }

    core.setupReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();

})();