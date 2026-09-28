import { useTranslation } from 'react-i18next';
import { ROUTES } from '../constants/routes';
import { LanguagePicker, ListPageShell } from '../components/features';

import ukFlag from '../assets/images/flags/uk.png';
import frFlag from '../assets/images/flags/france.png';
import deFlag from '../assets/images/flags/germany.png';
import esFlag from '../assets/images/flags/spain.png';
import ruFlag from '../assets/images/flags/russia.png';
import itFlag from '../assets/images/flags/italy.png';

const LANGUAGES = [
  { code: 'en', flag: ukFlag, example: 'δημοκρατία → democracy' },
  { code: 'fr', flag: frFlag, example: 'φιλοσοφία → philosophie' },
  { code: 'de', flag: deFlag, example: 'μουσική → Musik' },
  { code: 'es', flag: esFlag, example: 'τηλέφωνο → teléfono' },
  { code: 'ru', flag: ruFlag, example: 'γεωγραφία → география' },
  { code: 'it', flag: itFlag, example: 'αστρονομία → astronomia' },
];

/** Word Roots: pick your language to see Greek words you already know. (Formerly "Transparent Words".) */
const TransparentLanguageSelect = () => {
  const { t } = useTranslation();
  return (
    <ListPageShell title={t('wordRoots.title')} subtitle={t('wordRoots.subtitle')}>
      <LanguagePicker languages={LANGUAGES} linkTo={ROUTES.wordRootsLanguage} />
    </ListPageShell>
  );
};

export default TransparentLanguageSelect;
