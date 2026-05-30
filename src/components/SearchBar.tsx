import Link from "next/link";

type SearchBarProps = {
  defaultQuery: string;
  categories: string[];
  defaultCategory: string;
  defaultSort: string;
};

export function SearchBar({
  defaultQuery,
  categories,
  defaultCategory,
  defaultSort,
}: SearchBarProps) {
  return (
    <form action="/recipes" className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr_0.8fr_auto]">
      <label className="grid gap-2">
        <span className="text-sm font-medium text-foreground">Search recipes</span>
        <input
          type="search"
          name="query"
          defaultValue={defaultQuery}
          placeholder="Search by title, description, or tag"
          className="rounded-2xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-ring"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-foreground">Category</span>
        <select
          name="category"
          defaultValue={defaultCategory}
          className="rounded-2xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-ring"
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-foreground">Sort by</span>
        <select
          name="sort"
          defaultValue={defaultSort}
          className="rounded-2xl border border-border bg-white px-4 py-3 outline-none transition focus:border-accent focus:ring-4 focus:ring-ring"
        >
          <option value="newest">Newest</option>
          <option value="time">Cooking time</option>
        </select>
      </label>

      <div className="flex items-end gap-3">
        <button
          type="submit"
          className="inline-flex h-[50px] items-center justify-center rounded-full bg-accent px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-accent-strong"
        >
          Apply
        </button>
        <Link
          href="/recipes"
          className="inline-flex h-[50px] items-center justify-center rounded-full border border-border bg-white px-5 text-sm font-semibold text-foreground transition hover:border-accent/30 hover:text-accent"
        >
          Reset
        </Link>
      </div>
    </form>
  );
}
