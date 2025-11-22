import { Card } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

const DashboardPreview = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">Dashboard Preview</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A clean, lightweight dashboard showing LLM sources, traffic trends, page paths, and session activity — all without touching your website code.
          </p>
        </div>
        
        <Card className="overflow-hidden max-w-6xl mx-auto shadow-2xl border-2 animate-scale-in">
          <div className="aspect-video bg-gradient-to-br from-accent/20 via-background to-accent/10 flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <div className="h-20 w-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <BarChart3 className="h-10 w-10 text-primary" />
              </div>
              <p className="text-muted-foreground text-sm">Dashboard screenshot placeholder</p>
              <p className="text-xs text-muted-foreground max-w-md">
                Your actual dashboard will display real-time AI platform traffic data, trends, and insights
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default DashboardPreview;
