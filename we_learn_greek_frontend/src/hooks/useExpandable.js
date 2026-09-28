import { useEffect, useState } from 'react';

const CLOSED = Symbol('closed');

/**
 * One-open-at-a-time accordion state. When a search narrows the list to a single result,
 * that result opens automatically, so searching goes straight to the table.
 */
export function useExpandable(items, query) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setSelected(null);
  }, [query]);

  const autoId = query && items.length === 1 ? items[0].id : null;
  const isOpen = (id) => selected === id || (selected === null && autoId === id);
  const toggle = (id) => setSelected(isOpen(id) ? CLOSED : id);

  return { isOpen, toggle };
}
