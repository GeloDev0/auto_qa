// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontalIcon, MoreVerticalIcon } from "lucide-react";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Badge } from "@/components/ui/badge";
// import Link from "next/link";

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type Project = {
//   id: "PRJ-001" | "PRJ-002" | "PRJ-003" | "PRJ-004";
//   title: string;
//   description: string;
//   status: "active" | "inactive";
//   createdBy: string;
//   priority: "high" | "medium" | "low";
// };

// export const columns: ColumnDef<Project>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <div className="flex items-center justify-center">
//         <Checkbox
//           checked={
//             table.getIsAllPageRowsSelected() ||
//             (table.getIsSomePageRowsSelected() && "indeterminate")
//           }
//           onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//           aria-label="Select all"
//         />
//       </div>
//     ),
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center">
//         <Checkbox
//           checked={row.getIsSelected()}
//           onCheckedChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       </div>
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     accessorKey: "id",
//     header: "Project ID",
//   },
//   {
//     accessorKey: "title",
//     header: "Title",
//   },
//   {
//     accessorKey: "description",
//     header: "Description",
//   },
//   {
//     accessorKey: "createdBy",
//     header: "Created By",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const status = row.original.status;
//       const statusColor = {
//         active: "bg-green-500",
//         inactive: "bg-blue-400",
//       };

//       return (
//         <Badge
//           className={`${
//             statusColor[status] || "bg-gray-200"
//           } text-white rounded-full`}
//         >
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "priority",
//     header: "Priority",
//     cell: ({ row }) => {
//       const priority = row.original.priority;
//       const priorityColor = {
//         high: "bg-red-500",
//         medium: "bg-yellow-500",
//         low: "bg-blue-500",
//       };

//       return (
//         <Badge
//           className={`${
//             priorityColor[priority] || "bg-gray-200"
//           } text-white rounded-full`}
//         >
//           {priority.charAt(0).toUpperCase() + priority.slice(1)}
//         </Badge>
//       );
//     },
//   },

//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const Project = row.original;

//       return (
//         <div className="flex items-center ">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button
//                 variant="ghost"
//                 className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
//                 size="icon"
//               >
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontalIcon className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <Link href="/admin/testcase">
//                 <DropdownMenuItem>View</DropdownMenuItem>
//               </Link>
//               <DropdownMenuItem>Edit</DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>Delete</DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       );
//     },
//   },
// ];


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
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Helper to capitalize first letter
const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export type Project = {
  id: "PRJ-001" | "PRJ-002" | "PRJ-003" | "PRJ-004";
  title: string;
  description: string;
  status: "active" | "inactive" | "completed";
  createdBy: string;
  priority: "high" | "medium" | "low";
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
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "createdBy",
    header: "Created By",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      // Normalize and typecast the status key
      const status = row.original.status.toLowerCase() as "active" | "inactive";
     const statusColor: Record<"active" | "inactive" | "completed", string> = {
  active: "bg-blue-500",       // Blue for in-progress (common in Jira)
  inactive: "bg-gray-400",     // Gray for paused/inactive
  completed: "bg-green-500",   // Green for done/completed
};

      return (
        <Badge
          className={`${statusColor[status] || "bg-gray-200"} text-white rounded-full`}
        >
          {capitalize(status)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      // Normalize and typecast the priority key
      const priority = row.original.priority.toLowerCase() as
        | "high"
        | "medium"
        | "low";
      const priorityColor: Record<"high" | "medium" | "low", string> = {
        high: "bg-red-500",
        medium: "bg-yellow-400",
        low: "bg-blue-500",
      };

      return (
        <Badge
          className={`${priorityColor[priority] || "bg-gray-200"} text-white rounded-full`}
        >
          {capitalize(priority)}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const project = row.original;

      return (
        <div className="flex items-center ">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                size="icon"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <Link href="/admin/testcase">
                <DropdownMenuItem>View</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
