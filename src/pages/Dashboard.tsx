import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AIPlatformCards from "@/components/dashboard/AIPlatformCards";
import TrafficChart from "@/components/dashboard/TrafficChart";
import AISessionsTable from "@/components/dashboard/AISessionsTable";
import ImpersonationBanner from "@/components/admin/ImpersonationBanner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, isLoading, isAdmin } = useAuth();
  
  const [dateRange, setDateRange] = useState("30d");
  const [selectedProperty, setSelectedProperty] = useState("example.com");
  
  // Impersonation state
  const impersonateUserId = searchParams.get("impersonate");
  const impersonatePropertyId = searchParams.get("property");
  const [impersonatedUser, setImpersonatedUser] = useState<{ email: string; name?: string } | null>(null);
  const [impersonatedProperty, setImpersonatedProperty] = useState<string | undefined>();

  // Check impersonation status
  useEffect(() => {
    if (impersonateUserId && isAdmin) {
      fetchImpersonatedUser();
    } else {
      setImpersonatedUser(null);
      setImpersonatedProperty(undefined);
    }
  }, [impersonateUserId, impersonatePropertyId, isAdmin]);

  const fetchImpersonatedUser = async () => {
    if (!impersonateUserId) return;

    const { data: profile } = await supabase
      .from("profiles")
      .select("email, full_name")
      .eq("id", impersonateUserId)
      .maybeSingle();

    if (profile) {
      setImpersonatedUser({ email: profile.email, name: profile.full_name || undefined });
    }

    if (impersonatePropertyId) {
      const { data: property } = await supabase
        .from("analytics_properties")
        .select("property_name")
        .eq("id", impersonatePropertyId)
        .maybeSingle();

      if (property) {
        setImpersonatedProperty(property.property_name);
      }
    }
  };

  const exitImpersonation = () => {
    navigate("/admin");
  };

  // For demo purposes, allow access without auth
  // In production, you'd want to require auth
  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     navigate("/auth");
  //   }
  // }, [user, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      {impersonatedUser && (
        <ImpersonationBanner
          userEmail={impersonatedUser.email}
          propertyName={impersonatedProperty}
          onExit={exitImpersonation}
        />
      )}
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedProperty={selectedProperty}
          onPropertyChange={setSelectedProperty}
        />
        
        <AIPlatformCards dateRange={dateRange} />
        
        <TrafficChart dateRange={dateRange} />
        
        <AISessionsTable />
      </div>
    </div>
  );
};

export default Dashboard;
