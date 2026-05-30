import type { Metadata } from "next";

export const siteConfig = {
  name: "Saffron Table",
  description:
    "A static-first recipe journal for elegant, practical dishes, with polished photography, fast pages, and simple tools for saving and sharing recipes.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "en_US",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  image,
}: {
  title?: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const resolvedTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  const resolvedImage = absoluteUrl(image ?? "/images/recipes/chicken-tagine.svg");

  return {
    title: resolvedTitle,
    description,
    alternates: {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: absoluteUrl(path),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [
        {
          url: resolvedImage,
          alt: title ?? siteConfig.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [resolvedImage],
    },
  };
}
