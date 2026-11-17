import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { User } from "@/app/page";
import { useIsMobile } from "@/components/ui/use-mobile";
import {
  UserIcon,
  Mail,
  Phone,
  Globe,
  MapPin,
  Building,
  Power,
  Zap,
  Brain,
  ThumbsDown,
  Info,
  Plus,
  Trash2,
} from "lucide-react";
import { useRef } from "react";

interface UserDetailsProps {
  user: User;
  onDeleteUser?: (user: User) => void;
}

export function UserDetails({ user, onDeleteUser }: UserDetailsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAddImage = () => {
    fileInputRef.current?.click(); // trigger hidden input
  };

  // Use the mobile hook
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6 overflow-y-auto max-h-full">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl font-heading">
                  {user.name}
                </CardTitle>
              </div>
            </div>
            {onDeleteUser && (
              <Button
                variant="destructive"
                size="sm"
                className="gap-2"
                onClick={() => onDeleteUser(user)}
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {user.universe && (
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Universe</p>
                <p className="text-sm text-muted-foreground">{user.universe}</p>
              </div>
            </div>
          )}

          {user.power && (
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Power Type</p>
                <p className="text-sm text-muted-foreground">{user.power}</p>
              </div>
            </div>
          )}

          {user.intelligence !== undefined && user.intelligence !== null && (
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Intelligence</p>
                <p className="text-sm text-muted-foreground">
                  {user.intelligence}
                </p>
              </div>
            </div>
          )}

          {user.weakness && (
            <div className="flex items-center gap-3">
              <ThumbsDown className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">Weakness</p>
                <p className="text-sm text-muted-foreground">{user.weakness}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Images Information */}

      <Card>
        <CardHeader>
          <CardTitle className="font-heading flex items-center gap-2">
            Gallery
            <button
              type="button"
              onClick={handleAddImage}
              className="p-1 rounded-full bg-primary text-white hover:bg-primary/80"
            >
              <Plus className="w-4 h-4" />
            </button>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Images will go here */}
        </CardContent>
      </Card>
    </div>
  );
}
