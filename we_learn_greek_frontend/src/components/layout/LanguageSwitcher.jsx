import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../../i18n';

/** EN / ΕΛ toggle. The choice is saved in localStorage by the i18n language detector. */
function LanguageSwitcher({ className = '' }) {
  const { t, i18n } = useTranslation();
  const current = i18n.resolvedLanguage;

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className={`inline-flex rounded-lg bg-white/10 p-0.5 ${className}`}
    >
      {LANGUAGES.map(({ code, short }) => {
        const active = current === code;
        return (
          <button
            key={code}
            type="button"
            lang={code}
            onClick={() => i18n.changeLanguage(code)}
            aria-pressed={active}
            aria-label={t('language.switchTo', { language: t(`language.${code}`) })}
            className={`rounded-md px-2 py-1 text-xs font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              active ? 'bg-white text-brand-900' : 'text-brand-100 hover:text-white'
            }`}
          >
            {short}
          </button>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
