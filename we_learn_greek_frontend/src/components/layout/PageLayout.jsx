/**
 * Standard page wrapper — centered content, optional title block.
 */
function PageLayout({
  title,
  subtitle,
  children,
  narrow = false,
  background = 'sand',
  className = '',
}) {
  const backgrounds = {
    sand: 'bg-brand-50',
    muted: 'bg-surface-muted',
    white: 'bg-surface',
  };

  const widthClass = narrow ? 'max-w-3xl' : 'max-w-content';

  return (
    <div className={`flex flex-1 flex-col ${backgrounds[background] ?? backgrounds.sand} ${className}`}>
      <div className={`page-container section-padding ${widthClass}`}>
        {(title || subtitle) && (
          <header className="mb-8 text-center">
            {title && (
              <h1 className="font-display text-3xl font-bold text-brand-900 sm:text-4xl">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-3 text-base text-gray-600 sm:text-lg">{subtitle}</p>
            )}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}

export default PageLayout;
