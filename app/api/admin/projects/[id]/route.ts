// app/api/admin/projects/[id]/route.ts

import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  members: z.array(z.number()).optional(),
});

// GET /api/admin/projects/[id]
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString } = await context.params;
    const id = parseInt(idString, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (err) {
    console.error("Get Project Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PUT /api/admin/projects/[id]
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString }: { id: string } = await context.params;
    const id = parseInt(idString, 10);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { members, ...projectData } = parsed.data;

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...projectData,
        members: members ? {
          set: members.map((id) => ({ id })),
        } : undefined,
      },
      include: {
        members: true,
      },
    });

    return NextResponse.json({ project: updatedProject }, { status: 200 });
  } catch (err) {
    console.error("Update Project Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}



export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await context.params;
  const id = parseInt(idString, 10);

  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid project ID" }, { status: 400 });
  }

  try {
    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    console.error("Delete Project Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


