//user-data-table.tsx


"use client";
import * as React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, TableIcon, Eye } from "lucide-react";
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

import { FaCalendar, FaCalendarCheck, FaFolder, FaUser } from "react-icons/fa";
import { Progress } from "@/components/ui/progress";
import { HiEye } from "react-icons/hi2";
import Link from "next/link";
import { DataTablePagination } from "./pagination";

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const month = date.toLocaleString('en-US', { month: 'short' }); // e.g., "Jun"
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month}-${day}-${year}`; // e.g., "Jun-5-2025"
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UserDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [isCardView, setIsCardView] = React.useState(true);

  const statusColor: Record<"ACTIVE" | "INACTIVE", string> = {
    ACTIVE: "bg-blue-100 text-blue-800",
    INACTIVE: "bg-gray-400 text-white",
  };

  const priorityColor: Record<"HIGH" | "MEDIUM" | "LOW", string> = {
    HIGH: "bg-red-100 text-red-800",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    LOW: "bg-blue-100 text-blue-800",
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <Input
          placeholder="Search projects..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />

        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <Button
              variant={isCardView ? "outline" : "ghost"}
              size="icon"
              onClick={() => setIsCardView(true)}
              title="Card View">
              <LayoutGrid className="w-5 h-5" />
            </Button>
            <Button
              variant={!isCardView ? "outline" : "ghost"}
              size="icon"
              onClick={() => setIsCardView(false)}
              title="Table View">
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
                    }>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isCardView ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((project: any, index) => (
            <Card
              key={index}
              className="w-full sm:max-w-xs md:max-w-md overflow-hidden shadow-md p-0 gap-2 hover:shadow-lg transition-shadow">
              <CardHeader className="p-0 h-8 bg-blue-200" />
              <CardContent className="p-4 pt-2 pb-2 overflow-hidden flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold truncate w-full">
                    {project.title}
                  </h3>
                </div>
                <p
                  className="text-gray-500 text-sm mb-4 truncate"
                  title={project.description}>
                  {project.description}
                </p>

                <div className="text-sm text-gray-500 flex flex-col gap-2">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm ml-auto font-medium">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>
                  <div className="flex items-center gap-1">
                    <FaFolder className="text-gray-300 w-4 h-4" />
                    <span className="font-medium">Test Cases:</span>
                    <span>{project.testcaseCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendar className="text-gray-300 w-4 h-4" />
                    <span className="font-medium">Start:</span>
                    <span>
                      {formatDate(project.startDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaCalendarCheck className="text-gray-300 w-4 h-4" />
                    <span className="font-medium">Deadline:</span>
                    <span>
                      {formatDate(project.deadline)}
                    </span>
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
              <CardFooter className="flex justify-between items-center p-4 gap-2">
                <div className="flex items-center gap-2">
                  {project.status && (
                    <Badge
                      className={`${
                        statusColor[
                          project.status.toUpperCase() as keyof typeof statusColor
                        ] || "bg-gray-200"
                      } text-xs px-2 py-0.5 rounded-full`}>
                      {project.status.toLowerCase()}
                    </Badge>
                  )}
                  {project.priority && (
                    <Badge
                      className={`${
                        priorityColor[
                          project.priority.toUpperCase() as keyof typeof priorityColor
                        ] || "bg-gray-200"
                      } text-xs px-2 py-0.5 rounded-full`}>
                      {project.priority.toLowerCase()}
                    </Badge>
                  )}
                </div>

                {/* Add member count if exists
                {project.members && project.members.length > 0 && (
                  <div className="flex items-center text-sm">
                    <FaUser className="text-gray-400 mr-1" />
                    <span>{project.members.length}</span>
                  </div>
                )} */}
                <Button asChild variant="ghost" size="icon" className="w-6 h-6">
                  <Link href={`/user/projects/${project.id}`}>
                    <HiEye className="w-4 h-4 text-gray-400" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="sticky top-0 z-10 bg-blue-50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-muted-foreground font-medium">
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
                    <TableRow key={row.id}>
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
                      className="h-24 text-center">
                      No projects found.
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
