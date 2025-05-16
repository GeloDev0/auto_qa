import { columns, Project } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/data-table";
import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";

async function getData(): Promise<Project[]> {
  // Fetch data from your API here.
  return [
    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },
    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },

    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },

    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },

    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },

    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },

    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },

    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },
    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },

    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },
    {
      id: "PRJ-001",
      title: "Project 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      status: "active",
      createdBy: "John Doe",
      assignedTo: "Jane Smith",
    },

    // ...
  ];
}

export default async function AdminDashboard() {
  const data = await getData();
  // Protect the page from users who are not admins
  const isAdmin = await checkRole("admin");
  if (!isAdmin) {
    redirect("/");
  }

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
