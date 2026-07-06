import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    variant = 'default',
    error,
    className = '',
    ...props
  },
  ref
) {
  const variants = {
    default:
      'w-full rounded-lg border bg-white px-3 py-2 text-gray-900 shadow-sm placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500',
    'pill-dark':
      'w-full rounded-full bg-gray-900 px-4 py-3 text-center text-white placeholder:text-white/70 focus:outline-none focus:ring-2 focus:ring-brand-500',
  };

  const errorClass = error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300';

  return (
    <input
      ref={ref}
      className={`${variants[variant] ?? variants.default} ${variant === 'default' ? errorClass : ''} ${className}`}
      aria-invalid={error ? true : undefined}
      {...props}
    />
  );
});

export default Input;
