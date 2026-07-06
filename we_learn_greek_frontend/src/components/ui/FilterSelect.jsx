function FilterSelect({ value, onChange, children, className = '', ...props }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`min-w-[200px] appearance-none rounded-full border-none bg-gray-900 bg-[length:1.5em] bg-[position:right_1rem_center] bg-no-repeat px-4 py-3 pr-10 text-white outline-none focus:ring-2 focus:ring-brand-500 ${className}`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E\")",
      }}
      {...props}
    >
      {children}
    </select>
  );
}

export default FilterSelect;
