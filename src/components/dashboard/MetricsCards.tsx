import { TrendingUp, Users, Zap, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const metrics = [
  {
    title: "Total Sessions",
    value: "24,563",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "text-primary",
  },
  {
    title: "AI Traffic",
    value: "3,847",
    change: "+24.8%",
    trend: "up",
    icon: Zap,
    color: "text-accent",
    badge: "15.7%",
  },
  {
    title: "Organic Search",
    value: "12,429",
    change: "+8.3%",
    trend: "up",
    icon: Target,
    color: "text-success",
  },
  {
    title: "Growth Rate",
    value: "18.2%",
    change: "+3.1%",
    trend: "up",
    icon: TrendingUp,
    color: "text-primary",
  },
];

const MetricsCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <Card
            key={metric.title}
            className="transition-smooth hover:shadow-glow hover:-translate-y-1"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <Icon className={`w-4 h-4 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-success flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {metric.change} from last period
                  </p>
                </div>
                {metric.badge && (
                  <div className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    {metric.badge}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsCards;
