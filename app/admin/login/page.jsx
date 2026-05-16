import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { adminAuthConfigured, isValidAdminSession } from "@/lib/admin-auth";
import { isDevAuthHelperEnabled } from "@/lib/dev-auth-helper";

function LoginFormFallback() {
  return (
    <div className="h-40 animate-pulse rounded-md bg-white/5" aria-hidden />
  );
}

export default async function AdminLoginPage({ searchParams }) {
  const jar = await cookies();
  if (isValidAdminSession(jar)) {
    const sp = await searchParams;
    const raw = typeof sp.redirect === "string" ? sp.redirect : null;
    const safe =
      raw && raw.startsWith("/admin") && !raw.startsWith("/admin/login") ? raw : "/admin";
    redirect(safe);
  }

  const configured = adminAuthConfigured();
  const devHelper = isDevAuthHelperEnabled();

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm rounded-xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
          HiTouch · Staff only
        </p>
        <h1 className="mt-2 font-serif text-2xl text-white">B2B intake sign-in</h1>
        {!configured ? (
          <p className="mt-4 text-sm leading-relaxed text-amber-100/90">
            Set{" "}
            <code className="rounded bg-black/50 px-1 py-0.5 text-xs">ADMIN_USERNAME</code> (optional,
            defaults to <code className="rounded bg-black/50 px-1 py-0.5 text-xs">admin</code>),{" "}
            <code className="rounded bg-black/50 px-1 py-0.5 text-xs">ADMIN_PASSWORD</code>, and{" "}
            <code className="rounded bg-black/50 px-1 py-0.5 text-xs">ADMIN_SESSION_SECRET</code> in
            the server environment, then restart the app.
          </p>
        ) : (
          <Suspense fallback={<LoginFormFallback />}>
            <AdminLoginForm />
          </Suspense>
        )}
      </div>
      {devHelper ? (
        <p className="mt-6 max-w-sm text-center text-xs leading-relaxed text-zinc-500">
          Dev helper:{" "}
          <Link href="/dev/auth-test" className="text-amber-200/90 underline-offset-2 hover:underline">
            /dev/auth-test
          </Link>{" "}
          (portal one-click + checklist). Run <code className="text-zinc-400">npm run test:auth</code> in a
          terminal for the same hints.
        </p>
      ) : null}
    </div>
  );
}
