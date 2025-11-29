import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import UsersTable, { type UserData } from "@/components/admin/UsersTable";
import PropertiesTable, { type PropertyData } from "@/components/admin/PropertiesTable";
import UserDetailModal from "@/components/admin/UserDetailModal";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const Admin = () => {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, isAdmin } = useAuth();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<UserData[]>([]);
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<UserData | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
      return;
    }
    
    if (!authLoading && user && !isAdmin) {
      toast.error("Access denied. Admin privileges required.");
      navigate("/dashboard");
      return;
    }
    
    if (user && isAdmin) {
      fetchData();
    }
  }, [user, authLoading, isAdmin, navigate]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch users with property count
      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      // Fetch all properties
      const { data: propertiesData, error: propertiesError } = await supabase
        .from("analytics_properties")
        .select("*");

      if (propertiesError) throw propertiesError;

      // Map users with property counts
      const usersWithCounts: UserData[] = (profilesData || []).map((profile) => ({
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        status: profile.status as "active" | "suspended" | "deleted",
        created_at: profile.created_at,
        last_login: profile.last_login,
        properties_count: (propertiesData || []).filter((p) => p.user_id === profile.id).length,
        notes: profile.notes,
      }));

      // Map properties with user info
      const propertiesWithUsers: PropertyData[] = (propertiesData || []).map((property) => {
        const propertyUser = profilesData?.find((p) => p.id === property.user_id);
        return {
          id: property.id,
          ga4_property_id: property.ga4_property_id,
          property_name: property.property_name,
          domain: property.domain,
          is_active: property.is_active,
          connected_at: property.connected_at,
          disconnected_at: property.disconnected_at,
          user_id: property.user_id,
          user_email: propertyUser?.email || "Unknown",
          user_name: propertyUser?.full_name,
        };
      });

      setUsers(usersWithCounts);
      setProperties(propertiesWithUsers);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  };

  const stats = {
    totalUsers: users.length,
    activeUsers: users.filter((u) => u.status === "active").length,
    suspendedUsers: users.filter((u) => u.status === "suspended").length,
    totalProperties: properties.length,
    activeProperties: properties.filter((p) => p.is_active).length,
    usersTrend: 12,
    propertiesTrend: 8,
  };

  const handleViewUser = (userData: UserData) => {
    setSelectedUser(userData);
    setShowUserModal(true);
  };

  const handleImpersonate = (userData: UserData, propertyId?: string) => {
    const params = new URLSearchParams();
    params.set("impersonate", userData.id);
    if (propertyId) {
      params.set("property", propertyId);
    }
    navigate(`/dashboard?${params.toString()}`);
  };

  const handleSuspend = async (userData: UserData) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ status: "suspended" })
        .eq("id", userData.id);

      if (error) throw error;

      toast.success(`User ${userData.email} has been suspended`);
      fetchData();
      setShowUserModal(false);
    } catch (error) {
      console.error("Error suspending user:", error);
      toast.error("Failed to suspend user");
    }
  };

  const handleReactivate = async (userData: UserData) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ status: "active" })
        .eq("id", userData.id);

      if (error) throw error;

      toast.success(`User ${userData.email} has been reactivated`);
      fetchData();
      setShowUserModal(false);
    } catch (error) {
      console.error("Error reactivating user:", error);
      toast.error("Failed to reactivate user");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteConfirm) return;
    
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ status: "deleted" })
        .eq("id", deleteConfirm.id);

      if (error) throw error;

      toast.success(`User ${deleteConfirm.email} has been deleted`);
      setDeleteConfirm(null);
      setShowUserModal(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleSaveNotes = async (userId: string, notes: string) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ notes })
        .eq("id", userId);

      if (error) throw error;

      toast.success("Notes saved");
      fetchData();
    } catch (error) {
      console.error("Error saving notes:", error);
      toast.error("Failed to save notes");
    }
  };

  const handleDisconnectProperty = async (property: PropertyData) => {
    try {
      const { error } = await supabase
        .from("analytics_properties")
        .update({ 
          is_active: false, 
          disconnected_at: new Date().toISOString(),
          disconnected_by: user?.id 
        })
        .eq("id", property.id);

      if (error) throw error;

      toast.success(`Property ${property.domain} disconnected`);
      fetchData();
    } catch (error) {
      console.error("Error disconnecting property:", error);
      toast.error("Failed to disconnect property");
    }
  };

  const handleReconnectProperty = async (property: PropertyData) => {
    try {
      const { error } = await supabase
        .from("analytics_properties")
        .update({ 
          is_active: true, 
          disconnected_at: null,
          disconnected_by: null 
        })
        .eq("id", property.id);

      if (error) throw error;

      toast.success(`Property ${property.domain} reconnected`);
      fetchData();
    } catch (error) {
      console.error("Error reconnecting property:", error);
      toast.error("Failed to reconnect property");
    }
  };

  const handleViewUserFromProperty = (userId: string) => {
    const userData = users.find((u) => u.id === userId);
    if (userData) {
      handleViewUser(userData);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        {activeTab === "overview" && (
          <>
            <div>
              <h1 className="text-2xl font-bold">Admin Overview</h1>
              <p className="text-muted-foreground">
                Manage users, properties, and platform settings
              </p>
            </div>
            <AdminStats stats={stats} />
            
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Recent Users</h2>
                <UsersTable
                  users={users.slice(0, 5)}
                  onViewUser={handleViewUser}
                  onImpersonate={handleImpersonate}
                  onSuspend={handleSuspend}
                  onReactivate={handleReactivate}
                  onDelete={(u) => setDeleteConfirm(u)}
                />
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Recent Properties</h2>
                <PropertiesTable
                  properties={properties.slice(0, 5)}
                  onDisconnect={handleDisconnectProperty}
                  onReconnect={handleReconnectProperty}
                  onViewUser={handleViewUserFromProperty}
                />
              </div>
            </div>
          </>
        )}
        
        {activeTab === "users" && (
          <>
            <div>
              <h1 className="text-2xl font-bold">User Management</h1>
              <p className="text-muted-foreground">
                View and manage all registered users
              </p>
            </div>
            <UsersTable
              users={users}
              onViewUser={handleViewUser}
              onImpersonate={handleImpersonate}
              onSuspend={handleSuspend}
              onReactivate={handleReactivate}
              onDelete={(u) => setDeleteConfirm(u)}
            />
          </>
        )}
        
        {activeTab === "properties" && (
          <>
            <div>
              <h1 className="text-2xl font-bold">Properties Management</h1>
              <p className="text-muted-foreground">
                View and manage all connected GA4 properties
              </p>
            </div>
            <PropertiesTable
              properties={properties}
              onDisconnect={handleDisconnectProperty}
              onReconnect={handleReconnectProperty}
              onViewUser={handleViewUserFromProperty}
            />
          </>
        )}
      </main>

      <UserDetailModal
        user={selectedUser}
        properties={properties}
        open={showUserModal}
        onOpenChange={setShowUserModal}
        onImpersonate={handleImpersonate}
        onSuspend={handleSuspend}
        onReactivate={handleReactivate}
        onDelete={(u) => setDeleteConfirm(u)}
        onSaveNotes={handleSaveNotes}
      />

      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete User</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteConfirm?.email}? This action will mark the account as deleted. The user will no longer be able to access their account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Admin;
