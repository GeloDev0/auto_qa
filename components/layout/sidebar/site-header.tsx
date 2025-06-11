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
    case "generate-test":
      return "Generate Tests";
    case "api":
      return "API";
    default:
      return segment;
  }
};

type SiteHeaderProps = {
  userId: number;
};

export function SiteHeader({ userId }: SiteHeaderProps) {
  const pathname = usePathname();
  const [projectTitle, setProjectTitle] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if we're on a project detail page (for both admin and user)
  const isProjectDetailPage =
    (pathname?.startsWith("/admin/projects/") ||
      pathname?.startsWith("/user/projects/")) &&
    pathname.split("/").length > 3;

  // Extract project ID and base path from URL
  const getProjectInfo = () => {
    if (!isProjectDetailPage) return { id: null, basePath: null };
    const segments = pathname.split("/");
    return {
      id: segments[3], // [0]="", [1]="admin" or "user", [2]="projects", [3]=projectId
      basePath: `/${segments[1]}/projects`, // "/admin/projects" or "/user/projects"
    };
  };

  // Fetch project title when on project page
  useEffect(() => {
    const fetchProjectTitle = async () => {
      const { id, basePath } = getProjectInfo();
      if (!id || isNaN(Number(id))) return;

      try {
        setIsLoading(true);
        const response = await fetch(`/api${basePath}/${id}`);
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

  // Render breadcrumbs for project pages
  const renderProjectBreadcrumbs = () => {
    const { basePath } = getProjectInfo();
    if (!basePath) return null;

    return (
      <nav className="flex items-center text-sm">
        <Link
          href={basePath}
          className="text-gray-600 font-medium hover:text-gray-900 transition">
          Projects
        </Link>

        <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />

        {isLoading ? (
          <span className="font-medium">Loading...</span>
        ) : (
          <span className="font-medium">
            {projectTitle || `Project ${getProjectInfo().id}`}
          </span>
        )}
      </nav>
    );
  };

  // Render simple title for non-project pages
  const renderSimpleTitle = () => {
    const segment = pathname?.split("/").pop() || "";
    return (
      <h1 className="text-sm font-medium">
        {getSegmentName(segment === "user" ? "dashboard" : segment)}
      </h1>
    );
  };

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        {isProjectDetailPage ? renderProjectBreadcrumbs() : renderSimpleTitle()}

        <div className="ml-auto flex items-center gap-4">
          <NotificationDropdown userId={userId} />
          <UserButton />
        </div>
      </div>
    </header>
  );
}