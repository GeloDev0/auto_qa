import { DashboardBannerCard } from "@/components/cards/DashboardBannerCard";
import { SectionCards } from "@/components/cards/dashboard-cards";
import RecentUsersCompact from "@/components/cards/recent-users";
import { ChartAreaInteractive } from "@/components/charts/chart-area-interactive";
import { PriorityChartPie } from "@/components/charts/priority-chart-pie";
import { StatusChartPie } from "@/components/charts/status-chart-pie";
import { columns, Project } from "@/components/tables/project-table/columns";
import { TableOnly } from "@/components/tables/project-table/dashboard-data-table";
import { Card, CardContent } from "@/components/ui/card";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

async function getData(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/projects`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export default async function UserDashboard() {
  // Protect the page from users who are admins
  const isAdmin = await checkRole("admin");
  if (isAdmin) {
    redirect("/");
  }

  const data = await getData();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <DashboardBannerCard />
          </div>

          <SectionCards />

          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />

            {/* Two-column layout for cards */}
            <div className="flex flex-col md:flex-row py-4 md:gap-1 md:py-6">
              <div className="w-full md:w-1/2 md:pr-3">
                <StatusChartPie />
              </div>
              <div className="w-full md:w-1/2 ">
                <PriorityChartPie />
              </div>
              <div className="w-full md:w-1/2 md:pl-3">
                <RecentUsersCompact />
              </div>
            </div>
            <Card>
              <CardContent>
                <TableOnly columns={columns} data={data} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
