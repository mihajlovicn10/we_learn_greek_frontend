import { useEffect, useMemo, useState } from 'react';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { normalizeListResponse, getErrorMessage } from '../services/apiHelpers';
import { ENABLE_DEMO_DATA } from '../config';
import { useDebouncedValue } from './useDebouncedValue';
import i18n from '../i18n';

/**
 * Endless list backed by a DRF-paginated endpoint ({ count, next, results }), with an optional
 * client-side demo fallback. Pages accumulate as the user scrolls; a new search or filter starts over.
 *
 * `fetchFn(page, params)` receives the 1-based page number and { search, page_size, ...filters }.
 */
export function useListData({
  queryKey,
  fetchFn,
  pageSize = 20,
  searchTerm = '',
  filters = {},
  demoItems = null,
  demoFilterFn = null,
}) {
  const debouncedSearch = useDebouncedValue(searchTerm);
  const [useDemo, setUseDemo] = useState(false);

  const query = useInfiniteQuery({
    queryKey: [...queryKey, debouncedSearch, filters],
    queryFn: ({ pageParam }) =>
      fetchFn(pageParam, { search: debouncedSearch, page_size: pageSize, ...filters }),
    initialPageParam: 1,
    // DRF sets `next` while more pages exist; a plain array response is a single page.
    getNextPageParam: (lastPage, allPages) => (lastPage?.next ? allPages.length + 1 : undefined),
    // Keep showing the current results while a new search loads, instead of flashing a skeleton.
    placeholderData: keepPreviousData,
    enabled: !useDemo,
    retry: false,
  });

  useEffect(() => {
    if (query.isError && !query.data && ENABLE_DEMO_DATA && demoItems?.length) {
      setUseDemo(true);
    }
  }, [query.isError, query.data, demoItems]);

  // --- Demo mode: same endless behaviour, sliced from bundled data. ---
  const [demoPages, setDemoPages] = useState(1);
  const filtersKey = JSON.stringify(filters);

  useEffect(() => {
    setDemoPages(1);
  }, [debouncedSearch, filtersKey]);

  const filteredDemo = useMemo(() => {
    if (!demoItems) return [];
    if (!demoFilterFn) return demoItems;
    return demoItems.filter((item) => demoFilterFn(item, debouncedSearch, filters));
  }, [demoItems, demoFilterFn, debouncedSearch, filtersKey]); // eslint-disable-line react-hooks/exhaustive-deps

  if (useDemo) {
    const shown = demoPages * pageSize;
    return {
      items: filteredDemo.slice(0, shown),
      total: filteredDemo.length,
      loading: false,
      refreshing: false,
      error: null,
      isDemo: true,
      hasNextPage: shown < filteredDemo.length,
      isFetchingNextPage: false,
      fetchNextPage: () => setDemoPages((pages) => pages + 1),
      loadMoreError: null,
    };
  }

  const pages = query.data?.pages ?? [];
  const items = pages.flatMap((page) => normalizeListResponse(page));
  const firstPage = pages[0];
  const total = typeof firstPage?.count === 'number' ? firstPage.count : items.length;
  // A failed "load more" keeps the loaded pages on screen; only a failed first load is a list error.
  const failedWithData = query.isFetchNextPageError;

  return {
    items,
    total,
    loading: query.isPending,
    refreshing: query.isPlaceholderData, // old results shown while the new search loads
    error: query.isError && !failedWithData ? getErrorMessage(query.error, i18n.t('errors.loadFailed')) : null,
    isDemo: false,
    // Never load more of the old results while a new search is still loading.
    hasNextPage: Boolean(query.hasNextPage) && !query.isPlaceholderData,
    isFetchingNextPage: query.isFetchingNextPage,
    fetchNextPage: () => query.fetchNextPage(),
    loadMoreError: failedWithData ? getErrorMessage(query.error, i18n.t('list.loadMoreFailed')) : null,
  };
}
