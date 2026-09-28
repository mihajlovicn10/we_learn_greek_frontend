import { useTranslation } from 'react-i18next';

const PERSONS = [
  ['first_singular', 'εγώ'],
  ['second_singular', 'εσύ'],
  ['third_singular', 'αυτός/ή/ό'],
  ['first_plural', 'εμείς'],
  ['second_plural', 'εσείς'],
  ['third_plural', 'αυτοί/ές/ά'],
];

// Greek names are shown next to the translated label (skipped when the UI is already Greek).
const TENSES = [
  { key: 'present', greek: 'Ενεστώτας' },
  { key: 'imperfect', greek: 'Παρατατικός' },
  { key: 'aorist', greek: 'Αόριστος' },
  { key: 'perfect', greek: 'Παρακείμενος' },
  { key: 'plusperfect', greek: 'Υπερσυντέλικος' },
  { key: 'future', greek: 'Μέλλοντας' },
];

function getForm(verb, tense, personKey) {
  // The API spells one field "present_third_pluran"; it is part of the schema.
  if (personKey === 'third_plural' && verb[`${tense}_third_pluran`]) {
    return verb[`${tense}_third_pluran`];
  }
  return verb[`${tense}_${personKey}`];
}

function TenseTable({ verb, tense }) {
  const { t } = useTranslation();
  const label = t(`grammar.tenses.${tense.key}.label`);

  return (
    <section className="rounded-xl bg-surface-muted/60 p-4 ring-1 ring-gray-100">
      <h3 className="font-display text-lg font-semibold text-brand-900">
        {label}{' '}
        {label !== tense.greek && (
          <span className="text-sm font-normal text-gray-400">· {tense.greek}</span>
        )}
      </h3>
      <p className="mb-3 text-xs text-gray-500">{t(`grammar.tenses.${tense.key}.hint`)}</p>
      <table className="w-full border-collapse text-left">
        <tbody>
          {PERSONS.map(([personKey, pronoun]) => (
            <tr key={personKey} className="border-t border-gray-200/70">
              <td className="w-[42%] py-2 pr-3 text-sm text-gray-500" title={t(`grammar.persons.${personKey}`)}>
                {pronoun}
              </td>
              <td className="py-2 font-semibold text-gray-900">
                {getForm(verb, tense.key, personKey) || <span className="font-normal text-gray-400">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

/** Every tense the verb has data for, with pronouns and a note on when each tense is used. */
function ConjugationTable({ verb }) {
  const { t } = useTranslation();
  const tenses = TENSES.filter((tense) =>
    PERSONS.some(([personKey]) => getForm(verb, tense.key, personKey))
  );

  if (tenses.length === 0) {
    return <p className="text-gray-500">{t('grammar.noConjugation')}</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {tenses.map((tense) => (
        <TenseTable key={tense.key} verb={verb} tense={tense} />
      ))}
    </div>
  );
}

export default ConjugationTable;
