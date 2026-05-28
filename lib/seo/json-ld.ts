import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo/site-url";

type FaqItem = { question: string; answer: string };

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "LimousineBusiness",
    name: site.brandName,
    url: absoluteUrl("/"),
    telephone: site.phoneTel,
    email: site.email,
    description: site.coverageBlurb,
    areaServed: [
      { "@type": "City", name: "Philadelphia" },
      { "@type": "State", name: "Pennsylvania" },
      { "@type": "State", name: "New Jersey" },
      { "@type": "State", name: "Delaware" },
    ],
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: site.country,
    },
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LimousineBusiness",
      name: site.brandName,
      telephone: site.phoneTel,
    },
    areaServed: site.city,
    url: absoluteUrl(path),
  };
}

export function faqPageJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function itemListJsonLd({
  name,
  items,
}: {
  name: string;
  items: Array<{ name: string; description: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: item.name,
        description: item.description,
        url: absoluteUrl(item.url),
      },
    })),
  };
}

export function aggregateRatingJsonLd({
  ratingValue,
  reviewCount,
}: {
  ratingValue: number;
  reviewCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    ratingValue,
    reviewCount,
    bestRating: 5,
    worstRating: 1,
  };
}
