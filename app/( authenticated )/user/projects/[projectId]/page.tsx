import { ProjectBannerCard } from "@/components/cards/ProjectBannerCard";
import { UserProjectBanner } from "@/components/cards/UserProjectBannerCard";
import { columns } from "@/components/tables/testcase-table/column";
import { DataTable } from "@/components/tables/testcase-table/data-table";
import { testCases } from "@/types/dummy-data";

interface PageProps {
  params: { id: string };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = params;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <UserProjectBanner
              title="E-commerce Platform"
              description="Testing suite for the main e-commerce application including checkout, user management, and product catalog."
              testCasesCount={testCases.length}
              createdAt="May 2025"
              projectId={id}
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
