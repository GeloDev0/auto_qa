import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export default async function Dashboard() {
  const { userId } = await auth();

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  return;
}
