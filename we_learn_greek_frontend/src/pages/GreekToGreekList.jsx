import { useTranslation } from 'react-i18next';
import { greekToGreekAPI } from '../services/greekToGreek';
import { InfiniteScroll, ListPageShell, SaveWordButton, WordTitle } from '../components/features';
import { Alert, Card, EmptyState, SkeletonList } from '../components/ui';
import { AnimatedItem } from '../components/motion';
import { useListData } from '../hooks/useListData';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { matchesGreek } from '../utils/greek';
import { demoGreekToGreek } from '../data/demo';

const PAGE_SIZE = 24;

const demoFilterFn = (entry, term) =>
  matchesGreek(entry.word, term) || matchesGreek(entry.explanation, term);

/** Monolingual dictionary: Greek words explained in simple Greek. API fields: word, explanation. */
function GreekToGreekList() {
  const [query, setQuery] = useSearchQuery();
  const { speak } = useTextToSpeech();
  const { t } = useTranslation();

  const {
    items: entries,
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
    queryKey: ['greek-to-greek'],
    fetchFn: (page, params) => greekToGreekAPI.getAllWords(page, params),
    pageSize: PAGE_SIZE,
    searchTerm: query,
    demoItems: demoGreekToGreek,
    demoFilterFn,
  });

  return (
    <ListPageShell
      title={t('definitions.title')}
      subtitle={t('definitions.subtitle')}
      query={query}
      onQueryChange={setQuery}
      searchPlaceholder={t('definitions.placeholder')}
      searchHint={t('definitions.hint')}
    >
      {isDemo && (
        <Alert variant="info" className="mb-4">
          {t('common.demoData')}
        </Alert>
      )}

      {loading ? (
        <SkeletonList count={4} />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : entries.length === 0 ? (
        <EmptyState
          title={query ? t('definitions.noMatch', { query }) : t('definitions.empty')}
          message={query ? t('definitions.noMatchMessage') : t('definitions.emptyMessage')}
        />
      ) : (
        <div
          className={`transition-opacity duration-200 ${refreshing ? 'opacity-60' : ''}`}
          aria-busy={refreshing}
        >
          <div className="grid gap-4 md:grid-cols-2">
            {entries.map((entry, index) => (
              <AnimatedItem key={entry.id} index={index} batchSize={PAGE_SIZE}>
                <Card className="flex h-full flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <WordTitle greek={entry.word} onSpeak={() => speak(entry.word)} />
                    <SaveWordButton greek={entry.word} />
                  </div>
                  <p className="text-gray-700" lang="el">
                    {entry.explanation}
                  </p>
                </Card>
              </AnimatedItem>
            ))}
          </div>
          <InfiniteScroll
            shown={entries.length}
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
}

export default GreekToGreekList;
