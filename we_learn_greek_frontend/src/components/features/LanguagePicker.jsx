function LanguagePicker({ languages, onSelect }) {
  return (
    <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-5">
      {languages.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => onSelect(lang.code)}
          className="group flex w-36 flex-col items-center rounded-2xl bg-white/20 p-6 transition-transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          <div className="mb-4 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white/30">
            <img
              src={lang.flag}
              alt={`${lang.name} flag`}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-base font-semibold text-white">{lang.name}</span>
        </button>
      ))}
    </div>
  );
}

export default LanguagePicker;
