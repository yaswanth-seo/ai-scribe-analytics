import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, CheckCircle2, XCircle } from "lucide-react";

const KeywordsNote = () => {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <Alert className="max-w-5xl mx-auto border-2 animate-fade-in">
          <Info className="h-5 w-5" />
          <AlertTitle className="text-xl font-bold mb-4">
            Important Note on Search Queries / Keywords
          </AlertTitle>
          <AlertDescription className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>ZenReports provides:</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Accurate LLM traffic breakdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>Page paths, timestamps, and locations</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                  <span>We do NOT:</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span>Fetch or scrape user search queries from LLMs</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-4 border-t space-y-3">
              <h4 className="font-semibold text-sm text-foreground">How do we show example keywords then?</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These keyword insights come from business owners who directly ask their own clients what they searched for before ChatGPT/Gemini recommended them. We simply encourage users to document this manually for deeper context — ZenReports itself never collects or displays private prompt history.
              </p>
              <p className="text-sm font-medium text-foreground pt-2">
                This ensures full privacy, transparency, and ethical data usage.
              </p>
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </section>
  );
};

export default KeywordsNote;
