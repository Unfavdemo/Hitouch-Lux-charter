import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserSessionFromCookies } from "@/lib/user-auth";

export async function getChauffeurSessionOrNull() {
  const jar = await cookies();
  const session = getUserSessionFromCookies(jar);
  if (!session || session.role !== "CHAUFFEUR") return null;
  return session;
}

export function unauthorizedResponse() {
  return NextResponse.json({ ok: false, message: "Unauthorized." }, { status: 401 });
}
