import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import MetricsCards from "@/components/dashboard/MetricsCards";
import TrafficChart from "@/components/dashboard/TrafficChart";
import AIPlatformsBreakdown from "@/components/dashboard/AIPlatformsBreakdown";
import GeoDistribution from "@/components/dashboard/GeoDistribution";
import TopPages from "@/components/dashboard/TopPages";

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
        
        <MetricsCards />
        
        <TrafficChart dateRange={dateRange} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AIPlatformsBreakdown />
          <GeoDistribution />
        </div>
        
        <TopPages />
      </div>
    </div>
  );
};

export default Index;
