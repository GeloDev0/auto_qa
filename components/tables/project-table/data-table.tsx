"use client";
import * as React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Eye,
  LayoutGrid,
  Pencil,
  TableIcon,
  Trash2,
} from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getFilteredRowModel,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

import { DataTablePagination } from "./pagination";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { EditProjectDialog } from "@/components/dialogs/edit-project-dialog";
import { toast } from "sonner";
import { FaCalendar, FaCalendarCheck, FaFolder, FaUser } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import { HiEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    createdBy: string;
    status?: string;
    priority?: string;
    startDate: string;
    deadline: string;
    User_Project_createdByIdToUser?: {
    name: string;
    lname: string;
    imageUrl?: string;
  };
  };
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isCardView, setIsCardView] = React.useState(true); // 👈 Card view toggle

  const statusColor: Record<"ACTIVE" | "INACTIVE", string> = {
    ACTIVE: "bg-blue-100 text-blue-800",
    INACTIVE: "bg-gray-400 text-white",
  };

  const priorityColor: Record<"HIGH" | "MEDIUM" | "LOW", string> = {
    HIGH: "bg-red-100 text-red-800",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-blue-100 text-blue-800",
  };
  const progressValue = 68; // Progress percentage

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        {/* Left: Search Input */}

        <Input
          placeholder="Search projects..."
          value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("id")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        {/* Right: Buttons */}
        <div className="flex items-center gap-2">
          {/* Table and Card View: Buttons */}
          <div className="flex gap-1 ">
            <Button
              variant={isCardView ? "outline" : "ghost"}
              size="icon"
              onClick={() => setIsCardView(true)}
              title="Card View"
            >
              <LayoutGrid className="w-5 h-5" />
            </Button>
            <Button
              variant={!isCardView ? "outline" : "ghost"}
              size="icon"
              onClick={() => setIsCardView(false)}
              title="Table View"
            >
              <TableIcon className="w-5 h-5" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Render card view or table */}
      {isCardView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((project: any, index) => (
            <Card
              key={index}
              className="w-full sm:max-w-xs md:max-w-md overflow-hidden shadow-md p-0 gap-2"
            >
              <CardHeader className="p-0 h-8 bg-blue-200" />{" "}
              {/* Reduced height */}
              <CardContent className="p-4 pt-2 pb-2 overflow-hidden flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold truncate w-full">
                    {project.title}
                  </h3>
                  {/* Slightly smaller text */}
                </div>
                <p
                  className="text-gray-500 text-sm mb-4 truncate "
                  title={project.description}
                >
                  {project.description}
                </p>
                {/* Smaller text and margin */}

                <div className="text-sm text-gray-500 flex flex-col gap-2 ">
                  <div className=" space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium ">Progress</span>
                      <span className="text-sm ml-auto font-medium ">
                        {progressValue}%
                      </span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                  </div>
                  <div className="flex items-center gap-1">
                    <FaFolder className="text-gray-300 w-4 h-4" />
                    <span className="font-medium">Test Cases:</span>{" "}
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-gray-300 w-4 h-4" />
                    <span className="font-medium">Start Date:</span>
                    <span className="text-gray-600 ml-1">{formatDate(project.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarCheck className="text-gray-300 w-4 h-4" />
                    <span className="font-medium">Deadline:</span>
                    <span className="text-gray-600 ml-1">{formatDate(project.deadline)}</span>
                  </div>

                  <div className="flex items-center text-sm gap-1">
                    <FaUser className="text-gray-300 w-4 h-4" />
                    <span className="font-medium">Created By:</span>
                    <span className="ml-1 text-gray-700">
                      {project.User_Project_createdByIdToUser?.name}{" "}
                      {project.User_Project_createdByIdToUser?.lname}
                    </span>
                  </div>

                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center p-4 gap-2 ">
                <div className="flex items-center gap-2 ">
                  {project.status && (
                    <Badge
                      className={`${
                        statusColor[
                          project.status.toUpperCase() as keyof typeof statusColor
                        ] || "bg-gray-200"
                      } text-xs px-2 py-0.5 rounded-full`}
                    >
                      {project.status.toLowerCase()}
                    </Badge>
                  )}
                  {project.priority && (
                    <Badge
                      className={`${
                        priorityColor[
                          project.priority.toUpperCase() as keyof typeof priorityColor
                        ] || "bg-gray-200"
                      }  text-xs px-2 py-0.5 rounded-full`}
                    >
                      {project.priority.toLowerCase()}
                    </Badge>
                  )}
                </div>
                {/* Actions Button */}
                <div className="flex">
                  <Button
                    className="w-6 h-6 rounded-full"
                    size="icon"
                    variant="ghost"
                    onClick={() => router.push(`/admin/projects/${project.id}`)}
                  >
                    <HiEye className="w-4 h-4 text-gray-400" />
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
                      className="w-6 h-6 rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <HiMiniPencilSquare className="w-4 h-4 text-gray-400" />
                    </Button>
                  </EditProjectDialog>
                  <DeleteDialog
                    onDelete={async () => {
                      try {
                        const res = await fetch(
                          `/api/admin/projects/${project.id}`,
                          {
                            method: "DELETE",
                          }
                        );

                        if (!res.ok)
                          throw new Error("Failed to delete project");

                        router.refresh(); // Refresh data
                      } catch (err) {
                        console.error("Delete error:", err);
                      }
                    }}
                  >
                    <Button
                      className="w-6 h-6 rounded-full"
                      size="icon"
                      variant="ghost"
                    >
                      <HiTrash className="w-4 h-4 text-gray-400" />
                    </Button>
                  </DeleteDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="rounded-md border ">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-blue-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-muted-foreground font-medium"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              <DataTablePagination table={table} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
