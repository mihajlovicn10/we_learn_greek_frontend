import { useState } from 'react';
import { FaVolumeUp } from 'react-icons/fa';
import { ROUTES } from '../constants/routes';
import { declinatorAPI } from '../services/declinator';
import { ExpandableCard, DeclensionTable, ListPageShell } from '../components/features';
import { Badge, EmptyState, FilterSelect, Pagination, Alert, SkeletonList } from '../components/ui';
import { useListData } from '../hooks/useListData';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { demoNouns } from '../data/demo';

const PAGE_SIZE = 5;

const demoFilterFn = (noun, term, filters) => {
  if (filters.gender && noun.gender !== filters.gender) return false;
  if (term.trim() && !noun.basic_noun.toLowerCase().includes(term.toLowerCase())) return false;
  return true;
};

const WordList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [expandedNoun, setExpandedNoun] = useState(null);
  const { speak } = useTextToSpeech();

  const filters = { gender: genderFilter };

  const { items: nouns, currentPage, totalPages, paginate, loading, error, isDemo } = useListData({
    queryKey: ['nouns'],
    fetchFn: (page, params) => declinatorAPI.getAllNouns(page, params),
    pageSize: PAGE_SIZE,
    searchTerm,
    filters,
    filterKey: genderFilter,
    demoItems: demoNouns,
    demoFilterFn,
  });

  return (
    <ListPageShell
      title="Greek Nouns"
      backTo={ROUTES.declinator}
      backLabel="Return to noun search"
      searchTerm={searchTerm}
      onSearchChange={(e) => setSearchTerm(e.target.value)}
      searchPlaceholder="Search nouns..."
      filter={
        <FilterSelect value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
          <option value="">All Genders</option>
          <option value="masculine">Masculine</option>
          <option value="feminine">Feminine</option>
          <option value="neuter">Neuter</option>
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
      ) : nouns.length === 0 ? (
        <EmptyState
          message={
            searchTerm || genderFilter
              ? 'No nouns match your search criteria.'
              : 'No nouns found in the database.'
          }
          actionLabel={!searchTerm && !genderFilter ? 'Return to noun search' : undefined}
          actionTo={!searchTerm && !genderFilter ? ROUTES.declinator : undefined}
        />
      ) : (
        <>
          {nouns.map((noun) => (
            <ExpandableCard
              key={noun.id}
              expanded={expandedNoun === noun.id}
              onToggle={() => setExpandedNoun((prev) => (prev === noun.id ? null : noun.id))}
              expandLabel="Show Declension"
              collapseLabel="Hide Declension"
              header={
                <>
                  <span className="font-display text-xl font-semibold text-brand-900">
                    {noun.basic_noun}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      speak(noun.basic_noun);
                    }}
                    className="text-brand-600 hover:text-brand-700"
                    title="Listen to pronunciation"
                  >
                    <FaVolumeUp size={16} />
                  </button>
                </>
              }
              badges={<Badge variant="olive">{noun.gender}</Badge>}
            >
              <DeclensionTable title="Singular" noun={noun} number="singular" />
              <DeclensionTable title="Plural" noun={noun} number="plural" />
            </ExpandableCard>
          ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
        </>
      )}
    </ListPageShell>
  );
};

export default WordList;
