import { redirect } from "next/navigation";

/** Legacy URL → unified sign-in (staff tab). */
export default async function AdminLoginRedirectPage({ searchParams }) {
  const sp = await searchParams;
  const params = new URLSearchParams();
  params.set("mode", "staff");
  if (typeof sp.redirect === "string") params.set("redirect", sp.redirect);
  redirect(`/login?${params.toString()}`);
}
