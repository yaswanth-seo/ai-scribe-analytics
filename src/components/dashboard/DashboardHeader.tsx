import { Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DashboardHeaderProps {
  dateRange: string;
  onDateRangeChange: (value: string) => void;
  selectedProperty: string;
  onPropertyChange: (value: string) => void;
}

const DashboardHeader = ({
  dateRange,
  onDateRangeChange,
  selectedProperty,
  onPropertyChange,
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-slide-up">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          LLM Traffic Analytics
        </h1>
        <p className="text-muted-foreground mt-1">
          Track AI chatbot referrals and organic traffic
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={selectedProperty} onValueChange={onPropertyChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="example.com">example.com</SelectItem>
            <SelectItem value="demo.app">demo.app</SelectItem>
            <SelectItem value="test.io">test.io</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={onDateRangeChange}>
          <SelectTrigger className="w-[140px]">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="gap-2">
          Connect GA4
          <ChevronDown className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
