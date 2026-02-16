/**
 * SubZi - Product page (detalle)
 */
(function(){
  if (!window.SUBZI || !SUBZI.core) return;

  var core = SUBZI.core;
  var products = SUBZI.products || [];
  var categoryImages = SUBZI.categoryImages || {};

  function getParam(name){
    var url = String(window.location.href || "");
    var q = url.split("?")[1] || "";
    var parts = q.split("&");
    for (var i=0;i<parts.length;i++){
      var kv = parts[i].split("=");
      if (decodeURIComponent(kv[0] || "") === name) return decodeURIComponent(kv[1] || "");
    }
    return null;
  }

  function byId(id){ return document.getElementById(id); }

  function render(){
    var id = getParam("id");
    var p = null;
    for (var i=0;i<products.length;i++){
      if (products[i] && products[i].id === id){ p = products[i]; break; }
    }
    if (!p) p = products[0];
    if (!p) return;

    var imgSrc = p.image || categoryImages[p.category] || categoryImages.streaming;
    var imgEl = byId("detailImg");
    if (imgEl) imgEl.src = imgSrc;

    var t = byId("detailTitle");
    if (t) t.textContent = p.name;

    var d = byId("detailDesc");
    if (d) d.textContent = p.desc;

    var b = byId("detailBadge");
    if (b) b.textContent = p.badge;

    var plan = byId("detailPlan");
    if (plan) plan.textContent = (p.details && p.details.plan) ? p.details.plan : "A definir.";

    var pay = byId("detailPay");
    if (pay) pay.textContent = (p.details && p.details.pagos) ? p.details.pagos : "A definir.";

    var how = byId("detailHow");
    if (how) how.textContent = (p.details && p.details.how) ? p.details.how : "A definir.";

    var list = byId("detailFeatures");
    if (list){
      list.innerHTML = "";
      var feats = p.features || [];
      for (var f=0; f<feats.length; f++){
        var li = document.createElement("li");
        li.textContent = feats[f];
        list.appendChild(li);
      }
    }

    var addBtn = byId("btnAddDetail");
    if (addBtn){
      addBtn.addEventListener("click", function(){
        core.addToCart(p.id, {open:true});
        core.renderCart();
      });
    }

    var waBtn = byId("btnWhatsDetail");
    if (waBtn){
      waBtn.addEventListener("click", function(){
        core.openWhatsAppForProduct(p.id);
      });
    }

    core.setupReveal();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", render);
  else render();

})();
