// app/api/admin/testcases/save/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/lib/db";

const testStepSchema = z.object({
  id: z.string(),
  action: z.string(),
  expectedResult: z.string(),
});

const testCaseSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  module: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
  status: z.enum(["PENDING", "PASS", "FAIL"]).optional().default("PENDING"),
  testSteps: z.array(testStepSchema),
});

const saveTestCasesSchema = z.object({
  projectId: z.number().optional(),
  testCases: z.array(testCaseSchema),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = saveTestCasesSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { projectId, testCases } = parsed.data;

    const createdTestCases = await prisma.$transaction(async (tx) => {
      const results = [];

      for (const tc of testCases) {
        const newTestCase = await tx.testCase.create({
          data: {
            title: tc.title ?? "",
            description: tc.description ?? "",
            status: tc.status ?? "PENDING",
            priority: tc.priority,
            module: tc.module ?? "",
            projectId,
            updatedAt: new Date(),
          },
        });

        await tx.testStep.createMany({
          data: tc.testSteps.map((step) => ({
            action: step.action,
            expectedResult: step.expectedResult,
            testCaseId: newTestCase.id,
          })),
        });

        results.push(newTestCase);
      }

      return results;
    });

    return NextResponse.json(
      { message: `${createdTestCases.length} Test Case Saved Successfully.` },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving test cases:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

