import { ProjectBannerCard } from "@/components/cards/ProjectBannerCard";
import { columns, TestCase } from "@/components/tables/testcase-table/column";
import { DataTable } from "@/components/tables/testcase-table/data-table";

// ✅ Get projectId from params
interface PageProps {
  params: { id: string };
}

async function getData(): Promise<TestCase[]> {
  return [
    {
      id: "TC-001",
      description: "Verify user can add items to the cart",
      module: "Shopping Cart",
      priority: "High",
      type: "Functional",
      status: "Passed",
      createdBy: "John Doe",
    },
    // ...
  ];
}

// ✅ Accept props and extract projectId
export default async function ProjectPage({ params }: PageProps) {
  const data = await getData();
  const { id } = params;

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          {/* Consistent padding wrapper */}
          <div className="px-4 lg:px-6">
            <ProjectBannerCard
              title="E-commerce Platform"
              description="Testing suite for the main e-commerce application including checkout, user management, and product catalog."
              testSuitesCount={3}
              testCasesCount={18}
              createdAt="May 2025"
              projectId={id}
            />
          </div>

          {/* Table section with matching padding */}
          <div className="px-4 lg:px-6">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
