// Configuración Supabase (backend gratis - Auth + DB)
window.SUBZI = window.SUBZI || {};

// Pegá acá tus credenciales de Supabase (Project Settings → API)
SUBZI.supabaseConfig = {
  url: "PASTE_SUPABASE_URL_HERE",
  anonKey: "PASTE_SUPABASE_ANON_KEY_HERE",
  // Importante: agregá esta URL en Supabase → Auth → URL Configuration → Redirect URLs
  redirectTo: "https://subzi.me/reset.html"
};
