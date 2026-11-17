"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddUserModalProps {
  open: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

export function AddUserModal({
  open,
  onClose,
  onUserAdded,
}: AddUserModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    age: 0,
    universe: "",
    intelligence: 0,
    power: "None",
    weakness: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert age and intelligence to numbers
      const userData = {
        ...formData,
        age: Number(formData.age),
        intelligence: Number(formData.intelligence),
      };

      await api.post("/anime/new", userData);
      onUserAdded();
      setFormData({
        name: "",
        age: 0,
        universe: "",
        intelligence: 0,
        power: "None",
        weakness: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">Add New User</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => handleChange("age", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="universe">Universe</Label>
            <Input
              id="universe"
              value={formData.universe}
              onChange={(e) => handleChange("universe", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="power-type">Power Type</Label>
            <select
              id="power-type"
              value={formData.power}
              onChange={(e) => handleChange("power", e.target.value)}
              className="w-full px-3 py-2 border rounded-md border-input bg-background"
            >
              <option value="None">None</option>
              <option value="Physical">Physical</option>
              <option value="Magic">Magic</option>
              <option value="Energy">Energy</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="intelligence">Intelligence</Label>
            <Input
              id="intelligence"
              type="number"
              value={formData.intelligence}
              onChange={(e) => handleChange("intelligence", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="weakness">Weakness</Label>
            <Input
              id="weakness"
              value={formData.weakness}
              onChange={(e) => handleChange("weakness", e.target.value)}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add User
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
