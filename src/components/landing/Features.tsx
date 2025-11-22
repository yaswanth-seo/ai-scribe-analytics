import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, TrendingUp, MapPin, Clock, Filter, MessageSquare } from "lucide-react";

const features = [
  {
    icon: CheckCircle,
    title: "Total traffic from each LLM",
    description: "ChatGPT, Gemini, Claude, Perplexity, Copilot, and You.com"
  },
  {
    icon: TrendingUp,
    title: "Daily, weekly, and 30-day growth trends",
    description: "Track your AI platform visibility over time"
  },
  {
    icon: Filter,
    title: "Top landing pages visited by LLM users",
    description: "See which pages AI platforms recommend most"
  },
  {
    icon: MapPin,
    title: "Locations + timestamps",
    description: "Understand where and when visitors arrive from AI"
  },
  {
    icon: Clock,
    title: "Clean, auto-grouped insights",
    description: "No filters needed — everything organized for you"
  },
  {
    icon: MessageSquare,
    title: "Optional keyword insights",
    description: "Through client discussions and feedback"
  }
];

const Features = () => {
  return (
    <section className="py-20 md:py-28 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">
            Simple, Clear LLM Traffic Analytics
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            GA4 doesn't accurately show AI platform traffic. ZenReports organizes everything for you — instantly.
          </p>
        </div>
        
        <div className="text-lg font-medium mb-8 text-foreground">You'll see:</div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="hover-scale transition-all duration-300 animate-fade-in border-border/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6 space-y-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
