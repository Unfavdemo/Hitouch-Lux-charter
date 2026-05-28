"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { CorporatePortalLoginForm } from "@/components/portal/corporate-portal-login-form";
import { DriverLoginForm } from "@/components/auth/driver-login-form";
import { StaffUserLoginForm } from "@/components/auth/staff-user-login-form";

function TabButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex-1 rounded-md px-2 py-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] transition sm:px-3 sm:text-xs sm:tracking-[0.14em] ${
        active
          ? "bg-amber-200/90 text-black shadow-sm"
          : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
      }`}
    >
      {children}
    </button>
  );
}

function resolveInitialMode(modeParam) {
  if (modeParam === "corporate") return "corporate";
  if (modeParam === "driver") return "driver";
  return "staff";
}

function UnifiedSignInInner({ adminConfigured, portalConfigured, userAuthConfigured }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialMode = resolveInitialMode(searchParams.get("mode"));
  const [mode, setMode] = useState(initialMode);

  function switchMode(next) {
    setMode(next);
    const params = new URLSearchParams(searchParams.toString());
    params.set("mode", next);
    router.replace(`/login?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-200/80">
        HiTouch · Secure access
      </p>
      <h1 className="mt-2 font-serif text-2xl text-white">Sign in</h1>
      <p className="mt-2 text-sm leading-relaxed text-zinc-400">
        Staff desk, chauffeurs, and corporate clients each use the tab that matches their role.
      </p>

      <div
        className="mt-8 grid grid-cols-3 gap-1 rounded-lg border border-white/10 bg-black/30 p-1"
        role="tablist"
        aria-label="Sign-in type"
      >
        <TabButton active={mode === "staff"} onClick={() => switchMode("staff")}>
          Staff
        </TabButton>
        <TabButton active={mode === "driver"} onClick={() => switchMode("driver")}>
          Driver
        </TabButton>
        <TabButton active={mode === "corporate"} onClick={() => switchMode("corporate")}>
          Corporate
        </TabButton>
      </div>

      <div role="tabpanel" className="mt-6">
        {mode === "staff" ? (
          <>
            {!adminConfigured && !userAuthConfigured ? (
              <p className="text-sm leading-relaxed text-amber-100/90">
                Staff sign-in is not configured. Set{" "}
                <code className="rounded bg-black/50 px-1 py-0.5 text-xs">ADMIN_PASSWORD</code> /{" "}
                <code className="rounded bg-black/50 px-1 py-0.5 text-xs">USER_SESSION_SECRET</code>.
              </p>
            ) : (
              <>
                {adminConfigured ? <AdminLoginForm /> : null}
                {userAuthConfigured ? <StaffUserLoginForm /> : null}
              </>
            )}
          </>
        ) : mode === "driver" ? (
          <>
            {!userAuthConfigured ? (
              <p className="text-sm leading-relaxed text-amber-100/90">
                Driver sign-in requires{" "}
                <code className="rounded bg-black/50 px-1 py-0.5 text-xs">USER_SESSION_SECRET</code>{" "}
                and <code className="rounded bg-black/50 px-1 py-0.5 text-xs">DATABASE_URL</code>.
              </p>
            ) : (
              <>
                <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                  Chauffeurs: use the email and password issued by operations.
                </p>
                <DriverLoginForm />
              </>
            )}
          </>
        ) : (
          <>
            {!portalConfigured ? (
              <p className="text-sm leading-relaxed text-amber-100/90">
                Corporate portal is not configured. Set{" "}
                <code className="rounded bg-black/50 px-1 py-0.5 text-xs">
                  CORPORATE_PORTAL_SESSION_SECRET
                </code>.
              </p>
            ) : (
              <>
                <p className="mb-6 text-sm leading-relaxed text-zinc-400">
                  Enter the work email your HiTouch onboarding team enabled. We will send a
                  single-use link (expires in 30 minutes).
                </p>
                <CorporatePortalLoginForm />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SignInFallback() {
  return <div className="h-48 animate-pulse rounded-md bg-white/5" aria-hidden />;
}

export function UnifiedSignIn({ adminConfigured, portalConfigured, userAuthConfigured }) {
  return (
    <Suspense fallback={<SignInFallback />}>
      <UnifiedSignInInner
        adminConfigured={adminConfigured}
        portalConfigured={portalConfigured}
        userAuthConfigured={userAuthConfigured}
      />
    </Suspense>
  );
}
