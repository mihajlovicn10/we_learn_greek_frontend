import { useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../../constants/routes';
import { prefetchOn } from '../../routes/pages';
import { transliterate, WORD_LIMITS } from '../../utils/greek';

/**
 * Opens My Words with the add form pre-filled. The learner reviews it and saves, so nothing is
 * stored without their confirmation. Logged-out users go through login and land back on the form.
 */
function SaveWordButton({ greek, translation = '', pronunciation }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(ROUTES.myWords, {
      state: {
        prefill: {
          greek,
          // The API caps these at 30 characters; trim long values so the form starts valid.
          pronunciation: (pronunciation || transliterate(greek)).slice(0, WORD_LIMITS.max),
          translation: translation.slice(0, WORD_LIMITS.max),
        },
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      {...prefetchOn(ROUTES.myWords)}
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium text-brand-700 ring-1 ring-brand-200 transition-colors hover:bg-brand-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
      title={t('common.saveToMyWords')}
      aria-label={t('common.saveToMyWords')}
    >
      <FaBookmark size={10} aria-hidden="true" />
      {t('common.save')}
    </button>
  );
}

export default SaveWordButton;
