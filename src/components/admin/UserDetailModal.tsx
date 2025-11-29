import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Calendar, 
  Clock, 
  Database, 
  Ban, 
  RefreshCw, 
  Trash2,
  UserCog,
  Save
} from "lucide-react";
import { format } from "date-fns";
import type { UserData } from "./UsersTable";
import type { PropertyData } from "./PropertiesTable";

interface UserDetailModalProps {
  user: UserData | null;
  properties: PropertyData[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImpersonate: (user: UserData, propertyId?: string) => void;
  onSuspend: (user: UserData) => void;
  onReactivate: (user: UserData) => void;
  onDelete: (user: UserData) => void;
  onSaveNotes: (userId: string, notes: string) => void;
}

const UserDetailModal = ({
  user,
  properties,
  open,
  onOpenChange,
  onImpersonate,
  onSuspend,
  onReactivate,
  onDelete,
  onSaveNotes,
}: UserDetailModalProps) => {
  const [notes, setNotes] = useState(user?.notes || "");
  const [hasChanges, setHasChanges] = useState(false);

  const userProperties = properties.filter((p) => p.user_id === user?.id);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    setHasChanges(true);
  };

  const handleSaveNotes = () => {
    if (user) {
      onSaveNotes(user.id, notes);
      setHasChanges(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default" className="bg-success/10 text-success">Active</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "deleted":
        return <Badge variant="secondary">Deleted</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Details
          </DialogTitle>
          <DialogDescription>
            View and manage user account
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* User Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" /> Email
              </Label>
              <p className="font-medium">{user.email}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground flex items-center gap-1">
                <User className="h-3 w-3" /> Name
              </Label>
              <p className="font-medium">{user.full_name || "Not provided"}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Status</Label>
              <div>{getStatusBadge(user.status)}</div>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground flex items-center gap-1">
                <Database className="h-3 w-3" /> Properties
              </Label>
              <p className="font-medium">{userProperties.length} connected</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground flex items-center gap-1">
                <Calendar className="h-3 w-3" /> Created
              </Label>
              <p className="font-medium">
                {format(new Date(user.created_at), "MMM d, yyyy 'at' h:mm a")}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" /> Last Login
              </Label>
              <p className="font-medium">
                {user.last_login 
                  ? format(new Date(user.last_login), "MMM d, yyyy 'at' h:mm a")
                  : "Never"
                }
              </p>
            </div>
          </div>

          <Separator />

          {/* Connected Properties */}
          <div className="space-y-3">
            <Label>Connected Properties</Label>
            {userProperties.length === 0 ? (
              <p className="text-sm text-muted-foreground">No properties connected</p>
            ) : (
              <div className="space-y-2">
                {userProperties.map((property) => (
                  <div 
                    key={property.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30"
                  >
                    <div>
                      <p className="font-medium">{property.domain}</p>
                      <p className="text-sm text-muted-foreground">{property.property_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {property.is_active ? (
                        <Badge variant="default" className="bg-success/10 text-success">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Disconnected</Badge>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onImpersonate(user, property.id)}
                      >
                        <UserCog className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Admin Notes */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Admin Notes</Label>
              {hasChanges && (
                <Button variant="ghost" size="sm" onClick={handleSaveNotes}>
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              )}
            </div>
            <Textarea
              placeholder="Add notes about this user..."
              value={notes}
              onChange={(e) => handleNotesChange(e.target.value)}
              rows={3}
            />
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              onClick={() => onImpersonate(user)}
            >
              <UserCog className="h-4 w-4 mr-2" />
              Impersonate User
            </Button>
            
            {user.status === "active" ? (
              <Button 
                variant="outline" 
                onClick={() => onSuspend(user)}
                className="text-destructive hover:text-destructive"
              >
                <Ban className="h-4 w-4 mr-2" />
                Suspend Account
              </Button>
            ) : user.status === "suspended" ? (
              <Button 
                variant="outline" 
                onClick={() => onReactivate(user)}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Reactivate Account
              </Button>
            ) : null}
            
            <Button 
              variant="destructive" 
              onClick={() => onDelete(user)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete User
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserDetailModal;
