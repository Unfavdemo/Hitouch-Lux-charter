"use server";

import { revalidatePath } from "next/cache";
import { advanceTripStatus } from "@/lib/trip-service";
import { cookies } from "next/headers";
import { getUserSessionFromCookies } from "@/lib/user-auth";

export async function advanceMyTrip(tripId: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const jar = await cookies();
    const session = getUserSessionFromCookies(jar);
    if (!session || session.role !== "CHAUFFEUR") {
      return { ok: false, error: "Not signed in." };
    }
    const result = await advanceTripStatus(tripId, {
      expectedChauffeurId: session.userId,
    });
    if (!result.ok) {
      return { ok: false, error: result.error };
    }
    revalidatePath("/driver/dashboard");
    return { ok: true };
  } catch (err) {
    console.error("[advanceMyTrip]", err);
    return { ok: false, error: "Something went wrong. Please try again." };
  }
}
