import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { greekToGreekAPI, normalizeListResponse, getPaginationMeta } from '../services';
import { showToast } from '../components/common/Toast';
import { PageLayout } from '../components/layout';
import {
  Badge,
  Card,
  EmptyState,
  FilterSelect,
  Pagination,
  SearchBar,
  SkeletonList,
} from '../components/ui';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

const difficulties = ['Easy', 'Medium', 'Hard'];
const categories = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Other'];

function GreekToGreekList() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebouncedValue(searchTerm);
  const [filters, setFilters] = useState({ difficulty: '', category: '' });

  const { data, isLoading, isError } = useQuery({
    queryKey: ['greek-to-greek', page, debouncedSearch, filters],
    queryFn: async () => {
      if (debouncedSearch.trim()) {
        return greekToGreekAPI.searchWords(debouncedSearch, page);
      }
      return greekToGreekAPI.getAllWords(page, {
        ordering: 'word',
        ...filters,
      });
    },
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    if (isError) showToast.error('Failed to fetch words');
  }, [isError]);

  const words = normalizeListResponse(data);
  const totalPages = getPaginationMeta(data, 12).totalPages;

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setPage(1);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };

  return (
    <PageLayout title="Greek to Greek Dictionary" background="muted">
      <div className="mb-8 space-y-4">
        <form onSubmit={handleSearchSubmit}>
          <SearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search words..."
            showButton
            className="max-w-xl"
          />
        </form>

        <div className="flex flex-wrap gap-4">
          <FilterSelect
            name="difficulty"
            value={filters.difficulty}
            onChange={handleFilterChange}
            className="min-w-[160px] bg-white text-gray-900"
          >
            <option value="">All Difficulties</option>
            {difficulties.map((diff) => (
              <option key={diff} value={diff.toLowerCase()}>
                {diff}
              </option>
            ))}
          </FilterSelect>

          <FilterSelect
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="min-w-[160px] bg-white text-gray-900"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </FilterSelect>
        </div>
      </div>

      {isLoading ? (
        <SkeletonList count={6} />
      ) : words.length === 0 ? (
        <EmptyState message="No words found. Try adjusting your search or filters." />
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {words.map((word) => (
              <Card key={word.id} hover>
                <h2 className="mb-2 font-display text-xl font-bold text-brand-900">{word.word}</h2>
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge variant="brand">{word.category}</Badge>
                  <Badge variant="accent">{word.difficulty}</Badge>
                </div>
                <p className="mb-1 text-sm font-semibold text-gray-700">Definition</p>
                <p className="mb-4 text-gray-600">{word.definition}</p>
                {word.example && (
                  <>
                    <p className="mb-1 text-sm font-semibold text-gray-700">Example</p>
                    <p className="italic text-gray-600">{word.example}</p>
                  </>
                )}
              </Card>
            ))}
          </div>

          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </PageLayout>
  );
}

export default GreekToGreekList;
