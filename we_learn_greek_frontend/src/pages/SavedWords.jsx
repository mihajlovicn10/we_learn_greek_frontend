import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEdit, FaTrash, FaVolumeUp } from 'react-icons/fa';
import { ROUTES } from '../constants/routes';
import { dictionaryAPI, normalizeListResponse } from '../services';
import { PageLayout } from '../components/layout';
import {
  Alert,
  Button,
  Card,
  EmptyState,
  SearchBar,
  SkeletonList,
} from '../components/ui';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { showToast } from '../components/common/Toast';
import { ENABLE_DEMO_DATA } from '../config';
import { demoSavedWords } from '../data/demo';

const SavedWords = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebouncedValue(searchTerm);
  const { speak } = useTextToSpeech();
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['saved-words'],
    queryFn: async () => {
      const response = await dictionaryAPI.getAllWords(1, { page_size: 100 });
      return normalizeListResponse(response).map((word) => ({
        id: word.id,
        greek: word.greek_word,
        pronunciation: word.pronounciation,
        translation: word.translation,
        dateAdded: new Date(word.date_added).toLocaleDateString(),
      }));
    },
    retry: false,
  });

  const useDemo = isError && ENABLE_DEMO_DATA;
  const words = useDemo ? demoSavedWords : data || [];

  const filteredWords = words.filter((word) => {
    if (!debouncedSearch.trim()) return true;
    const q = debouncedSearch.toLowerCase();
    return (
      word.greek.toLowerCase().includes(q) ||
      word.pronunciation.toLowerCase().includes(q) ||
      word.translation.toLowerCase().includes(q)
    );
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => dictionaryAPI.deleteWord(id),
    onSuccess: () => {
      showToast.success('Word deleted');
      queryClient.invalidateQueries({ queryKey: ['saved-words'] });
    },
    onError: () => showToast.error('Failed to delete word'),
  });

  const handleDelete = useCallback(
    (id) => {
      if (!window.confirm('Are you sure you want to delete this word?')) return;
      if (useDemo) {
        showToast.info('Delete requires a connected API (demo mode)');
        return;
      }
      deleteMutation.mutate(id);
    },
    [useDemo, deleteMutation]
  );

  const handleEdit = () => {
    showToast.info('Edit functionality — coming soon');
  };

  return (
    <PageLayout title="Your Saved Greek Words" background="muted">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search words..."
          className="max-w-md"
        />
        <Link to={ROUTES.dictionary}>
          <Button variant="primary">Add New Words</Button>
        </Link>
      </div>

      {useDemo && (
        <Alert variant="info" className="mb-4">
          Showing demo data — log in and connect the API to see your saved words.
        </Alert>
      )}

      {isLoading ? (
        <SkeletonList count={4} />
      ) : isError && !ENABLE_DEMO_DATA ? (
        <Alert variant="error">{error?.message || 'Failed to load saved words'}</Alert>
      ) : filteredWords.length === 0 ? (
        <EmptyState
          message={searchTerm ? 'No words match your search.' : "You haven't saved any words yet."}
          actionLabel={!searchTerm ? 'Start adding words' : undefined}
          actionTo={!searchTerm ? ROUTES.dictionary : undefined}
        />
      ) : (
        <Card padding="sm" className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-surface-muted">
                  <th className="px-4 py-3 text-left font-semibold text-brand-900">Greek Word</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand-900">Pronunciation</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand-900">Translation</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand-900">Date Added</th>
                  <th className="px-4 py-3 text-center font-semibold text-brand-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWords.map((word) => (
                  <tr key={word.id} className="border-b border-gray-100 hover:bg-surface-muted/50">
                    <td className="px-4 py-3 font-medium text-brand-900">{word.greek}</td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="inline-flex items-center gap-2">
                        {word.pronunciation}
                        <button
                          type="button"
                          onClick={() => speak(word.greek)}
                          className="text-brand-600 hover:text-brand-700"
                          title="Listen to pronunciation"
                        >
                          <FaVolumeUp size={14} />
                        </button>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">{word.translation}</td>
                    <td className="px-4 py-3 text-gray-600">{word.dateAdded}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2">
                        <button
                          type="button"
                          onClick={handleEdit}
                          className="rounded-lg bg-surface-muted p-2 text-gray-700 hover:bg-gray-200"
                          title="Edit word"
                        >
                          <FaEdit size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(word.id)}
                          className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                          title="Delete word"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </PageLayout>
  );
};

export default SavedWords;
