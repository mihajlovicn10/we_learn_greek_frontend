import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const FOOTER_LINKS = [
  { label: 'About', to: ROUTES.about },
  { label: 'Contact', to: ROUTES.contact },
  { label: 'Privacy', to: ROUTES.privacy },
  { label: 'Terms', to: ROUTES.terms },
];

const FEATURE_LINKS = [
  { label: 'Dictionary', to: ROUTES.dictionary },
  { label: 'Declinator', to: ROUTES.declinator },
  { label: 'Conjugator', to: ROUTES.verbSearch },
  { label: 'Greek to Greek', to: ROUTES.greekToGreek },
  { label: 'Transparent Words', to: ROUTES.transparentLanguageSelect },
];

const Footer = () => {
  return (
    <footer className="mt-auto bg-brand-900 text-brand-100">
      <div className="page-container px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-white">We Learn Greek</h2>
            <p className="mt-2 text-sm text-brand-200">
              Learn Modern Greek with dictionaries, conjugations, declensions, and more.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              Features
            </h3>
            <ul className="space-y-2 text-sm">
              {FEATURE_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-white">
              Company
            </h3>
            <ul className="space-y-2 text-sm">
              {FOOTER_LINKS.map(({ label, to }) => (
                <li key={to}>
                  <Link to={to} className="transition-colors hover:text-white">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-brand-200">
          © {new Date().getFullYear()} We Learn Greek. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
