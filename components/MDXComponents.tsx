import type { MDXComponents } from "mdx/types";

type ListProps = {
  items?: string[];
};

type NutritionBoxProps = {
  calories: number;
  protein: string;
  carbs: string;
  fats: string;
};

function Callout({ children }: { children: React.ReactNode }) {
  return <div className="my-4 rounded-xl border-l-4 border-yellow-300 bg-yellow-50 p-4">{children}</div>;
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-4 rounded-xl border-l-4 border-emerald-300 bg-emerald-50 p-4 text-emerald-900">
      <strong className="mr-1">Tip:</strong>
      {children}
    </div>
  );
}

function IngredientList({ items = [] }: ListProps) {
  return (
    <ul className="my-4 list-disc space-y-2 pl-5 marker:text-emerald-500">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function NutritionBox({ calories, protein, carbs, fats }: NutritionBoxProps) {
  return (
    <aside className="my-4 rounded-xl bg-sky-50 p-4 text-sm text-slate-700">
      <h3 className="mb-2 font-semibold text-slate-900">Nutrition per serving</h3>
      <ul className="space-y-1">
        <li>Calories: {calories}</li>
        <li>Protein: {protein}</li>
        <li>Carbs: {carbs}</li>
        <li>Fats: {fats}</li>
      </ul>
    </aside>
  );
}

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-8 text-2xl font-semibold text-slate-900" {...props} />,
  p: (props) => <p className="mt-4 leading-7 text-slate-700" {...props} />,
  ul: (props) => <ul className="my-4 list-disc space-y-2 pl-5 marker:text-emerald-500" {...props} />,
  ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-5 marker:text-emerald-600" {...props} />,
  Callout,
  Tip,
  IngredientList,
  NutritionBox,
};
