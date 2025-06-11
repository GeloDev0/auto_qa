import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const notifications = await prisma.notification.findMany({
    where: { userId: parseInt(userId, 10) },
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          imageUrl: true,
        },
      },
      project: {
        select: {
          User_Project_createdByIdToUser: {
            select: {
              name: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(notifications);
}
