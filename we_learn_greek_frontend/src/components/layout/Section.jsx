/**
 * Vertical section with consistent padding and background variants.
 */
function Section({
  children,
  variant = 'default',
  contained = true,
  className = '',
}) {
  const variants = {
    default: 'bg-surface section-padding',
    sand: 'bg-brand-50 section-padding',
    muted: 'bg-surface-muted section-padding',
    gradient: 'gradient-section',
    transparent: 'section-padding',
  };

  return (
    <section className={`${variants[variant] ?? variants.default} ${className}`}>
      {contained ? <div className="page-container">{children}</div> : children}
    </section>
  );
}

export default Section;
