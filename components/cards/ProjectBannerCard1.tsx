"use client";

import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/card";
import { CreateProject } from "../dialogs/project-dialog";

interface ProjectBannerCardProps {
  title: string;
  description: string;
}

export function ProjectBannerCard1({
  title,
  description,
}: ProjectBannerCardProps) {
  const router = useRouter();

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

        <div className="flex items-center justify-end pt-4 border-t border-blue-100">
          <CreateProject />
        </div>
      </CardHeader>
    </Card>
  );
}
