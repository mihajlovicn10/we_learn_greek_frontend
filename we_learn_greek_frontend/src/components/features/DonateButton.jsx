import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaHeart } from 'react-icons/fa';
import { DONATE_URL } from '../../config';
import { ROUTES } from '../../constants/routes';
import { trackEvent } from '../../lib/analytics';

const SIZES = {
  small: 'px-3 py-1.5 text-sm',
  large: 'px-6 py-3 text-lg',
};

/**
 * Opens the external donation page when VITE_DONATE_URL is set,
 * otherwise links to the Support page so the CTA never dead-ends.
 */
function DonateButton({ label, size = 'large', source, className = '', onClick }) {
  const { t } = useTranslation();
  const classes = `inline-flex items-center justify-center gap-2 rounded-full bg-rose-600 font-semibold text-white transition-all duration-300 hover:bg-rose-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 focus-visible:ring-offset-2 active:scale-[0.98] ${SIZES[size] ?? SIZES.large} ${className}`;

  const handleClick = () => {
    trackEvent('Donate Click', source ? { source } : undefined);
    onClick?.();
  };

  const content = (
    <>
      <FaHeart aria-hidden="true" size={size === 'small' ? 12 : 16} />
      {label ?? t('donate.supportUs')}
    </>
  );

  if (DONATE_URL) {
    return (
      <a href={DONATE_URL} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <Link to={ROUTES.support} onClick={handleClick} className={classes}>
      {content}
    </Link>
  );
}

export default DonateButton;
