import { PLAUSIBLE_DOMAIN } from '../config';

/**
 * Cookieless Plausible analytics — only loaded when VITE_PLAUSIBLE_DOMAIN is set.
 * The script tracks SPA page views itself by hooking history navigation.
 */
export function initAnalytics() {
  if (!PLAUSIBLE_DOMAIN || typeof document === 'undefined') return;

  window.plausible =
    window.plausible ||
    function (...args) {
      (window.plausible.q = window.plausible.q || []).push(args);
    };

  const script = document.createElement('script');
  script.defer = true;
  script.dataset.domain = PLAUSIBLE_DOMAIN;
  script.src = 'https://plausible.io/js/script.js';
  document.head.appendChild(script);
}

/** Record a custom event (e.g. 'Donate Click'). No-op when analytics are disabled. */
export function trackEvent(name, props) {
  window.plausible?.(name, props ? { props } : undefined);
}
