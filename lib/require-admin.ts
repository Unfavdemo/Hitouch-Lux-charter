import { cookies } from "next/headers";
import { isValidAdminSession } from "@/lib/admin-auth";
import { isValidAdminUserSession } from "@/lib/user-auth";

export async function requireAdminSession(): Promise<boolean> {
  const jar = await cookies();
  return isValidAdminSession(jar) || isValidAdminUserSession(jar);
}
