"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil } from "lucide-react";

import {
  FaCalendarCheck,
  FaUserFriends,
  FaFolder,
  FaArrowUp,
} from "react-icons/fa";
import Link from "next/link";
import { EditTestSuiteDialog } from "../dialogs/edit-testsuite-dialog";

const statusColor = {
  active: "bg-green-500",
  pending: "bg-yellow-500",
  completed: "bg-blue-500",
  archived: "bg-gray-400",
};

type TestSuite = {
  id: string;
  title: string;
  description: string;
  status: "active" | "pending" | "completed" | "archived";
  testCaseCount: number;
  deadline?: string;
  assignedTo?: string;
  priority?: "low" | "medium" | "high"; // ✅ added this
};

type Props = {
  testSuite: TestSuite;
};

export function TestSuiteCard({ testSuite }: Props) {
  return (
    <Card className="w-full sm:max-w-xs md:max-w-md overflow-hidden shadow-md p-0 gap-2">
      <CardHeader className="p-0 h-16 bg-blue-200" />
      <CardContent className="p-4 pt-2">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold truncate w-full">
            {testSuite.title}
          </h3>
        </div>
        <p
          className="text-gray-500 text-sm mb-4 line-clamp-2"
          title={testSuite.description}
        >
          {testSuite.description}
        </p>

        <div className="text-sm text-gray-600 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <FaFolder className="text-yellow-500 w-4 h-4" />
            <span className="font-medium">Test Cases:</span>{" "}
            {testSuite.testCaseCount}
          </div>

          {testSuite.deadline && (
            <div className="flex items-center gap-1">
              <FaCalendarCheck className="text-blue-500 w-4 h-4" />
              <span className="font-medium">Deadline:</span>{" "}
              {testSuite.deadline}
            </div>
          )}

          {testSuite.assignedTo && (
            <div className="flex items-center gap-1">
              <FaUserFriends className="text-green-500 w-4 h-4" />
              <span className="font-medium">Assigned To:</span>{" "}
              {testSuite.assignedTo}
            </div>
          )}

          {testSuite.priority && (
            <div className="flex items-center gap-1">
              <FaArrowUp
                className={`${
                  testSuite.priority === "high"
                    ? "text-red-500"
                    : testSuite.priority === "medium"
                    ? "text-orange-400"
                    : "text-gray-500"
                } w-4 h-4`}
              />
              <span className="font-medium">Priority:</span>{" "}
              {testSuite.priority}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center p-4 gap-2 border-t">
        <Badge
          className={`${
            statusColor[testSuite.status] || "bg-gray-300"
          } text-white text-xs px-2 py-0.5 rounded-full`}
        >
          {testSuite.status}
        </Badge>
        <div className="flex">
          <Link href={`/admin/projects/${testSuite.id}/suites/${testSuite.id}`}>
            <Button size="icon" variant="ghost">
              <Eye className="w-4 h-4 text-blue-600" />
            </Button>
          </Link>
          <EditTestSuiteDialog
            testSuite={{
              title: testSuite.title,
              description: testSuite.description,
              assignedTester: testSuite.assignedTo ?? "",
              priority: testSuite.priority ?? "",
            }}
            onEdit={(updatedValues) => {
              console.log("Edited test suite:", updatedValues);
            }}
          >
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4 text-green-600" />
            </Button>
          </EditTestSuiteDialog>
        </div>
      </CardFooter>
    </Card>
  );
}
