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

export const description = "A pie chart with a custom label";

// Update to show statuses
const chartData = [
  { status: "Passed", count: 275, fill: "var(--chart-1)" },
  { status: "Failed", count: 120, fill: "var(--chart-2)" },
  { status: "Blocked", count: 90, fill: "var(--chart-3)" },
];

const chartConfig = {
  count: {
    label: "Count",
  },
  Passed: {
    label: "Passed",
    color: "var(--chart-1)",
  },
  Failed: {
    label: "Failed",
    color: "var(--chart-2)",
  },
  Blocked: {
    label: "Blocked",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function StatusChartPie() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Status Distribution</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] px-0">
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="count" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              labelLine={false}
              label={({ payload, ...props }) => {
                return (
                  <text
                    cx={props.cx}
                    cy={props.cy}
                    x={props.x}
                    y={props.y}
                    textAnchor={props.textAnchor}
                    dominantBaseline={props.dominantBaseline}
                    fill="hsla(var(--foreground))">
                    {payload.count}
                  </text>
                );
              }}
              nameKey="status"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing status summary for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
