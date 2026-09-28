import { useEffect } from 'react';

const SITE_NAME = 'We Learn Greek';

/** Sets the browser tab title for the current page. */
export function usePageTitle(title) {
  useEffect(() => {
    if (!title) return undefined;
    const previous = document.title;
    document.title = `${title} · ${SITE_NAME}`;
    return () => {
      document.title = previous;
    };
  }, [title]);
}
