"use client";

import * as React from "react";
import { MdSpaceDashboard, MdFolder, MdOutlineHelp } from "react-icons/md";
import type { IconType } from "react-icons";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { NavMain } from "@/components/layout/sidebar/nav-main";
import Image from "next/image";

// Update icon type to match Lucide
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userRole: string;
}

interface NavItem {
  title: string;
  url: string;
  icon: IconType; // 👈 Updated icon type
  roles?: string[];
}

export function AppSidebar({ userRole, ...props }: AppSidebarProps) {
  const allNavItems: NavItem[] = [
    {
      title: "Dashboard",
      url: userRole === "admin" ? "/admin/dashboard" : "/user/dashboard",
      icon: MdSpaceDashboard, // 👈 Lucide icon
    },
    {
      title: "Projects",
      url: userRole === "admin" ? "/admin/projects" : "/user/projects",
      icon: MdFolder, // 👈 Lucide icon
    },
    {
      title: "Help Center",
      url: "/help",
      icon: MdOutlineHelp, // 👈 Lucide icon
    },
  ];

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
              <a
                href={
                  userRole === "admin" ? "/admin/dashboard" : "/user/dashboard"
                }>
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
