"use client";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <label className="block">
      <span className="sr-only">Search recipes</span>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by title or description"
        className="w-full rounded-full border border-amber-200 bg-white px-5 py-3 text-sm text-stone-700 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-4 focus:ring-amber-100"
      />
    </label>
  );
}
