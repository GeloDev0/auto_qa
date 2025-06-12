// app/api/admin/projects/[id]/testcases/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/admin/projects/[id]/testcases -> id is the project ID
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString }: { id: string } = await context.params;
    const projectId = parseInt(idString, 10);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const testCases = await prisma.testCase.findMany({
      where: { projectId },
      include: {
        testSteps: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({ testCases }, { status: 200 });
  } catch (error) {
    console.error("Error fetching test cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch test cases" },
      { status: 500 }
    );
  }
}

