import { Link } from 'react-router-dom';
import { SearchBar } from '../ui';

function ListPageShell({
  title,
  backTo,
  backLabel,
  searchTerm,
  onSearchChange,
  searchPlaceholder = 'Search...',
  filter,
  children,
}) {
  return (
    <div className="min-h-screen bg-surface-muted">
      <main className="page-container section-padding max-w-content">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-display text-2xl font-bold text-brand-900 sm:text-3xl">{title}</h1>
          {backTo && (
            <Link
              to={backTo}
              className="inline-flex rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-700"
            >
              {backLabel}
            </Link>
          )}
        </div>

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <SearchBar
            value={searchTerm}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            className="md:max-w-md"
          />
          {filter}
        </div>

        {children}
      </main>
    </div>
  );
}

export default ListPageShell;
