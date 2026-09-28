import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

const ROWS = [
  ['ς', 'ε', 'ρ', 'τ', 'υ', 'θ', 'ι', 'ο', 'π'],
  ['α', 'σ', 'δ', 'φ', 'γ', 'η', 'ξ', 'κ', 'λ'],
  ['ζ', 'χ', 'ψ', 'ω', 'β', 'ν', 'μ'],
];

const ACCENTED = {
  α: 'ά', ε: 'έ', η: 'ή', ι: 'ί', ο: 'ό', υ: 'ύ', ω: 'ώ',
  Α: 'Ά', Ε: 'Έ', Η: 'Ή', Ι: 'Ί', Ο: 'Ό', Υ: 'Ύ', Ω: 'Ώ',
};

const KEY_CLASS =
  'flex h-10 min-w-[2.5rem] items-center justify-center rounded-lg bg-white text-lg text-brand-900 shadow-sm ring-1 ring-gray-200 transition-colors hover:bg-brand-50 active:bg-brand-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500';

/**
 * On-screen Greek keyboard. Accents are optional in search, but the ´ key adds one
 * to the last vowel for learners who want to practise spelling.
 */
function GreekKeyboard({ value, onChange }) {
  const { t } = useTranslation();
  // Keys can be pressed faster than the parent re-renders (e.g. URL-backed state), so build
  // each edit on the latest value we produced rather than on a possibly stale prop.
  const latest = useRef(value);
  const lastProp = useRef(value);
  if (lastProp.current !== value) {
    // The field changed (typing, clearing): follow it.
    lastProp.current = value;
    latest.current = value;
  }

  const set = (next) => {
    latest.current = next;
    onChange(next);
  };

  const type = (letter) => set(latest.current + letter);

  const addAccent = () => {
    const last = latest.current.slice(-1);
    if (ACCENTED[last]) set(latest.current.slice(0, -1) + ACCENTED[last]);
  };

  return (
    <div
      className="mt-3 w-full rounded-2xl bg-surface-muted p-3 ring-1 ring-gray-200"
      role="group"
      aria-label={t('search.keyboardTitle')}
    >
      <div className="space-y-2">
        {ROWS.map((row) => (
          <div key={row.join('')} className="flex flex-wrap justify-center gap-1.5">
            {row.map((letter) => (
              <button key={letter} type="button" onClick={() => type(letter)} className={KEY_CLASS}>
                {letter}
              </button>
            ))}
          </div>
        ))}
        <div className="flex flex-wrap justify-center gap-1.5">
          <button type="button" onClick={addAccent} className={KEY_CLASS} title={t('search.addAccent')} aria-label={t('search.addAccent')}>
            ´
          </button>
          <button type="button" onClick={() => type(' ')} className={`${KEY_CLASS} min-w-[8rem] text-sm`}>
            {t('search.space')}
          </button>
          <button
            type="button"
            onClick={() => set(latest.current.slice(0, -1))}
            className={`${KEY_CLASS} px-3 text-sm`}
            aria-label={t('search.deleteLast')}
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}

export default GreekKeyboard;
