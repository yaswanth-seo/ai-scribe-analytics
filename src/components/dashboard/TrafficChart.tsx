import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const generateMockData = (days: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      chatgpt: Math.floor(150 + Math.random() * 300),
      gemini: Math.floor(100 + Math.random() * 200),
      claude: Math.floor(80 + Math.random() * 150),
      copilot: Math.floor(60 + Math.random() * 120),
      perplexity: Math.floor(40 + Math.random() * 100),
      other: Math.floor(50 + Math.random() * 100),
    });
  }
  return data;
};

interface TrafficChartProps {
  dateRange: string;
}

const TrafficChart = ({ dateRange }: TrafficChartProps) => {
  const days = dateRange === "7d" ? 7 : dateRange === "30d" ? 30 : 90;
  const data = generateMockData(days);
  const [visiblePlatforms, setVisiblePlatforms] = useState<string[]>(["chatgpt"]);

  const togglePlatform = (platform: string) => {
    setVisiblePlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <Card className="animate-slide-up shadow-glow">
      <CardHeader>
        <CardTitle>AI Platform Traffic Trends</CardTitle>
        <CardDescription>
          Visitor trends across different AI platforms over time
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          <ToggleGroup type="multiple" value={visiblePlatforms} onValueChange={setVisiblePlatforms}>
            <ToggleGroupItem value="chatgpt" className="data-[state=on]:bg-[hsl(var(--chart-chatgpt))] data-[state=on]:text-white">
              ChatGPT
            </ToggleGroupItem>
            <ToggleGroupItem value="gemini" className="data-[state=on]:bg-[hsl(var(--chart-gemini))] data-[state=on]:text-white">
              Gemini
            </ToggleGroupItem>
            <ToggleGroupItem value="claude" className="data-[state=on]:bg-[hsl(var(--chart-claude))] data-[state=on]:text-white">
              Claude
            </ToggleGroupItem>
            <ToggleGroupItem value="copilot" className="data-[state=on]:bg-[hsl(var(--chart-copilot))] data-[state=on]:text-white">
              Copilot
            </ToggleGroupItem>
            <ToggleGroupItem value="perplexity" className="data-[state=on]:bg-[hsl(var(--chart-perplexity))] data-[state=on]:text-white">
              Perplexity
            </ToggleGroupItem>
            <ToggleGroupItem value="other" className="data-[state=on]:bg-[hsl(var(--chart-other))] data-[state=on]:text-white">
              Other AI
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="date" 
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis 
              className="text-xs"
              tick={{ fill: "hsl(var(--muted-foreground))" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
            <Legend />
            {visiblePlatforms.includes("chatgpt") && (
              <Line
                type="monotone"
                dataKey="chatgpt"
                stroke="hsl(var(--chart-chatgpt))"
                strokeWidth={3}
                name="ChatGPT"
                dot={false}
              />
            )}
            {visiblePlatforms.includes("gemini") && (
              <Line
                type="monotone"
                dataKey="gemini"
                stroke="hsl(var(--chart-gemini))"
                strokeWidth={3}
                name="Gemini"
                dot={false}
              />
            )}
            {visiblePlatforms.includes("claude") && (
              <Line
                type="monotone"
                dataKey="claude"
                stroke="hsl(var(--chart-claude))"
                strokeWidth={3}
                name="Claude"
                dot={false}
              />
            )}
            {visiblePlatforms.includes("copilot") && (
              <Line
                type="monotone"
                dataKey="copilot"
                stroke="hsl(var(--chart-copilot))"
                strokeWidth={3}
                name="Copilot"
                dot={false}
              />
            )}
            {visiblePlatforms.includes("perplexity") && (
              <Line
                type="monotone"
                dataKey="perplexity"
                stroke="hsl(var(--chart-perplexity))"
                strokeWidth={3}
                name="Perplexity"
                dot={false}
              />
            )}
            {visiblePlatforms.includes("other") && (
              <Line
                type="monotone"
                dataKey="other"
                stroke="hsl(var(--chart-other))"
                strokeWidth={1.5}
                name="Other AI"
                dot={false}
                opacity={0.5}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;
