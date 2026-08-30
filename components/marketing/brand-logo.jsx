import Image from "next/image";

export function BrandLogo({ src, alt, className = "h-10 w-auto", priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={736}
      height={1024}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}
