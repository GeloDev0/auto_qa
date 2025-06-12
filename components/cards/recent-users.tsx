import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MoreHorizontal,
  UserPlus,
  Clock,
  Mail,
  User,
  Trash2,
  Eye,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
  status: "online" | "offline" | "away";
  lastActive?: string;
}

const recentUsers: User[] = [
  {
    id: 1,
    name: "Emily Chen",
    email: "emily.chen@example.com",
    avatar: "/avatars/emily.png",
    joinedAt: "2 hours ago",
    status: "online",

    lastActive: "Just now",
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    email: "marcus.r@example.com",
    avatar: "/avatars/marcus.png",
    joinedAt: "5 hours ago",
    status: "away",

    lastActive: "30 min ago",
  },
  {
    id: 3,
    name: "Sophia Patel",
    email: "sophia.p@example.com",
    avatar: "/avatars/sophia.png",
    joinedAt: "1 day ago",
    status: "online",
    lastActive: "5 min ago",
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.w@example.com",
    avatar: "/avatars/james.png",
    joinedAt: "2 days ago",
    status: "offline",

    lastActive: "2 hours ago",
  },
  {
    id: 5,
    name: "Olivia Kim",
    email: "olivia.k@example.com",
    avatar: "/avatars/olivia.png",
    joinedAt: "3 days ago",
    status: "online",

    lastActive: "Just now",
  },
  {
    id: 6,
    name: "Olivia Kim",
    email: "olivia.k@example.com",
    avatar: "/avatars/olivia.png",
    joinedAt: "3 days ago",
    status: "online",

    lastActive: "Just now",
  },
  {
    id: 7,
    name: "Olivia Kim",
    email: "olivia.k@example.com",
    avatar: "/avatars/olivia.png",
    joinedAt: "3 days ago",
    status: "online",

    lastActive: "Just now",
  },
];

const getStatusColor = (status: User["status"]) => {
  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-400",
  };
  return statusColors[status];
};

export default function RecentUsersCompact() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <CardTitle className="text-base font-semibold">
            Recent Users
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-1">
        <ScrollArea className="h-[320px] pr-2">
          <div className="space-y-1">
            {recentUsers.map((user, index) => (
              <div key={user.id}>
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(
                          user.status
                        )}`}
                        title={`Status: ${user.status}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium truncate">
                          {user.name}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground">
                      <span>{user.joinedAt}</span>
                      {user.lastActive && (
                        <span className="text-[0.7rem]">
                          Active: {user.lastActive}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {index < recentUsers.length - 1 && (
                  <Separator className="my-1" />
                )}
              </div>
            ))}
            {recentUsers.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <UserPlus className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No recent users</p>
                <Button variant="ghost" size="sm" className="mt-2">
                  Invite Users
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
