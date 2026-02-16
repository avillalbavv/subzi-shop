# SubZi - Sitio (v14)

## Estructura (como tienda real)
- `index.html` = Inicio limpio (solo lo esencial + categorías)
- Páginas por categoría:
  - `streaming.html`
  - `descuentos.html`
  - `chatgpt.html`
  - `steam.html`
  - `edicion.html`
- Detalle por producto:
  - `product.html?id=<ID>`

## Cesto + WhatsApp
- El cesto funciona en **todas** las páginas (mismo localStorage).
- Checkout arma el mensaje y abre WhatsApp.

## Editar contenido
- `data.js`:
  - `SUBZI.WHATSAPP_NUMBER`
  - `SUBZI.products` (productos, imágenes, detalles)

## Deploy
Subí **todos** los archivos al mismo nivel (raíz del hosting).
