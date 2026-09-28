import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

/**
 * Search term stored in the URL (?q=), so searches can be linked, shared, and survive refresh.
 */
export function useSearchQuery() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';

  const setQuery = useCallback(
    (value) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          if (value) next.set('q', value);
          else next.delete('q');
          return next;
        },
        { replace: true }
      );
    },
    [setParams]
  );

  return [query, setQuery];
}
