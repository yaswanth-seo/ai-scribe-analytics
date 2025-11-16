import { AlertCircle, Loader2, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConnectionStatusProps {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  onRetry?: () => void;
}

const ConnectionStatus = ({ isConnected, isLoading, error, onRetry }: ConnectionStatusProps) => {
  if (isLoading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Loading GA4 data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Error Loading Data</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              {onRetry && (
                <Button onClick={onRetry} variant="outline">
                  Try Again
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!isConnected) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex items-center justify-center py-12">
          <div className="text-center space-y-4">
            <Database className="w-12 h-12 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-semibold text-lg mb-2">Connect Google Analytics</h3>
              <p className="text-muted-foreground">
                Connect your GA4 account to view real traffic data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default ConnectionStatus;
