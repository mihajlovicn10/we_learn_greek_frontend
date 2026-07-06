const CASE_ROWS = [
  ['Nominative', 'nominative'],
  ['Genitive', 'genitive'],
  ['Accusative', 'accusative'],
  ['Vocative', 'vocative'],
];

function DeclensionTable({ title, noun, number }) {
  return (
    <div className="mb-8">
      <h3 className="mb-4 border-b border-gray-200 pb-2 font-display text-lg font-semibold text-brand-900">
        {title}
      </h3>
      <table className="w-full border-collapse">
        <tbody>
          {CASE_ROWS.map(([label, caseKey]) => (
            <tr key={caseKey} className="border-b border-gray-100">
              <td className="w-[30%] py-3 font-medium text-gray-500">{label}</td>
              <td className="py-3 font-medium text-gray-900">
                {noun[`${caseKey}_${number}`]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeclensionTable;
