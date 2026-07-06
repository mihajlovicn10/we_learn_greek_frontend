# We Learn Greek — Frontend

React + Vite SPA for the [We Learn Greek](https://github.com/mihajlovicn10/we_learn_greek_frontend) learning platform: verb conjugations, noun declensions, personal dictionary, Greek-to-Greek glossary, and transparent words across languages.

**Stack:** React 18 · Vite · React Router · TanStack Query · Tailwind CSS · Framer Motion · Axios (JWT)

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
| `VITE_ENABLE_DEMO_DATA` | `true` = fallback to bundled demo data if API is down. Set `false` in production. |

## Deploy on Vercel

1. Push this repo to GitHub (already: `mihajlovicn10/we_learn_greek_frontend`).
2. Go to [vercel.com/new](https://vercel.com/new) → **Import** the repository.
3. Vercel auto-detects **Vite**. Confirm:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
4. Add **Environment Variables** (Production):

   ```
   VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
   VITE_ENABLE_DEMO_DATA=false
   ```

5. Click **Deploy**.

6. **Backend CORS** — on Render (or your API host), set:

   ```
   CORS_ALLOWED_ORIGINS=https://YOUR-APP.vercel.app
   ```

   Use your real Vercel URL (and custom domain later, comma-separated).

7. Redeploy the frontend after changing env vars (Vercel → Project → Deployments → Redeploy).

`vercel.json` includes SPA rewrites so React Router deep links (e.g. `/conjugator/verbs`) work on refresh.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run build:analyze` | Build + bundle report at `dist/stats.html` |

## API

Endpoint paths live in `src/constants/endpoints.js`. Full API reference: `src/services/README.md` (matches the Django backend).
