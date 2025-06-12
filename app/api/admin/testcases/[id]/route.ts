import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";

// Zod schema (same as in /save route)
const testCaseSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  module: z.string(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["PENDING", "PASS", "FAIL"]),
  testSteps: z
    .array(
      z.object({
        action: z.string(),
        expectedResult: z.string(),
      })
    )
    .optional(),
});

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params;
    const testCaseId = parseInt(idString, 10);

    if (isNaN(testCaseId)) {
      return NextResponse.json({ error: "Invalid test case ID" }, { status: 400 });
    }

    const testCase = await prisma.testCase.findUnique({
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

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params;
    const testCaseId = parseInt(idString, 10);

    if (isNaN(testCaseId)) {
      return NextResponse.json({ error: "Invalid test case ID" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = testCaseSchema.parse(body);

    // Update the test case
    await prisma.testCase.update({
      where: { id: testCaseId },
      data: {
        title: parsed.title,
        description: parsed.description,
        module: parsed.module,
        priority: parsed.priority,
        status: parsed.status,
      },
    });

    // Replace all steps if testSteps provided
    if (parsed.testSteps) {
      await prisma.testStep.deleteMany({ where: { testCaseId } });

      await prisma.testStep.createMany({
        data: parsed.testSteps.map((step) => ({
          testCaseId,
          action: step.action,
          expectedResult: step.expectedResult,
        })),
      });
    }

    // Return updated test case
    const updatedTestCase = await prisma.testCase.findUnique({
      where: { id: testCaseId },
      include: { testSteps: true },
    });

    return NextResponse.json(updatedTestCase, { status: 200 });
  } catch (error) {
    console.error("Error updating test case:", error);
    return NextResponse.json({ error: "Failed to update test case" }, { status: 500 });
  }
}


// Delete Test Case by id
export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params;
    const testCaseId = parseInt(idString, 10);

    if (isNaN(testCaseId)) {
      return NextResponse.json({ error: "Invalid test case ID" }, { status: 400 });
    }

    // Delete steps first due to foreign key constraint
    await prisma.testStep.deleteMany({
      where: { testCaseId },
    });

    // Then delete the test case
    await prisma.testCase.delete({
      where: { id: testCaseId },
    });

    return NextResponse.json({ message: "Test case deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting test case:", error);
    return NextResponse.json({ error: "Failed to delete test case" }, { status: 500 });
  }
}