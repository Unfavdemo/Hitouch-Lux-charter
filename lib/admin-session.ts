import { cookies } from "next/headers";
import { isValidAdminSession } from "@/lib/admin-auth";
import { getUserSessionFromCookies } from "@/lib/user-auth";

export type AdminAccess =
  | { kind: "legacy" }
  | { kind: "user"; userId: string };

export async function getAdminAccess(): Promise<AdminAccess | null> {
  const jar = await cookies();
  if (isValidAdminSession(jar)) return { kind: "legacy" };
  const session = getUserSessionFromCookies(jar);
  if (session?.role === "ADMIN") return { kind: "user", userId: session.userId };
  return null;
}

export async function getAdminUserIdForAudit(): Promise<string | null> {
  const access = await getAdminAccess();
  if (access?.kind === "user") return access.userId;
  return null;
}
