// src/app/columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { getTestCaseById } from "@/types/dummy-data";
import { TestCase, TestCaseSheet } from "./test-case-details-sheets";

export const columns: ColumnDef<TestCase>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "Test Case ID",
  },
  {
    accessorKey: "testcase",
    header: "Test Case",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">{row.original.description}</div>
    ),
  },
  {
    accessorKey: "module",
    header: "Module",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },

  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const testcase = row.original;
      const [isSheetOpen, setIsSheetOpen] = useState(false);

      // Get full test case data with all details
      const fullTestCase = getTestCaseById(testcase.id);

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsSheetOpen(true)}>
                View
              </DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {fullTestCase && (
            <TestCaseSheet
              testcase={fullTestCase}
              isOpen={isSheetOpen}
              onOpenChange={setIsSheetOpen}
              onSave={(updatedTestCase) => {
                // Handle save logic here
                console.log("Updated test case:", updatedTestCase);
              }}
            />
          )}
        </>
      );
    },
  },
];
