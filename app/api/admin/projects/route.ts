// app/api/admin/projects/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";

// Schema
const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]).optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
  members: z.array(z.number()).optional(),  // user IDs array
  startDate: z.string().datetime().optional(),  
  deadline: z.string().datetime().nullable().optional(),
});
// ✅ POST: Create a Project
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = projectSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const { userId: clerkUserId } = await auth();

  if (!clerkUserId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Find the user in your DB using clerkUserId
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const { members, startDate, deadline, ...projectData } = parsed.data;

  const project = await prisma.project.create({
    data: {
      ...projectData,
      startDate: startDate ? new Date(startDate) : undefined,
      deadline: deadline ? new Date(deadline) : undefined,
      createdById: user.id,
      members: members?.length
        ? {
            connect: members.map((id) => ({ id })),
          }
        : undefined,
    },
    include: {
      members: true,
      User_Project_createdByIdToUser: true, // 👈 gets creator object
    },
  });

  // Create notification for each member
  if (members?.length) {
    const notifications = members.map((id) => ({
      userId: id,
      projectId: project.id, // ✅ Add projectId here
      message: `assigned you to project "${project.title}"`,
    }));

    await prisma.notification.createMany({
      data: notifications,
    });
  }

  return NextResponse.json(project, { status: 201 });
}

// GET: All projects with creator
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { id: "asc" },
    include: {
      members: true,
      User_Project_createdByIdToUser: true, // 👈 createdBy user
    },
  });

  return NextResponse.json(projects);
}