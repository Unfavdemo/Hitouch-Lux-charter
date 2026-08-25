import { notFound } from "next/navigation";
import { ExperienceLanding } from "@/components/marketing/experience-landing";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { gameDayExperiences, getExperienceBySlug } from "@/content/experiences";
import { buildPageMetadata } from "@/lib/seo/metadata";
import { breadcrumbListJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo/json-ld";

export const dynamicParams = false;

export function generateStaticParams() {
  return gameDayExperiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);
  if (!experience) return {};
  return buildPageMetadata({
    title: experience.seoTitle,
    description: experience.seoDescription,
    path: experience.href,
    imagePath: experience.image,
  });
}

export default async function GameDayDetailPage({ params }) {
  const { slug } = await params;
  const experience = getExperienceBySlug(slug);
  if (!experience || experience.categoryId !== "game-day") notFound();

  return (
    <>
      <JsonLdScript
        data={[
          serviceJsonLd({
            name: experience.h1,
            description: experience.seoDescription,
            path: experience.href,
          }),
          faqPageJsonLd(experience.faqs),
          breadcrumbListJsonLd([
            { name: "Home", path: "/" },
            { name: "Game Day", path: "/game-day" },
            { name: experience.title, path: experience.href },
          ]),
        ]}
      />
      <ExperienceLanding experience={experience} />
    </>
  );
}
