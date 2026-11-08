import Image from "next/image";

export function MbeCertificationBadge({ className = "" }) {
  return (
    <figure
      className={`flex justify-center ${className}`.trim()}
      aria-label="Minority certified business"
    >
      <div className="inline-flex items-center justify-center rounded-md bg-[#f4f5fa] px-8 py-4 sm:px-10 sm:py-5">
        <Image
          src="/certifications/mbe-nmsdc.png"
          alt="Minority business enterprise certified"
          width={363}
          height={363}
          unoptimized
          className="h-28 w-28 object-contain sm:h-32 sm:w-32"
        />
      </div>
    </figure>
  );
}
