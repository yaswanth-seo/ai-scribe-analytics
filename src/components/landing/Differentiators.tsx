import { Card, CardContent } from "@/components/ui/card";
import { Zap, BarChart3, DollarSign, ShieldCheck } from "lucide-react";

const differentiators = [
  {
    icon: Zap,
    title: "One-click GA4 connection",
    description: "No scripts. No tracking tags. No installation."
  },
  {
    icon: BarChart3,
    title: "Clean, human-friendly reporting",
    description: "Built for business owners, agencies, and marketers."
  },
  {
    icon: DollarSign,
    title: "100% Free",
    description: "Unlimited properties. Unlimited insights."
  },
  {
    icon: ShieldCheck,
    title: "Privacy-first",
    description: "We never touch your website visitors' prompt history."
  }
];

const Differentiators = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">What Makes ZenReports Different</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {differentiators.map((item, index) => (
            <Card 
              key={index} 
              className="hover-scale transition-all duration-300 border-2 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 space-y-4">
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentiators;
