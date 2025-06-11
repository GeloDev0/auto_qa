import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const notifId = parseInt(id, 10);

  if (isNaN(notifId)) {
    return NextResponse.json({ error: "Invalid notification ID" }, { status: 400 });
  }

  try {
    await prisma.notification.update({
      where: { id: notifId },
      data: { read: true },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    return NextResponse.json({ error: "Failed to update notification" }, { status: 500 });
  }
}