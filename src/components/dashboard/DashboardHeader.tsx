import { useNavigate } from "react-router-dom";
import { Calendar, ChevronDown, LogOut, Shield, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";

interface DashboardHeaderProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  selectedProperty: string;
  onPropertyChange: (value: string) => void;
}

const DashboardHeader = ({
  dateRange,
  onDateRangeChange,
  selectedProperty,
  onPropertyChange,
}: DashboardHeaderProps) => {
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate("/")}
        >
          <BarChart3 className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">ZenReports</span>
        </div>
        
        <div className="flex items-center gap-3">
          {isAdmin && (
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => navigate("/admin")}
            >
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">Admin</span>
            </Button>
          )}
          
          {user && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground hidden sm:inline">
                {user.email}
              </span>
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            LLM Traffic Analytics
          </h1>
          <p className="text-muted-foreground mt-1">
            Track AI chatbot referrals and organic traffic
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Select value={selectedProperty} onValueChange={onPropertyChange}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="example.com">example.com</SelectItem>
              <SelectItem value="demo.app">demo.app</SelectItem>
              <SelectItem value="test.io">test.io</SelectItem>
            </SelectContent>
          </Select>

          <Select value={dateRange} onValueChange={onDateRangeChange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" className="gap-2">
            Connect GA4
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
