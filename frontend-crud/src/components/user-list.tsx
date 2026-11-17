"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { User } from "@/app/page";
import { UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserListProps {
  users: User[];
  selectedUser: User | null;
  onUserSelect: (user: User) => void;
  loading?: boolean;
}

export function UserList({
  users,
  selectedUser,
  onUserSelect,
  loading = false,
}: UserListProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="my-[-5]">
        <CardTitle className="text-sm font-heading">Users</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 min-h-0">
        <div className="h-full overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              <div className="animate-spin w-8 h-8 mx-auto mb-2 opacity-50 border-4 border-primary border-t-transparent rounded-full" />
              <p className="text-sm">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">
              <UserIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No users found</p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {users.map((user, index) => (
                <Button
                  key={user.id || `user-${index}`}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start p-3 h-auto text-left hover:bg-gray-400/10",
                    selectedUser?.id == user.id && "text-accent-foreground"
                  )}
                  onClick={() => onUserSelect(user)}
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center flex-shrink-0">
                      <UserIcon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user.name}</p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.universe}
                      </p>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
