"use client";

import { Button } from "@/components/ui/button";
import { UserPlus, Edit, Trash2, ShieldUser, Menu } from "lucide-react";
import type { User } from "@/app/page";

interface HeaderProps {
  selectedUser: User | null;
  onAddUser: () => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (user: User) => void;
  onOpenMobileSidebar: () => void;
  isMobile: boolean;
}

export function Header({
  selectedUser,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
  onOpenMobileSidebar,
  isMobile,
}: HeaderProps) {
  return (
    <header className="border-b border-border bg-card flex-shrink-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={onOpenMobileSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          {!isMobile && (
            <>
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <ShieldUser className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold font-heading text-foreground">
                  Admin Page
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your application users
                </p>
              </div>
            </>
          )}
          {isMobile && (
            <h1 className="text-xl font-bold font-heading text-foreground">
              Admin Page
            </h1>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={onAddUser}
            size={isMobile ? "icon" : "sm"}
            className={isMobile ? "" : "gap-2"}
          >
            <UserPlus className="w-4 h-4" />
            {!isMobile && "Add User"}
          </Button>
          <Button
            onClick={() => selectedUser && onUpdateUser(selectedUser)}
            variant="secondary"
            size={isMobile ? "icon" : "sm"}
            className={isMobile ? "" : "gap-2"}
            disabled={!selectedUser}
          >
            <Edit className="w-4 h-4" />
            {!isMobile && "Update"}
          </Button>
          <Button
            onClick={() => selectedUser && onDeleteUser(selectedUser)}
            variant="destructive"
            size={isMobile ? "icon" : "sm"}
            className={isMobile ? "" : "gap-2"}
            disabled={!selectedUser}
          >
            <Trash2 className="w-4 h-4" />
            {!isMobile && "Delete"}
          </Button>
        </div>
      </div>
    </header>
  );
}
