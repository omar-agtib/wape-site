import PageHero from "@/components/PageHero";
import { Link } from "react-router-dom";
import {
  Package,
  HardHat,
  ShieldCheck,
  ClipboardCheck,
  Wallet,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

const modules = [
  {
    slug: "site-management",
    icon: HardHat,
    title: "Site Management",
    desc: "Live progress, daily reports, photos, snags.",
  },
  {
    slug: "planning",
    icon: ClipboardCheck,
    title: "Planning & Time Tracking",
    desc: "Schedules, attendance, productivity by trade.",
  },
  {
    slug: "quality",
    icon: ShieldCheck,
    title: "Quality & Non-Conformity",
    desc: "Inspections, NCRs, corrective actions.",
  },
  {
    slug: "budget",
    icon: Wallet,
    title: "Budget & Cost Control",
    desc: "Commitments, actuals, forecast at completion.",
  },
];

const Solutions = () => {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="One integrated platform for construction operations"
        subtitle="Today, WAPE delivers a single all-in-one solution. Tomorrow, the same modular architecture will power dedicated solutions across multiple industries."
      />

      {/* Hero product */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <Link to="/solutions/platform" className="block group">
            <div className="bg-deep-blue text-primary-foreground rounded-3xl p-10 lg:p-14 shadow-elevated relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
              <div className="relative grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />{" "}
                    Available now
                  </span>
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    The WAPE Platform
                  </h2>
                  <p className="text-primary-foreground/75 text-lg max-w-2xl mb-6">
                    A single all-in-one solution unifying planning, site
                    management, quality, non-conformity and cost control —
                    designed and built specifically for construction.
                  </p>
                  <span className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-gradient text-accent-foreground font-semibold shadow-orange group-hover:brightness-110 transition">
                    <Package size={16} /> Explore the platform{" "}
                    <ArrowRight size={16} />
                  </span>
                </div>
                <div className="hidden lg:flex items-center justify-center">
                  <div className="w-32 h-32 rounded-3xl bg-accent-gradient flex items-center justify-center shadow-orange">
                    <Layers className="text-accent-foreground" size={56} />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Modules */}
      <section className="section-padding bg-secondary/40 pt-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Modules
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              What's inside the platform
            </h2>
            <p className="text-muted-foreground mt-3">
              Each module shares the same data model — you can start with one,
              expand at your pace.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {modules.map((s) => (
              <Link
                key={s.slug}
                to={`/solutions/${s.slug}`}
                className="group bg-card border border-border rounded-2xl p-7 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center shrink-0 shadow-orange">
                  <s.icon className="text-accent-foreground" size={22} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-foreground mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                    {s.desc}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                    See features <ArrowRight size={15} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Future */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto bg-card border border-dashed border-border rounded-2xl p-10 text-center">
          <Sparkles className="mx-auto text-accent mb-4" size={28} />
          <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
            Roadmap
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-3">
            More solutions, more industries
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our modular architecture is designed to host dedicated solutions for
            logistics, manufacturing and energy — leveraging the same
            field-grade UX and integrated data model.
          </p>
        </div>
      </section>
    </>
  );
};

export default Solutions;
