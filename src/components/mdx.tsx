import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mt-10 font-serif text-3xl text-olive-950" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 font-serif text-2xl text-olive-900" {...props} />
  ),
  p: (props) => (
    <p className="mt-4 text-base leading-8 text-stone-700" {...props} />
  ),
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-stone-700" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  strong: (props) => <strong className="font-semibold text-stone-900" {...props} />,
  a: (props) => (
    <a className="font-medium text-terracotta-700 underline underline-offset-4" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-4 border-gold-400/70 bg-cream-100/80 px-5 py-4 italic text-stone-700"
      {...props}
    />
  ),
};
