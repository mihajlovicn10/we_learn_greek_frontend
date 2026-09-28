import { useState } from 'react';
import { FaKeyboard } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { SearchBar } from '../ui';
import GreekKeyboard from './GreekKeyboard';
import { usePageTitle } from '../../hooks/usePageTitle';

/**
 * Tool page layout: compact header, search first, then results.
 * `query` / `onQueryChange` take plain strings so the on-screen keyboard can edit them too.
 */
function ListPageShell({
  title,
  subtitle,
  query,
  onQueryChange,
  searchPlaceholder,
  searchHint,
  filter,
  actions,
  children,
}) {
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const { t } = useTranslation();
  usePageTitle(title);

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="page-container max-w-content py-8 sm:py-12">
        <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">{title}</h1>
            {subtitle && <p className="mt-2 max-w-2xl text-gray-600">{subtitle}</p>}
          </div>
          {actions}
        </header>

        {onQueryChange && (
          <div className="mb-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center">
              <div className="flex flex-1 items-center gap-2 md:max-w-xl">
                <SearchBar
                  value={query}
                  onChange={(e) => onQueryChange(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="!max-w-none"
                  inputClassName="!text-left"
                />
                <button
                  type="button"
                  onClick={() => setKeyboardOpen((open) => !open)}
                  aria-pressed={keyboardOpen}
                  aria-label={keyboardOpen ? t('search.keyboardHide') : t('search.keyboardShow')}
                  title={t('search.keyboardTitle')}
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                    keyboardOpen
                      ? 'bg-brand-600 text-white'
                      : 'bg-white text-brand-700 ring-1 ring-gray-200 hover:bg-brand-50'
                  }`}
                >
                  <FaKeyboard size={20} />
                </button>
              </div>
              {filter}
            </div>
            {keyboardOpen && (
              <div className="md:max-w-xl">
                <GreekKeyboard value={query} onChange={onQueryChange} />
              </div>
            )}
            {searchHint && <p className="mt-3 text-sm text-gray-500">{searchHint}</p>}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export default ListPageShell;
