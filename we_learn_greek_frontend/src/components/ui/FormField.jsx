import Input from './Input';

function FormField({
  label,
  id,
  name,
  error,
  variant = 'default',
  className = '',
  ...inputProps
}) {
  const fieldId = id || name;

  return (
    <div className={className}>
      {label && (
        <label htmlFor={fieldId} className="mb-2 block text-sm font-medium text-gray-600">
          {label}
        </label>
      )}
      <Input id={fieldId} name={name} variant={variant} error={error} {...inputProps} />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
