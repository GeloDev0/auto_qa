"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import NotificationDropdown from "./notifications";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

// Helper to get human-readable segment names
const getSegmentName = (segment: string) => {
  switch (segment) {
    case "dashboard":
      return "Dashboard";
    case "projects":
      return "Projects";
    case "settings":
      return "Settings";
    case "generate-t":
      return "Generate Tests";
    case "api":
      return "API";
    default:
      return segment;
  }
};

export function SiteHeader() {
  const pathname = usePathname();
  const [projectTitle, setProjectTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if we're on a project detail page
  const isProjectDetailPage =
    pathname?.startsWith("/admin/projects/") && pathname.split("/").length > 3;

  // Extract project ID from URL
  const getProjectId = () => {
    if (!isProjectDetailPage) return null;
    const segments = pathname.split("/");
    return segments[3]; // [0]="", [1]="admin", [2]="projects", [3]=projectId
  };

  // Fetch project title when on project page
  useEffect(() => {
    const fetchProjectTitle = async () => {
      const projectId = getProjectId();
      if (!projectId || isNaN(Number(projectId))) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api/admin/projects/${projectId}`);
        if (!response.ok) throw new Error("Project not found");
        const project = await response.json();
        setProjectTitle(project.title);
      } catch (error) {
        console.error("Failed to fetch project:", error);
        setProjectTitle(null);
      } finally {
        setIsLoading(false);
      }
    };

    if (isProjectDetailPage) {
      fetchProjectTitle();
    } else {
      setProjectTitle(null);
    }
  }, [pathname]);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {/* Breadcrumbs for project detail pages */}
        {isProjectDetailPage && (
          <nav className="flex items-center text-sm">
            <Link
              href="/admin/projects"
              className="text-gray-600 font-medium hover:text-gray-900 transition"
            >
              Projects
            </Link>

            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />

            {isLoading ? (
              <span className="font-medium">Loading...</span>
            ) : (
              <span className="font-medium">
                {projectTitle || `Project ${getProjectId()}`}
              </span>
            )}
          </nav>
        )}

        {/* Title for non-project pages */}
        {!isProjectDetailPage && (
          <h1 className="text-sm font-medium">
            {getSegmentName(
              pathname?.split("/").pop() ||
                (pathname?.includes("/dashboard") ? "Dashboard" : "")
            )}
          </h1>
        )}

        <div className="ml-auto flex items-center gap-4">
          <NotificationDropdown />
          <UserButton />
        </div>
      </div>
    </header>
  );
}
