// app/admin/projects/[projectId]/page.tsx

import { ProjectBannerCard } from "@/components/cards/ProjectBannerCard";
import { TestSuiteCard } from "@/components/cards/TestSuiteCard";

export default function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;

  // Dummy data – in a real app you'd fetch this
  const testSuites = [
    {
      id: "suite-1", // 👈 required
      projectId, // 👈 passed from route param
      title: "Checkout Flow",
      description: "Tests related to cart, payment, and order confirmation.",
      status: "active" as const,
      testCaseCount: 8,
      deadline: "2025-06-15",
      assignedTo: "Jane Doe",
    },
    {
      id: "suite-2",
      projectId,
      title: "User Management",
      description: "Covers login, registration, profile updates.",
      status: "pending" as const,
      testCaseCount: 6,
      deadline: "2025-06-10",
      assignedTo: "John Smith",
    },
    {
      id: "suite-3",
      projectId,
      title: "Product Catalog",
      description: "Handles product listings, filters, and categories.",
      status: "completed" as const,
      testCaseCount: 4,
      deadline: "2025-06-10",
      assignedTo: "Alice Nguyen",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <ProjectBannerCard
        title="E-commerce Platform"
        description="Testing suite for the main e-commerce application including checkout, user management, and product catalog."
        testSuitesCount={3}
        testCasesCount={18}
        createdAt="May 2025"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testSuites.map((suite, index) => (
          <TestSuiteCard key={index} testSuite={suite} />
        ))}
      </div>
    </div>
  );
}
