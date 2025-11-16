import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const OAuthCallback = () => {
  useEffect(() => {
    // This page is opened in a popup
    // The opener window will read the URL and close this popup
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
        <h2 className="text-xl font-semibold">Connecting to Google Analytics...</h2>
        <p className="text-muted-foreground">This window will close automatically.</p>
      </div>
    </div>
  );
};

export default OAuthCallback;
