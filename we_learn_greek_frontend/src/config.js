/**
 * App configuration from Vite env vars.
 * Endpoint paths live in src/constants/endpoints.js.
 */

export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/** When true, list pages fall back to bundled demo data if the API is unreachable. */
export const ENABLE_DEMO_DATA =
  import.meta.env.VITE_ENABLE_DEMO_DATA !== 'false';

export function validateConfig() {
  if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
    console.warn(
      '[config] VITE_API_URL is not set in production. API calls will use:',
      API_URL
    );
  }
}

validateConfig();
