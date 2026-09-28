import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaVolumeUp } from 'react-icons/fa';
import { ROUTES } from '../constants/routes';
import { transparentWordsAPI } from '../services/transparentWords';
import {
  ExpandableCard,
  ListPageShell,
  SaveWordButton,
  WordTitle,
  InfiniteScroll,
} from '../components/features';
import { Badge, EmptyState, FilterSelect, Alert, SkeletonList } from '../components/ui';
import { AnimatedItem } from '../components/motion';
import { useListData } from '../hooks/useListData';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { useExpandable } from '../hooks/useExpandable';
import { matchesGreek } from '../utils/greek';
import { demoWords, localizeDemoWords } from '../data/demo';

const PAGE_SIZE = 20;

const KNOWN_LANGUAGES = ['en', 'fr', 'de', 'es', 'ru', 'it'];

const demoFilterFn = (word, term, filters) => {
  if (filters.category && word.category !== filters.category) return false;
  return matchesGreek(word.greek_word, term) || matchesGreek(word.language_word, term);
};

const TransparentWords = () => {
  const { language } = useParams();
  const [query, setQuery] = useSearchQuery();
  const [categoryFilter, setCategoryFilter] = useState('');
  const { speakForLanguage } = useTextToSpeech();
  const { t } = useTranslation();

  const localizedDemo = useMemo(
    () => localizeDemoWords(demoWords, language),
    [language]
  );

  const filters = { category: categoryFilter };

  const {
    items: words,
    total,
    loading,
    refreshing,
    error,
    isDemo,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    loadMoreError,
  } = useListData({
    queryKey: ['transparent-words', language],
    fetchFn: (page, params) =>
      transparentWordsAPI.getWordsByLanguage(language, page, params),
    pageSize: PAGE_SIZE,
    searchTerm: query,
    filters,
    demoItems: localizedDemo,
    demoFilterFn,
  });

  const categories = useMemo(() => {
    const source = isDemo ? localizedDemo : words;
    return [...new Set(source.map((w) => w.category))];
  }, [isDemo, localizedDemo, words]);
  const langName = t(`wordRoots.languages.${KNOWN_LANGUAGES.includes(language) ? language : 'other'}`);
  const { isOpen, toggle } = useExpandable(words, query);

  return (
    <ListPageShell
      title={t('wordRoots.listTitle', { language: langName })}
      subtitle={t('wordRoots.listSubtitle', { language: langName })}
      actions={
        <Link
          to={ROUTES.wordRoots}
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-700 hover:text-brand-800"
        >
          <FaArrowLeft size={12} aria-hidden="true" /> {t('wordRoots.otherLanguages')}
        </Link>
      }
      query={query}
      onQueryChange={setQuery}
      searchPlaceholder={t('wordRoots.placeholder', { language: langName })}
      filter={
        <FilterSelect
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label={t('wordRoots.filterLabel')}
        >
          <option value="">{t('wordRoots.allCategories')}</option>
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
          {t('common.demoData')}
        </Alert>
      )}

      {loading ? (
        <SkeletonList count={3} />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : words.length === 0 ? (
        <EmptyState
          message={
            query || categoryFilter ? t('wordRoots.noMatch') : t('wordRoots.empty')
          }
          actionLabel={t('wordRoots.chooseAnother')}
          actionTo={ROUTES.wordRoots}
        />
      ) : (
        <div
          className={`transition-opacity duration-200 ${refreshing ? 'opacity-60' : ''}`}
          aria-busy={refreshing}
        >
          {words.map((word, index) => (
            <AnimatedItem key={word.id} index={index} batchSize={PAGE_SIZE}>
              <ExpandableCard
                expanded={isOpen(word.id)}
                onToggle={() => toggle(word.id)}
                expandLabel={t('wordRoots.show')}
                collapseLabel={t('wordRoots.hide')}
                header={
                  <>
                    <WordTitle
                      greek={word.greek_word}
                      size="md"
                      onSpeak={() => speakForLanguage(word.greek_word, language, true)}
                    />
                    <span className="text-gray-400">→</span>
                    <span className="text-lg font-semibold text-gray-700">{word.language_word}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speakForLanguage(word.language_word, language, false);
                      }}
                      className="text-brand-600 hover:text-brand-700"
                      title={t('wordRoots.listenLanguage', { language: langName })}
                      aria-label={t('wordRoots.listenLanguage', { language: langName })}
                    >
                      <FaVolumeUp size={16} />
                    </button>
                  </>
                }
                badges={
                  <>
                    <Badge variant="accent">{word.category}</Badge>
                    <SaveWordButton
                      greek={word.greek_word}
                      translation={word.language_word}
                      pronunciation={word.pronunciation}
                    />
                  </>
                }
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-1 font-semibold text-brand-900">{t('wordRoots.pronunciation')}</h3>
                    <p className="text-gray-600">{word.pronunciation}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-brand-900">{t('wordRoots.etymology')}</h3>
                    <p className="text-gray-600">{word.etymology}</p>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-brand-900">{t('wordRoots.example')}</h3>
                    <div className="rounded-xl bg-surface-muted p-4">
                      <p className="mb-2 italic text-gray-700">
                        {word.example_greek}
                        <button
                          type="button"
                          onClick={() => speakForLanguage(word.example_greek, language, true)}
                          className="ml-2 text-brand-600 hover:text-brand-700"
                          title={t('wordRoots.listenGreekExample')}
                          aria-label={t('wordRoots.listenGreekExample')}
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
                          title={t('wordRoots.listenLanguageExample', { language: langName })}
                          aria-label={t('wordRoots.listenLanguageExample', { language: langName })}
                        >
                          <FaVolumeUp size={14} />
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </ExpandableCard>
            </AnimatedItem>
          ))}
          <InfiniteScroll
            shown={words.length}
            pageSize={PAGE_SIZE}
            total={total}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            error={loadMoreError}
          />
        </div>
      )}
    </ListPageShell>
  );
};

export default TransparentWords;
