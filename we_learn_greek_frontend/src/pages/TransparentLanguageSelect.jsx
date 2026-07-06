import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants/routes';
import { PageHero, LanguagePicker, SearchPageSection } from '../components/features';
import { useHeroVideo } from '../hooks/useHeroVideo';

import ukFlag from '../assets/images/flags/uk.png';
import frFlag from '../assets/images/flags/france.png';
import deFlag from '../assets/images/flags/germany.png';
import esFlag from '../assets/images/flags/spain.png';
import ruFlag from '../assets/images/flags/russia.png';
import itFlag from '../assets/images/flags/italy.png';

const HERO_HEADLINES = [
  'Discover Greek Roots in Other Languages',
  'Explore how Greek shaped English, French, German, Spanish, and more',
  'Learn the etymology of words derived from Greek',
  'See the influence of Greek across modern languages',
  'Uncover the hidden Greek origins in everyday vocabulary',
];

const LANGUAGES = [
  { code: 'en', name: 'English', flag: ukFlag },
  { code: 'fr', name: 'French', flag: frFlag },
  { code: 'de', name: 'German', flag: deFlag },
  { code: 'es', name: 'Spanish', flag: esFlag },
  { code: 'ru', name: 'Russian', flag: ruFlag },
  { code: 'it', name: 'Italian', flag: itFlag },
];

const TransparentLanguageSelect = () => {
  const navigate = useNavigate();
  const video = useHeroVideo('sea');

  return (
    <div className="flex flex-col">
      <PageHero video={video} headlines={HERO_HEADLINES} interval={4000} />

      <SearchPageSection title="Choose Your Language">
        <LanguagePicker
          languages={LANGUAGES}
          onSelect={(code) => navigate(ROUTES.transparentWords(code))}
        />
      </SearchPageSection>
    </div>
  );
};

export default TransparentLanguageSelect;
