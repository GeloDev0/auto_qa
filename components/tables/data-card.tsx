// components/ProjectCard.tsx
"use client";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2 } from "lucide-react";

interface ProjectCardProps {
  project: {
    title: string;
    description: string;
    status?: string;
    createdBy: string;
    assignedTo: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="w-full sm:max-w-xs md:max-w-md overflow-hidden shadow-md p-0 gap-2 g-gradient-to-t from-blue-100 to-white dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="p-0 h-16 bg-blue-200" /> {/* Reduced height */}
      <CardContent className="p-4 pt-2">
        {" "}
        {/* Less padding */}
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-lg font-bold">{project.title}</h3>{" "}
          {/* Slightly smaller text */}
        </div>
        <p className="text-gray-500 text-sm mb-4">{project.description}</p>{" "}
        {/* Smaller text and margin */}
        <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-1">Created By</span>
          <span className="text-gray-400">{project.createdBy}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-0 p-4 gap-2 border-t">
        {project.status && (
          <Badge className="bg-green-500 hover:bg-orange-600 text-white font-medium px-2 py-0.5 rounded-2xl text-sm">
            {project.status}
          </Badge>
        )}

        <div className="flex">
          <Button size="icon" variant="ghost">
            <Eye className="w-4 h-4 text-blue-600" />
          </Button>
          <Button size="icon" variant="ghost">
            <Pencil className="w-4 h-4 text-green-600" />
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
