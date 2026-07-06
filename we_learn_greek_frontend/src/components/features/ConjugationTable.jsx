const PERSON_ROWS = [
  ['1st Person Singular', 'first_singular'],
  ['2nd Person Singular', 'second_singular'],
  ['3rd Person Singular', 'third_singular'],
  ['1st Person Plural', 'first_plural'],
  ['2nd Person Plural', 'second_plural'],
  ['3rd Person Plural', 'third_plural'],
];

function getConjugationForm(verb, tense, personKey) {
  const key = `${tense}_${personKey}`;
  if (personKey === 'third_plural' && verb[`${tense}_third_pluran`]) {
    return verb[`${tense}_third_pluran`];
  }
  return verb[key];
}

function ConjugationTable({ title, verb, tense }) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 border-b border-gray-200 pb-2 font-display text-lg font-semibold text-brand-900">
        {title}
      </h3>
      <table className="w-full border-collapse">
        <tbody>
          {PERSON_ROWS.map(([label, personKey]) => (
            <tr key={personKey} className="border-b border-gray-100">
              <td className="w-[30%] py-3 font-medium text-gray-500">{label}</td>
              <td className="py-3 font-medium text-gray-900">
                {getConjugationForm(verb, tense, personKey)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConjugationTable;
