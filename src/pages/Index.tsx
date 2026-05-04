import Hero from "@/components/Hero";
import CurrentFocus from "@/components/home/CurrentFocus";
import ProblemsWeSolve from "@/components/home/ProblemsWeSolve";
import SolutionsCards from "@/components/home/SolutionsCards";
import KpiSection from "@/components/home/KpiSection";
import OurVision from "@/components/home/OurVision";
import IndustriesGrid from "@/components/home/IndustriesGrid";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";

const Index = () => {
  return (
    <>
      <Hero />
      <CurrentFocus />
      <ProblemsWeSolve />
      <SolutionsCards />
      <KpiSection />
      <OurVision />
      <IndustriesGrid />
      <WhyChoose />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default Index;
