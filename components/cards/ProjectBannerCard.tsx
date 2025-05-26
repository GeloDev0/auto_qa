"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, CalendarDays, ChartBar, Target } from "lucide-react";
import { CreateTestSuite } from "../dialogs/testsuite-dialog";

interface ProjectBannerCardProps {
  title: string;
  description: string;
  testSuitesCount?: number;
  testCasesCount?: number;
  createdAt?: string;
  projectId: string; // 🔥 Add this prop
}

export function ProjectBannerCard({
  title,
  description,
  testSuitesCount,
  testCasesCount,
  createdAt,
  projectId,
}: ProjectBannerCardProps) {
  const router = useRouter();

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-100 pb-0">
      <CardHeader className="pb-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {title}
                </h1>
                <p className="text-muted-foreground mt-1 text-lg">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-blue-100">
          {/* Left side: project metadata badges */}
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

          {/* Right side: Create & Generate buttons */}
          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                router.push(`/admin/projects/${projectId}/generate-test-cases`)
              }
              variant="secondary"
            >
              + Generate Test Cases
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
