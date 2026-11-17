"use client";

import { useState, useEffect } from "react";
import { UserList } from "@/components/user-list";
import { UserDetails } from "@/components/user-details";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { UserStats } from "@/components/user-stats";
import { AddUserModal } from "@/components/add-user-modal";
import { UpdateUserModal } from "@/components/update-user-modal";
import { DeleteUserModal } from "@/components/delete-user-modal";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/components/ui/use-mobile";
import {
  Users,
  UserPlus,
  Edit,
  Trash2,
  User,
  UserCog,
  Shield,
  ShieldUser,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { MainContent } from "@/components/main-content";

export type PowerType = "None" | "Physical" | "Magic" | "Energy";

export interface User {
  id: number;
  name: string;
  age: number;
  universe: string;
  power: PowerType;
  intelligence: number;
  weakness: string;
}

const mapApiUserToUser = (user: any): User => ({
  id: user.id ?? user.level,
  name: user.name,
  age: user.age,
  universe: user.universe,
  power: user.power,
  intelligence: user.intelligence,
  weakness: user.weakness,
});

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/anime/show");
      console.log("Received users data:", response.data);
      setUsers(response.data.map(mapApiUserToUser));
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleUpdateUser = (user: User) => {
    setUserToUpdate(user);
    setShowUpdateModal(true);
  };

  const handleDeleteUser = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const handleUserAdded = () => {
    setShowAddModal(false);
    fetchUsers(); // Refresh the user list
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );

    setSelectedUser((currentSelectedUser) =>
      currentSelectedUser?.id === updatedUser.id ? updatedUser : currentSelectedUser
    );

    setShowUpdateModal(false);
    setUserToUpdate(null);
  };

  const handleUserDeleted = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
    fetchUsers(); // Refresh the user list
    if (selectedUser && selectedUser.id === userToDelete?.id) {
      setSelectedUser(null);
    }
  };

  return (
    <div className="h-screen bg-background overflow-hidden flex flex-col">
      <Header
        selectedUser={selectedUser}
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        onDeleteUser={handleDeleteUser}
        onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        isMobile={isMobile}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          users={users}
          selectedUser={selectedUser}
          onUserSelect={(user) => {
            handleUserSelect(user);
            if (isMobile) {
              setIsMobileSidebarOpen(false);
            }
          }}
          isMobileSidebarOpen={isMobileSidebarOpen}
          onCloseMobileSidebar={() => setIsMobileSidebarOpen(false)}
        />

        <MainContent selectedUser={selectedUser} onDeleteUser={handleDeleteUser} />
      </div>

      {/* Modals */}
      <AddUserModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        onUserAdded={handleUserAdded}
      />

      <UpdateUserModal
        open={showUpdateModal}
        user={userToUpdate}
        onClose={() => {
          setShowUpdateModal(false);
          setUserToUpdate(null);
        }}
        onUserUpdated={handleUserUpdated}
      />

      <DeleteUserModal
        open={showDeleteModal}
        user={userToDelete}
        onClose={() => {
          setShowDeleteModal(false);
          setUserToDelete(null);
        }}
        onUserDeleted={handleUserDeleted}
      />
    </div>
  );
}
