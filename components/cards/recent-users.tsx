"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";
import {
  ScrollArea
} from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
  status: "online" | "offline" | "away";
  lastActive?: string;
}

const getStatusColor = (status: User["status"]) => {
  const statusColors = {
    online: "bg-green-500",
    away: "bg-yellow-500",
    offline: "bg-gray-400",
  };
  return statusColors[status];
};

export default function RecentUsersCompact() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/admin/clerk");
        const data = await res.json();

        const transformed: User[] = data.map((user: any) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  avatar: user.avatar || "/avatars/default.png",
  joinedAt: user.joinedAt || "N/A",
  status: user.status || "offline",
  lastActive: user.lastActive || "N/A",
}));


        setUsers(transformed);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
            {loading ? (
              <div className="flex justify-center items-center h-[320px]">
    <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
  </div>
            ) : users.length > 0 ? (
              users.map((user, index) => (
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
                    <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground">
                      <span>{user.joinedAt}</span>
                      {user.lastActive && (
                        <span className="text-[0.7rem]">
                          Active: {user.lastActive}
                        </span>
                      )}
                    </div>
                  </div>
                  {index < users.length - 1 && <Separator className="my-1" />}
                </div>
              ))
            ) : (
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
