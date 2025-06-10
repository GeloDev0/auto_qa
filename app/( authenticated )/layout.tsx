// app/(dashboard)/layout.tsx

import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SiteHeader } from "@/components/layout/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth, currentUser } from "@clerk/nextjs/server"; // Clerk server methods
import { Toaster } from "@/components/ui/sonner";

import React from "react";
import prisma from "@/lib/db";

async function fetchInternalUserId(clerkUserId: string): Promise<number> {
  const user = await prisma.user.findUnique({
    where: { clerkUserId },
    select: { id: true },
  });
  if (!user) throw new Error("User not found in database");
  return user.id;
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId: clerkUserId, redirectToSignIn } = await auth();

  if (!clerkUserId) return redirectToSignIn();

  // Fetch internal DB user ID
  const internalUserId = await fetchInternalUserId(clerkUserId);

  // Get role from Clerk's metadata
  const user = await currentUser();
  const userRole = (user?.publicMetadata?.role as string) || "user"; // <-- Keep this

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" userRole={userRole} />
      <SidebarInset>
        {/* Pass internalUserId to SiteHeader */}
        <SiteHeader userId={internalUserId} />
        <main>{children}</main>
      </SidebarInset>
      <Toaster richColors />
    </SidebarProvider>
  );
}