/**
 * Django REST API paths (relative to VITE_API_URL, e.g. http://localhost:8000/api).
 * Primary paths only — aliases documented in src/services/README.md.
 */
export const ENDPOINTS = {
  auth: {
    register: '/register/',
    login: '/login/',
    token: '/token/',
    tokenRefresh: '/token/refresh/',
  },
  dictionary: {
    list: '/dictionary/',
    detail: (id) => `/dictionary/${id}/`,
    bulkDelete: '/dictionary/bulk_delete/',
  },
  verbs: {
    list: '/verbs/',
    detail: (id) => `/verbs/${id}/`,
    conjugation: (id) => `/verbs/${id}/conjugation/`,
  },
  nouns: {
    list: '/nouns/',
    detail: (id) => `/nouns/${id}/`,
  },
  greekToGreek: {
    list: '/greek-to-greek/',
    detail: (id) => `/greek-to-greek/${id}/`,
  },
  transparentWords: {
    list: '/transparent-words/',
    detail: (id) => `/transparent-words/${id}/`,
    byLanguage: (language) => `/transparent-words/by-language/${language}/`,
  },
};
