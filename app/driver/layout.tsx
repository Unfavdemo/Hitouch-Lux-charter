/** @type {import('next').Metadata} */
export const metadata = {
  title: "Driver",
  robots: { index: false, follow: false },
};

export default function DriverRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-[#0f1114] text-zinc-100 antialiased">{children}</div>
  );
}
