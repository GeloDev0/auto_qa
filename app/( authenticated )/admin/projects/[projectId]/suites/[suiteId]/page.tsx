import { notFound } from "next/navigation";

export default async function TestSuiteDetailPage({
  params,
}: {
  params: { projectId: string; suiteId: string };
}) {
  const { projectId, suiteId } = params;

  const testSuite = {
    id: suiteId,
    projectId,
    title: "Checkout Flow",
    description: "Tests related to cart, payment, and order confirmation.",
    status: "active" as const,
  };

  if (!testSuite) return notFound();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{testSuite.title}</h1>
          <p className="text-gray-500">{testSuite.description}</p>
        </div>
      </div>
    </div>
  );
}
