# SubZi | Tienda Online

**Premium subscriptions & gaming, delivered fast via WhatsApp.**

This is a lightweight static shop (HTML/CSS/JS) with:
- 🧺 Persistent cart (guest + logged-in)
- 💸 Cashback system
- 🔐 Supabase Auth (sign up / sign in / password reset)
- ☁️ Cloud sync per user (cart / cashback / orders)

## Quick start (local)
Open `index.html` with a local server (recommended) or any static host.

## Supabase setup
### 1) Create a project
Create a Supabase project and open **SQL Editor**.

### 2) Run the database script
Run `supabase.sql` (tables + RLS + triggers).

### 3) Configure the site
Edit `config.js` and paste your credentials:

```js
SUBZI.supabaseConfig = {
  url: "https://YOUR_PROJECT.supabase.co",
  anonKey: "YOUR_ANON_KEY",
  // Optional (recommended): where Supabase should redirect after password reset
  redirectTo: "https://YOUR_DOMAIN/reset.html"
};
```

### 4) Redirect URLs (password reset / email links)
In Supabase: **Authentication → URL Configuration → Redirect URLs** add:
- `https://YOUR_DOMAIN/reset.html`
- (Optional for local testing) `http://localhost:5500/reset.html`

## Email delivery notes
Supabase has email rate limits (especially on the default sender).
For production-grade delivery, configure **Custom SMTP** (Resend/SendGrid/Postmark/etc.).

## Pages
- `index.html` — home
- `chatgpt.html` — category (AI)
- `games.html` — category (Games)
- `product.html?id=<ID>` — product detail
- `cashback.html` — cashback rules
- `reset.html` — password reset

## Deploy
Upload the whole folder to any static host (Cloudflare Pages, Netlify, GitHub Pages, etc.).
If you deploy new versions and don’t see changes, hard refresh (Ctrl+F5) or use Incognito.
