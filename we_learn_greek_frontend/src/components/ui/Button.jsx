function Button({
  children,
  variant = 'primary',
  size = 'medium',
  shape = 'default',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
}) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]';

  const shapes = {
    default: 'rounded-lg',
    pill: 'rounded-full',
  };

  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700',
    accent: 'bg-brand-700 text-white hover:bg-brand-800',
    outline: 'border-2 border-brand-600 text-brand-600 hover:bg-brand-50',
    ghost: 'text-brand-700 hover:bg-brand-50',
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${shapes[shape] ?? shapes.default} ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.medium} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
