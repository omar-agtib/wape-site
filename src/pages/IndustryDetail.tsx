import { useParams, Link, Navigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import {
  Building2,
  Truck,
  Factory,
  Zap,
  CheckCircle2,
  Lock,
  Bell,
} from "lucide-react";

type Status = "active" | "soon";

const data: Record<
  string,
  {
    icon: any;
    title: string;
    tagline: string;
    status: Status;
    problems: string[];
    solutions: string[];
  }
> = {
  construction: {
    icon: Building2,
    status: "active",
    title: "Construction (BTP)",
    tagline: "Digitize every site, from ground breaking to handover.",
    problems: [
      "Schedule slippage and lack of real-time site visibility",
      "Cost overruns due to disconnected budget tracking",
      "Manual quality and safety inspections",
      "Document versioning chaos between site and office",
    ],
    solutions: [
      "Live site progress dashboards and mobile reporting",
      "Integrated budget vs. actual with forecast at completion",
      "Digital QHSE inspections, NCRs and corrective actions",
      "Single source of truth for plans, contracts and certificates",
    ],
  },
  logistics: {
    icon: Truck,
    status: "soon",
    title: "Logistics",
    tagline: "On our roadmap — not yet available.",
    problems: [
      "Limited visibility across warehouses and routes",
      "Manual stock and equipment reconciliation",
      "Slow incident reporting and resolution",
    ],
    solutions: [
      "Real-time fleet and warehouse dashboards (planned)",
      "Automated stock and asset tracking (planned)",
      "Mobile incident capture with workflow routing (planned)",
    ],
  },
  manufacturing: {
    icon: Factory,
    status: "soon",
    title: "Manufacturing",
    tagline: "On our roadmap — not yet available.",
    problems: [
      "Production data trapped in spreadsheets",
      "Reactive instead of preventive maintenance",
      "Quality issues detected too late",
    ],
    solutions: [
      "Live production and OEE dashboards (planned)",
      "Preventive maintenance scheduling (planned)",
      "Inline quality controls and SPC (planned)",
    ],
  },
  energy: {
    icon: Zap,
    status: "soon",
    title: "Energy",
    tagline: "On our roadmap — not yet available.",
    problems: [
      "Multi-site, multi-contractor coordination",
      "Strict compliance and traceability requirements",
      "ESG and CO₂ reporting pressure",
    ],
    solutions: [
      "Unified program and project portfolio management (planned)",
      "Built-in compliance, audit trail and certifications (planned)",
      "ESG and carbon footprint dashboards (planned)",
    ],
  },
};

const IndustryDetail = () => {
  const { slug = "" } = useParams();
  const entry = data[slug];
  if (!entry) return <Navigate to="/industries" replace />;
  const Icon = entry.icon;
  const isSoon = entry.status === "soon";

  return (
    <>
      <PageHero
        eyebrow={isSoon ? "Coming soon · Roadmap preview" : "Industry · Active"}
        title={entry.title}
        subtitle={entry.tagline}
      />

      {isSoon && (
        <section className="px-6 pt-10">
          <div className="max-w-4xl mx-auto bg-muted/60 border border-border rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center shrink-0 border border-border">
              <Lock className="text-muted-foreground" size={18} />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">
                Not yet available
              </h3>
              <p className="text-sm text-muted-foreground">
                WAPE is currently focused on construction. This page previews
                how our integrated platform will extend to{" "}
                {entry.title.toLowerCase()} — based on the same data model and
                field UX.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Challenges
            </div>
            <h2 className="font-display text-2xl font-bold text-foreground mb-5">
              What teams are facing
            </h2>
            <ul className="space-y-3">
              {entry.problems.map((p) => (
                <li key={p} className="flex gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-deep-blue text-primary-foreground rounded-2xl p-8 shadow-elevated">
            <Icon className="text-accent mb-4" size={32} />
            <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              {isSoon ? "Planned approach" : "WAPE solution"}
            </div>
            <h2 className="font-display text-2xl font-bold mb-5">
              {isSoon ? "How we will solve it" : "How we solve it"}
            </h2>
            <ul className="space-y-3">
              {entry.solutions.map((s) => (
                <li key={s} className="flex gap-3 text-primary-foreground/85">
                  <CheckCircle2
                    className="text-accent shrink-0 mt-0.5"
                    size={18}
                  />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-12">
          {isSoon ? (
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent-gradient text-accent-foreground font-semibold shadow-orange hover:brightness-110 transition"
            >
              <Bell size={16} /> Get notified when available
            </Link>
          ) : (
            <Link
              to="/book-a-demo"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent-gradient text-accent-foreground font-semibold shadow-orange hover:brightness-110 transition"
            >
              Book a tailored demo
            </Link>
          )}
        </div>
      </section>
    </>
  );
};

export default IndustryDetail;
