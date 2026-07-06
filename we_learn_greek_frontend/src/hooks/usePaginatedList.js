import { useState, useEffect, useMemo } from 'react';

export function usePaginatedList({
  items = [],
  pageSize = 10,
  searchTerm = '',
  filterFn,
  filterKey,
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const filteredItems = useMemo(() => {
    if (!filterFn) return items;
    return items.filter((item) => filterFn(item, searchTerm));
  }, [items, searchTerm, filterFn]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, currentPage, pageSize]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, items.length, filterKey]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginate = (page) => setCurrentPage(page);
  const nextPage = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const prevPage = () => setCurrentPage((p) => Math.max(p - 1, 1));

  return {
    currentPage,
    totalPages,
    currentItems,
    filteredItems,
    paginate,
    nextPage,
    prevPage,
    setCurrentPage,
  };
}
