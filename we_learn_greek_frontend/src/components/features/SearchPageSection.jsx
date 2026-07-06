import { Section } from '../layout';

function SearchPageSection({ title, children, helperText, className = '' }) {
  return (
    <Section variant="gradient" contained={false} className={className}>
      <div className="page-container flex min-h-[500px] flex-col items-center pb-16 pt-8">
        {title && (
          <h2 className="mb-10 max-w-3xl text-center font-display text-2xl font-bold text-white sm:text-4xl">
            {title}
          </h2>
        )}
        {children}
        {helperText && <p className="mt-6 text-center text-sm text-white/90">{helperText}</p>}
      </div>
    </Section>
  );
}

export default SearchPageSection;
