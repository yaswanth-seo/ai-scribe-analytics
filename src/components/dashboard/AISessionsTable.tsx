import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AIPlatformIcon from "./AIPlatformIcon";

const AI_PLATFORMS = ["ChatGPT", "Gemini", "Claude", "Copilot", "Perplexity"];

const sessionsData = [
  {
    platform: "ChatGPT",
    pagePath: "/about-us",
    timestamp: "12 Jun, 4PM",
    location: "NY, USA",
  },
  {
    platform: "Perplexity",
    pagePath: "/services/home-loans",
    timestamp: "12 Jun, 4PM",
    location: "CA, USA",
  },
  {
    platform: "Perplexity",
    pagePath: "/contact-us",
    timestamp: "12 Jun, 3PM",
    location: "TX, USA",
  },
  {
    platform: "ChatGPT",
    pagePath: "/services/home-loans",
    timestamp: "12 Jun, 2PM",
    location: "FL, USA",
  },
  {
    platform: "Gemini",
    pagePath: "/contact-us",
    timestamp: "12 Jun, 1PM",
    location: "WA, USA",
  },
  {
    platform: "Claude",
    pagePath: "/blog/market-trends",
    timestamp: "12 Jun, 12PM",
    location: "IL, USA",
  },
  {
    platform: "Copilot",
    pagePath: "/about-us",
    timestamp: "12 Jun, 11AM",
    location: "MA, USA",
  },
  {
    platform: "ChatGPT",
    pagePath: "/pricing",
    timestamp: "12 Jun, 10AM",
    location: "NY, USA",
  },
  {
    platform: "Gemini",
    pagePath: "/features/analytics",
    timestamp: "12 Jun, 9AM",
    location: "London, UK",
  },
  {
    platform: "ChatGPT",
    pagePath: "/blog/ai-trends-2024",
    timestamp: "11 Jun, 11PM",
    location: "Toronto, Canada",
  },
  {
    platform: "Claude",
    pagePath: "/products/enterprise",
    timestamp: "11 Jun, 10PM",
    location: "Seattle, WA",
  },
  {
    platform: "Copilot",
    pagePath: "/docs/getting-started",
    timestamp: "11 Jun, 9PM",
    location: "Austin, TX",
  },
  {
    platform: "ChatGPT",
    pagePath: "/",
    timestamp: "11 Jun, 8PM",
    location: "Berlin, Germany",
  },
  {
    platform: "Perplexity",
    pagePath: "/features/integrations",
    timestamp: "11 Jun, 7PM",
    location: "Sydney, Australia",
  },
  {
    platform: "Gemini",
    pagePath: "/pricing/teams",
    timestamp: "11 Jun, 6PM",
    location: "Mumbai, India",
  },
  {
    platform: "ChatGPT",
    pagePath: "/blog/product-updates",
    timestamp: "11 Jun, 5PM",
    location: "San Francisco, CA",
  },
  {
    platform: "Claude",
    pagePath: "/about-us/careers",
    timestamp: "11 Jun, 4PM",
    location: "Boston, MA",
  },
  {
    platform: "ChatGPT",
    pagePath: "/docs/api-reference",
    timestamp: "11 Jun, 3PM",
    location: "Chicago, IL",
  },
  {
    platform: "Copilot",
    pagePath: "/products/premium",
    timestamp: "11 Jun, 2PM",
    location: "Denver, CO",
  },
  {
    platform: "Gemini",
    pagePath: "/features/security",
    timestamp: "11 Jun, 1PM",
    location: "Paris, France",
  },
  {
    platform: "ChatGPT",
    pagePath: "/blog/case-studies",
    timestamp: "11 Jun, 12PM",
    location: "Atlanta, GA",
  },
  {
    platform: "Perplexity",
    pagePath: "/pricing/enterprise",
    timestamp: "11 Jun, 11AM",
    location: "Tokyo, Japan",
  },
  {
    platform: "Claude",
    pagePath: "/features/collaboration",
    timestamp: "11 Jun, 10AM",
    location: "Amsterdam, Netherlands",
  },
  {
    platform: "ChatGPT",
    pagePath: "/docs/tutorials",
    timestamp: "11 Jun, 9AM",
    location: "Portland, OR",
  },
];

const AISessionsTable = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(AI_PLATFORMS);
  
  const filteredSessions = sessionsData.filter(session => 
    selectedPlatforms.includes(session.platform)
  );
  const displayedSessions = showAll ? filteredSessions : filteredSessions.slice(0, 8);

  return (
    <Card className="animate-slide-up">
      <CardHeader className="space-y-4">
        <CardTitle>AI Platform Activity</CardTitle>
        <ToggleGroup 
          type="multiple" 
          value={selectedPlatforms}
          onValueChange={(value) => {
            if (value.length > 0) {
              setSelectedPlatforms(value);
            }
          }}
          className="justify-start flex-wrap"
        >
          {AI_PLATFORMS.map((platform) => (
            <ToggleGroupItem 
              key={platform} 
              value={platform}
              aria-label={`Toggle ${platform}`}
              className="gap-2"
            >
              <AIPlatformIcon platform={platform} className="w-4 h-4" />
              {platform}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4 font-medium text-muted-foreground">Platform</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Page Path</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Timestamp</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Location</th>
              </tr>
            </thead>
            <tbody>
              {displayedSessions.map((session, index) => (
                <tr key={index} className="border-b last:border-0 hover:bg-muted/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <AIPlatformIcon platform={session.platform} className="w-6 h-6" />
                      <span className="font-medium">{session.platform}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-success font-medium">{session.pagePath}</span>
                  </td>
                  <td className="p-4 text-muted-foreground">{session.timestamp}</td>
                  <td className="p-4 text-muted-foreground">{session.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredSessions.length > 0 ? (
          <div className="p-4 space-y-2">
            <p className="text-sm text-muted-foreground text-center">
              Showing {displayedSessions.length} of {filteredSessions.length} sessions
            </p>
            {filteredSessions.length > 8 && (
              <Button 
                onClick={() => setShowAll(!showAll)} 
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                {showAll ? "Show Less" : "View More"}
              </Button>
            )}
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            No sessions match the selected filters
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AISessionsTable;