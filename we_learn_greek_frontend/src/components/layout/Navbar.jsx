import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { MORE_MENU_ROUTES, ROUTES } from '../../constants/routes';

const NAV_LINKS = [
  { label: 'Declinator', to: ROUTES.declinator },
  { label: 'Conjugator', to: ROUTES.verbSearch },
  { label: 'Dictionary', to: ROUTES.dictionary },
  { label: 'Greek to Greek', to: ROUTES.greekToGreek },
  { label: 'Transparent Words', to: ROUTES.transparentLanguageSelect },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const displayName =
    user?.first_name ||
    user?.email?.split('@')[0] ||
    'Account';

  const handleMoreChange = (e) => {
    const value = e.target.value;
    if (!value) return;
    const path = MORE_MENU_ROUTES[value];
    if (path) {
      navigate(path);
      setIsMenuOpen(false);
    }
    e.target.value = '';
  };

  const closeMenu = () => setIsMenuOpen(false);

  const authLinks = isAuthenticated ? (
    <div className="flex items-center gap-3">
      <span className="flex items-center gap-2 text-sm text-brand-100">
        <FaUser size={14} />
        {displayName}
      </span>
      <button
        type="button"
        onClick={() => {
          logout();
          closeMenu();
        }}
        className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-brand-100 transition-colors hover:bg-white/10 hover:text-white"
      >
        Logout
      </button>
    </div>
  ) : (
    <div className="flex items-center gap-3">
      <Link
        to={ROUTES.login}
        onClick={closeMenu}
        className="text-sm text-brand-100 transition-colors hover:text-white"
      >
        Login
      </Link>
      <Link
        to={ROUTES.register}
        onClick={closeMenu}
        className="rounded-lg border border-white/20 px-3 py-1.5 text-sm text-brand-100 transition-colors hover:bg-white/10 hover:text-white"
      >
        Register
      </Link>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-brand-900/90 backdrop-blur-md">
      <div className="page-container px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            to={ROUTES.home}
            onClick={closeMenu}
            className="flex items-center gap-2 text-brand-100 transition-colors hover:text-white"
          >
            <FaHome size={18} />
            <span className="hidden font-display text-lg font-semibold sm:inline">
              We Learn Greek
            </span>
          </Link>

          <div className="hidden items-center space-x-6 md:flex">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm text-brand-100 transition-colors hover:text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            {authLinks}
            <select
              className="rounded-lg border border-white/20 bg-brand-900/50 px-2 py-1.5 text-sm text-brand-100"
              defaultValue=""
              onChange={handleMoreChange}
              aria-label="More links"
            >
              <option value="" disabled>
                More...
              </option>
              <option value="about">About</option>
              <option value="privacy">Privacy Policy</option>
              <option value="contact">Contact</option>
            </select>
          </div>

          <button
            type="button"
            className="text-brand-100 focus:outline-none md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mt-3 border-t border-white/10 pt-3 md:hidden">
            {NAV_LINKS.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="block py-2 text-brand-100 transition-colors hover:text-white"
                onClick={closeMenu}
              >
                {label}
              </Link>
            ))}

            <div className="mt-2 border-t border-white/10 py-2">{authLinks}</div>

            <select
              className="mt-2 w-full rounded-lg border border-white/20 bg-brand-900/80 px-2 py-2 text-sm text-brand-100"
              defaultValue=""
              onChange={handleMoreChange}
              aria-label="More links"
            >
              <option value="" disabled>
                More...
              </option>
              <option value="about">About</option>
              <option value="privacy">Privacy Policy</option>
              <option value="contact">Contact</option>
            </select>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
