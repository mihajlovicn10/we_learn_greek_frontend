import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import el from './locales/el.json';

export const LANGUAGES = [
  { code: 'en', short: 'EN' },
  { code: 'el', short: 'ΕΛ' },
];

const STORAGE_KEY = 'wlg-language';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, el: { translation: el } },
    fallbackLng: 'en',
    supportedLngs: LANGUAGES.map((lang) => lang.code),
    nonExplicitSupportedLngs: true, // el-GR, el-CY → el
    load: 'languageOnly',
    // A saved choice wins; otherwise follow the browser (Greek browsers get Greek), else English.
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false }, // React already escapes
  });

// Keep <html lang> in sync: screen readers, hyphenation, and Greek all-caps (drops accents) rely on it.
const syncHtmlLang = (lng) => {
  document.documentElement.lang = lng?.split('-')[0] || 'en';
};
syncHtmlLang(i18n.resolvedLanguage);
i18n.on('languageChanged', syncHtmlLang);

/** Current language code ('en' | 'el'), for Intl formatting. */
export const currentLanguage = () => i18n.resolvedLanguage || 'en';

export default i18n;
