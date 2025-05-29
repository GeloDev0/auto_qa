// app/api/notifications/route.ts
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
  });

  return NextResponse.json(notifications);
}