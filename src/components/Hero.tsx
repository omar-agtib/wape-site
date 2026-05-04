import dashboardMockup from "@/assets/dashboard-mockup.png";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative bg-hero min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-28 pb-16 lg:pt-32 lg:pb-24 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground/80 text-sm animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live in Construction · One integrated platform
            </div>

            <h1
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient-hero animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              WAPE is transforming construction operations
            </h1>

            <p
              className="text-lg text-primary-foreground/75 max-w-lg animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Work Accurately, Proactively and Efficiently. One integrated
              platform unifying planning, site management, quality and cost
              control — built today for construction, designed to scale tomorrow
              across asset-intensive industries.
            </p>

            <div
              className="space-y-2 animate-fade-up"
              style={{ animationDelay: "0.25s" }}
            >
              {[
                "Today: focused on construction (BTP)",
                "Tomorrow: multi-industry SaaS platform",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-2 text-primary-foreground/70 text-sm"
                >
                  <CheckCircle2 size={15} className="text-accent" /> {t}
                </div>
              ))}
            </div>

            <div
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                to="/book-a-demo"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent-gradient text-accent-foreground font-semibold shadow-orange hover:brightness-110 transition text-base"
              >
                Book a Demo <ArrowRight size={18} />
              </Link>
              <Link
                to="/solutions/platform"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-primary-foreground/25 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition text-base"
              >
                <Play size={16} /> Discover the Platform
              </Link>
            </div>
          </div>

          <div
            className="animate-fade-up lg:animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-accent/10 rounded-2xl blur-2xl" />
              <img
                src={dashboardMockup}
                alt="WAPE construction operations dashboard"
                className="relative rounded-xl shadow-elevated border border-primary-foreground/10 animate-float"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
