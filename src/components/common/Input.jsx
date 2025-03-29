import React, { forwardRef } from 'react';
import ErrorMessage from './ErrorMessage';

const Input = forwardRef(({
  label,
  type = 'text',
  error,
  helperText,
  className = '',
  labelClassName = '',
  inputClassName = '',
  required = false,
  icon = null,
  ...props
}, ref) => {
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label className={`block text-gray-700 text-sm font-medium mb-2 ${labelClassName}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`
            appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors
            ${error ? 'border-red-500 bg-red-50' : 'border-gray-300'}
            ${icon ? 'pl-10' : ''}
            ${inputClassName}
          `}
          required={required}
          {...props}
        />
      </div>
      {helperText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
      {error && (
        <ErrorMessage message={error} className="mt-1" />
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;