"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontalIcon } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { useRouter } from "next/navigation";
import { EditProjectDialog } from "@/components/dialogs/edit-project-dialog";
import { toast } from "sonner";

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

// Helper to capitalize first letter
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export type Member = {
  id: number;
  email: string;
  name: string;
  lname: string;
  imageUrl?: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  testcaseCount: number;
  progress: number;
  startDate: string;
  deadline: string;
  status: "active" | "inactive" | "completed";
  createdBy: string;
  priority: "high" | "medium" | "low";
  members: Member[];
  User_Project_createdByIdToUser?: {
    name: string;
    lname: string;
    imageUrl?: string;
  };
};

export const columns: ColumnDef<Project>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Project ID",
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original.title;
      return (
        <span className="block max-w-[200px] truncate" title={title}>
          {title}
        </span>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const desc = row.original.description;
      return (
        <span className="block max-w-[200px] truncate" title={desc}>
          {desc}
        </span>
      );
    },
  },
  {
    accessorKey: "testcaseCount",
    header: "Test Cases",
  },
 {
  accessorKey: "startDate",
  header: "Start Date",
  cell: ({ row }) => {
    const startDate = row.original.startDate;
    return <span>{formatDate(startDate)}</span>;
  },
},
{
  accessorKey: "deadline",
  header: "Deadline",
  cell: ({ row }) => {
    const deadline = row.original.deadline;
    return <span>{formatDate(deadline)}</span>;
  },
},


  {
  header: "Created By",
  accessorKey: "User_Project_createdByIdToUser",
  cell: ({ row }) => {
    const creator = row.original.User_Project_createdByIdToUser;

    if (!creator) return <span>Unknown</span>;

    return (
      <div className="flex items-center gap-2">
        {creator.imageUrl ? (
          <img
            src={creator.imageUrl}
            alt="creator"
            className="h-5 w-5 rounded-full object-cover"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-300" />
        )}
        <span className="text-sm font-medium">
          {creator.name} {creator.lname}
        </span>
      </div>
    );
  },
},
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status.toLowerCase() as
        | "active"
        | "inactive"
        | "completed";
      return <span className="text-sm">{capitalize(status)}</span>;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.original.priority.toLowerCase() as
        | "high"
        | "medium"
        | "low";
      return <span className="text-sm">{capitalize(priority)}</span>;
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const progress = row.original.progress;
      return (
        <div className="flex items-center">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="ml-2 text-sm">{progress}%</span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;
      const router = useRouter();

      return (
        <div className="flex items-center space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                size="icon">
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Button
                variant="ghost"
                className="w-full justify-start text-left pl-3 text-gray-600"
                onClick={() => router.push(`/admin/projects/${project.id}`)}>
                View
              </Button>

              <EditProjectDialog
                project={{
                  id: project.id,
                  title: project.title,
                  description: project.description,
                  status: project.status,
                  priority: project.priority,
                  members: project.members,
                  startDate: project.startDate,
                  deadline: project.deadline,
                }}
                onEdit={async (updatedProject) => {
                  try {
                    const backendProject = {
                      ...updatedProject,
                      status: updatedProject.status.toUpperCase(),
                      priority: updatedProject.priority.toUpperCase(),
                    };

                    const res = await fetch(
                      `/api/admin/projects/${project.id}`,
                      {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify(backendProject),
                      }
                    );

                    if (!res.ok) throw new Error("Failed to update project");

                    toast.success("Project updated successfully!");
                    router.refresh();
                  } catch (err) {
                    console.error("Update error:", err);
                    toast.error("Failed to update project.");
                  }
                }}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left pl-3 text-gray-600">
                  Edit
                </Button>
              </EditProjectDialog>

              <DropdownMenuSeparator />

              <DeleteDialog
                onDelete={async () => {
                  try {
                    const res = await fetch(
                      `/api/admin/projects/${project.id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    if (!res.ok) throw new Error("Failed to delete project");
                    router.refresh();
                  } catch (err) {
                    console.error("Delete error:", err);
                  }
                }}>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left pl-3 text-red-400">
                  Delete
                </Button>
              </DeleteDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
