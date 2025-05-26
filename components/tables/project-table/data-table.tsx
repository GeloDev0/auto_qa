"use client";
import * as React from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, LayoutGrid, Pencil, TableIcon, Trash2 } from "lucide-react";
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

import { CreateProject } from "../../dialogs/project-dialog";
import { DataTablePagination } from "./pagination";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { EditProjectDialog } from "@/components/dialogs/edit-project-dialog";
import { toast } from "sonner";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    createdBy: string;
    status?: string;
    priority?: string;
  };
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
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
  const [isCardView, setIsCardView] = React.useState(false); // 👈 Card view toggle

  const statusColor: Record<"ACTIVE" | "INACTIVE", string> = {
    ACTIVE: "bg-green-500",
    INACTIVE: "bg-blue-400",
  };

  const priorityColor: Record<"HIGH" | "MEDIUM" | "LOW", string> = {
    HIGH: "bg-red-500",
    MEDIUM: "bg-yellow-400",
    LOW: "bg-blue-500",
  };

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
          placeholder="Filter ids..."
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
              variant={!isCardView ? "outline" : "ghost"}
              size="icon"
              onClick={() => setIsCardView(false)}
              title="Table View"
            >
              <TableIcon className="w-5 h-5" />
            </Button>
            <Button
              variant={isCardView ? "outline" : "ghost"}
              size="icon"
              onClick={() => setIsCardView(true)}
              title="Card View"
            >
              <LayoutGrid className="w-5 h-5" />
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
          <CreateProject />
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
              <CardHeader className="p-0 h-16 bg-blue-200" />{" "}
              {/* Reduced height */}
              <CardContent className="p-4 pt-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold truncate w-full">
                    {project.title}
                  </h3>
                  {/* Slightly smaller text */}
                </div>
                <p
                  className="text-gray-500 text-sm mb-4 line-clamp-2"
                  title={project.description}
                >
                  {project.description}
                </p>
                {/* Smaller text and margin */}
                <div className="flex items-center text-sm">
                  <span className="text-gray-400 mr-1">Created By</span>
                  <span className="text-gray-400">{project.createdBy}</span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center pt- p-4 gap-2 border-t">
                <div className="flex items-center gap-2 ">
                  {project.status && (
                    <Badge
                      className={`${
                        statusColor[
                          project.status.toUpperCase() as keyof typeof statusColor
                        ] || "bg-gray-200"
                      } text-white text-xs px-2 py-0.5 rounded-full`}
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
                      } text-white text-xs px-2 py-0.5 rounded-full`}
                    >
                      {project.priority.toLowerCase()}
                    </Badge>
                  )}
                </div>
                {/* Actions Button */}
                <div className="flex">
                  <Button size="icon" variant="ghost">
                    <Eye className="w-4 h-4 text-blue-600" />
                  </Button>
                  <EditProjectDialog
                    project={{
                      id: project.id,
                      title: project.title,
                      description: project.description,
                      status: project.status ?? "active",
                      priority: project.priority ?? "medium",
                    }}
                    onEdit={async (updatedProject) => {
                      try {
                        // Convert lowercase enums to uppercase for backend
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

                        if (!res.ok)
                          throw new Error("Failed to update project");

                        toast.success("Project updated successfully!");
                        router.refresh();
                      } catch (err) {
                        console.error("Update error:", err);
                        toast.error("Failed to update project.");
                      }
                    }}
                  >
                    <Button size="icon" variant="ghost">
                      <Pencil className="w-4 h-4 text-green-600" />
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
                    <Button size="icon" variant="ghost">
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </DeleteDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
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
      )}

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          <DataTablePagination table={table} />
        </div>
      </div>
    </div>
  );
}
