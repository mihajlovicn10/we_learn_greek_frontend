/**
 * Canonical application routes — single source of truth for navigation.
 */
export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  support: '/support',

  nouns: '/nouns',
  verbs: '/verbs',
  greekToGreek: '/greek-to-greek',
  wordRoots: '/word-roots',
  wordRootsLanguage: (language) => `/word-roots/${language}`,
  myWords: '/my-words',
};

/** Old paths (earlier releases, bookmarks, shared links) → canonical routes. */
export const LEGACY_REDIRECTS = {
  '/declinator': ROUTES.nouns,
  '/declinator/nouns': ROUTES.nouns,
  '/noun-search': ROUTES.nouns,
  '/conjugator': ROUTES.verbs,
  '/conjugator/verbs': ROUTES.verbs,
  '/verb-search': ROUTES.verbs,
  '/greek-to-greek-dictionary': ROUTES.greekToGreek,
  '/transparent-language-select': ROUTES.wordRoots,
  '/transparent-greek-words': ROUTES.wordRoots,
  '/dictionary': ROUTES.myWords,
  '/dictionary/words': ROUTES.myWords,
};

/** Main navigation, in display order. `labelKey` is a translation key. */
export const NAV_LINKS = [
  { labelKey: 'nav.nouns', to: ROUTES.nouns },
  { labelKey: 'nav.verbs', to: ROUTES.verbs },
  { labelKey: 'nav.greekDefinitions', to: ROUTES.greekToGreek },
  { labelKey: 'nav.wordRoots', to: ROUTES.wordRoots },
  { labelKey: 'nav.myWords', to: ROUTES.myWords },
];
