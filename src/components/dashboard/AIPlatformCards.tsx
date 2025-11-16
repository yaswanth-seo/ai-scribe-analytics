import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import AIPlatformIcon from "./AIPlatformIcon";
import { format, subDays } from "date-fns";
import { PlatformCardData } from "@/utils/transformGA4Data";

const platformsData = [
  {
    platform: "ChatGPT",
    visitors: 1247,
    change: 12.5,
    trend: "up" as const,
  },
  {
    platform: "Gemini",
    visitors: 856,
    change: 24.8,
    trend: "up" as const,
  },
  {
    platform: "Claude",
    visitors: 634,
    change: 8.3,
    trend: "up" as const,
  },
  {
    platform: "Copilot",
    visitors: 521,
    change: 15.7,
    trend: "up" as const,
  },
  {
    platform: "Perplexity",
    visitors: 389,
    change: 5.2,
    trend: "up" as const,
  },
  {
    platform: "You.com",
    visitors: 200,
    change: -2.1,
    trend: "down" as const,
  },
];

interface AIPlatformCardsProps {
  dateRange: string;
  data: PlatformCardData[] | null;
}

const getComparisonText = (dateRange: string) => {
  const today = new Date();
  const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
  
  const periodEnd = today;
  const periodStart = subDays(today, days);
  const previousPeriodEnd = subDays(periodStart, 1);
  const previousPeriodStart = subDays(previousPeriodEnd, days);
  
  return `Compared to previous ${days} days (${format(periodStart, "MMM d")} - ${format(periodEnd, "MMM d")} vs ${format(previousPeriodStart, "MMM d")} - ${format(previousPeriodEnd, "MMM d")})`;
};

const AIPlatformCards = ({ dateRange, data }: AIPlatformCardsProps) => {
  // Use real data if available, otherwise use mock data
  const displayData = data && data.length > 0 ? data : platformsData;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg border border-border animate-fade-in">
        <Info className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        <p className="text-sm text-muted-foreground">{getComparisonText(dateRange)}</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {displayData.map((platform, index) => (
        <Card
          key={platform.platform}
          className="p-6 transition-smooth hover:shadow-glow hover:-translate-y-1 cursor-pointer"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center gap-4 mb-4">
            <AIPlatformIcon platform={platform.platform} className="w-12 h-12" />
            <h3 className="text-xl font-semibold">{platform.platform}</h3>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="bg-success/10 px-3 py-1.5 rounded-lg">
              <span className="text-success font-semibold">
                {platform.visitors.toLocaleString()} Visitors
              </span>
            </div>
            
            <div className={`flex items-center gap-1 ${platform.trend === "up" ? "text-success" : "text-destructive"}`}>
              {platform.trend === "up" ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-semibold">
                {platform.change > 0 ? "+" : ""}{platform.change.toFixed(2)}%
              </span>
            </div>
          </div>
        </Card>
      ))}
      </div>
    </div>
  );
};

export default AIPlatformCards;