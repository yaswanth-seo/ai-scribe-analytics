import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { BarChart3, Users, Database, Settings, LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", value: "overview", icon: LayoutDashboard },
  { label: "Users", value: "users", icon: Users },
  { label: "Properties", value: "properties", icon: Database },
];

interface AdminHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const AdminHeader = ({ activeTab, onTabChange }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div 
              className="flex items-center gap-2 cursor-pointer" 
              onClick={() => navigate("/")}
            >
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">ZenReports</span>
              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                Admin
              </span>
            </div>
            
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.value}
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "gap-2",
                    activeTab === item.value && "bg-muted text-foreground"
                  )}
                  onClick={() => onTabChange(item.value)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user?.email}
              </span>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mobile navigation */}
        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant="ghost"
              size="sm"
              className={cn(
                "gap-2 shrink-0",
                activeTab === item.value && "bg-muted text-foreground"
              )}
              onClick={() => onTabChange(item.value)}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
