import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { prefetchOn } from '../../routes/pages';

function LanguagePicker({ languages, linkTo }) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          to={linkTo(lang.code)}
          {...prefetchOn(linkTo(lang.code))}
          className="group flex flex-col items-center rounded-2xl bg-surface p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
        >
          <div className="mb-3 h-16 w-16 overflow-hidden rounded-full ring-2 ring-brand-100">
            <img
              src={lang.flag}
              alt=""
              width={64}
              height={64}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="font-semibold text-brand-900">{t(`wordRoots.languages.${lang.code}`)}</span>
          <span className="mt-0.5 text-xs text-gray-500">{lang.example}</span>
        </Link>
      ))}
    </div>
  );
}

export default LanguagePicker;
