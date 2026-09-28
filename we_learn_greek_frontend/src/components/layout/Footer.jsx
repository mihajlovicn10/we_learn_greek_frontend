import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { NAV_LINKS, ROUTES } from '../../constants/routes';
import { DonateButton } from '../features';
import { prefetchOn } from '../../routes/pages';

const FOOTER_LINKS = [
  { labelKey: 'footer.about', to: ROUTES.about },
  { labelKey: 'footer.contact', to: ROUTES.contact },
  { labelKey: 'footer.privacy', to: ROUTES.privacy },
  { labelKey: 'footer.terms', to: ROUTES.terms },
  { labelKey: 'footer.supportUs', to: ROUTES.support },
];

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="mt-auto bg-brand-900 text-brand-100">
      <div className="page-container px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">We Learn Greek</h2>
            <p className="mt-2 text-sm text-brand-200">
              {t('footer.tagline')}
            </p>
            <DonateButton size="small" source="footer" className="mt-4" />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              {t('footer.learn')}
            </h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map(({ labelKey, to }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-white" {...prefetchOn(to)}>
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              {t('footer.company')}
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.map(({ labelKey, to }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-white" {...prefetchOn(to)}>
                    {t(labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-brand-200">
          {t('footer.rights', { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
