function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-surface-dark text-gray-700',
    brand: 'bg-brand-100 text-brand-800',
    accent: 'bg-brand-100 text-brand-800',
    olive: 'bg-brand-50 text-brand-700 ring-1 ring-brand-200',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${variants[variant] ?? variants.default} ${className}`}
    >
      {children}
    </span>
  );
}

export default Badge;
