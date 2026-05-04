import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Building2, Layers, Activity, Cloud, Smile } from "lucide-react";

const advantages = [
  {
    icon: Building2,
    title: "Built for Construction",
    desc: "Every feature designed specifically for BTP workflows and challenges.",
  },
  {
    icon: Layers,
    title: "ERP + Quality + Monitoring",
    desc: "Combines enterprise resource planning with quality management and site monitoring.",
  },
  {
    icon: Activity,
    title: "Real-time Dashboards & KPIs",
    desc: "Live analytics and key performance indicators across every project.",
  },
  {
    icon: Cloud,
    title: "Scalable & Cloud-based",
    desc: "Grow without limits — accessible anywhere, anytime, on any device.",
  },
  {
    icon: Smile,
    title: "User-friendly Interface",
    desc: "Intuitive design that teams adopt quickly without extensive training.",
  },
];

const WhyChoose = () => {
  const ref = useScrollAnimation();

  return (
    <section id="why-wape" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - big number highlights */}
          <div className="animate-on-scroll">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Why Choose WAPE
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              The Competitive Edge Your Construction Business Needs
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              WAPE is not just another ERP. It's the only platform that unifies
              project management, quality control, and site monitoring in one
              solution tailored for construction.
            </p>

            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "6", label: "Integrated Modules" },
                { num: "24/7", label: "Cloud Access" },
                { num: "100%", label: "BTP Focused" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-accent">
                    {s.num}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - advantage cards */}
          <div className="space-y-4 stagger-children animate-on-scroll">
            {advantages.map((a) => (
              <div
                key={a.title}
                className="flex items-start gap-4 p-5 rounded-xl bg-card shadow-card border border-border hover:shadow-elevated hover:border-accent/20 transition-all duration-300"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center">
                  <a.icon className="text-accent" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground">
                    {a.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
