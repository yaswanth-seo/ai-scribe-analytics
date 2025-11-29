import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminStats from "@/components/admin/AdminStats";
import UsersTable, { type UserData } from "@/components/admin/UsersTable";
import PropertiesTable, { type PropertyData } from "@/components/admin/PropertiesTable";
import UserDetailModal from "@/components/admin/UserDetailModal";
import { toast } from "sonner";
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

// Mock data for UI reference
const initialMockUsers: UserData[] = [
  { id: "1", email: "maria@blueberrybakery.com", full_name: "Maria Fernandes", status: "active", created_at: "2024-08-15T10:30:00Z", last_login: "2025-01-28T14:22:00Z", properties_count: 3, notes: "VIP customer, handles multiple locations" },
  { id: "2", email: "trevor@pawsandshine.com", full_name: "Trevor Miles", status: "active", created_at: "2024-09-22T08:15:00Z", last_login: "2025-01-27T09:45:00Z", properties_count: 2, notes: "" },
  { id: "3", email: "aditi@restoreplus.ca", full_name: "Dr. Aditi Mehra", status: "suspended", created_at: "2024-06-10T16:00:00Z", last_login: "2025-01-10T11:30:00Z", properties_count: 1, notes: "Account suspended due to billing issues" },
  { id: "4", email: "james@techflow.io", full_name: "James Chen", status: "active", created_at: "2024-11-05T12:00:00Z", last_login: "2025-01-28T08:00:00Z", properties_count: 5, notes: "Enterprise client" },
  { id: "5", email: "sarah@greenleaf.org", full_name: "Sarah Thompson", status: "active", created_at: "2024-12-01T09:30:00Z", last_login: "2025-01-26T16:15:00Z", properties_count: 1, notes: "" },
  { id: "6", email: "michael@urbanfitness.com", full_name: "Michael Rodriguez", status: "deleted", created_at: "2024-07-20T14:45:00Z", last_login: "2024-12-15T10:00:00Z", properties_count: 0, notes: "Requested account deletion" },
  { id: "7", email: "emma@artisancoffee.co", full_name: "Emma Wilson", status: "active", created_at: "2025-01-02T11:00:00Z", last_login: "2025-01-28T07:30:00Z", properties_count: 2, notes: "New premium subscriber" },
  { id: "8", email: "david@nordicspa.se", full_name: "David Lindqvist", status: "active", created_at: "2024-10-18T13:20:00Z", last_login: "2025-01-25T12:45:00Z", properties_count: 4, notes: "" },
];

