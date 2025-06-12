// app/api/admin/dashboard/route.ts

import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  const count = await prisma.project.count();
  return NextResponse.json({ count });
}