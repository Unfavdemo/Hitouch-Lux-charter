/** @type {import('next').Metadata} */
export const metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }) {
  return (
    <div className="min-h-full bg-[#0f1114] text-zinc-100 antialiased">{children}</div>
  );
}
