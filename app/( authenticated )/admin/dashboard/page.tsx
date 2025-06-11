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

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <DashboardBannerCard /> {/* ✅ drop the banner here */}
          </div>

          <SectionCards />

          {/* Chart section layout */}
          <div className="px-4 lg:px-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className=" w-full md:w-1/3 ">
                <Component /> {/* ✅ This will now be aligned to the left */}
              </div>
              {/* Optional: placeholder for right side content */}
              <div className="hidden md:block md:w-1/2">
                {/* Add more content here if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
