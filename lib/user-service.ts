import type { GlobalRole } from "@prisma/client";
import { verifyPassword } from "@/lib/password";
import { prisma } from "@/lib/prisma";

export async function authenticateUser(
  email: string,
  password: string,
  expectedRole: GlobalRole,
) {
  const normalized = email.trim().toLowerCase();
  const user = await prisma.user.findFirst({
    where: { email: normalized, globalRole: expectedRole },
  });
  if (!user) return null;
  if (!verifyPassword(password, user.passwordHash)) return null;
  return user;
}

export async function createUserWithRole(input: {
  email: string;
  name: string;
  password: string;
  globalRole: GlobalRole;
  phone?: string | null;
}) {
  const { hashPassword } = await import("@/lib/password");
  const normalized = input.email.trim().toLowerCase();
  return prisma.user.create({
    data: {
      email: normalized,
      name: input.name.trim(),
      passwordHash: hashPassword(input.password),
      globalRole: input.globalRole,
      phone: input.phone?.trim() || null,
    },
    select: { id: true, email: true, name: true, globalRole: true },
  });
}
