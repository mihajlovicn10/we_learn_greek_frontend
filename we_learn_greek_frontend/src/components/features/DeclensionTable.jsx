import { useTranslation } from 'react-i18next';

// Greek names are shown next to the translated label (skipped when the UI is already Greek).
const CASES = [
  { key: 'nominative', greek: 'Ονομαστική' },
  { key: 'genitive', greek: 'Γενική' },
  { key: 'accusative', greek: 'Αιτιατική' },
  { key: 'vocative', greek: 'Κλητική' },
];

// Definite articles by gender, case and number. The vocative takes no article.
const ARTICLES = {
  masculine: {
    singular: { nominative: 'ο', genitive: 'του', accusative: 'τον' },
    plural: { nominative: 'οι', genitive: 'των', accusative: 'τους' },
  },
  feminine: {
    singular: { nominative: 'η', genitive: 'της', accusative: 'την' },
    plural: { nominative: 'οι', genitive: 'των', accusative: 'τις' },
  },
  neuter: {
    singular: { nominative: 'το', genitive: 'του', accusative: 'το' },
    plural: { nominative: 'τα', genitive: 'των', accusative: 'τα' },
  },
};

function Form({ noun, caseKey, number }) {
  const form = noun[`${caseKey}_${number}`];
  if (!form) return <span className="text-gray-400">—</span>;
  const article = ARTICLES[noun.gender?.toLowerCase()]?.[number]?.[caseKey];
  return (
    <>
      {article && <span className="mr-1.5 text-gray-400">{article}</span>}
      <span className="font-semibold text-gray-900">{form}</span>
    </>
  );
}

/** All cases of a noun, singular and plural side by side, with the article and what each case is for. */
function DeclensionTable({ noun }) {
  const { t } = useTranslation();
  const cases = CASES.map(({ key, greek }) => {
    const label = t(`grammar.cases.${key}.label`);
    return {
      key,
      label,
      short: t(`grammar.cases.${key}.short`),
      hint: t(`grammar.cases.${key}.hint`),
      greek: label === greek ? null : greek,
    };
  });

  return (
    <div>
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-gray-200 text-sm text-gray-500">
            <th className="py-2 pr-3 font-medium sm:w-[44%] sm:pr-4">{t('grammar.case')}</th>
            <th className="py-2 pr-3 font-medium sm:pr-4">{t('grammar.singular')}</th>
            <th className="py-2 font-medium">{t('grammar.plural')}</th>
          </tr>
        </thead>
        <tbody>
          {cases.map(({ key, label, short, greek, hint }) => (
            <tr key={key} className="border-b border-gray-100 align-top">
              <td className="py-3 pr-3 sm:pr-4" title={hint}>
                <p className="text-sm font-medium text-brand-900 sm:text-base">
                  <span className="sm:hidden">{short}</span>
                  <span className="hidden sm:inline">{label}</span>{' '}
                  {greek && <span className="hidden font-normal text-gray-400 sm:inline">· {greek}</span>}
                </p>
                <p className="mt-0.5 hidden text-xs text-gray-500 sm:block">{hint}</p>
              </td>
              <td className="py-3 pr-3 sm:pr-4 sm:text-lg">
                <Form noun={noun} caseKey={key} number="singular" />
              </td>
              <td className="py-3 sm:text-lg">
                <Form noun={noun} caseKey={key} number="plural" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <dl className="mt-4 space-y-1 text-xs text-gray-500 sm:hidden">
        {cases.map(({ key, label, greek, hint }) => (
          <div key={key}>
            <dt className="inline font-medium text-gray-700">
              {label}
              {greek && ` (${greek})`}:
            </dt>{' '}
            <dd className="inline">{hint}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default DeclensionTable;
