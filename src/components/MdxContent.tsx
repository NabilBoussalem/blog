import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-10 text-2xl font-semibold tracking-tight text-stone-900" {...props} />,
  h3: (props) => <h3 className="mt-8 text-xl font-semibold text-stone-900" {...props} />,
  p: (props) => <p className="mt-4 text-base leading-8 text-stone-700" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-3 pl-6 text-stone-700" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-4 pl-6 text-stone-700" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-semibold text-stone-900" {...props} />,
  blockquote: (props) => <blockquote className="mt-6 rounded-r-2xl border-l-4 border-amber-300 bg-amber-50 px-5 py-4 italic text-stone-700" {...props} />,
  a: (props) => <a className="font-medium text-amber-700 underline decoration-amber-300 underline-offset-4" {...props} />,
};
