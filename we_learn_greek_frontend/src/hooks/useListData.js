import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { normalizeListResponse, getPaginationMeta } from '../services/apiHelpers';
import { ENABLE_DEMO_DATA } from '../config';
import { useDebouncedValue } from './useDebouncedValue';

/**
 * Server-paginated list with optional client-side demo fallback.
 */
export function useListData({
  queryKey,
  fetchFn,
  pageSize = 5,
  searchTerm = '',
  filters = {},
  filterKey = '',
  demoItems = null,
  demoFilterFn = null,
}) {
  const debouncedSearch = useDebouncedValue(searchTerm);
  const [page, setPage] = useState(1);
  const [useDemo, setUseDemo] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filterKey]);

  const query = useQuery({
    queryKey: [...queryKey, page, debouncedSearch, filters, filterKey, useDemo],
    queryFn: () => fetchFn(page, { search: debouncedSearch, page_size: pageSize, ...filters }),
    enabled: !useDemo,
    retry: false,
  });

  useEffect(() => {
    if (query.isError && ENABLE_DEMO_DATA && demoItems?.length) {
      setUseDemo(true);
    }
  }, [query.isError, demoItems]);

  const filteredDemo = useMemo(() => {
    if (!demoItems || !demoFilterFn) return demoItems || [];
    return demoItems.filter((item) => demoFilterFn(item, debouncedSearch, filters));
  }, [demoItems, demoFilterFn, debouncedSearch, filters]);

  const demoTotalPages = Math.max(1, Math.ceil((filteredDemo?.length || 0) / pageSize));
  const demoSlice = useMemo(() => {
    const start = (page - 1) * pageSize;
    return (filteredDemo || []).slice(start, start + pageSize);
  }, [filteredDemo, page, pageSize]);

  if (useDemo && demoItems) {
    return {
      items: demoSlice,
      currentPage: page,
      totalPages: demoTotalPages,
      paginate: setPage,
      loading: false,
      error: null,
      isDemo: true,
      refetch: () => setUseDemo(false),
    };
  }

  const items = normalizeListResponse(query.data);
  const { totalPages } = getPaginationMeta(query.data, pageSize);

  return {
    items,
    currentPage: page,
    totalPages,
    paginate: setPage,
    loading: query.isLoading,
    error: query.error?.message || (query.isError ? 'Failed to load data' : null),
    isDemo: false,
    refetch: query.refetch,
  };
}
