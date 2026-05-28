import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getAdminDashboardData } from "@/lib/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let data;
  let error = null;
  try {
    data = await getAdminDashboardData();
  } catch (e) {
    error = e instanceof Error ? e.message : "Could not load dashboard.";
    data = {
      leads: { corporate: 0, events: 0, experience: 0, pendingTotal: 0 },
      ops: null,
      tripByStatus: [],
      upcomingTrips: [],
      recentIntake: [],
      pendingLeads: [],
      storageMode: "unknown",
    };
  }

  return <AdminDashboard data={data} error={error} />;
}
