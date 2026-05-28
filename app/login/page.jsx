import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UnifiedSignIn } from "@/components/auth/unified-sign-in";
import { adminAuthConfigured, isValidAdminSession } from "@/lib/admin-auth";
import {
  corporatePortalAuthConfigured,
  isValidCorporatePortalSession,
} from "@/lib/corporate-portal-auth";
import { isDevAuthHelperEnabled } from "@/lib/dev-auth-helper";
import { safeAdminRedirect, safePortalRedirect } from "@/lib/login-redirect";
import {
  isValidAdminUserSession,
  isValidChauffeurSession,
  userAuthConfigured,
} from "@/lib/user-auth";

export default async function UnifiedLoginPage({ searchParams }) {
  const sp = await searchParams;
  const jar = await cookies();

  if (isValidAdminSession(jar) || isValidAdminUserSession(jar)) {
    redirect(safeAdminRedirect(typeof sp.redirect === "string" ? sp.redirect : null));
  }

  if (isValidChauffeurSession(jar)) {
    const raw = typeof sp.redirect === "string" ? sp.redirect : null;
    redirect(raw && raw.startsWith("/driver") ? raw : "/driver/dashboard");
  }

  if (corporatePortalAuthConfigured() && isValidCorporatePortalSession(jar)) {
    redirect(safePortalRedirect(typeof sp.redirect === "string" ? sp.redirect : null));
  }

  const adminConfigured = adminAuthConfigured();
  const portalConfigured = corporatePortalAuthConfigured();
  const devHelper = isDevAuthHelperEnabled();

  return (
    <div className="flex min-h-full flex-col items-center justify-center px-4 py-16">
      <UnifiedSignIn
        adminConfigured={adminConfigured}
        portalConfigured={portalConfigured}
        userAuthConfigured={userAuthConfigured()}
      />
      {devHelper ? (
        <p className="mt-6 max-w-md text-center text-xs leading-relaxed text-zinc-500">
          Dev helper:{" "}
          <Link href="/dev/auth-test" className="text-amber-200/90 underline-offset-2 hover:underline">
            /dev/auth-test
          </Link>{" "}
          · Run <code className="text-zinc-400">npm run test:auth</code>
        </p>
      ) : null}
    </div>
  );
}
