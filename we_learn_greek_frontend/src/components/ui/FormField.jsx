import { forwardRef } from 'react';
import Input from './Input';

const FormField = forwardRef(function FormField(
  { label, id, name, error, variant = 'default', className = '', ...inputProps },
  ref
) {
  const fieldId = id || name;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="mb-2 block text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      <Input ref={ref} id={fieldId} name={name} variant={variant} error={error} {...inputProps} />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

export default FormField;
