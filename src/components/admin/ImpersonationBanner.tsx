import { Button } from "@/components/ui/button";
import { UserCog, X } from "lucide-react";

interface ImpersonationBannerProps {
  userEmail: string;
  propertyName?: string;
  onExit: () => void;
}

const ImpersonationBanner = ({ 
  userEmail, 
  propertyName, 
  onExit 
}: ImpersonationBannerProps) => {
  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <UserCog className="h-4 w-4" />
        <span className="text-sm font-medium">
          Viewing as: <strong>{userEmail}</strong>
          {propertyName && (
            <span className="ml-2">
              • Property: <strong>{propertyName}</strong>
            </span>
          )}
        </span>
      </div>
      <Button 
        variant="secondary" 
        size="sm" 
        onClick={onExit}
        className="h-7 gap-1"
      >
        <X className="h-3 w-3" />
        Exit
      </Button>
    </div>
  );
};

export default ImpersonationBanner;
