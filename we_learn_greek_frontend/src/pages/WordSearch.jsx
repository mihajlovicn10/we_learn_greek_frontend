import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { ROUTES } from '../constants/routes';
import { declinatorAPI } from '../services/declinator';
import { PageHero, SearchPageSection } from '../components/features';
import { Alert, Card, SkeletonList } from '../components/ui';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useHeroVideo } from '../hooks/useHeroVideo';
import { normalizeListResponse } from '../services/apiHelpers';
import { ENABLE_DEMO_DATA } from '../config';
import { demoNouns } from '../data/demo';

const HERO_HEADLINES = [
  'Master Greek grammar with ease!',
  'Learn Greek nouns and cases!',
  'Explore Greek declensions!',
];

const WordSearch = () => {
  const video = useHeroVideo('background');
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebouncedValue(searchTerm, 400);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['noun-search', debouncedSearch],
    queryFn: () => declinatorAPI.searchNouns(debouncedSearch, 1, { page_size: 8 }),
    enabled: debouncedSearch.trim().length >= 2,
    retry: false,
  });

  const apiResults = normalizeListResponse(data);
  const demoResults =
    debouncedSearch.trim().length >= 2
      ? demoNouns.filter((n) =>
          n.basic_noun.toLowerCase().includes(debouncedSearch.toLowerCase())
        )
      : [];
  const results = isError && ENABLE_DEMO_DATA ? demoResults.slice(0, 8) : apiResults;

  return (
    <div className="flex min-h-screen flex-col">
      <PageHero video={video} headlines={HERO_HEADLINES} />

      <SearchPageSection
        title="Find Any Greek Noun and Explore Its Forms"
        helperText={
          <>
            To see all Greek nouns,{' '}
            <Link to={ROUTES.declinatorNouns} className="font-semibold underline hover:text-white">
              click here
            </Link>
          </>
        }
      >
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type a Greek noun..."
          className="w-full max-w-lg rounded-full bg-gray-900 px-4 py-3 text-center text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />

        <div className="mt-8 w-full max-w-3xl">
          {debouncedSearch.trim().length < 2 ? (
            <p className="text-center text-sm text-white/80">Type at least 2 characters to search.</p>
          ) : isLoading ? (
            <SkeletonList count={2} />
          ) : results.length === 0 ? (
            <p className="text-center text-white">No nouns found.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {results.map((noun) => (
                <Card key={noun.id} padding="sm" className="text-left">
                  <p className="font-display text-lg font-semibold text-brand-900">{noun.basic_noun}</p>
                  <p className="text-sm capitalize text-gray-500">{noun.gender}</p>
                </Card>
              ))}
            </div>
          )}
          {isError && ENABLE_DEMO_DATA && debouncedSearch.trim().length >= 2 && (
            <Alert variant="info" className="mt-4">
              API unavailable — showing demo matches.
            </Alert>
          )}
        </div>
      </SearchPageSection>
    </div>
  );
};

export default WordSearch;
