"use client";

import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const chartConfig = {
  active: {
    label: "Active",
    color: "var(--chart-1)",
  },
  inactive: {
    label: "Inactive",
    color: "var(--chart-2)",
  },
  completed: {
    label: "Completed",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive() {
  const [timeRange, setTimeRange] = useState("90d");
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/admin/dashboard/project-status")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const filteredData = data.filter((item: any) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const start = new Date();
    start.setDate(now.getDate() - daysToSubtract);
    return date >= start;
  });

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle>Project Status - Interactive</CardTitle>
          <CardDescription>
            Showing status breakdown for the selected time range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] sm:ml-auto">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="90d">Last 3 months</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-active)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-active)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillInactive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-inactive)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-inactive)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-completed)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-completed)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="active"
              type="monotone"
              fill="url(#fillActive)"
              stroke="var(--color-active)"
              stackId="a"
            />
            <Area
              dataKey="inactive"
              type="monotone"
              fill="url(#fillInactive)"
              stroke="var(--color-inactive)"
              stackId="a"
            />
            <Area
              dataKey="completed"
              type="monotone"
              fill="url(#fillCompleted)"
              stroke="var(--color-completed)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
