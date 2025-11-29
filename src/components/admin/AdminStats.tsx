import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, UserX, Database, TrendingUp, TrendingDown } from "lucide-react";

interface AdminStatsProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    suspendedUsers: number;
    totalProperties: number;
    activeProperties: number;
    usersTrend: number;
    propertiesTrend: number;
  };
}

const AdminStats = ({ stats }: AdminStatsProps) => {
  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      trend: stats.usersTrend,
      description: "All registered users",
    },
    {
      title: "Active Users",
      value: stats.activeUsers,
      icon: UserCheck,
      description: "Currently active",
      className: "text-success",
    },
    {
      title: "Suspended",
      value: stats.suspendedUsers,
      icon: UserX,
      description: "Suspended accounts",
      className: "text-destructive",
    },
    {
      title: "Properties",
      value: stats.totalProperties,
      icon: Database,
      trend: stats.propertiesTrend,
      description: `${stats.activeProperties} active`,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((stat) => (
        <Card key={stat.title} className="border-border/50">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.className || "text-muted-foreground"}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              {stat.trend !== undefined && (
                <span className={`flex items-center text-xs ${stat.trend >= 0 ? "text-success" : "text-destructive"}`}>
                  {stat.trend >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {Math.abs(stat.trend)}%
                </span>
              )}
              <span className="text-xs text-muted-foreground">{stat.description}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
