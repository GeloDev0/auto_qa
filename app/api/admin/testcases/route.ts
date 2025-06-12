// app/api/admin/testcases/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // adjust to your actual path
import { z } from "zod";

const testCaseSchema = z.object({
  projectId: z.number().optional(),
  testCases: z.array(z.object({
    title: z.string(),
    description: z.string(),
    module: z.string(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
    status: z.enum(["PENDING", "PASS", "FAIL"]).optional().default("PENDING"),
    testSteps: z.array(z.object({
      id: z.string().optional(), // AI might include it, we ignore it
      action: z.string(),
      expectedResult: z.string(),
    })),
  })),
});


export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const projectIdParam = url.searchParams.get("projectId");

    if (!projectIdParam) {
      return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
    }

    const projectId = Number(projectIdParam);

    if (isNaN(projectId)) {
      return NextResponse.json({ error: "Invalid projectId" }, { status: 400 });
    }

    const testCases = await prisma.testCase.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        testSteps: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(testCases, { status: 200 });
  } catch (error) {
    console.error("GET /testcases error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}



export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = testCaseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { projectId, testCases } = parsed.data;

    const created = await Promise.all(
      testCases.map(async (tc) => {
        return await prisma.testCase.create({
          data: {
            title: tc.title,
            description: tc.description,
            module: tc.module,
            priority: tc.priority,
            status: tc.status,
            projectId,
            updatedAt: new Date(),
            testSteps: {
              create: tc.testSteps.map((step) => ({
                action: step.action,
                expectedResult: step.expectedResult,
              })),
            },
          },
        });
      })
    );

    return NextResponse.json({ message: "Test cases saved", count: created.length }, { status: 201 });
  } catch (error) {
    console.error("POST /testcases error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}