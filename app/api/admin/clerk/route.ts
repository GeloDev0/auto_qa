import { formatDistanceToNow } from "date-fns";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const res = await fetch("https://api.clerk.com/v1/users", {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch users from Clerk" }, { status: 500 });
    }

    const data = await res.json();

    const transformed = data.map((user: any) => {
      const createdAt = user.created_at;
      const lastActiveAt = user.last_active_at || user.last_sign_in_at;

      return {
        id: user.id,
        name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        email: user.email_addresses?.[0]?.email_address || "N/A",
        avatar: user.image_url || "/avatars/default.png",
        joinedAt: createdAt
          ? formatDistanceToNow(new Date(createdAt), { addSuffix: true })
          : "Unknown",
        lastActive: lastActiveAt
          ? formatDistanceToNow(new Date(lastActiveAt), { addSuffix: true })
          : "Unknown",
        status:
          lastActiveAt && Date.now() - lastActiveAt < 1000 * 60 * 5
            ? "online"
            : "offline",
      };
    });

    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error fetching Clerk users:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
