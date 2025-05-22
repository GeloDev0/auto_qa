// app/api/admin/projects/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";

// Schema
const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
});

// 🟢 API request to Create a project record
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = projectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const project = await prisma.project.create({
    data: parsed.data,
  });

  return NextResponse.json(project, { status: 201 });
}

// 🔵 Get All Projects
export async function GET() {
  const projects = await prisma.project.findMany();
  return NextResponse.json(projects);
}
