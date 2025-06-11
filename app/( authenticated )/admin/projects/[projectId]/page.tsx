import { ProjectBannerCard } from "@/components/cards/ProjectBannerCard";
import { columns } from "@/components/tables/testcase-table/column";
import { DataTable } from "@/components/tables/testcase-table/data-table";
import { testCases } from "@/types/dummy-data";

interface PageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: PageProps) {
  const projectId = params.projectId;

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
              title="E-commerce Platform"
              description="Testing suite for the main e-commerce application including checkout, user management, and product catalog."
              testSuitesCount={3}
              testCasesCount={testCases.length}
              createdAt="May 2025"
              projectId={projectId}
            />
          </div>

          <div className="px-4 lg:px-6">
            <DataTable columns={columns} data={data.testCases} />
          </div>
        </div>
      </div>
    </div>
  );
}
