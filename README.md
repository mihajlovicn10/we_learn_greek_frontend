# We Learn Greek — Frontend

**We Learn Greek** is a free, ad-free web app for learners of Modern Greek. Look up any noun or verb (in Greek or Latin letters, accents optional) and see every form at a glance: noun cases with their articles, verb conjugations in six tenses, plus Greek-to-Greek definitions, Greek word roots in other languages, and a personal dictionary to save words as you study.

**Live app:** https://we-learn-greek-frontend.vercel.app

## Who it's for

Learners of Modern Greek, from beginners who can't yet type Greek to intermediate students who want to drill noun cases, verb forms and vocabulary at their own pace. The interface is available in English and Greek.

## Features

- **Nouns:** every case in the singular and plural, with the right article and a note on what each case is for.
- **Verbs:** conjugations in six tenses, with pronouns and when each tense is used.
- **Greek Definitions:** Greek words explained in simple Greek.
- **Word Roots:** Greek words that live on in English, French, German, Spanish, Italian and Russian.
- **My Words:** a personal dictionary, saved to your account.
- Search in Greek or Latin letters, an on-screen Greek keyboard, pronunciation hints and text-to-speech.

## Stack

React 18 · Vite 7 · React Router 7 · TanStack Query 5 · Tailwind CSS 3 · Framer Motion · i18next · Axios (JWT auth). Hosted on Vercel.

The API is a separate Django REST project: **[mihajlovicn10/we_learn_greek_backend](https://github.com/mihajlovicn10/we_learn_greek_backend)**.

## Repository layout

The app lives in **[`we_learn_greek_frontend/`](we_learn_greek_frontend/)**. At the root, `vercel.json` tells Vercel to build from that folder. See [`we_learn_greek_frontend/README.md`](we_learn_greek_frontend/README.md) for environment variables, deployment and scripts.

## Run it locally

Requires Node.js 20.19 or newer.

```bash
cd we_learn_greek_frontend
npm ci
cp .env.example .env
npm run dev
```

The app opens at http://localhost:3000.

`.env.example` points the app at a backend on `http://localhost:8000/api` (see the [backend repo](https://github.com/mihajlovicn10/we_learn_greek_backend) to run it) and turns on bundled demo data, so the pages still work without a backend. The production API only accepts requests from the live site, so it can't be used from localhost.

## Roadmap

- **More Word Roots languages:** Serbian, Ukrainian and Arabic.
- **Meanings for nouns and verbs:** an English meaning next to every noun and verb.
- **Practice modes:** flashcards and quizzes built on My Words, nouns and verbs.
- **More content tiers:** grow beyond the first two tiers toward the planned tiers 3–5 of nouns, verbs and definitions.

## License

MIT. See [LICENSE](LICENSE).
