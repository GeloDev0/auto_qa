"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
  },
  safari: {
    label: "Safari",
  },
  firefox: {
    label: "Firefox",
  },
  edge: {
    label: "Edge",
  },
  other: {
    label: "Other",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card className="flex flex-col max-w-md mx-auto">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-base">Pie Chart - Donut</CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          January - June 2024
        </CardDescription>
      </CardHeader>

      <CardContent className="flex justify-center items-center py-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-[180px]">
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={50}
              outerRadius={80}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-1 text-xs text-center">
        <div className="flex items-center justify-center gap-1 font-medium text-foreground">
          Trending up by 5.2% this month
          <TrendingUp className="h-3 w-3" />
        </div>
        <div className="text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
