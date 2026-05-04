import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CallToAction = () => {
  const ref = useScrollAnimation();

  return (
    <section id="cta" className="section-padding bg-background" ref={ref}>
      <div className="max-w-4xl mx-auto animate-on-scroll">
        <div className="relative rounded-2xl bg-hero p-12 md:p-16 text-center overflow-hidden">
          {/* Glow effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky/10 rounded-full blur-3xl" />

          <div className="relative">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gradient-hero mb-6">
              Ready to Digitize Your Construction Projects?
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
              Join hundreds of construction companies already transforming their
              operations with WAPE. Get started with a free personalized demo.
            </p>
            <Link
              to="/book-a-demo"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-accent-gradient text-accent-foreground font-bold text-lg shadow-orange hover:brightness-110 transition"
            >
              Book a Demo
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
