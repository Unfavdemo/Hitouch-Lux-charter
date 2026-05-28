import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserSessionFromCookies } from "@/lib/user-auth";

export async function requireChauffeurSession() {
  const jar = await cookies();
  const session = getUserSessionFromCookies(jar);
  if (!session || session.role !== "CHAUFFEUR") {
    redirect("/login?mode=driver");
  }
  return session;
}
