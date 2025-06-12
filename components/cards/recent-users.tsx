import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, UserPlus, Clock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

// Sample data for recent users
const recentUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2 hours ago",
    status: "online",
    role: "Admin",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "5 hours ago",
    status: "offline",
    role: "User",
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "1 day ago",
    status: "online",
    role: "Editor",
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "2 days ago",
    status: "away",
    role: "User",
  },
  {
    id: 5,
    name: "Emma Brown",
    email: "emma.brown@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "3 days ago",
    status: "online",
    role: "User",
  },
  {
    id: 6,
    name: "Frank Miller",
    email: "frank.miller@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "4 days ago",
    status: "offline",
    role: "User",
  },
  {
    id: 7,
    name: "Grace Lee",
    email: "grace.lee@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "5 days ago",
    status: "online",
    role: "Editor",
  },
  {
    id: 8,
    name: "Henry Garcia",
    email: "henry.garcia@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    joinedAt: "6 days ago",
    status: "away",
    role: "User",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "away":
      return "bg-yellow-500";
    case "offline":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
};

const getRoleVariant = (role: string) => {
  switch (role) {
    case "Admin":
      return "destructive";
    case "Editor":
      return "secondary";
    default:
      return "outline";
  }
};

export default function RecentUsersCompact() {
  return (
    <Card className="w-full max-w-md max-h-[360px]">
      <CardHeader className="flex items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-2">
          <UserPlus className="h-4 w-4 text-muted-foreground" />
          <CardTitle className="text-base font-semibold">
            Recent Users
          </CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-xs px-2 h-7">
          View All
        </Button>
      </CardHeader>
      <CardContent className="pt-1">
        <ScrollArea className="max-h-[270px] pr-2">
          <div className="space-y-1">
            {recentUsers.slice(0, 5).map((user, index) => (
              <div key={user.id}>
                <div className="flex items-center justify-between p-2 rounded-md hover:bg-accent transition-colors">
                  <div className="flex items-center space-x-2">
                    <div className="relative">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-background ${getStatusColor(
                          user.status
                        )}`}
                        title={`Status: ${user.status}`}
                      />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {user.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="hidden md:flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{user.joinedAt}</span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {index < 4 && <Separator className="my-1" />}
              </div>
            ))}
            {recentUsers.length === 0 && (
              <div className="text-center py-6 text-muted-foreground">
                <UserPlus className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No users yet</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
