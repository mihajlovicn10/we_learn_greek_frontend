import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { declinatorAPI } from '../services/declinator';
import {
  ExpandableCard,
  DeclensionTable,
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
import { demoNouns } from '../data/demo';

const PAGE_SIZE = 20;

const demoFilterFn = (noun, term, filters) => {
  if (filters.gender && noun.gender !== filters.gender) return false;
  return (
    matchesGreek(noun.basic_noun, term) ||
    matchesGreek(noun.nominative_plural, term) ||
    matchesGreek(noun.translation, term)
  );
};

/** Nouns: search any noun and see every case, with articles. (Formerly "Declinator".) */
const WordList = () => {
  const [query, setQuery] = useSearchQuery();
  const [genderFilter, setGenderFilter] = useState('');
  const { speak } = useTextToSpeech();
  const { t } = useTranslation();

  const filters = { gender: genderFilter };

  const {
    items: nouns,
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
    queryKey: ['nouns'],
    fetchFn: (page, params) => declinatorAPI.getAllNouns(page, params),
    pageSize: PAGE_SIZE,
    searchTerm: query,
    filters,
    demoItems: demoNouns,
    demoFilterFn,
  });

  const { isOpen, toggle } = useExpandable(nouns, query);

  return (
    <ListPageShell
      title={t('nouns.title')}
      subtitle={t('nouns.subtitle')}
      query={query}
      onQueryChange={setQuery}
      searchPlaceholder={t('nouns.placeholder')}
      searchHint={t('nouns.hint')}
      filter={
        <FilterSelect
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
          aria-label={t('nouns.filterLabel')}
        >
          <option value="">{t('nouns.allGenders')}</option>
          <option value="masculine">{t('nouns.masculine')}</option>
          <option value="feminine">{t('nouns.feminine')}</option>
          <option value="neuter">{t('nouns.neuter')}</option>
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
      ) : nouns.length === 0 ? (
        <EmptyState
          title={query ? t('nouns.noMatch', { query }) : t('nouns.empty')}
          message={query || genderFilter ? t('search.noMatchHint') : t('nouns.emptyMessage')}
        />
      ) : (
        <div
          className={`transition-opacity duration-200 ${refreshing ? 'opacity-60' : ''}`}
          aria-busy={refreshing}
        >
          {nouns.map((noun, index) => (
            <AnimatedItem key={noun.id} index={index} batchSize={PAGE_SIZE}>
              <ExpandableCard
                expanded={isOpen(noun.id)}
                onToggle={() => toggle(noun.id)}
                expandLabel={t('nouns.show')}
                collapseLabel={t('nouns.hide')}
                header={
                  <WordTitle
                    greek={noun.basic_noun}
                    translation={noun.translation}
                    onSpeak={() => speak(noun.basic_noun)}
                  />
                }
                badges={
                  <>
                    <Badge variant="olive">
                      {t(`grammar.gender.${noun.gender}`, { defaultValue: noun.gender })}
                    </Badge>
                    <SaveWordButton greek={noun.basic_noun} translation={noun.translation} />
                  </>
                }
              >
                <DeclensionTable noun={noun} />
              </ExpandableCard>
            </AnimatedItem>
          ))}
          <InfiniteScroll
            shown={nouns.length}
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

export default WordList;
