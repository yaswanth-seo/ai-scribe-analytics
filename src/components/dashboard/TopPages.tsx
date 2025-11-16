import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink, TrendingUp } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const pagesData = [
  {
    path: "/blog/ai-integration-guide",
    sessions: 3847,
    aiTraffic: 892,
    aiPercentage: 23.2,
    change: 15.8,
  },
  {
    path: "/products/api-documentation",
    sessions: 2934,
    aiTraffic: 734,
    aiPercentage: 25.0,
    change: 22.4,
  },
  {
    path: "/resources/tutorials",
    sessions: 2456,
    aiTraffic: 589,
    aiPercentage: 24.0,
    change: 12.3,
  },
  {
    path: "/pricing",
    sessions: 1923,
    aiTraffic: 421,
    aiPercentage: 21.9,
    change: 8.7,
  },
  {
    path: "/about",
    sessions: 1645,
    aiTraffic: 298,
    aiPercentage: 18.1,
    change: -2.3,
  },
];

const TopPages = () => {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>Top Pages</CardTitle>
        <CardDescription>
          Most visited pages with AI traffic breakdown
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Page Path</TableHead>
              <TableHead className="text-right">Sessions</TableHead>
              <TableHead className="text-right">AI Traffic</TableHead>
              <TableHead className="text-right">AI %</TableHead>
              <TableHead className="text-right">Change</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagesData.map((page, index) => (
              <TableRow key={page.path} className="transition-smooth hover:bg-muted/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className="truncate max-w-xs">{page.path}</span>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" />
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  {page.sessions.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-accent font-semibold">
                    {page.aiTraffic.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    {page.aiPercentage}%
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                      page.change > 0 ? "text-success" : "text-destructive"
                    }`}
                  >
                    <TrendingUp
                      className={`w-3 h-3 ${page.change < 0 ? "rotate-180" : ""}`}
                    />
                    {Math.abs(page.change)}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopPages;
