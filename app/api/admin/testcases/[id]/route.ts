// // app/api/admin/testcases/[id]/route.ts

// import { NextResponse } from "next/server";
// import prisma from "@/lib/db";
// import { z } from "zod";

// // Schema for updates
// const updateSchema = z.object({
//   title: z.string().optional(),
//   description: z.string().optional(),
//   status: z.enum(["PASS", "FAIL", "PENDING"]).optional(),
//   priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
//   testSteps: z.string().optional(),
//   expectedResult: z.string().optional(),
//   actualResult: z.string().optional(),
// });

// // 🔵 Get a single TestCase by ID
// export async function GET(_: Request, { params }: { params: { id: string } }) {
//   try {
//     const testCase = await prisma.testCase.findUnique({
//       where: { id: Number(params.id) },
//     });

//     if (!testCase) {
//       return NextResponse.json({ error: "Test case not found" }, { status: 404 });
//     }

//     return NextResponse.json(testCase);
//   } catch {
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }

// // 🟡 Update a TestCase by ID
// export async function PUT(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id: idString } = await context.params;
//   const id = parseInt(idString, 10);

//   if (isNaN(id)) {
//     return NextResponse.json({ error: "Invalid test case ID" }, { status: 400 });
//   }

//   try {
//     const body = await req.json();
//     const parsed = updateSchema.safeParse(body);

//     if (!parsed.success) {
//       return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
//     }

//     const updatedTestCase = await prisma.testCase.update({
//       where: { id },
//       data: parsed.data,
//     });

//     return NextResponse.json(updatedTestCase);
//   } catch (error) {
//     console.error("Update Test Case Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


// // 🔴 Delete a TestCase by ID
// export async function DELETE(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id: idString } = await context.params;
//   const id = parseInt(idString, 10);

//   if (isNaN(id)) {
//     return NextResponse.json({ error: "Invalid test case ID" }, { status: 400 });
//   }

//   try {
//     await prisma.testCase.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Test case deleted" }, { status: 200 });
//   } catch (error) {
//     console.error("Delete Test Case Error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


// app/api/admin/testcases/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";

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
  // projectId: z.number().optional(),
  testSteps: z.array(testStepSchema).optional(),
});

// GET a single test case
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params;
    const id = parseInt(idString, 10);
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    const testCase = await prisma.testCase.findUnique({
      where: { id },
      include: { testSteps: true },
    });

    if (!testCase) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(testCase);
  } catch (error) {
    console.error("GET /api/admin/testcases/[id] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}


// PUT: update test case
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idString } = await context.params;
    const id = parseInt(idString, 10);

    const body = await req.json();
    const parsed = testCaseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { testSteps, ...testCaseData } = parsed.data;

    // Update base test case fields
    await prisma.testCase.update({
      where: { id },
      data: testCaseData,
    });

    // Delete old test steps
    await prisma.testStep.deleteMany({ where: { testCaseId: id } });

    // Recreate test steps if any
    if (testSteps && testSteps.length > 0) {
      await prisma.testStep.createMany({
        data: testSteps.map((step) => ({
          ...step,
          testCaseId: id,
        })),
      });
    }

    // Return updated test case
    const updated = await prisma.testCase.findUnique({
      where: { id },
      include: { testSteps: true },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/admin/testcases/[id] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// DELETE a test case
export async function DELETE(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id: idString } = await context.params;
    const id = parseInt(idString, 10);

    // Delete test steps first (FK constraint)
    await prisma.testStep.deleteMany({ where: { testCaseId: id } });

    // Delete test case
    await prisma.testCase.delete({ where: { id } });

    return NextResponse.json({ message: "Test case deleted successfully" });
  } catch (error) {
    console.error("DELETE /api/admin/testcases/[id] error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
