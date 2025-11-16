import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Copy, ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface OAuthDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (redirectUrl: string) => void;
  authUrl: string;
  isLoading: boolean;
}

export const OAuthDialog = ({ open, onClose, onSuccess, authUrl, isLoading }: OAuthDialogProps) => {
  const [redirectUrl, setRedirectUrl] = useState("");
  
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(authUrl);
    toast.success("OAuth URL copied to clipboard!");
  };
  
  const handleOpenInBrowser = () => {
    window.open(authUrl, "_blank");
  };
  
  const handleConnect = () => {
    if (!redirectUrl.trim()) {
      toast.error("Please paste the redirect URL");
      return;
    }
    
    onSuccess(redirectUrl);
  };
  
  const isValidUrl = redirectUrl.includes("localhost:8080") && 
                     (redirectUrl.includes("code=") || redirectUrl.includes("error="));
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Connect to Google Analytics</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Step 1: Auth URL */}
          <div className="space-y-2">
            <Label>Step 1: Authenticate with Google</Label>
            <Textarea 
              value={authUrl}
              readOnly
              className="font-mono text-xs h-24 resize-none"
            />
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyUrl}
                className="gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy URL
              </Button>
              <Button 
                size="sm" 
                onClick={handleOpenInBrowser}
                className="gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open in Browser
              </Button>
            </div>
          </div>
          
          {/* Step 2: Paste redirect URL */}
          <div className="space-y-2">
            <Label htmlFor="redirect-url">
              Step 2: After authentication, paste the full URL from your browser
            </Label>
            <Input
              id="redirect-url"
              placeholder="http://localhost:8080/?state=...&code=..."
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
              className="font-mono text-xs"
            />
            <p className="text-xs text-muted-foreground">
              The URL should start with http://localhost:8080/ and contain a code parameter
            </p>
          </div>
          
          {/* Action buttons */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              onClick={handleConnect} 
              disabled={!isValidUrl || isLoading}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Connect"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
