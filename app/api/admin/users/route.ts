// /api/admin/users/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";  // your Prisma client instance

export async function GET() {
  try {
    // Fetch users from your database
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc", // or whatever ordering you prefer
      },
       select: {
    id: true,
    email: true,
    name: true,
    lname: true,
    imageUrl: true,
    clerkUserId: true,
    createdAt: true,
  },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error("Failed to fetch users from DB:", error);
    return NextResponse.json(
      { error: "Failed to fetch users from DB" },
      { status: 500 }
    );
  }
}
