import { Calendar, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGA4 } from "@/contexts/GA4Context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OAuthDialog } from "./OAuthDialog";

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
  const { 
    isConnected, 
    isLoading, 
    properties, 
    selectedPropertyId, 
    connectGA4, 
    disconnect, 
    selectProperty,
    showOAuthDialog,
    authUrl,
    handleOAuthCallback,
    closeOAuthDialog
  } = useGA4();

  const handleConnectGA4 = () => {
    connectGA4();
  };

  const handlePropertyChange = (propertyId: string) => {
    selectProperty(propertyId);
    onPropertyChange(propertyId);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LLM Traffic Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Track AI chatbot referrals and organic traffic
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {isConnected && properties.length > 0 && (
          <Select value={selectedPropertyId || ""} onValueChange={handlePropertyChange}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select GA4 property" />
            </SelectTrigger>
            <SelectContent>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

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

        {!isConnected ? (
          <Button 
            onClick={handleConnectGA4} 
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect GA4"
            )}
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <CheckCircle2 className="w-4 h-4 text-success" />
                Connected
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={disconnect} className="text-destructive">
                Disconnect
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <OAuthDialog
        open={showOAuthDialog}
        onClose={closeOAuthDialog}
        onSuccess={handleOAuthCallback}
        authUrl={authUrl}
        isLoading={isLoading}
      />
    </div>
  );
};

export default DashboardHeader;
