import { Card, CardContent } from "@/components/ui/card";
import { Search, Sparkles, TrendingUp } from "lucide-react";

const WhyItMatters = () => {
  return (
    <section className="py-20 md:py-28 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Why ZenReports Matters</h2>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Search className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI Platforms Are the New Search Engines</span>
            </div>
          </div>
          
          <Card className="border-2">
            <CardContent className="p-8 space-y-6">
              <p className="text-lg text-muted-foreground">
                People now ask ChatGPT or Perplexity questions like:
              </p>
              
              <div className="grid gap-3">
                {[
                  "best ___ near me",
                  "where to buy ___",
                  "trusted ___ in my area"
                ].map((query, index) => (
                  <div 
                    key={index}
                    className="bg-muted/50 px-4 py-3 rounded-lg border border-border/50 text-sm font-mono"
                  >
                    "{query}"
                  </div>
                ))}
              </div>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                …and the recommendation often leads them straight to your website.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Sparkles,
                title: "Which pages get surfaced",
                description: "See exactly where AI platforms send visitors"
              },
              {
                icon: TrendingUp,
                title: "Which topics resonate",
                description: "Understand what content works best"
              },
              {
                icon: Search,
                title: "How AI talks about you",
                description: "Learn how platforms describe your business"
              }
            ].map((item, index) => (
              <Card key={index} className="hover-scale transition-all">
                <CardContent className="p-6 space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <p className="text-center text-lg font-medium text-foreground">
            ZenReports shows you when that happens, so you can understand your AI-driven traffic.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyItMatters;
