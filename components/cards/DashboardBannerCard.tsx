"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Replace with real session/auth values
const userRole = "admin"; // or "user", "viewer", etc.
const userName = "Gelo";

export function DashboardBannerCard() {
  const showWelcome = userRole === "admin" || userRole === "user";
  const defaultDescription =
    "Manage your projects, test suites, and test cases efficiently.";

  return (
    <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-blue-100 pb-0">
      <CardHeader className="pb-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div>
                {showWelcome && (
                  <div className="mb-2 flex items-center gap-2">
                    <div className="space-y-4">
                      <Badge className="bg-blue-100 text-blue-500 rounded-xl">
                        Admin
                      </Badge>
                      <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-800 to-blue-400 bg-clip-text text-transparent">
                        Welcome to AutoQA, {userName}
                      </h1>
                    </div>
                  </div>
                )}
                <p className="text-muted-foreground text-lg">
                  {defaultDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
