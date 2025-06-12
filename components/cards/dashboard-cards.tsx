'use client'

import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

export function SectionCards() {
   const [projectCount, setProjectCount] = useState<number | null>(null);
   
    useEffect(() => {
    const fetchProjectCount = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        const data = await res.json();
        setProjectCount(data.count);
      } catch (error) {
        console.error("Failed to fetch project count", error);
      }
    };

    fetchProjectCount();
  }, []);

  return (
    <div className="*:data-[slot=card]:shadow-l @xl/main:grid-cols-3 @3xl/main:grid-cols-4 @5xl/main:grid-cols-5 grid grid-cols-1 gap-3 px-4  lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Projects</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
              {projectCount !== null ? (
    projectCount.toLocaleString()
  ) : (
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
  )}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total numbers of projects created
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Test Cases</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            1,234
          </CardTitle>
          <div className="absolute right-4 top-4"></div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Down 20% this period <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Total number of testcases created
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Completed</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            45,678
          </CardTitle>
          <div className="absolute right-4 top-4"></div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Strong user retention <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Projects that have been successfully completed
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Inactive</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            5
          </CardTitle>
          <div className="absolute right-4 top-4"></div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Projects currently on hold or blocked due to issues
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Active</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            5
          </CardTitle>
          <div className="absolute right-4 top-4"></div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Steady performance <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Projects currently in progress
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
