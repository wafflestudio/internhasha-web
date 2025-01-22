interface SelectContainerWithOptionsProps<T extends string | number> {
  id: string;
  value: T | undefined;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T | undefined) => void;
  label?: string;
  className?: string;
}

export const SelectContainerWithOptions = <T extends string | number>({
  id,
  value,
  options,
  onChange,
  label,
  className = "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
}: SelectContainerWithOptionsProps<T>) => {
  return (
    <div className="select-container">
      {label != null && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 ml-1">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value ?? ""}
        onChange={(e) => {
          const selectedValue = e.target.value;
          const parsedValue = isNaN(Number(selectedValue))
            ? (selectedValue as T)
            : (Number(selectedValue) as T);
          onChange(parsedValue);
        }}
        className={className}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
