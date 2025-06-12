import { DashboardBannerCard } from "@/components/cards/DashboardBannerCard";

import TeamCollaboration from "@/components/cards/recent-users";

import { ChartAreaInteractive } from "@/components/charts/chart-area-interactive";

import { SectionCards } from "@/components/dashboard/dashboard-cards";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  // Protect the page from users who are not admins
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    redirect("/");
  }

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <DashboardBannerCard />
          </div>
          <SectionCards />

          <div className="px-4 lg:px-6 ">
            <ChartAreaInteractive />

            {/* Two-column layout for cards */}
            <div className="flex flex-col md:flex-row py-4 md:gap-6 md:py-6">
              <div className="w-full md:w-1/2"></div>
              <div className="w-full md:w-1/2">
                <TeamCollaboration />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
