import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import AIPlatformCards from "@/components/dashboard/AIPlatformCards";
import TrafficChart from "@/components/dashboard/TrafficChart";
import AISessionsTable from "@/components/dashboard/AISessionsTable";

const Index = () => {
  const [dateRange, setDateRange] = useState("30d");
  const [selectedProperty, setSelectedProperty] = useState("example.com");

  return (
    <div className="min-h-screen bg-background">
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

export default Index;
