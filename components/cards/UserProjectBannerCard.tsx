// components/user-project-banner.tsx
"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChartBar, Target } from "lucide-react";
import { FaFileExport, FaJira } from "react-icons/fa";

interface UserProjectBannerProps {
  title: string;
  description: string;
  testCasesCount?: number;
  createdAt?: string;
  projectId: string;
}

export function UserProjectBanner({
  title,
  description,
  testCasesCount,
  createdAt,
  projectId,
}: UserProjectBannerProps) {
  const router = useRouter();

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-100 pb-0">
      <CardHeader className="pb-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-muted-foreground mt-1 text-lg">{description}</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-blue-100">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <CalendarDays className="h-4 w-4 text-blue-600" />
              <span className="font-medium">Created {createdAt ?? "N/A"}</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <Target className="h-4 w-4 text-purple-600" />
              <span className="font-medium">
                {testCasesCount ?? 0} Test Cases
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm">
              <ChartBar className="h-4 w-4 text-red-600" />
              <span className="font-medium">Progress</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500">
            <Button variant="outline">
              <FaFileExport className="mr-1 h-4 w-4 " />
              Export
            </Button>
            <Button variant="outline">
              <FaJira className="mr-1 h-4 w-4" />
              Export to Jira
            </Button>
            <Button
              onClick={() =>
                router.push(`/user/projects/${projectId}/generate-test-cases`)
              }
              className="bg-blue-600 hover:bg-blue-700">
              + Generate Test Cases
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
