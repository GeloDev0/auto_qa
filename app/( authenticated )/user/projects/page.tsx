import { UserDataTable } from "@/components/tables/project-table/user-data-table";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import { Project } from "@/components/tables/project-table/columns";
import { userColumns } from "@/components/tables/project-table/user-column";
import { UserProjectBannerCard } from "@/components/cards/UserProjectBanner";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

async function getUserProjects(): Promise<Project[]> {
  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true },
  });

  if (!user) throw new Error("User not found");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/projects/${user.id}`,
    {
      cache: "no-store",
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch user projects");
  }

  return res.json();
}

export default async function UserProjects() {
  if (await checkRole("admin")) {
    redirect("/admin/projects");
  }

  const data = await getUserProjects();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <UserProjectBannerCard
              title="My Projects"
              description="View your testing projects and track their progress."
            />
          </div>

          <div className="px-4 lg:px-6">
            <UserDataTable columns={userColumns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
