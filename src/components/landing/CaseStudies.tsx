import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

const caseStudies = [
  {
    name: "Maria Fernandes",
    business: "Blueberry Lane Bakery",
    location: "Austin",
    initials: "MF",
    platform: "ChatGPT",
    insight: "After connecting GA4, Maria noticed visitors arriving from ChatGPT through queries like:",
    queries: [
      "best handmade cakes nearby",
      "custom birthday cakes Austin",
      "affordable bakeries open late"
    ],
    result: "ChatGPT added her bakery in multiple local recommendations."
  },
  {
    name: "Trevor Miles",
    business: "Paws & Shine Mobile Grooming",
    location: "Denver",
    initials: "TM",
    platform: "Perplexity",
    insight: "ZenReports showed Trevor Perplexity visitors who searched:",
    queries: [
      "mobile groomer for small breeds",
      "dog grooming at home Denver",
      "gentle handling groomers"
    ],
    result: "His booking page was the most visited from AI-driven traffic."
  },
  {
    name: "Dr. Aditi Mehra",
    business: "RestorePlus Physiotherapy",
    location: "Toronto",
    initials: "AM",
    platform: "Gemini",
    insight: "Aditi found Gemini-based visitors landing on her site after prompts like:",
    queries: [
      "best back pain physio near me",
      "sports injury rehab Toronto",
      "physiotherapist open today"
    ],
    result: "Gemini often surfaced her clinic as a top-rated option."
  },
  {
    name: "Kevin Schultz",
    business: "CleanNest Home Services",
    location: "Chicago",
    initials: "KS",
    platform: "Claude",
    insight: "ZenReports revealed Claude traffic tied to searches such as:",
    queries: [
      "move-out deep clean cost",
      "trusted apartment cleaners",
      "same-day home cleaning Chicago"
    ],
    result: "Users mostly landed on his pricing estimator page."
  },
  {
    name: "Sarah Collins",
    business: "Collins Guitar Studio",
    location: "Manchester (UK)",
    initials: "SC",
    platform: "ChatGPT",
    insight: "Sarah observed ChatGPT visitors with prompts like:",
    queries: [
      "adult beginner guitar teachers",
      "one-on-one guitar lessons near me",
      "learn acoustic guitar fast"
    ],
    result: "Most sessions were hitting her 'Trial Lesson Booking' page."
  }
];

const CaseStudies = () => {
  return (
    <section className="py-20 md:py-28 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold">Real Businesses Using ZenReports</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how local businesses are leveraging AI platform insights to understand their visitors better
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <Card 
              key={index} 
              className="hover-scale transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {study.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{study.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{study.business}</p>
                    <p className="text-xs text-muted-foreground">{study.location}</p>
                  </div>
                  <Badge variant="outline" className="shrink-0">{study.platform}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="relative">
                  <Quote className="h-4 w-4 text-primary/30 absolute -top-2 -left-2" />
                  <p className="text-sm text-muted-foreground italic pl-4">{study.insight}</p>
                </div>
                
                <div className="space-y-2">
                  {study.queries.map((query, qIndex) => (
                    <div 
                      key={qIndex} 
                      className="text-xs bg-muted/50 px-3 py-2 rounded-md border border-border/50"
                    >
                      "{query}"
                    </div>
                  ))}
                </div>
                
                <p className="text-sm font-medium text-foreground pt-2">{study.result}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
