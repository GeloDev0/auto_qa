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
  members: z.array(z.number()).optional(),  // user IDs array
});
// 🟢 API request to Create a project record
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = projectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { members, ...projectData } = parsed.data;

  const project = await prisma.project.create({
    data: {
      ...projectData,
      members: members ? {
        connect: members.map((id) => ({ id })),
      } : undefined,
    },
    include: {
      members: true,
    },
  });

   // 🔔 Create notifications for each member
  if (members && members.length > 0) {
    const notificationsData = members.map((userId) => ({
      userId,
      message: `You have been assigned to project "${project.title}"`,
    }));

    await prisma.notification.createMany({
      data: notificationsData,
    });
  }

  return NextResponse.json(project, { status: 201 });
}


// 🔵 Get All Projects, ordered by id ascending
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { id: "asc" },
    include: { members: true },
  });

  return NextResponse.json(projects);
}