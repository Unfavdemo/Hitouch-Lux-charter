import { Inter, Playfair_Display } from "next/font/google";
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
    default: "HiTouch Luxury Charter | Philadelphia Executive Chauffeur",
    template: "%s | HiTouch Luxury Charter",
  },
  description:
    "Seamless, high-end transportation in Philadelphia and the tri-state region. Discreet chauffeurs, immaculate vehicles, and optional executive protection details on request.",
  openGraph: {
    title: "HiTouch Luxury Charter",
    description:
      "Exclusive HiTouch experiences for discerning clients—wine tours, weddings, corporate VIP, and airport transfers.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HiTouch Luxury Charter",
    description:
      "Philadelphia executive chauffeur service—discreet, immaculate, concierge-led.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
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
