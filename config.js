// Configuración Supabase (backend gratis - Auth + DB)
window.SUBZI = window.SUBZI || {};

// ✅ Tus credenciales (cliente) — estas keys son "anon/publishable" y funcionan con RLS.
// Recomendación: NO expongas service_role en el frontend.
SUBZI.supabaseConfig = {
  url: "https://iccoxctlevuvwafpyzos.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljY294Y3RsZXZ1dndhZnB5em9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE2MzkyNTAsImV4cCI6MjA4NzIxNTI1MH0.dDJVfDoiaYsMOMv7vEGG1QgdkktSys7jQNELDANX0U8",

  // Importante: agregá estas URLs en Supabase → Auth → URL Configuration → Redirect URLs
  // Opcional (recomendado): URL para confirmación de registro (si tenés confirmación por email activa)
  // emailRedirectTo: "https://subzi-shop.pages.dev/index.html",
  // Si tu web final es subzi.me:
  // redirectTo: "https://subzi.me/reset.html",

  // ✅ Opcional: si querés forzar a dónde vuelve el usuario al confirmar registro por email
  // (tiene que estar en Redirect URLs)
  // emailRedirectTo: "https://subzi.me/index.html",
  // Si estás probando en Cloudflare Pages:
  redirectTo: "https://subzi-shop.pages.dev/reset.html"
};
