import Image from 'next/image';
import { ReactNode } from 'react';

interface MdxComponentProps {
  children?: ReactNode;
}

interface MdxImageProps {
  src?: string;
  alt?: string;
}

const mdxComponents = {
  h2: ({ children }: MdxComponentProps) => (
    <h2 className="mdx-h2">{children}</h2>
  ),
  h3: ({ children }: MdxComponentProps) => (
    <h3 className="mdx-h3">{children}</h3>
  ),
  p: ({ children }: MdxComponentProps) => (
    <p className="mdx-p">{children}</p>
  ),
  ul: ({ children }: MdxComponentProps) => (
    <ul className="mdx-ul">{children}</ul>
  ),
  ol: ({ children }: MdxComponentProps) => (
    <ol className="mdx-ol">{children}</ol>
  ),
  li: ({ children }: MdxComponentProps) => (
    <li className="mdx-li">{children}</li>
  ),
  blockquote: ({ children }: MdxComponentProps) => (
    <blockquote className="mdx-blockquote">{children}</blockquote>
  ),
  img: ({ src, alt }: MdxImageProps) => {
    if (!src) return null;
    return (
      <Image
        src={src}
        alt={alt ?? ''}
        width={800}
        height={450}
        className="mdx-image"
        sizes="(max-width: 768px) 100vw, 800px"
      />
    );
  },
};

export default mdxComponents;
