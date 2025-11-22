import { Button } from "@/components/ui/button";
import { Sparkles, ShieldCheck } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background via-background to-accent/5 py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Traffic Analytics Made Simple</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            See Who's Visiting You From{" "}
            <span className="text-primary">ChatGPT</span>,{" "}
            <span className="text-primary">Gemini</span> & Other AI Platforms — Instantly.
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Connect your GA4 and unlock clean insights on how ChatGPT, Perplexity, Claude, Gemini, Copilot, and You.com users discover and visit your website.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button size="lg" className="text-lg px-8 hover-scale">
              Connect GA4
            </Button>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground pt-2">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span>Completely free. Zero scripts. Zero setup.</span>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Works with any website. Anonymous & privacy-first.
          </p>
        </div>
      </div>
      
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20" />
    </section>
  );
};

export default Hero;
