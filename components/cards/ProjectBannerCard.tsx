"use client";

import { usePathname, useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChartBar, Target } from "lucide-react";
import { FaFileExport, FaJira } from "react-icons/fa";

interface ProjectBannerCardProps {
  title: string;
  description: string;
  testSuitesCount?: number;
  testCasesCount?: number;
  createdAt?: string;
  projectId: string;
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
  const pathname = usePathname();
  const isGeneratePage = pathname?.includes("generate-test-cases");

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-100 pb-0">
      <CardHeader className="pb-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
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
          <div className="flex items-center gap-2 text-gray-500">
            {!isGeneratePage && (
              <>
                {/* <Button variant="outline">
                  <FaFileExport className="mr-1 h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline">
                  <FaJira className="mr-1 h-4 w-4" />
                  Export to Jira
                </Button> */}
                <Button
                  onClick={() =>
                    router.push(
                      `/admin/projects/${projectId}/generate-test-cases`
                    )
                  }>
                  + Generate Test Cases
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
