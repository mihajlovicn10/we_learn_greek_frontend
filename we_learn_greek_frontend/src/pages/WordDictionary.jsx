import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ROUTES } from '../constants/routes';
import { dictionaryAPI } from '../services/dictionary';
import { PageHero, SearchPageSection } from '../components/features';
import { Alert, Button, Card, FormField } from '../components/ui';
import { useHeroVideo } from '../hooks/useHeroVideo';
import { showToast } from '../components/common/Toast';

const HERO_HEADLINES = [
  'Greek Dictionary',
  'Expand Your Greek Vocabulary',
  'Learn New Greek Words',
  'Master Greek Language',
];

const WordDictionary = () => {
  const video = useHeroVideo('sea');
  const queryClient = useQueryClient();
  const [greekWord, setGreekWord] = useState('');
  const [pronunciation, setPronunciation] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState(null);

  const saveMutation = useMutation({
    mutationFn: (payload) => dictionaryAPI.addWord(payload),
    onSuccess: () => {
      setGreekWord('');
      setPronunciation('');
      setTranslation('');
      setError(null);
      showToast.success('Word saved successfully!');
      queryClient.invalidateQueries({ queryKey: ['saved-words'] });
    },
    onError: (err) => {
      const message =
        err.response?.data?.detail ||
        err.response?.data?.greek_word?.[0] ||
        'Failed to save word. Please try again.';
      setError(message);
      showToast.error(message);
    },
  });

  const handleSaveWord = (e) => {
    e.preventDefault();
    setError(null);

    if (!greekWord.trim() || !pronunciation.trim() || !translation.trim()) {
      setError('All fields are required');
      return;
    }

    saveMutation.mutate({
      greek_word: greekWord,
      pronounciation: pronunciation,
      translation,
    });
  };

  return (
    <>
      <PageHero video={video} headlines={HERO_HEADLINES} interval={4000} />

      <SearchPageSection title="Expand Your Vocabulary by Adding, Saving, and Practicing New Greek Words!">
        <Card padding="lg" className="w-full max-w-lg">
          <form onSubmit={handleSaveWord} className="space-y-5">
            <FormField
              label="Type Greek Word in Greek Alphabet"
              value={greekWord}
              onChange={(e) => setGreekWord(e.target.value)}
              variant="pill-dark"
              placeholder="e.g. Καλημέρα"
            />
            <FormField
              label="Type how it is pronounced (Latin Script)"
              value={pronunciation}
              onChange={(e) => setPronunciation(e.target.value)}
              variant="pill-dark"
              placeholder="e.g. Kaliméra"
            />
            <FormField
              label="Type Translation in Your Language"
              value={translation}
              onChange={(e) => setTranslation(e.target.value)}
              variant="pill-dark"
              placeholder="e.g. Good morning"
            />

            {error && <Alert variant="error">{error}</Alert>}

            <Button
              type="submit"
              variant="primary"
              shape="pill"
              fullWidth
              disabled={saveMutation.isPending}
            >
              {saveMutation.isPending ? 'Saving...' : 'Save Word'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            To see all saved words,{' '}
            <Link to={ROUTES.savedWords} className="font-medium text-brand-600 hover:text-brand-700">
              click here
            </Link>
          </p>
        </Card>
      </SearchPageSection>
    </>
  );
};

export default WordDictionary;
