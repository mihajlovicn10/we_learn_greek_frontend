# API layer

Frontend HTTP client for the Django REST backend.

- **Host:** `VITE_API_URL` — production: `https://we-learn-greek-backend-1.onrender.com/api`, local: `http://localhost:8000/api`
- **Live docs:** `/swagger/` and `/redoc/` on the backend host
- **Errors:** 400 `{field: [messages]}` · 401 not authenticated (auth endpoints: `{error}`) · 429 rate limited (`Retry-After` header) — `getErrorMessage()` turns these into translated messages
- **Rate limits (per IP, or per user):** register/login 10/min · refresh/logout 30/min · word endpoints 120/min and 2000/day
- **Paths:** `src/constants/endpoints.js`
- **Client:** `axiosConfig.js` — Bearer JWT; auto-refresh on 401

## Auth

| Method | Endpoint | Auth | Body |
|--------|----------|------|------|
| POST | `/register/` | Public | `email`, `password`, `first_name`, `last_name` |
| POST | `/login/` | Public | `email`, `password` → `{ access, refresh }` |
| POST | `/token/` | Public | Same as login (SimpleJWT, email-based) |
| POST | `/token/refresh/` | Public | `{ refresh }` → `{ access, refresh }` — refresh tokens rotate; store the new one |
| POST | `/logout/` | Public | `{ refresh }` → `200 {}` — revokes the refresh token |

### Login response

```json
{
  "access": "<jwt>",
  "refresh": "<jwt>"
}
```

### Register response

```json
{
  "id": 1,
  "email": "user@example.com",
  "first_name": "Nikos",
  "last_name": "Papadopoulos"
}
```

## Verbs

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/verbs/` | Public | `?search=`, `?verb_type=`, `?page=`, `?page_size=` |
| POST | `/verbs/` | Public | |
| GET | `/verbs/{id}/` | Public | |
| PUT/PATCH/DELETE | `/verbs/{id}/` | Public | |
| GET | `/verbs/{id}/conjugation/` | Public | Full conjugation table |

**Alias:** `/conjugator/`, `/conjugator/{id}/` (same handlers)

## Nouns

| Method | Endpoint | Auth | Notes |
|--------|----------|------|-------|
| GET | `/nouns/` | Public | `?search=`, `?ordering=`, `?nominative_singular=`, `?page=`, `?page_size=` |
| POST | `/nouns/` | Public | |
| GET/PUT/PATCH/DELETE | `/nouns/{id}/` | Public | |

**Alias:** `/declinator/`, `/declinator/{id}/`

## Dictionary (JWT required)

| Method | Endpoint | Notes |
|--------|----------|-------|
| GET/POST | `/dictionary/` | `?search=`, `?ordering=`, `?page=`, `?page_size=` |
| GET/PUT/PATCH/DELETE | `/dictionary/{id}/` | Owner only for mutations |
| POST | `/dictionary/bulk_delete/` | Body: `{ "ids": [1, 2] }` |

**Alias:** `/dictionary-entries/`, `/dictionary-entries/{id}/`

### Dictionary word shape

```json
{
  "id": 1,
  "greek_word": "Καλημέρα",
  "pronounciation": "Kaliméra",
  "translation": "Good morning",
  "date_added": "2024-01-15T10:00:00Z"
}
```

## Greek-to-Greek (public)

| Method | Endpoint |
|--------|----------|
| GET/POST | `/greek-to-greek/` |
| GET/PUT/PATCH/DELETE | `/greek-to-greek/{id}/` |

List filtering via `?search=`, `?page=`, `?page_size=` on the list endpoint.

**Alias:** `/greek-to-greek-entries/`, `/greek-to-greek-entries/{id}/`

## Transparent words (public)

| Method | Endpoint | Notes |
|--------|----------|-------|
| GET/POST | `/transparent-words/` | `?language=en`, `?search=`, `?page=` |
| GET/PUT/PATCH/DELETE | `/transparent-words/{id}/` | |
| GET | `/transparent-words/by-language/{language}/` | Per-language list |

Also available: `/transparent-words/language/{language}/` (same handler).

**Alias:** `/transparent-words-entries/`, `/transparent-words-entries/{id}/`

## Paginated list response (DRF)

```json
{
  "count": 100,
  "next": "http://host/api/verbs/?page=2",
  "previous": null,
  "results": []
}
```

Use `normalizeListResponse(data)` for the items array and `getPaginationMeta(data, pageSize)` for page counts.

## Usage

```js
import { dictionaryAPI, normalizeListResponse } from '../services';

const data = await dictionaryAPI.getAllWords(1, { search: 'καλη' });
const words = normalizeListResponse(data);
```

Lists are paginated (`page_size` max 50, dictionary max 100) and the UI loads them as endless scroll.
With `VITE_ENABLE_DEMO_DATA=true` (local dev only), pages fall back to demo data when the backend is unreachable.

## Route protection

These routes require a valid JWT (`ProtectedRoute` → redirects to `/login`):

- `/dictionary` — add words (POST requires auth on Django)
- `/dictionary/words` — saved words list (GET requires auth on Django)

All other learning tools (verbs, nouns, transparent words, greek-to-greek) remain public.

## Discovery (Django)

| Endpoint | Description |
|----------|-------------|
| `/swagger/` | Swagger UI |
| `/redoc/` | ReDoc UI |
| `/api/` | DRF browsable API root |
