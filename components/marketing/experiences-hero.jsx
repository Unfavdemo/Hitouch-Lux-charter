import { Badge } from "@/components/ui/badge";

export function ExperiencesHero({ hero }) {
  return (
    <div className="max-w-3xl">
      <Badge>{hero.eyebrow}</Badge>
      <h1 className="mt-4 font-serif text-4xl text-heading sm:text-5xl">{hero.headline}</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{hero.supporting}</p>
    </div>
  );
}
