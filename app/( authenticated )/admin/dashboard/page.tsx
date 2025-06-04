import { DashboardBannerCard } from "@/components/cards/DashboardBannerCard";
import Component from "@/components/charts/chart-pie-donut";
import { SectionCards } from "@/components/dashboard/dashboard-cards";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  // Protect the page from users who are not admins
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    redirect("/");
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <DashboardBannerCard /> {/* ✅ drop the banner here */}
          </div>
          <SectionCards />

          <div className="px-4 lg:px-6">
            <Component />
          </div>
        </div>
      </div>
    </div>
  );
}
