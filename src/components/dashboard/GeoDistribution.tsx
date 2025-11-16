import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Globe } from "lucide-react";

const geoData = [
  { country: "United States", sessions: 8934, percentage: 36.4, flag: "🇺🇸" },
  { country: "United Kingdom", sessions: 4521, percentage: 18.4, flag: "🇬🇧" },
  { country: "Germany", sessions: 3287, percentage: 13.4, flag: "🇩🇪" },
  { country: "France", sessions: 2845, percentage: 11.6, flag: "🇫🇷" },
  { country: "Canada", sessions: 2134, percentage: 8.7, flag: "🇨🇦" },
  { country: "Others", sessions: 2842, percentage: 11.5, flag: "🌍" },
];

const GeoDistribution = () => {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Geographic Distribution
        </CardTitle>
        <CardDescription>
          Sessions by country
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {geoData.map((location, index) => (
            <div key={location.country} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{location.flag}</span>
                  <span className="text-sm font-medium">{location.country}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold">
                    {location.sessions.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {location.percentage}%
                  </div>
                </div>
              </div>
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-primary rounded-full transition-smooth"
                  style={{
                    width: `${location.percentage}%`,
                    animationDelay: `${index * 100}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GeoDistribution;
