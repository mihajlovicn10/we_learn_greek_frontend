import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { NAV_LINKS, ROUTES } from '../../constants/routes';
import { DonateButton } from '../features';
import LanguageSwitcher from './LanguageSwitcher';
import { prefetchOn } from '../../routes/pages';

const linkClass = ({ isActive }) =>
  `whitespace-nowrap rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive ? 'bg-white/15 font-semibold text-white' : 'text-brand-100 hover:bg-white/10 hover:text-white'
  }`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const { t } = useTranslation();

  const displayName = user?.first_name || user?.email?.split('@')[0] || t('nav.account');
  const closeMenu = () => setIsMenuOpen(false);

  const renderAuthLinks = (compact) => isAuthenticated ? (
    <div className="flex items-center gap-3">
      {/* The name only fits beside the full nav (longest in Greek) on very wide screens; the menu always has room. */}
      <span className={`items-center gap-2 text-sm text-brand-100 ${compact ? 'hidden 2xl:flex' : 'flex'}`}>
        <FaUser size={13} aria-hidden="true" />
        {displayName}
      </span>
      <button
        type="button"
        onClick={() => {
          logout();
          closeMenu();
        }}
        className="whitespace-nowrap rounded-lg border border-white/20 px-3 py-1.5 text-sm text-brand-100 transition-colors hover:bg-white/10 hover:text-white"
      >
        {t('nav.logOut')}
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link
        to={ROUTES.login}
        onClick={closeMenu}
        className="whitespace-nowrap text-sm text-brand-100 transition-colors hover:text-white"
      >
        {t('nav.logIn')}
      </Link>
      <Link
        to={ROUTES.register}
        onClick={closeMenu}
        className="whitespace-nowrap rounded-lg bg-white px-3 py-1.5 text-sm font-semibold text-brand-900 transition-colors hover:bg-brand-50"
      >
        {t('nav.signUp')}
      </Link>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-brand-900/95 backdrop-blur-md">
      <div className="page-container px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link
            to={ROUTES.home}
            onClick={closeMenu}
            className="flex shrink-0 items-center gap-2 font-display text-lg font-semibold text-white"
          >
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-xl"
              aria-hidden="true"
            >
              Ω
            </span>
            We Learn Greek
          </Link>

          <div className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map(({ labelKey, to }) => (
              <NavLink key={to} to={to} className={linkClass} {...prefetchOn(to)}>
                {t(labelKey)}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-4 xl:flex">
            <LanguageSwitcher />
            <DonateButton size="small" label={t('nav.support')} source="navbar" />
            {renderAuthLinks(true)}
          </div>

          <div className="flex items-center gap-3 xl:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="text-brand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="mt-3 border-t border-white/10 pt-3 xl:hidden">
            <div className="flex flex-col">
              {NAV_LINKS.map(({ labelKey, to }) => (
                <NavLink key={to} to={to} className={linkClass} onClick={closeMenu} {...prefetchOn(to)}>
                  {t(labelKey)}
                </NavLink>
              ))}
            </div>

            <div className="mt-2 border-t border-white/10 py-3">{renderAuthLinks(false)}</div>

            <DonateButton size="small" source="navbar-mobile" onClick={closeMenu} className="w-full" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
