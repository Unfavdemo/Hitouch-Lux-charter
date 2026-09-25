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
    default: "HiTouch Luxury Charter | Philadelphia Luxury Black Car Service",
    template: "%s | HiTouch Luxury Charter",
  },
  description:
    "Luxury experience. High touch standard. Philadelphia private black car service, luxury black car service, private transportation, and luxury transportation. Request a quote—availability confirmed before assignment.",
  openGraph: {
    title: "HiTouch Luxury Charter | Luxury Black Car Service Philadelphia",
    description:
      "Private black car service and luxury transportation in Philadelphia—executives, airports, and private occasions. Request a quote.",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/hitouch-logo-og.jpg", alt: "HiTouch Luxury Charter Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiTouch Luxury Charter",
    description:
      "Philadelphia luxury black car service and private transportation. Request a quote.",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon-32.png",
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
