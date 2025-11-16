import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AIPlatformIcon from "./AIPlatformIcon";

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
];

const AISessionsTable = () => {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>AI Platform Activity</CardTitle>
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
              {sessionsData.map((session, index) => (
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
        <div className="p-4">
          <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
            View More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AISessionsTable;