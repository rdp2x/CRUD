"use client";

import { UserStats } from "@/components/user-stats";
import { UserList } from "@/components/user-list";
import type { User } from "@/app/page";

interface SidebarProps {
  users?: User[];
  selectedUser?: User | null;
  onUserSelect?: (user: User) => void;
  isMobileSidebarOpen?: boolean;
  onCloseMobileSidebar?: () => void;
}

export function Sidebar({
  users = [],
  selectedUser = null,
  onUserSelect = () => {},
  isMobileSidebarOpen = false,
  onCloseMobileSidebar = () => {},
}: SidebarProps) {
  return (
    <>
      {isMobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onCloseMobileSidebar}
        />
      )}

      <aside
        className={`
        w-80 border-r border-border bg-card flex-shrink-0
        md:relative md:translate-x-0
        fixed inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out
        ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:block
      `}
      >
        <div className="p-4 md:p-6 h-full flex flex-col">
          <UserStats totalUsers={users.length} />
          <div className="flex-1 min-h-0">
            <UserList
              users={users}
              selectedUser={selectedUser}
              onUserSelect={(user) => {
                onUserSelect(user);
                onCloseMobileSidebar();
              }}
            />
          </div>
        </div>
      </aside>
    </>
  );
}
