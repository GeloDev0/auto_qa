import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { userId } = await req.json();

  try {
    await prisma.notification.updateMany({
      where: {
        userId: userId,
        read: false,
      },
      data: {
        read: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error marking all as read:", error);
    return NextResponse.json({ error: "Failed to mark all as read" }, { status: 500 });
  }
}
