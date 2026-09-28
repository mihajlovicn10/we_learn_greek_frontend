import { FaSearch } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import Button from './Button';
import Input from './Input';

function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  showButton = false,
  buttonLabel,
  className = '',
  inputClassName = '',
}) {
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative w-full max-w-lg ${className}`}>
      <FaSearch
        className="pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <Input
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder ?? t('common.searchPlaceholder')}
        variant="pill-dark"
        className={`!pl-11 ${showButton ? '!pr-28' : ''} placeholder:text-white/70 ${inputClassName}`}
      />
      {showButton && (
        <Button
          type="submit"
          variant="primary"
          shape="pill"
          size="small"
          className="absolute right-1 top-1/2 -translate-y-1/2"
        >
          {buttonLabel ?? t('common.search')}
        </Button>
      )}
    </form>
  );
}

export default SearchBar;
