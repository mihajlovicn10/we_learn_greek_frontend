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

  dictionary: '/dictionary',
  savedWords: '/dictionary/words',

  declinator: '/declinator',
  declinatorNouns: '/declinator/nouns',

  verbSearch: '/verb-search',
  conjugatorVerbs: '/conjugator/verbs',

  greekToGreek: '/greek-to-greek',

  transparentLanguageSelect: '/transparent-language-select',
  transparentWords: (language) => `/transparent-words/${language}`,
};

/** Legacy / bookmarked paths that redirect to canonical routes */
export const LEGACY_REDIRECTS = {
  '/conjugator': ROUTES.verbSearch,
  '/greek-to-greek-dictionary': ROUTES.greekToGreek,
  '/transparent-greek-words': ROUTES.transparentLanguageSelect,
  '/noun-search': ROUTES.declinator,
};

export const MORE_MENU_ROUTES = {
  about: ROUTES.about,
  privacy: ROUTES.privacy,
  contact: ROUTES.contact,
};
