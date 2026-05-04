import { Link } from "react-router-dom";
import { Building2, Truck, Factory, Zap, ArrowRight, Lock } from "lucide-react";

const industries = [
  {
    icon: Building2,
    title: "Construction (BTP)",
    desc: "Civil works, building, infrastructure.",
    to: "/industries/construction",
    status: "active" as const,
  },
  {
    icon: Truck,
    title: "Logistics",
    desc: "Warehousing, fleet, distribution.",
    to: "/industries/logistics",
    status: "soon" as const,
  },
  {
    icon: Factory,
    title: "Manufacturing",
    desc: "Production sites and supply chain.",
    to: "/industries/manufacturing",
    status: "soon" as const,
  },
  {
    icon: Zap,
    title: "Energy",
    desc: "Renewables, utilities, EPC contractors.",
    to: "/industries/energy",
    status: "soon" as const,
  },
];

const IndustriesGrid = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Industries
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Construction today — more sectors coming
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((it) => {
            const isSoon = it.status === "soon";
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`group relative bg-card border rounded-xl p-6 transition-all duration-300 ${
                  isSoon
                    ? "border-border/60 hover:border-border"
                    : "border-border hover:border-accent/40 hover:shadow-elevated"
                }`}
              >
                {isSoon && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">
                    <Lock size={10} /> Soon
                  </span>
                )}
                {!isSoon && (
                  <span className="absolute top-3 right-3 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{" "}
                    Active
                  </span>
                )}
                <it.icon
                  className={`mb-4 transition ${isSoon ? "text-muted-foreground" : "text-deep-blue group-hover:text-accent"}`}
                  size={28}
                />
                <h3
                  className={`font-display font-semibold mb-1.5 ${isSoon ? "text-muted-foreground" : "text-foreground"}`}
                >
                  {it.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{it.desc}</p>
                {!isSoon ? (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                    Discover <ArrowRight size={14} />
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground italic">
                    Roadmap preview
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustriesGrid;
