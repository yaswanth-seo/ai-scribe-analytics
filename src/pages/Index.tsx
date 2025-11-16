import { useState, useEffect } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AIPlatformCards from "@/components/dashboard/AIPlatformCards";
import TrafficChart from "@/components/dashboard/TrafficChart";
import AISessionsTable from "@/components/dashboard/AISessionsTable";
import ConnectionStatus from "@/components/dashboard/ConnectionStatus";
import { useGA4 } from "@/contexts/GA4Context";
import { transformForPlatformCards, transformForTrafficChart, transformForSessionsTable } from "@/utils/transformGA4Data";

const Index = () => {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedProperty, setSelectedProperty] = useState("");
  const { isConnected, selectedPropertyId, ga4Data, isLoading, error, fetchData } = useGA4();

  // Fetch data when property or date range changes
  useEffect(() => {
    if (isConnected && selectedPropertyId) {
      fetchData(dateRange);
    }
  }, [dateRange, selectedPropertyId, isConnected]);

  // Transform GA4 data for components
  const platformCardsData = ga4Data ? transformForPlatformCards(ga4Data) : null;
  const chartData = ga4Data ? transformForTrafficChart(ga4Data) : null;
  const sessionsData = ga4Data ? transformForSessionsTable(ga4Data) : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-6">
        <DashboardHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          selectedProperty={selectedProperty}
          onPropertyChange={setSelectedProperty}
        />
        
        {!isConnected || !selectedPropertyId ? (
          <ConnectionStatus 
            isConnected={isConnected} 
            isLoading={false} 
            error={null} 
          />
        ) : isLoading ? (
          <ConnectionStatus 
            isConnected={isConnected} 
            isLoading={isLoading} 
            error={null} 
          />
        ) : error ? (
          <ConnectionStatus 
            isConnected={isConnected} 
            isLoading={false} 
            error={error}
            onRetry={() => fetchData(dateRange)}
          />
        ) : (
          <>
            <AIPlatformCards dateRange={dateRange} data={platformCardsData} />
            
            <TrafficChart dateRange={dateRange} data={chartData} />
            
            <AISessionsTable data={sessionsData} />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
