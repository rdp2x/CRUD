import { UserDetails } from "@/components/user-details";
import { EmptyState } from "@/components/empty-state";
import type { User } from "@/app/page";

interface MainContentProps {
  selectedUser: User | null;
  onDeleteUser?: (user: User) => void;
}

export function MainContent({ selectedUser, onDeleteUser }: MainContentProps) {
  return (
    <main className="flex-1 p-4 md:p-6 overflow-hidden">
      {selectedUser ? <UserDetails user={selectedUser} onDeleteUser={onDeleteUser} /> : <EmptyState />}
    </main>
  );
}
