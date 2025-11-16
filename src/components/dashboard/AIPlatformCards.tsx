import { TrendingUp, TrendingDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import AIPlatformIcon from "./AIPlatformIcon";

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

const AIPlatformCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
      {platformsData.map((platform, index) => (
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
  );
};

export default AIPlatformCards;