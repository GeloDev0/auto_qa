import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/admin/testcases/[id] -> fetch test case by ID
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString }: { id: string } = await context.params;
    const testCaseId = parseInt(idString, 10);

    if (isNaN(testCaseId)) {
      return NextResponse.json({ error: "Invalid test case ID" }, { status: 400 });
    }

    const testCase = await prisma.testCase.findMany({
      where: { id: testCaseId },
      include: {
        testSteps: true,
        Project: true,
      },
    });

    if (!testCase) {
      return NextResponse.json({ error: "Test case not found" }, { status: 404 });
    }

    return NextResponse.json(testCase, { status: 200 });
  } catch (error) {
    console.error("Error fetching test case by ID:", error);
    return NextResponse.json({ error: "Failed to fetch test case" }, { status: 500 });
  }
}