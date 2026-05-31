"use client";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

/** Search input for filtering recipes by title or description */
export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search recipes..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full md:w-96 px-4 py-3 rounded-xl border border-amber-200 bg-white text-amber-900 placeholder:text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition"
      />
    </div>
  );
}
