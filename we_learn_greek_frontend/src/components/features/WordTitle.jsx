import { FaVolumeUp } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { transliterate } from '../../utils/greek';

/** Greek word with pronunciation hint, optional meaning, and a listen button. */
function WordTitle({ greek, translation, onSpeak, size = 'lg' }) {
  const { t } = useTranslation();
  return (
    <span className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span
        className={`font-display font-semibold text-brand-900 ${size === 'lg' ? 'text-xl' : 'text-lg'}`}
        lang="el"
      >
        {greek}
      </span>
      {onSpeak && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSpeak();
          }}
          className="self-center text-brand-600 hover:text-brand-700"
          aria-label={t('common.listenTo', { word: greek })}
          title={t('common.listen')}
        >
          <FaVolumeUp size={15} />
        </button>
      )}
      <span className="text-sm italic text-gray-400">{transliterate(greek)}</span>
      {translation && <span className="text-sm text-gray-600">— {translation}</span>}
    </span>
  );
}

export default WordTitle;
