import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
      ai: Math.floor(100 + Math.random() * 200),
      organicSearch: Math.floor(300 + Math.random() * 400),
      organicSocial: Math.floor(150 + Math.random() * 250),
      referral: Math.floor(50 + Math.random() * 150),
      direct: Math.floor(100 + Math.random() * 200),
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

  return (
    <Card className="animate-slide-up shadow-glow">
      <CardHeader>
        <CardTitle>Traffic Overview</CardTitle>
        <CardDescription>
          Session breakdown by traffic source over time
        </CardDescription>
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
            <Line
              type="monotone"
              dataKey="ai"
              stroke="hsl(var(--chart-ai))"
              strokeWidth={2}
              name="AI Chats"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="organicSearch"
              stroke="hsl(var(--chart-organic-search))"
              strokeWidth={2}
              name="Organic Search"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="organicSocial"
              stroke="hsl(var(--chart-organic-social))"
              strokeWidth={2}
              name="Organic Social"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="referral"
              stroke="hsl(var(--chart-referral))"
              strokeWidth={2}
              name="Referral"
              dot={false}
            />
            <Line
              type="monotone"
              dataKey="direct"
              stroke="hsl(var(--chart-direct))"
              strokeWidth={2}
              name="Direct"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrafficChart;
