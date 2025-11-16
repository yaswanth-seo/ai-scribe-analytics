import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "ChatGPT", value: 1245, color: "hsl(var(--chart-ai))" },
  { name: "Claude", value: 892, color: "hsl(var(--chart-organic-social))" },
  { name: "Perplexity", value: 734, color: "hsl(var(--chart-organic-search))" },
  { name: "Gemini", value: 567, color: "hsl(var(--chart-referral))" },
  { name: "Others", value: 409, color: "hsl(var(--chart-other))" },
];

const AIPlatformsBreakdown = () => {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>AI Platforms Breakdown</CardTitle>
        <CardDescription>
          Traffic distribution across AI chat platforms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "var(--radius)",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-6 space-y-3">
          {data.map((platform) => (
            <div key={platform.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: platform.color }}
                />
                <span className="text-sm font-medium">{platform.name}</span>
              </div>
              <div className="text-sm font-semibold">{platform.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIPlatformsBreakdown;
