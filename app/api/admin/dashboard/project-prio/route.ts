import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const priorities = await prisma.project.groupBy({
    by: ["priority"],
    _count: {
      priority: true,
    },
  });

  const data = priorities.map((p) => ({
    priority: p.priority,
    count: p._count.priority,
  }));

  return NextResponse.json(data);
}
