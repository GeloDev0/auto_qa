import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const projects = await prisma.project.findMany({
    select: {
      createdAt: true,
      status: true,
    },
  });

  // Group by date and status
  const map = new Map<string, { active: number; inactive: number; completed: number }>();

  for (const project of projects) {
    const date = project.createdAt.toISOString().split("T")[0]; // yyyy-mm-dd

    if (!map.has(date)) {
      map.set(date, { active: 0, inactive: 0, completed: 0 });
    }

    const statusGroup = map.get(date)!;
    switch (project.status) {
      case "ACTIVE":
        statusGroup.active += 1;
        break;
      case "INACTIVE":
        statusGroup.inactive += 1;
        break;
      case "COMPLETED":
        statusGroup.completed += 1;
        break;
    }
  }

  const result = Array.from(map.entries())
    .map(([date, counts]) => ({ date, ...counts }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return NextResponse.json(result);
}
