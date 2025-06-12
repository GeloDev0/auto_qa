import { ProjectBannerCard } from "@/components/cards/ProjectBannerCard";
import { columns } from "@/components/tables/testcase-table/column";
import { DataTable } from "@/components/tables/testcase-table/data-table";

interface PageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: PageProps) {
  const projectId = params.projectId;

  // ✅ Fetch project details (to get createdAt)
  const projectRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/projects/${projectId}`,
    {
      cache: "no-store",
    }
  );

  if (!projectRes.ok) {
    throw new Error("Failed to fetch project info");
  }

  const { project } = await projectRes.json();

  // ✅ Format createdAt
  let formattedDate = "Unknown";
  if (project.createdAt) {
    const parsedDate = new Date(project.createdAt);
    if (!isNaN(parsedDate.getTime())) {
      formattedDate = parsedDate.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  }

  // ✅ Fetch test cases
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/projects/${projectId}/testcases`,
    {
      cache: "no-store", // ensures fresh data on every request
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch test cases");
  }

  const data = await res.json();
  const testCases = Array.isArray(data.testCases) ? data.testCases : [];

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <ProjectBannerCard
              title={project.title}
              description="Testing suite for the main e-commerce application including checkout, user management, and product catalog."
              testSuitesCount={3}
              testCasesCount={testCases.length}
              createdAt={formattedDate}
              projectId={projectId}
            />
          </div>

          <div className="px-4 lg:px-6">
            <DataTable columns={columns} data={testCases} />
          </div>
        </div>
      </div>
    </div>
  );
}
