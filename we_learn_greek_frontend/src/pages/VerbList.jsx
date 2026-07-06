import { useState, useCallback } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { ROUTES } from '../constants/routes';
import { conjugatorAPI } from '../services/conjugator';
import { ExpandableCard, ConjugationTable, ListPageShell } from '../components/features';
import { Badge, EmptyState, FilterSelect, Pagination, Alert, SkeletonList } from '../components/ui';
import { useListData } from '../hooks/useListData';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { demoVerbs } from '../data/demo';

const PAGE_SIZE = 5;

const demoFilterFn = (verb, term, filters) => {
  if (filters.verb_type && verb.verb_type !== filters.verb_type) return false;
  if (term.trim() && !verb.infinitive.toLowerCase().includes(term.toLowerCase())) return false;
  return true;
};

const VerbList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [verbTypeFilter, setVerbTypeFilter] = useState('');
  const [expandedVerb, setExpandedVerb] = useState(null);
  const [conjugations, setConjugations] = useState({});
  const [loadingConjugation, setLoadingConjugation] = useState(null);
  const { speak } = useTextToSpeech();

  const filters = { verb_type: verbTypeFilter };

  const { items: verbs, currentPage, totalPages, paginate, loading, error, isDemo } = useListData({
    queryKey: ['verbs'],
    fetchFn: (page, params) => conjugatorAPI.getAllVerbs(page, params),
    pageSize: PAGE_SIZE,
    searchTerm,
    filters,
    filterKey: verbTypeFilter,
    demoItems: demoVerbs,
    demoFilterFn,
  });

  const toggleExpandVerb = useCallback(
    async (verb) => {
      const id = verb.id;
      if (expandedVerb === id) {
        setExpandedVerb(null);
        return;
      }

      setExpandedVerb(id);

      if (verb.present_first_singular || isDemo) return;

      if (conjugations[id]) return;

      try {
        setLoadingConjugation(id);
        const data = await conjugatorAPI.getConjugation(id);
        setConjugations((prev) => ({ ...prev, [id]: data }));
      } catch {
        // Card may still show partial list fields if API fails
      } finally {
        setLoadingConjugation(null);
      }
    },
    [expandedVerb, conjugations, isDemo]
  );

  const getVerbDetails = (verb) => conjugations[verb.id] || verb;

  return (
    <ListPageShell
      title="Greek Verbs"
      backTo={ROUTES.verbSearch}
      backLabel="Return to verb search"
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      searchPlaceholder="Search verbs..."
      filter={
        <FilterSelect value={verbTypeFilter} onChange={(e) => setVerbTypeFilter(e.target.value)}>
          <option value="">All Types</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
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
      ) : verbs.length === 0 ? (
        <EmptyState
          message={
            searchTerm || verbTypeFilter
              ? 'No verbs match your search criteria.'
              : 'No verbs found in the database.'
          }
          actionLabel={!searchTerm && !verbTypeFilter ? 'Return to verb search' : undefined}
          actionTo={!searchTerm && !verbTypeFilter ? ROUTES.verbSearch : undefined}
        />
      ) : (
        <>
          {verbs.map((verb) => {
            const details = getVerbDetails(verb);
            return (
              <ExpandableCard
                key={verb.id}
                expanded={expandedVerb === verb.id}
                onToggle={() => toggleExpandVerb(verb)}
                expandLabel="Show Conjugation"
                collapseLabel="Hide Conjugation"
                header={
                  <>
                    <span className="font-display text-xl font-semibold text-brand-900">
                      {verb.infinitive}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        speak(verb.infinitive);
                      }}
                      className="text-brand-600 hover:text-brand-700"
                      title="Listen to pronunciation"
                    >
                      <FaVolumeUp size={16} />
                    </button>
                  </>
                }
                badges={<Badge variant="brand">{verb.verb_type}</Badge>}
              >
                {loadingConjugation === verb.id ? (
                  <SkeletonList count={1} />
                ) : (
                  <>
                    <ConjugationTable title="Present Tense" verb={details} tense="present" />
                    <ConjugationTable title="Aorist Tense" verb={details} tense="aorist" />
                    <ConjugationTable title="Future Tense" verb={details} tense="future" />
                  </>
                )}
              </ExpandableCard>
            );
          })}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
        </>
      )}
    </ListPageShell>
  );
};

export default VerbList;
