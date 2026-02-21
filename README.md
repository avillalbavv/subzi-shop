# SubZi Shop (con backend gratis - Supabase)

## Qué se agregó
- Login/Registro/Recuperación de contraseña por email (Supabase Auth)
- Sincronización a la nube (por usuario): carrito, cashback, pedidos

## 1) Crear proyecto en Supabase
1. Crear un proyecto en Supabase
2. Ir a **SQL Editor** y ejecutar el archivo `supabase.sql`
3. Ir a **Project Settings → API** y copiar:
   - `Project URL`
   - `anon public key`

## 2) Configurar el sitio
Abrí `config.js` y pegá tus credenciales:

```js
SUBZI.supabaseConfig = {
  url: "https://xxxxx.supabase.co",
  anonKey: "xxxx",
  redirectTo: "https://subzi.me/reset.html"
};
```

## 3) Configurar redirect URL (reset password)
En Supabase: **Auth → URL Configuration → Redirect URLs**
Agregá:
- `https://subzi.me/reset.html` (o tu dominio real)

## 4) Nota sobre emails gratis
El email sender por defecto de Supabase es para pruebas y suele tener límites.
Para producción, configurá SMTP propio.

## Páginas
- `index.html` (inicio)
- `chatgpt.html` (categoría)
- `games.html` (categoría)
- `product.html?id=<ID>` (detalle)
- `cashback.html` (normas)
- `reset.html` (recuperación de contraseña)

## Caché
Si subís nuevas versiones al hosting, probá en incógnito o con Ctrl+F5.
