"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
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
import { DataTablePagination } from "./pagination";
import { Badge } from "@/components/ui/badge";
import { LayoutGrid, TableIcon } from "lucide-react";
import { TestCase, TestCaseSheet } from "./test-case-details-sheets";
import { FaFolder, FaUser } from "react-icons/fa";
import { HiEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import { DeleteDialog } from "@/components/dialogs/delete-dialog";
import { EditTestCaseDialog } from "@/components/dialogs/edit-testcase-dialog";
import { toast, Toaster } from "sonner";
// Create this component

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchColumn?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchColumn = "testcase",
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [selectedTestCase, setSelectedTestCase] =
    React.useState<TestCase | null>(null);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [isCardView, setIsCardView] = React.useState(true);
  const router = useRouter();

  const priorityStyles: Record<
    "high" | "medium" | "low",
    { bg: string; text: string }
  > = {
    high: { bg: "bg-red-100", text: "text-red-600" },
    medium: { bg: "bg-orange-200", text: "text-orange-600" },
    low: { bg: "bg-yellow-200", text: "text-yellow-700" },
  };

  const statusStyles: Record<
    "passed" | "failed" | "blocked",
    { bg: string; text: string }
  > = {
    passed: { bg: "bg-green-500", text: "text-white" },
    failed: { bg: "bg-red-500", text: "text-white" },
    blocked: { bg: "bg-yellow-400", text: "text-gray-800" },
  };

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
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
        <Input
          placeholder="Search test cases..."
          value={
            (table.getColumn(searchColumn)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(searchColumn)?.setFilterValue(event.target.value)
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
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const testcase = row.original as TestCase;
              return (
                <div
                  key={row.id}
                  className="border rounded-lg overflow-hidden shadow-md bg-white">
                  <div className="h-8 bg-blue-200" /> {/* Top accent bar */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold truncate">
                        {testcase.testcase}
                      </h3>
                    </div>

                    <p
                      className="text-gray-500 text-sm mb-4 truncate"
                      title={testcase.description}>
                      {testcase.description}
                    </p>

                    <div className="text-sm text-gray-500 space-y-2">
                      <div className="flex items-center gap-1">
                        <FaFolder className="text-blue-400 w-4 h-4" />
                        <span className="font-medium">Module:</span>
                        <span className="ml-1">{testcase.module}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <FaUser className="text-blue-400 w-4 h-4" />
                        <span className="font-medium">Created By:</span>
                        <span className="ml-1">{testcase.createdBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-4 border-t">
                    <div className="flex gap-1">
                      {testcase.priority && (
                        <Badge
                          className={`${
                            priorityStyles[
                              testcase.priority.toLowerCase() as keyof typeof priorityStyles
                            ]?.bg || "bg-gray-200"
                          } ${
                            priorityStyles[
                              testcase.priority.toLowerCase() as keyof typeof priorityStyles
                            ]?.text || "text-gray-800"
                          } text-xs px-2 py-0.5 rounded-full`}>
                          {testcase.priority.toLowerCase()}
                        </Badge>
                      )}
                      {testcase.status && (
                        <Badge
                          className={`${
                            statusStyles[
                              testcase.status.toLowerCase() as keyof typeof statusStyles
                            ]?.bg || "bg-blue-100"
                          } ${
                            statusStyles[
                              testcase.status.toLowerCase() as keyof typeof statusStyles
                            ]?.text || "text-blue-700"
                          } text-xs px-2 py-0.5 rounded-full`}>
                          {testcase.status.toLowerCase()}
                        </Badge>
                      )}
                    </div>

                    <div className="flex">
                      <Button
                        className="w-6 h-6 rounded-full"
                        size="icon"
                        variant="ghost"
                        onClick={() => setSelectedTestCase(testcase)}>
                        <HiEye className="w-4 h-4 text-gray-400" />
                      </Button>

                      <EditTestCaseDialog
                        testcase={testcase}
                        onEdit={async (updatedTestCase) => {
                          // Implement your update logic here
                          console.log("Updated test case:", updatedTestCase);
                          toast.success("Test case updated successfully!");
                        }}>
                        <Button
                          className="w-6 h-6 rounded-full"
                          size="icon"
                          variant="ghost">
                          <HiMiniPencilSquare className="w-4 h-4 text-gray-400" />
                        </Button>
                      </EditTestCaseDialog>

                      <DeleteDialog
                        onDelete={async () => {
                          // Implement your delete logic here
                          console.log("Deleting test case:", testcase.id);
                          toast.success("Test case deleted successfully!");
                        }}>
                        <Button
                          className="w-6 h-6 rounded-full"
                          size="icon"
                          variant="ghost">
                          <HiTrash className="w-4 h-4 text-gray-400" />
                        </Button>
                      </DeleteDialog>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full text-center py-12 text-gray-500">
              No test cases found
            </div>
          )}
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
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="odd:bg-white even:bg-gray-50">
                      {row.getVisibleCells().map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="text-sm text-gray-700">
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
      {selectedTestCase && (
        <TestCaseSheet
          testcase={selectedTestCase}
          isOpen={!!selectedTestCase}
          onOpenChange={(open) => {
            if (!open) setSelectedTestCase(null);
          }}
        />
      )}
    </div>
  );
}
