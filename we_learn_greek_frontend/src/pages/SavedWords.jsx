import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCheck, FaEdit, FaTimes, FaTrash, FaVolumeUp } from 'react-icons/fa';
import { dictionaryAPI, fetchAllDictionaryWords } from '../services/dictionary';
import { getErrorMessage } from '../services/apiHelpers';
import { PageLayout } from '../components/layout';
import { AddWordForm } from '../components/features';
import { Alert, Card, EmptyState, SearchBar, SkeletonList } from '../components/ui';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { showToast } from '../components/common/Toast';
import { matchesGreek } from '../utils/greek';
import { ENABLE_DEMO_DATA } from '../config';
import { demoSavedWords } from '../data/demo';

function saveErrorMessage(err, fallback) {
  const data = err.response?.data;
  return (
    data?.greek_word?.[0] ||
    data?.pronounciation?.[0] ||
    data?.translation?.[0] ||
    getErrorMessage(err, fallback)
  );
}

/** My Words: the learner's personal dictionary — add, search, edit, and review saved words. */
const SavedWords = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const prefill = location.state?.prefill;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebouncedValue(searchTerm);
  const { speak } = useTextToSpeech();
  const queryClient = useQueryClient();
  const { t, i18n } = useTranslation();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['saved-words'],
    queryFn: async () =>
      (await fetchAllDictionaryWords()).map((word) => ({
        id: word.id,
        greek: word.greek_word,
        pronunciation: word.pronounciation,
        translation: word.translation,
        dateAdded: word.date_added,
      })),
    retry: false,
  });

  const useDemo = isError && ENABLE_DEMO_DATA;
  const words = useDemo ? demoSavedWords : data || [];

  const filteredWords = words.filter(
    (word) =>
      matchesGreek(word.greek, debouncedSearch) ||
      matchesGreek(word.pronunciation, debouncedSearch) ||
      matchesGreek(word.translation, debouncedSearch)
  );

  const formatDate = (value) => {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString(i18n.resolvedLanguage);
  };

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['saved-words'] });

  const addMutation = useMutation({
    mutationFn: ({ greek, pronunciation, translation }) =>
      dictionaryAPI.addWord({ greek_word: greek, pronounciation: pronunciation, translation }),
    onSuccess: (_, word) => {
      showToast.success(t('myWords.saved', { word: word.greek }));
      invalidate();
    },
  });

  const handleAdd = async (word) => {
    if (useDemo) {
      showToast.info(t('myWords.demoSave'));
      return false;
    }
    try {
      await addMutation.mutateAsync(word);
      // Done with the word handed over by a "Save" button; drop it so a refresh doesn't re-fill it.
      if (prefill) navigate(location.pathname, { replace: true, state: null });
      return true;
    } catch {
      return false;
    }
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => dictionaryAPI.deleteWord(id),
    onSuccess: () => {
      showToast.success(t('myWords.deleted'));
      invalidate();
    },
    onError: () => showToast.error(t('myWords.deleteFailed')),
  });

  const handleDelete = (word) => {
    if (!window.confirm(t('myWords.confirmDelete', { word: word.greek }))) return;
    if (useDemo) {
      showToast.info(t('myWords.demoDelete'));
      return;
    }
    deleteMutation.mutate(word.id);
  };

  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({ greek: '', pronunciation: '', translation: '' });

  const updateMutation = useMutation({
    mutationFn: ({ id, greek, pronunciation, translation }) =>
      dictionaryAPI.patchWord(id, {
        greek_word: greek,
        pronounciation: pronunciation,
        translation,
      }),
    onSuccess: () => {
      showToast.success(t('myWords.updated'));
      setEditingId(null);
      invalidate();
    },
    onError: (err) => showToast.error(saveErrorMessage(err, t('myWords.updateFailed'))),
  });

  const handleEdit = (word) => {
    if (useDemo) {
      showToast.info(t('myWords.demoEdit'));
      return;
    }
    setEditingId(word.id);
    setDraft({
      greek: word.greek,
      pronunciation: word.pronunciation,
      translation: word.translation,
    });
  };

  const handleSaveEdit = (id) => {
    if (!draft.greek.trim() || !draft.pronunciation.trim() || !draft.translation.trim()) {
      showToast.error(t('myWords.allFieldsRequired'));
      return;
    }
    updateMutation.mutate({ id, ...draft });
  };

  const handleEditKeyDown = (e, id) => {
    if (e.key === 'Enter') handleSaveEdit(id);
    if (e.key === 'Escape') setEditingId(null);
  };

  const editInput = (field, id, label) => (
    <input
      type="text"
      value={draft[field]}
      onChange={(e) => setDraft((prev) => ({ ...prev, [field]: e.target.value }))}
      onKeyDown={(e) => handleEditKeyDown(e, id)}
      aria-label={label}
      className="w-full rounded-lg border border-gray-300 px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
    />
  );

  return (
    <PageLayout
      title={t('myWords.title')}
      subtitle={t('myWords.subtitle')}
      background="muted"
    >
      <Card padding="lg" className="mb-8">
        <h2 className="mb-1 font-display text-xl font-semibold text-brand-900">{t('myWords.addTitle')}</h2>
        <p className="mb-5 text-sm text-gray-500">
          {prefill ? t('myWords.addHintPrefill', { word: prefill.greek }) : t('myWords.addHint')}
        </p>
        <AddWordForm
          prefill={prefill}
          onSave={handleAdd}
          isSaving={addMutation.isPending}
          error={addMutation.isError ? saveErrorMessage(addMutation.error, t('myWords.saveFailed')) : null}
        />
      </Card>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-xl font-semibold text-brand-900">
          {t('myWords.savedWords')} {words.length > 0 && <span className="text-gray-400">({words.length})</span>}
        </h2>
        <SearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t('myWords.searchPlaceholder')}
          className="sm:max-w-sm"
          inputClassName="!text-left"
        />
      </div>

      {useDemo && (
        <Alert variant="info" className="mb-4">
          {t('common.demoData')}
        </Alert>
      )}

      {isLoading ? (
        <SkeletonList count={4} />
      ) : isError && !ENABLE_DEMO_DATA ? (
        <Alert variant="error">{getErrorMessage(error, t('myWords.loadFailed'))}</Alert>
      ) : filteredWords.length === 0 ? (
        <EmptyState
          title={searchTerm ? t('myWords.noMatches') : t('myWords.empty')}
          message={searchTerm ? t('myWords.noMatchesMessage') : t('myWords.emptyMessage')}
        />
      ) : (
        <Card padding="sm" className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-surface-muted">
                  <th className="px-4 py-3 text-left font-semibold text-brand-900">{t('myWords.colGreek')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand-900">{t('myWords.colPronunciation')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand-900">{t('myWords.colMeaning')}</th>
                  <th className="px-4 py-3 text-left font-semibold text-brand-900">{t('myWords.colAdded')}</th>
                  <th className="px-4 py-3 text-center font-semibold text-brand-900">{t('myWords.colActions')}</th>
                </tr>
              </thead>
              <tbody>
                {filteredWords.map((word) =>
                  editingId === word.id ? (
                    <tr key={word.id} className="border-b border-gray-100 bg-brand-50/60">
                      <td className="px-4 py-3">{editInput('greek', word.id, t('myWords.greekWord'))}</td>
                      <td className="px-4 py-3">
                        {editInput('pronunciation', word.id, t('myWords.pronunciation'))}
                      </td>
                      <td className="px-4 py-3">{editInput('translation', word.id, t('myWords.colMeaning'))}</td>
                      <td className="px-4 py-3 text-gray-600">{formatDate(word.dateAdded)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(word.id)}
                            disabled={updateMutation.isPending}
                            className="rounded-lg bg-green-50 p-2 text-green-700 hover:bg-green-100 disabled:opacity-50"
                            title={t('myWords.saveChanges')}
                            aria-label={t('myWords.saveChanges')}
                          >
                            <FaCheck size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingId(null)}
                            className="rounded-lg bg-surface-muted p-2 text-gray-700 hover:bg-gray-200"
                            title={t('myWords.cancel')}
                            aria-label={t('myWords.cancel')}
                          >
                            <FaTimes size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={word.id} className="border-b border-gray-100 hover:bg-surface-muted/50">
                      <td className="px-4 py-3 text-base font-semibold text-brand-900" lang="el">
                        {word.greek}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        <span className="inline-flex items-center gap-2">
                          {word.pronunciation}
                          <button
                            type="button"
                            onClick={() => speak(word.greek)}
                            className="text-brand-600 hover:text-brand-700"
                            aria-label={t('common.listenTo', { word: word.greek })}
                            title={t('common.listen')}
                          >
                            <FaVolumeUp size={14} />
                          </button>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{word.translation}</td>
                      <td className="px-4 py-3 text-gray-600">{formatDate(word.dateAdded)}</td>
                      <td className="px-4 py-3">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(word)}
                            className="rounded-lg bg-surface-muted p-2 text-gray-700 hover:bg-gray-200"
                            aria-label={t('myWords.editWord', { word: word.greek })}
                            title={t('myWords.edit')}
                          >
                            <FaEdit size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(word)}
                            className="rounded-lg bg-red-50 p-2 text-red-600 hover:bg-red-100"
                            aria-label={t('myWords.deleteWord', { word: word.greek })}
                            title={t('myWords.delete')}
                          >
                            <FaTrash size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </PageLayout>
  );
};

export default SavedWords;
