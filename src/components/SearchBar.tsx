type HiddenInput = {
  name: string;
  value?: string;
};

type SearchBarProps = {
  action?: string;
  defaultValue?: string;
  placeholder?: string;
  submitLabel?: string;
  hiddenInputs?: HiddenInput[];
  className?: string;
  inputName?: string;
};

export function SearchBar({
  action = "/recipes",
  defaultValue,
  placeholder = "Search by title or ingredient",
  submitLabel = "Search",
  hiddenInputs = [],
  className = "",
  inputName = "q",
}: SearchBarProps) {
  return (
    <form action={action} className={`flex flex-col gap-3 rounded-[2rem] border border-stone-200 bg-white p-3 shadow-card sm:flex-row sm:items-center ${className}`.trim()}>
      {hiddenInputs.map((input) =>
        input.value ? <input key={input.name} type="hidden" name={input.name} value={input.value} /> : null,
      )}
      <label htmlFor={`${inputName}-search`} className="sr-only">
        Search recipes
      </label>
      <input
        id={`${inputName}-search`}
        type="search"
        name={inputName}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="min-w-0 flex-1 rounded-2xl border border-transparent bg-cream-50 px-5 py-3 text-sm text-stone-700 outline-none ring-0 placeholder:text-stone-400 focus:border-olive-300"
      />
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-2xl bg-olive-900 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-olive-700"
      >
        {submitLabel}
      </button>
    </form>
  );
}
