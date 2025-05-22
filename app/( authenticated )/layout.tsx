// app/(dashboard)/layout.tsx or wherever your dashboard layout is

import { AppSidebar } from "@/components/layout/sidebar/app-sidebar";
import { SiteHeader } from "@/components/layout/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth, currentUser } from "@clerk/nextjs/server"; // <-- Add this
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  const user = await currentUser(); // <-- Fetch user
  const userRole = (user?.publicMetadata?.role as string) || "user"; // <-- Extract role

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" userRole={userRole} /> {/* pass role */}
      <SidebarInset>
        <SiteHeader />
        <main>{children}</main>
      </SidebarInset>
       <Toaster richColors />
    </SidebarProvider>
  );
}
