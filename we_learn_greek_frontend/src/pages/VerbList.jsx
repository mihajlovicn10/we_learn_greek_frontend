import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { conjugatorAPI } from '../services/conjugator';
import {
  ExpandableCard,
  ConjugationTable,
  ListPageShell,
  SaveWordButton,
  WordTitle,
  InfiniteScroll,
} from '../components/features';
import { Badge, EmptyState, FilterSelect, Alert, SkeletonList } from '../components/ui';
import { AnimatedItem } from '../components/motion';
import { useListData } from '../hooks/useListData';
import { useSearchQuery } from '../hooks/useSearchQuery';
import { useExpandable } from '../hooks/useExpandable';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { matchesGreek } from '../utils/greek';
import { demoVerbs } from '../data/demo';

const PAGE_SIZE = 20;
const VERB_TYPES = ['A1', 'A2', 'B1', 'B2'];

const demoFilterFn = (verb, term, filters) => {
  if (filters.verb_type && verb.verb_type !== filters.verb_type) return false;
  return matchesGreek(verb.infinitive, term) || matchesGreek(verb.translation, term);
};

/** List items normally include every form; fetch the conjugation only if they don't. */
function VerbConjugation({ verb }) {
  const hasForms = Boolean(verb.present_first_singular);
  const { data, isLoading } = useQuery({
    queryKey: ['verb-conjugation', verb.id],
    queryFn: () => conjugatorAPI.getConjugation(verb.id),
    enabled: !hasForms,
  });

  if (!hasForms && isLoading) return <SkeletonList count={1} />;
  return <ConjugationTable verb={hasForms ? verb : { ...verb, ...data }} />;
}

/** Verbs: search any verb and see it conjugated in every tense. (Formerly "Conjugator".) */
const VerbList = () => {
  const [query, setQuery] = useSearchQuery();
  const [verbTypeFilter, setVerbTypeFilter] = useState('');
  const { speak } = useTextToSpeech();
  const { t } = useTranslation();

  const filters = { verb_type: verbTypeFilter };

  const {
    items: verbs,
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
    queryKey: ['verbs'],
    fetchFn: (page, params) => conjugatorAPI.getAllVerbs(page, params),
    pageSize: PAGE_SIZE,
    searchTerm: query,
    filters,
    demoItems: demoVerbs,
    demoFilterFn,
  });

  const { isOpen, toggle } = useExpandable(verbs, query);

  return (
    <ListPageShell
      title={t('verbs.title')}
      subtitle={t('verbs.subtitle')}
      query={query}
      onQueryChange={setQuery}
      searchPlaceholder={t('verbs.placeholder')}
      searchHint={t('verbs.hint')}
      filter={
        <FilterSelect
          value={verbTypeFilter}
          onChange={(e) => setVerbTypeFilter(e.target.value)}
          aria-label={t('verbs.filterLabel')}
        >
          <option value="">{t('verbs.allTypes')}</option>
          {VERB_TYPES.map((type) => (
            <option key={type} value={type}>
              {t('verbs.type', { type })}
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
      ) : verbs.length === 0 ? (
        <EmptyState
          title={query ? t('verbs.noMatch', { query }) : t('verbs.empty')}
          message={query || verbTypeFilter ? t('search.noMatchHint') : t('verbs.emptyMessage')}
        />
      ) : (
        <div
          className={`transition-opacity duration-200 ${refreshing ? 'opacity-60' : ''}`}
          aria-busy={refreshing}
        >
          {verbs.map((verb, index) => (
            <AnimatedItem key={verb.id} index={index} batchSize={PAGE_SIZE}>
              <ExpandableCard
                expanded={isOpen(verb.id)}
                onToggle={() => toggle(verb.id)}
                expandLabel={t('verbs.show')}
                collapseLabel={t('verbs.hide')}
                header={
                  <WordTitle
                    greek={verb.infinitive}
                    translation={verb.translation}
                    onSpeak={() => speak(verb.infinitive)}
                  />
                }
                badges={
                  <>
                    {verb.verb_type && <Badge variant="brand">{t('verbs.type', { type: verb.verb_type })}</Badge>}
                    <SaveWordButton greek={verb.infinitive} translation={verb.translation} />
                  </>
                }
              >
                <VerbConjugation verb={verb} />
              </ExpandableCard>
            </AnimatedItem>
          ))}
          <InfiniteScroll
            shown={verbs.length}
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

export default VerbList;
