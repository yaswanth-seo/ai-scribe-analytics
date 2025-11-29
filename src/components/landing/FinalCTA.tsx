import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Play } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-accent/10 to-primary/5 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-8 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            See Your AI Traffic in Seconds — It's Free.
          </h2>
          
          <div className="space-y-3 text-lg text-muted-foreground">
            {[
              "Understand how AI platforms talk about your brand.",
              "See the pages users land on.",
              "Spot insights you can't get anywhere else.",
            ].map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link to="/auth">
              <Button size="lg" className="text-lg px-10 hover-scale group">
                Connect GA4
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="text-lg px-8 gap-2">
                <Play className="h-4 w-4" />
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0%,transparent_65%)]" />
    </section>
  );
};

export default FinalCTA;