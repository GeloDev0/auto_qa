"use client";

import { useEffect, useState } from "react";
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

const chartConfig = {
  count: { label: "Count" },
  LOW: { label: "Low", color: "var(--chart-1)" },
  MEDIUM: { label: "Medium", color: "var(--chart-2)" },
  HIGH: { label: "High", color: "var(--chart-3)" },
  CRITICAL: { label: "Critical", color: "var(--chart-4)" },
} satisfies ChartConfig;

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "var(--chart-1)",
  MEDIUM: "var(--chart-2)",
  HIGH: "var(--chart-3)",
  CRITICAL: "var(--chart-4)",
};

export function PriorityChartPie() {
  const [data, setData] = useState<
    { priority: string; count: number; fill: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/admin/dashboard/project-prio")
      .then((res) => res.json())
      .then((raw) => {
        const withColor = raw.map((d: any) => ({
          ...d,
          fill: PRIORITY_COLORS[d.priority] || "var(--border)",
        }));
        setData(withColor);
      });
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Project Priority Distribution</CardTitle>
        <CardDescription>January – June 2024</CardDescription>
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
              data={data}
              dataKey="count"
              nameKey="priority"
              labelLine={false}
              label={({ payload, ...props }) => (
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
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing priority summary for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
