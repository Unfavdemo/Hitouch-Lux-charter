import { Inter, Playfair_Display } from "next/font/google";
import { JsonLdScript } from "@/components/seo/json-ld-script";
import { localBusinessJsonLd } from "@/lib/seo/json-ld";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

/** @type {import('next').Metadata} */
export const metadata = {
  metadataBase: new URL("https://www.hitouchluxurycharter.com"),
  title: {
    default: "HiTouch Luxury Charter | Curated Luxury Experiences",
    template: "%s | HiTouch Luxury Charter",
  },
  description:
    "Curated luxury experiences choreographed in Philadelphia and the tri-state region—date nights, retreats, corporate evenings, and celebration movement with discreet chauffeurs.",
  openGraph: {
    title: "HiTouch Luxury Charter",
    description:
      "Curated luxury experiences for discerning clients—spa retreats, date nights, wine country, weddings, and executive evenings.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HiTouch Luxury Charter",
    description:
      "Curated luxury experiences—choreographed movement, discreet chauffeurs, concierge-led.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="flex min-h-full min-w-0 flex-col overflow-x-hidden">
        <JsonLdScript data={localBusinessJsonLd()} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-ink focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
