/**
 * App configuration from Vite env vars.
 * Endpoint paths live in src/constants/endpoints.js.
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * When true, list pages fall back to bundled demo data if the API is unreachable.
 * Opt-in only, so production never silently shows fake content.
 */
export const ENABLE_DEMO_DATA = import.meta.env.VITE_ENABLE_DEMO_DATA === 'true';

/** Public contact address shown across the site. */
export const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'contact@welearngreek.com';

/**
 * Form backend that accepts a JSON POST (e.g. https://formspree.io/f/xxxx).
 * When unset, the contact form falls back to opening the visitor's mail client.
 */
export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || '';

/** Donation page (Ko-fi, Open Collective, Stripe Payment Link, …). Support CTAs hide when unset. */
export const DONATE_URL = import.meta.env.VITE_DONATE_URL || '';

/** Plausible analytics domain (e.g. welearngreek.com). Analytics are disabled when unset. */
export const PLAUSIBLE_DOMAIN = import.meta.env.VITE_PLAUSIBLE_DOMAIN || '';

export function validateConfig() {
  if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
    console.warn(
      '[config] VITE_API_URL is not set in production. API calls will use:',
      API_URL
    );
  }
}

validateConfig();
