"use client";

import * as React from "react";
import {
  IconDashboard,
  IconFolder,
  IconTestPipe,
  IconSettings,
  IconHelp,
  type Icon,
} from "@tabler/icons-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";

// Define navigation item type
interface NavItem {
  title: string;
  url: string;
  icon: Icon;
  roles?: string[]; // Optional - if not specified, available to all roles
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useUser();

  // Get user role from Clerk metadata
  const userRole = (user?.publicMetadata?.role as string) || "user";

  // Define all possible navigation items
  const allNavItems: NavItem[] = [
    {
      title: "Dashboard",
      url: userRole === "admin" ? "/admin/dashboard" : "/user/dashboard",
      icon: IconDashboard,
      roles: ["admin", "user"],
    },
    {
      title: "Projects",
      url: userRole === "admin" ? "/admin/projects" : "/user/projects",
      icon: IconFolder,
      roles: ["admin", "user"],
    },
    {
      title: "Test Cases",
      url: "/test-cases",
      icon: IconTestPipe,
      roles: ["admin", "tester"],
    },
    {
      title: "Admin Panel",
      url: "/admin",
      icon: IconSettings,
      roles: ["admin"],
    },
    {
      title: "Help Center",
      url: "/help",
      icon: IconHelp,
      roles: ["admin", "user"],
    },
  ];

  // Filter items based on user role
  const filteredNavItems = allNavItems.filter(
    (item) => !item.roles || item.roles.includes(userRole)
  );

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <a href="/dashboard">
                <Image
                  src="/Vector.svg"
                  alt="AutoQA Logo"
                  width={130}
                  height={20}
                  priority
                />
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={filteredNavItems} />
      </SidebarContent>
    </Sidebar>
  );
}
