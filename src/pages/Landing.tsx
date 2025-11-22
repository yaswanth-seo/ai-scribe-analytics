import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import DashboardPreview from "@/components/landing/DashboardPreview";
import CaseStudies from "@/components/landing/CaseStudies";
import KeywordsNote from "@/components/landing/KeywordsNote";
import WhyItMatters from "@/components/landing/WhyItMatters";
import Differentiators from "@/components/landing/Differentiators";
import FinalCTA from "@/components/landing/FinalCTA";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <DashboardPreview />
      <CaseStudies />
      <KeywordsNote />
      <WhyItMatters />
      <Differentiators />
      <FinalCTA />
    </div>
  );
};

export default Landing;
