import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FaVolumeUp } from 'react-icons/fa';
import { ROUTES } from '../constants/routes';
import { transparentWordsAPI } from '../services/transparentWords';
import { ExpandableCard, ListPageShell } from '../components/features';
import { Badge, EmptyState, FilterSelect, Pagination, Alert, SkeletonList } from '../components/ui';
import { useListData } from '../hooks/useListData';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { demoWords, localizeDemoWords } from '../data/demo';

const PAGE_SIZE = 5;

const LANGUAGE_NAMES = {
  en: 'English',
  fr: 'French',
  de: 'German',
  es: 'Spanish',
  ru: 'Russian',
  it: 'Italian',
};

const demoFilterFn = (word, term, filters) => {
  if (filters.category && word.category !== filters.category) return false;
  if (
    term.trim() &&
    !word.greek_word.toLowerCase().includes(term.toLowerCase()) &&
    !word.language_word.toLowerCase().includes(term.toLowerCase())
  ) {
    return false;
  }
  return true;
};

const TransparentWords = () => {
  const { language } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [expandedWord, setExpandedWord] = useState(null);
  const { speakForLanguage } = useTextToSpeech();

  const localizedDemo = useMemo(
    () => localizeDemoWords(demoWords, language),
    [language]
  );

  const filters = { category: categoryFilter };

  const { items: words, currentPage, totalPages, paginate, loading, error, isDemo } = useListData({
    queryKey: ['transparent-words', language],
    fetchFn: (page, params) =>
      transparentWordsAPI.getWordsByLanguage(language, page, params),
    pageSize: PAGE_SIZE,
    searchTerm,
    filters,
    filterKey: `${categoryFilter}-${language}`,
    demoItems: localizedDemo,
    demoFilterFn,
  });

  const categories = useMemo(() => {
    const source = isDemo ? localizedDemo : words;
    return [...new Set(source.map((w) => w.category))];
  }, [isDemo, localizedDemo, words]);
  const langName = LANGUAGE_NAMES[language] || 'Other Languages';

  return (
    <ListPageShell
      title={`Greek Words in ${langName}`}
      backTo={ROUTES.transparentLanguageSelect}
      backLabel="Return to language selection"
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      searchPlaceholder="Search words..."
      filter={
        <FilterSelect value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </FilterSelect>
      }
    >
      {isDemo && (
        <Alert variant="info" className="mb-4">
          Showing demo data — connect the API or set VITE_ENABLE_DEMO_DATA=false.
        </Alert>
      )}

      {loading ? (
        <SkeletonList count={3} />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : words.length === 0 ? (
        <EmptyState
          message={
            searchTerm || categoryFilter
              ? 'No words match your search criteria.'
              : 'No words found for this language.'
          }
          actionLabel="Choose Another Language"
          actionTo={ROUTES.transparentLanguageSelect}
        />
      ) : (
        <>
          {words.map((word) => (
            <ExpandableCard
              key={word.id}
              expanded={expandedWord === word.id}
              onToggle={() => setExpandedWord((prev) => (prev === word.id ? null : word.id))}
              expandLabel="Show Details"
              collapseLabel="Hide Details"
              header={
                <>
                  <span className="font-display text-lg font-semibold text-brand-900">
                    {word.greek_word}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakForLanguage(word.greek_word, language, true);
                    }}
                    className="text-brand-600 hover:text-brand-700"
                    title="Listen to Greek pronunciation"
                  >
                    <FaVolumeUp size={16} />
                  </button>
                  <span className="text-gray-400">→</span>
                  <span className="text-lg font-semibold text-gray-700">{word.language_word}</span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speakForLanguage(word.language_word, language, false);
                    }}
                    className="text-brand-600 hover:text-brand-700"
                    title={`Listen to ${langName} pronunciation`}
                  >
                    <FaVolumeUp size={16} />
                  </button>
                </>
              }
              badges={<Badge variant="accent">{word.category}</Badge>}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="mb-1 font-semibold text-brand-900">Pronunciation</h3>
                  <p className="text-gray-600">{word.pronunciation}</p>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-brand-900">Etymology</h3>
                  <p className="text-gray-600">{word.etymology}</p>
                </div>
                <div>
                  <h3 className="mb-1 font-semibold text-brand-900">Example</h3>
                  <div className="rounded-xl bg-surface-muted p-4">
                    <p className="mb-2 italic text-gray-700">
                      {word.example_greek}
                      <button
                        type="button"
                        onClick={() => speakForLanguage(word.example_greek, language, true)}
                        className="ml-2 text-brand-600 hover:text-brand-700"
                        title="Listen to Greek example"
                      >
                        <FaVolumeUp size={14} />
                      </button>
                    </p>
                    <p className="text-gray-600">
                      {word.example_translation}
                      <button
                        type="button"
                        onClick={() =>
                          speakForLanguage(word.example_translation, language, false)
                        }
                        className="ml-2 text-brand-600 hover:text-brand-700"
                        title={`Listen to ${langName} example`}
                      >
                        <FaVolumeUp size={14} />
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </ExpandableCard>
          ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
        </>
      )}
    </ListPageShell>
  );
};

export default TransparentWords;
