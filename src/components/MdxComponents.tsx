import Image from "next/image";
import type { ComponentProps } from "react";

function toDimension(value: string | number | undefined, fallback: number) {
  if (typeof value === "number") {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  return fallback;
}

function MdxImage(props: ComponentProps<"img">) {
  if (!props.src) {
    return null;
  }

  const width = toDimension(props.width, 1200);
  const height = toDimension(props.height, 800);

  return (
    <figure className="mdx-figure">
      <Image
        src={props.src}
        alt={props.alt ?? "Recipe image"}
        width={width}
        height={height}
        sizes="(min-width: 1080px) 880px, 100vw"
      />
      {props.alt ? <figcaption>{props.alt}</figcaption> : null}
    </figure>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return <aside className="tip-callout">{children}</aside>;
}

export const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => <h2 {...props} />,
  h3: (props: ComponentProps<"h3">) => <h3 {...props} />,
  p: (props: ComponentProps<"p">) => <p {...props} />,
  ul: (props: ComponentProps<"ul">) => <ul {...props} />,
  ol: (props: ComponentProps<"ol">) => <ol {...props} />,
  li: (props: ComponentProps<"li">) => <li {...props} />,
  blockquote: (props: ComponentProps<"blockquote">) => <blockquote {...props} />,
  img: MdxImage,
  Tip,
};
