import { useState, useEffect } from 'react';
import { greekToGreekAPI } from '../services/greekToGreek';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { showToast } from '../components/common/Toast';

function GreekToGreek() {
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('word');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    difficulty: '',
    category: ''
  });

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const categories = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Other'];

  useEffect(() => {
    fetchWords();
  }, [page, sortBy, sortOrder, filters]);

  const fetchWords = async () => {
    try {
      setLoading(true);
      const data = await greekToGreekAPI.getAllWords(page, {
        sort_by: sortBy,
        sort_order: sortOrder,
        ...filters
      });
      setWords(data.results);
      setTotalPages(Math.ceil(data.count / 12));
    } catch (err) {
      setError(err.message);
      showToast.error('Failed to fetch words');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      await fetchWords();
      return;
    }

    try {
      setLoading(true);
      const data = await greekToGreekAPI.searchWords(searchTerm, 1);
      setWords(data.results);
      setTotalPages(Math.ceil(data.count / 12));
      setPage(1);
    } catch (err) {
      showToast.error('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPage(1);
  };

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Greek to Greek Dictionary</h1>

      {/* Search and Filters */}
      <div className="mb-6 space-y-4">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-2 border rounded-lg"
            placeholder="Search words..."
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap gap-4">
          <select
            name="difficulty"
            value={filters.difficulty}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg"
          >
            <option value="">All Difficulties</option>
            {difficulties.map(diff => (
              <option key={diff} value={diff.toLowerCase()}>
                {diff}
              </option>
            ))}
          </select>

          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="p-2 border rounded-lg"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat.toLowerCase()}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Words List */}
      {loading ? (
        <div className="py-8 flex justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {words.map((word) => (
              <div key={word.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-blue-600 mb-2">
                  {word.word}
                </h2>
                <p className="text-gray-600 mb-2">
                  Category: {word.category}
                </p>
                <p className="text-gray-600 mb-4">
                  Difficulty: {word.difficulty}
                </p>
                <div className="space-y-2">
                  <p className="font-medium">Definition:</p>
                  <p className="text-gray-700">{word.definition}</p>
                  {word.example && (
                    <>
                      <p className="font-medium mt-4">Example:</p>
                      <p className="text-gray-700 italic">{word.example}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default GreekToGreek;  