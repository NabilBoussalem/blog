import { MDXRemote } from "next-mdx-remote/rsc";

interface MDXContentProps {
  source: string;
}

export default function MDXContent({ source }: MDXContentProps) {
  return (
    <div className="prose prose-stone prose-lg max-w-none prose-headings:text-stone-800 prose-p:text-stone-600 prose-a:text-terracotta-600 prose-strong:text-stone-700 prose-li:text-stone-600">
      <MDXRemote source={source} />
    </div>
  );
}
