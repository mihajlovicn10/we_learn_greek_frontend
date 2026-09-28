# We Learn Greek — Frontend

React + Vite SPA for the [We Learn Greek](https://github.com/mihajlovicn10/we_learn_greek_frontend) learning platform: verb conjugations, noun declensions, personal dictionary, Greek-to-Greek glossary, and transparent words across languages.

**Stack:** React 18 · Vite 7 · React Router 7 · TanStack Query · Tailwind CSS · Framer Motion · Axios (JWT)

## Local development

```bash
npm install
cp .env.example .env
# Edit .env — set VITE_API_URL to your Django API (default http://localhost:8000/api)
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Django REST API base URL, e.g. `https://your-api.onrender.com/api` |
| `VITE_ENABLE_DEMO_DATA` | `true` = fall back to bundled demo data if the API is down. Off unless exactly `true`; leave unset in production. |
| `VITE_SITE_URL` | Public site URL for canonical and Open Graph tags. Defaults to Vercel's production domain. |
| `VITE_CONTACT_EMAIL` | Contact address shown on the site. Default `contact@welearngreek.com`. |
| `VITE_CONTACT_FORM_ENDPOINT` | JSON form backend (e.g. Formspree). Unset = contact form opens the visitor's mail app. |
| `VITE_DONATE_URL` | Donation page (Ko-fi, Open Collective, Stripe Payment Link…). Unset = Support CTAs link to `/support`. |
| `VITE_PLAUSIBLE_DOMAIN` | Enables cookieless Plausible analytics (page views + `Donate Click` events). |

## Deploy on Vercel

> **Important:** This GitHub repo root is one level above the app. The root `vercel.json`
> builds from `we_learn_greek_frontend/`, so leave Vercel's **Root Directory** empty.

1. Push this repo to GitHub (`mihajlovicn10/we_learn_greek_frontend`).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repository.
3. Build settings come from the root `vercel.json` — no overrides needed. Node 20.19+ is required (Vite 7).
4. Add **Environment Variables** (Production):

   ```
   VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
   VITE_DONATE_URL=https://ko-fi.com/YOUR-PAGE          # optional
   VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/…  # optional
   VITE_PLAUSIBLE_DOMAIN=your-domain.com                # optional
   ```

5. Click **Deploy**.

6. **Backend CORS** — on Render (or your API host), set:

   ```
   CORS_ALLOWED_ORIGINS=https://YOUR-APP.vercel.app
   ```

   Use your real Vercel URL (and custom domain later, comma-separated).

7. Redeploy the frontend after changing env vars (Vercel → Project → Deployments → Redeploy).

`vercel.json` includes SPA rewrites so React Router deep links (e.g. `/conjugator/verbs`) work on refresh.

## Translations (i18n)

The UI is available in **English** (default) and **Greek**, using `react-i18next`.

- Strings live in `src/i18n/locales/en.json` and `el.json`. Both files must have the same keys.
- In components: `const { t } = useTranslation();` then `t('nouns.title')`. For sentences that contain a
  link, use `<Trans i18nKey="…" components={{ link: <Link … /> }} />` with `<link>…</link>` in the string.
- Language is picked from the saved choice (`localStorage['wlg-language']`), else the browser language,
  else English. The EN / ΕΛ switch is in the navbar. `<html lang>` follows the active language.
- Word data from the API (Greek words, English meanings) is content, not UI, and is not translated.
- To add a language: add `src/i18n/locales/<code>.json`, register it in `src/i18n/index.js` (`resources`
  and `LANGUAGES`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run build:analyze` | Build + bundle report at `dist/stats.html` |

## API

Endpoint paths live in `src/constants/endpoints.js`. Full API reference: `src/services/README.md` (matches the Django backend).
