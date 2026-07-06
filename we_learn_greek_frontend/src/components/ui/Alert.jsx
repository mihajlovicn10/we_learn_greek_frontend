function Alert({ children, variant = 'info', className = '' }) {
  const variants = {
    error: 'border-red-200 bg-red-50 text-red-800',
    success: 'border-green-200 bg-green-50 text-green-800',
    info: 'border-brand-200 bg-brand-50 text-brand-900',
    warning: 'border-amber-200 bg-amber-50 text-amber-900',
  };

  return (
    <div
      role="alert"
      className={`rounded-xl border px-4 py-3 text-sm ${variants[variant] ?? variants.info} ${className}`}
    >
      {children}
    </div>
  );
}

export default Alert;
