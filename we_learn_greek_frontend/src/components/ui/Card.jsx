function Card({
  title,
  children,
  className = '',
  hover = false,
  padding = 'md',
}) {
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={`rounded-2xl bg-surface shadow-card ${paddingClasses[padding] ?? paddingClasses.md} ${hover ? 'transition-all duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover' : ''} ${className}`}
    >
      {title && (
        <h2 className="mb-4 font-display text-xl font-bold text-brand-900">{title}</h2>
      )}
      {children}
    </div>
  );
}

export default Card;