const initialMockProperties: PropertyData[] = [
  { id: "p1", ga4_property_id: "GA4-123456789", property_name: "Blueberry Bakery Main", domain: "blueberrybakery.com", is_active: true, connected_at: "2024-08-15T10:35:00Z", disconnected_at: null, user_id: "1", user_email: "maria@blueberrybakery.com", user_name: "Maria Fernandes" },
  { id: "p2", ga4_property_id: "GA4-234567890", property_name: "Blueberry Bakery Blog", domain: "blog.blueberrybakery.com", is_active: true, connected_at: "2024-08-20T09:00:00Z", disconnected_at: null, user_id: "1", user_email: "maria@blueberrybakery.com", user_name: "Maria Fernandes" },
  { id: "p3", ga4_property_id: "GA4-345678901", property_name: "Blueberry Shop", domain: "shop.blueberrybakery.com", is_active: true, connected_at: "2024-09-01T11:15:00Z", disconnected_at: null, user_id: "1", user_email: "maria@blueberrybakery.com", user_name: "Maria Fernandes" },
  { id: "p4", ga4_property_id: "GA4-456789012", property_name: "Paws & Shine", domain: "pawsandshine.com", is_active: true, connected_at: "2024-09-22T08:20:00Z", disconnected_at: null, user_id: "2", user_email: "trevor@pawsandshine.com", user_name: "Trevor Miles" },
  { id: "p5", ga4_property_id: "GA4-567890123", property_name: "Paws Store", domain: "store.pawsandshine.com", is_active: false, connected_at: "2024-10-05T14:30:00Z", disconnected_at: "2025-01-15T10:00:00Z", user_id: "2", user_email: "trevor@pawsandshine.com", user_name: "Trevor Miles" },
  { id: "p6", ga4_property_id: "GA4-678901234", property_name: "RestorePlus Clinic", domain: "restoreplus.ca", is_active: false, connected_at: "2024-06-10T16:05:00Z", disconnected_at: "2025-01-10T11:35:00Z", user_id: "3", user_email: "aditi@restoreplus.ca", user_name: "Dr. Aditi Mehra" },
  { id: "p7", ga4_property_id: "GA4-789012345", property_name: "TechFlow Main", domain: "techflow.io", is_active: true, connected_at: "2024-11-05T12:10:00Z", disconnected_at: null, user_id: "4", user_email: "james@techflow.io", user_name: "James Chen" },
  { id: "p8", ga4_property_id: "GA4-890123456", property_name: "TechFlow Docs", domain: "docs.techflow.io", is_active: true, connected_at: "2024-11-10T09:00:00Z", disconnected_at: null, user_id: "4", user_email: "james@techflow.io", user_name: "James Chen" },
  { id: "p9", ga4_property_id: "GA4-901234567", property_name: "GreenLeaf Foundation", domain: "greenleaf.org", is_active: true, connected_at: "2024-12-01T09:35:00Z", disconnected_at: null, user_id: "5", user_email: "sarah@greenleaf.org", user_name: "Sarah Thompson" },
  { id: "p10", ga4_property_id: "GA4-012345678", property_name: "Artisan Coffee", domain: "artisancoffee.co", is_active: true, connected_at: "2025-01-02T11:10:00Z", disconnected_at: null, user_id: "7", user_email: "emma@artisancoffee.co", user_name: "Emma Wilson" },
];

const Admin = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState<UserData[]>(initialMockUsers);
  const [properties, setProperties] = useState<PropertyData[]>(initialMockProperties);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<UserData | null>(null);

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

  const handleSuspend = (userData: UserData) => {
    setUsers(users.map(u => u.id === userData.id ? { ...u, status: "suspended" as const } : u));
    toast.success(`User ${userData.email} has been suspended`);
    setShowUserModal(false);
  };

  const handleReactivate = (userData: UserData) => {
    setUsers(users.map(u => u.id === userData.id ? { ...u, status: "active" as const } : u));
    toast.success(`User ${userData.email} has been reactivated`);
    setShowUserModal(false);
  };

  const handleDeleteConfirm = () => {
    if (!deleteConfirm) return;
    
    setUsers(users.map(u => u.id === deleteConfirm.id ? { ...u, status: "deleted" as const } : u));
    toast.success(`User ${deleteConfirm.email} has been deleted`);
    setDeleteConfirm(null);
    setShowUserModal(false);
  };

  const handleSaveNotes = (userId: string, notes: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, notes } : u));
    toast.success("Notes saved");
  };

  const handleDisconnectProperty = (property: PropertyData) => {
    setProperties(properties.map(p => 
      p.id === property.id 
        ? { ...p, is_active: false, disconnected_at: new Date().toISOString() } 
        : p
    ));
    toast.success(`Property ${property.domain} disconnected`);
  };

  const handleReconnectProperty = (property: PropertyData) => {
    setProperties(properties.map(p => 
      p.id === property.id 
        ? { ...p, is_active: true, disconnected_at: null } 
        : p
    ));
    toast.success(`Property ${property.domain} reconnected`);
  };

  const handleViewUserFromProperty = (userId: string) => {
    const userData = users.find((u) => u.id === userId);
    if (userData) {
      handleViewUser(userData);
    }
  };

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
