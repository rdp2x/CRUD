"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import type { User } from "@/app/page";
import { AlertTriangle } from "lucide-react";

interface DeleteUserModalProps {
  open: boolean;
  user: User | null;
  onClose: () => void;
  onUserDeleted: () => void;
}

export function DeleteUserModal({
  open,
  user,
  onClose,
  onUserDeleted,
}: DeleteUserModalProps) {
  const handleDelete = async () => {
    if (!user) return;

    try {
      await api.delete(`/anime/kill/${user.id}`);
      onUserDeleted();
    } catch (error) {
      console.error("Error deleting user:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <DialogTitle className="font-heading">Delete User</DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {user && (
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <strong>{user.name}</strong>?
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="flex-1"
          >
            Delete User
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
