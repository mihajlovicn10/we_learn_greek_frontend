import { useTranslation } from 'react-i18next';
import { useQueries } from '@tanstack/react-query';
import { transparentWordsAPI } from '../services/transparentWords';
import { ROUTES } from '../constants/routes';
import { LanguagePicker, ListPageShell } from '../components/features';

// `code` is the ISO 639-1 code used in the URL and the API; `label` is what the badge shows
// (Ukrainian is "uk" underneath but shown as "UA"). Every language is listed; one whose content
// file (backend content/transparent-words/<code>.json) isn't loaded yet shows as "Coming soon"
// and becomes available on its own once the API has words for it, with no frontend deploy.
const LANGUAGES = [
  { code: 'en', label: 'EN', example: 'δημοκρατία → democracy' },
  { code: 'fr', label: 'FR', example: 'φιλοσοφία → philosophie' },
  { code: 'de', label: 'DE', example: 'μουσική → Musik' },
  { code: 'es', label: 'ES', example: 'τηλέφωνο → teléfono' },
  { code: 'it', label: 'IT', example: 'αστρονομία → astronomia' },
  { code: 'ru', label: 'RU', example: 'γεωγραφία → география' },
  { code: 'sr', label: 'SR', example: 'φιλοσοφία → филозофија' },
  { code: 'uk', label: 'UA', example: 'φιλοσοφία → філософія' },
  { code: 'ar', label: 'AR', example: 'φιλοσοφία → فلسفة' },
];

/** Word Roots: pick your language to see Greek words you already know. (Formerly "Transparent Words".) */
const TransparentLanguageSelect = () => {
  const { t } = useTranslation();

  // Word count per language. While loading or if the API is unreachable, every card stays usable.
  const counts = useQueries({
    queries: LANGUAGES.map(({ code }) => ({
      queryKey: ['transparent-words-count', code],
      queryFn: () => transparentWordsAPI.getLanguageCount(code),
      staleTime: 10 * 60_000,
      retry: false,
    })),
  });

  const languages = LANGUAGES.map((lang, index) => ({ ...lang, count: counts[index].data }));

  return (
    <ListPageShell title={t('wordRoots.title')} subtitle={t('wordRoots.subtitle')}>
      <LanguagePicker languages={languages} linkTo={ROUTES.wordRootsLanguage} />
    </ListPageShell>
  );
};

export default TransparentLanguageSelect;
