import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/db";

export default async function Dashboard() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated.");
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkUserId: userId },
  });

  return (
    <div>
      <h1 className='text-3xl font-bold'>welcome, {dbUser?.name || "User"}</h1>
      <p className='text-gray-500 mt-1'>manage your test cases and codes</p>
    </div>
  );
}
