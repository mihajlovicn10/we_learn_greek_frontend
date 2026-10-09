import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { prefetchOn } from '../../routes/pages';

const CARD =
  'group flex h-full flex-col items-center rounded-2xl bg-surface p-5 text-center shadow-card transition-all duration-300';

/**
 * Language cards for Word Roots. `count` comes from the API: a number shows "N words",
 * 0 means the language's content isn't loaded yet ("Coming soon", not clickable), and
 * undefined (loading, or API unreachable) leaves the card usable.
 */
function LanguagePicker({ languages, linkTo }) {
  const { t } = useTranslation();

  return (
    <div className="grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
      {languages.map((lang) => {
        const name = t(`wordRoots.languages.${lang.code}`);
        const comingSoon = lang.count === 0;

        const body = (
          <>
            <div
              aria-hidden="true"
              className={`mb-3 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold tracking-wide ring-2 transition-colors duration-300 ${
                comingSoon
                  ? 'bg-gray-100 text-gray-400 ring-gray-200'
                  : 'bg-brand-50 text-brand-700 ring-brand-100 group-hover:bg-brand-600 group-hover:text-white'
              }`}
            >
              {lang.label}
            </div>
            <span className={`font-semibold ${comingSoon ? 'text-gray-500' : 'text-brand-900'}`}>{name}</span>
            <span className="mt-0.5 text-xs text-gray-500">
              <bdi>{lang.example}</bdi>
            </span>
            {comingSoon ? (
              <span className="mt-3 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                {t('wordRoots.comingSoon')}
              </span>
            ) : (
              typeof lang.count === 'number' && (
                <span className="mt-3 rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                  {t('wordRoots.wordCount', { count: lang.count })}
                </span>
              )
            )}
          </>
        );

        return comingSoon ? (
          <div key={lang.code} className={`${CARD} opacity-80`} aria-label={`${name}: ${t('wordRoots.comingSoon')}`}>
            {body}
          </div>
        ) : (
          <Link
            key={lang.code}
            to={linkTo(lang.code)}
            {...prefetchOn(linkTo(lang.code))}
            className={`${CARD} hover:-translate-y-1 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500`}
          >
            {body}
          </Link>
        );
      })}
    </div>
  );
}

export default LanguagePicker;
