// app/api/admin/testcases/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";

// Zod schema
const testStepSchema = z.object({
  action: z.string(),
  expectedResult: z.string(),
});

const testCaseSchema = z.object({
  title: z.string().min(1),
  module: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["PASS", "FAIL", "PENDING"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  actualResult: z.string().optional(),
  testSteps: z.array(testStepSchema).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = testCaseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { testSteps, ...testCaseData } = parsed.data;

    const createdTestCase = await prisma.testCase.create({
      data: {
        ...testCaseData,
        testSteps: testSteps && testSteps.length > 0
          ? {
              create: testSteps.map((step) => ({
                action: step.action,
                expectedResult: step.expectedResult,
              })),
            }
          : undefined,
      },
      include: { testSteps: true },
    });

    return NextResponse.json(createdTestCase, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/testcases error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const testCases = await prisma.testCase.findMany({
      include: { testSteps: true },
    });
    return NextResponse.json(testCases);
  } catch (error) {
    console.error("GET /api/admin/testcases error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
