import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { SkeletonCard } from '../ui';

// Start loading well before the user reaches the bottom, so new items are usually already there.
const PREFETCH_MARGIN = '600px';

/**
 * Footer for endless lists: loads the next page when it scrolls near the viewport, with a
 * "Load more" button as a fallback (keyboard users, no IntersectionObserver) and a live status.
 */
function InfiniteScroll({
  shown,
  total,
  pageSize,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  error,
}) {
  const { t } = useTranslation();
  const sentinelRef = useRef(null);

  // Keep the latest state in a ref so the observer is created once, not on every render.
  const latest = useRef({});
  latest.current = { hasNextPage, isFetchingNextPage, fetchNextPage, error };

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const state = latest.current;
        // A failed load waits for "Try again" rather than retrying in a loop.
        if (entry.isIntersecting && state.hasNextPage && !state.isFetchingNextPage && !state.error) {
          state.fetchNextPage();
        }
      },
      { rootMargin: `0px 0px ${PREFETCH_MARGIN} 0px` }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Re-check after each page: if the list is still shorter than the screen, keep filling it.
  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasNextPage || isFetchingNextPage || error) return;
    const { top } = node.getBoundingClientRect();
    if (top < window.innerHeight + 600) fetchNextPage();
  }, [shown, hasNextPage, isFetchingNextPage, error]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="mt-6">
      {isFetchingNextPage && (
        <div className="space-y-4" aria-hidden="true">
          <SkeletonCard lines={1} />
          <SkeletonCard lines={1} />
        </div>
      )}

      <div ref={sentinelRef} aria-hidden="true" />

      <div className="mt-6 flex flex-col items-center gap-3 text-sm text-gray-500">
        <p aria-live="polite">
          {isFetchingNextPage
            ? t('list.loadingMore')
            : hasNextPage
              ? t('list.showing', { shown, total })
              : // Only worth saying once the user has actually scrolled through more than one page.
                shown > pageSize && t('list.end', { total })}
        </p>

        {error ? (
          <div className="flex flex-col items-center gap-2" role="alert">
            <p className="text-red-700">{error}</p>
            <button
              type="button"
              onClick={fetchNextPage}
              className="rounded-full bg-brand-600 px-5 py-2 font-semibold text-white transition-colors hover:bg-brand-700"
            >
              {t('list.retry')}
            </button>
          </div>
        ) : (
          hasNextPage &&
          !isFetchingNextPage && (
            <button
              type="button"
              onClick={fetchNextPage}
              className="rounded-full px-5 py-2 font-semibold text-brand-700 ring-1 ring-brand-200 transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              {t('list.loadMore')}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default InfiniteScroll;
