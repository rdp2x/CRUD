"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus, Edit, Trash2 } from "lucide-react"

interface UserActionsProps {
  onAddUser: () => void
  onUpdateUser: () => void
  onDeleteUser: () => void
  hasSelectedUser: boolean
}

export function UserActions({ onAddUser, onUpdateUser, onDeleteUser, hasSelectedUser }: UserActionsProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-heading">Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Button onClick={onAddUser} className="w-full justify-start gap-2" size="sm">
          <UserPlus className="w-4 h-4" />
          Add User
        </Button>

        <Button
          onClick={onUpdateUser}
          variant="secondary"
          className="w-full justify-start gap-2"
          size="sm"
          disabled={!hasSelectedUser}
        >
          <Edit className="w-4 h-4" />
          Update User
        </Button>

        <Button
          onClick={onDeleteUser}
          variant="destructive"
          className="w-full justify-start gap-2"
          size="sm"
          disabled={!hasSelectedUser}
        >
          <Trash2 className="w-4 h-4" />
          Delete User
        </Button>
      </CardContent>
    </Card>
  )
}
