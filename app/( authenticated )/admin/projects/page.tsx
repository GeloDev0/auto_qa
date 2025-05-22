import { columns, Project } from "@/components/tables/project-table/columns";
import { DataTable } from "@/components/tables/project-table/data-table";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

// Updated fetchData function to call your API route
async function getData(): Promise<Project[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/projects`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await res.json();
  return data;
}

export default async function AdminProjects() {
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    redirect("/");
  }

  const data = await getData();

  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <div className="px-4 lg:px-6">
            <DataTable columns={columns} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
