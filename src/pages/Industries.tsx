import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import { Building2, Truck, Factory, Zap, ArrowRight, Lock } from "lucide-react";

const industries = [
  {
    slug: "construction",
    icon: Building2,
    title: "Construction (BTP)",
    desc: "Civil engineering, building, infrastructure and large-scale projects.",
    status: "active" as const,
  },
  {
    slug: "logistics",
    icon: Truck,
    title: "Logistics",
    desc: "Warehousing, fleet management and last-mile distribution.",
    status: "soon" as const,
  },
  {
    slug: "manufacturing",
    icon: Factory,
    title: "Manufacturing",
    desc: "Production sites, supply chain and industrial operations.",
    status: "soon" as const,
  },
  {
    slug: "energy",
    icon: Zap,
    title: "Energy",
    desc: "Renewables, utilities and EPC contractors.",
    status: "soon" as const,
  },
];

const Industries = () => {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title="Built for construction today, scaling tomorrow"
        subtitle="WAPE is currently 100% focused on the construction industry. Our roadmap will progressively extend the same platform to other asset-intensive sectors."
      />
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
          {industries.map((i) => {
            const isSoon = i.status === "soon";
            return (
              <Link
                key={i.slug}
                to={`/industries/${i.slug}`}
                className={`group relative bg-card border rounded-2xl p-8 transition-all duration-300 flex gap-5 ${
                  isSoon
                    ? "border-border/60 hover:border-border"
                    : "border-border shadow-card hover:shadow-elevated hover:-translate-y-1"
                }`}
              >
                {isSoon ? (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground font-semibold">
                    <Lock size={11} /> Coming soon
                  </span>
                ) : (
                  <span className="absolute top-4 right-4 inline-flex items-center gap-1 text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
                    Active
                  </span>
                )}
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${
                    isSoon ? "bg-muted" : "bg-accent-gradient shadow-orange"
                  }`}
                >
                  <i.icon
                    className={
                      isSoon
                        ? "text-muted-foreground"
                        : "text-accent-foreground"
                    }
                    size={26}
                  />
                </div>
                <div>
                  <h3
                    className={`font-display font-semibold text-xl mb-2 ${isSoon ? "text-muted-foreground" : "text-foreground"}`}
                  >
                    {i.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {i.desc}
                  </p>
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-all ${
                      isSoon
                        ? "text-muted-foreground"
                        : "text-accent group-hover:gap-2.5"
                    }`}
                  >
                    {isSoon ? "Preview the roadmap" : "Discover the solution"}{" "}
                    <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Industries;
