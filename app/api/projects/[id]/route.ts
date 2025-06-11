// app/api/projects/[id]/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

// GET /api/projects/[id] -> id is the user ID
export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString }: { id: string } = await context.params;
    const userId = parseInt(idString, 10);

    if (isNaN(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const projects = await prisma.project.findMany({
      where: {
        members: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        members: true,
        TestCase: true,
        User_Project_createdByIdToUser: true,
      },
    });

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Get User Projects Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
