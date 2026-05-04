import { Compass, Truck, Factory, Zap, Sparkles } from "lucide-react";

const futureIndustries = [
  { icon: Truck, label: "Logistics" },
  { icon: Factory, label: "Manufacturing" },
  { icon: Zap, label: "Energy & Utilities" },
];

const OurVision = () => {
  return (
    <section className="section-padding bg-hero relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute -top-20 left-1/3 w-96 h-96 bg-accent/15 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-xs font-semibold uppercase tracking-wider mb-4">
          <Compass size={12} /> Our Vision
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-5">
          Tomorrow: a multi-industry operations platform
        </h2>
        <p className="text-primary-foreground/75 text-lg max-w-2xl mx-auto mb-12">
          Construction is our launchpad. The same data model and field-grade UX
          will gradually power asset-intensive industries that share the same
          operational DNA.
        </p>

        <div className="grid sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {futureIndustries.map((f) => (
            <div
              key={f.label}
              className="bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/15 rounded-xl p-6 hover:border-accent/40 transition group"
            >
              <f.icon
                className="mx-auto text-primary-foreground/60 group-hover:text-accent transition mb-3"
                size={26}
              />
              <div className="font-display font-semibold text-primary-foreground/90 mb-1.5">
                {f.label}
              </div>
              <div className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary-foreground/10 text-primary-foreground/60 font-semibold">
                <Sparkles size={10} /> Coming soon
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurVision;
