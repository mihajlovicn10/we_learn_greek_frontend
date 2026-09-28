import { useEffect, useRef, useState } from 'react';
import { FaKeyboard } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Alert, Button, FormField } from '../ui';
import GreekKeyboard from './GreekKeyboard';
import { transliterate } from '../../utils/greek';

const EMPTY = { greek: '', pronunciation: '', translation: '' };

/**
 * Add a word to My Words. `prefill` comes from a "Save" button elsewhere in the app;
 * the learner reviews it before saving. Pronunciation defaults to a transliteration.
 */
function AddWordForm({ prefill, onSave, isSaving, error }) {
  const { t } = useTranslation();
  const [form, setForm] = useState(() => ({ ...EMPTY, ...prefill }));
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [localError, setLocalError] = useState(null);
  const translationRef = useRef(null);

  useEffect(() => {
    if (!prefill) return;
    setForm({ ...EMPTY, ...prefill });
    translationRef.current?.focus();
  }, [prefill]);

  const suggestedPronunciation = transliterate(form.greek);

  const update = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    const word = {
      greek: form.greek.trim(),
      pronunciation: form.pronunciation.trim() || suggestedPronunciation,
      translation: form.translation.trim(),
    };
    if (!word.greek || !word.translation) {
      setLocalError(t('myWords.missingFields'));
      return;
    }
    const saved = await onSave(word);
    if (saved) setForm(EMPTY);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <FormField
            label={t('myWords.greekWord')}
            id="add-greek"
            value={form.greek}
            onChange={update('greek')}
            placeholder={t('myWords.greekPlaceholder')}
            lang="el"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setKeyboardOpen((open) => !open)}
            aria-pressed={keyboardOpen}
            className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 hover:text-brand-800"
          >
            <FaKeyboard aria-hidden="true" />{' '}
            {keyboardOpen ? t('myWords.hideKeyboard') : t('myWords.showKeyboard')}
          </button>
        </div>
        <FormField
          label={t('myWords.pronunciation')}
          id="add-pronunciation"
          value={form.pronunciation}
          onChange={update('pronunciation')}
          placeholder={suggestedPronunciation || t('myWords.pronunciationPlaceholder')}
          autoComplete="off"
        />
        <FormField
          ref={translationRef}
          label={t('myWords.meaning')}
          id="add-translation"
          value={form.translation}
          onChange={update('translation')}
          placeholder={t('myWords.meaningPlaceholder')}
          autoComplete="off"
        />
      </div>

      {keyboardOpen && (
        <GreekKeyboard
          value={form.greek}
          onChange={(greek) => setForm((prev) => ({ ...prev, greek }))}
        />
      )}

      <p className="text-xs text-gray-500">
        {t('myWords.pronunciationTip')}
      </p>

      {(localError || error) && <Alert variant="error">{localError || error}</Alert>}

      <Button type="submit" variant="primary" shape="pill" disabled={isSaving}>
        {isSaving ? t('myWords.saving') : t('myWords.saveWord')}
      </Button>
    </form>
  );
}

export default AddWordForm;
