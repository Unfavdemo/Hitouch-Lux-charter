import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/seo/site-url";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  imagePath?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path,
  imagePath,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImages = imagePath
    ? [{ url: absoluteUrl(imagePath), width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "en_US",
      siteName: "HiTouch Luxury Charter",
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: ogImages ? "summary_large_image" : "summary",
      title,
      description,
      ...(ogImages ? { images: [ogImages[0].url] } : {}),
    },
  };
}
