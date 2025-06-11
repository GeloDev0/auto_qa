// app/user/projects/page.tsx
import { ProjectBannerCard1 } from "@/components/cards/ProjectBannerCard1";
import { UserDataTable } from "@/components/tables/project-table/user-data-table";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import { Project } from "@/components/tables/project-table/columns";
import { getDummyProjects } from "@/lib/mockData";
import { userColumns } from "@/components/tables/project-table/user-column";

async function getUserProjects(): Promise<Project[]> {
  // Backend will handle data fetching directly
  // Currently using mock data as placeholder
  return getDummyProjects().map((project) => ({
    ...project,
    members: project.members ?? [],
  }));
}

export default async function UserProjects() {
  // Redirect admin users
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
            <ProjectBannerCard1
              title="My Projects"
              description="View your testing projects and track their progress."
            />
          </div>

          {process.env.NODE_ENV === "development" && (
            <div className="px-4 lg:px-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-yellow-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Development Mode:</strong> Using mock project data
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="px-4 lg:px-6">
            <UserDataTable columns={userColumns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
