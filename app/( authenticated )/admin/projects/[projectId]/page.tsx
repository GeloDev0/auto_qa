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
    <div className="flex flex-1 flex-col p-6 space-y-6 max-w-7xl mx-auto">
      <ProjectBannerCard
        title="E-commerce Platform"
        description="Testing suite for the main e-commerce application including checkout, user management, and product catalog."
        testSuitesCount={3}
        testCasesCount={18}
        createdAt="May 2025"
        projectId={id} // ✅ Pass it in
      />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
