// app/api/notifications/[id]/read/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idString }: { id: string } = await context.params;
    const notifId = parseInt(idString, 10);

    if (isNaN(notifId)) {
      return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 });
    }

    await prisma.notification.update({
      where: { id: notifId },
      data: { read: true },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}
