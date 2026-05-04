import { useParams, Link, Navigate } from "react-router-dom";
import PageHero from "@/components/PageHero";
import {
  HardHat,
  ShieldCheck,
  Wallet,
  ClipboardCheck,
  Package,
  CheckCircle2,
} from "lucide-react";
import dashboardMockup from "@/assets/dashboard-mockup.png";

const data: Record<
  string,
  {
    icon: any;
    title: string;
    tagline: string;
    features: string[];
    benefits: string[];
  }
> = {
  platform: {
    icon: Package,
    title: "WAPE Platform — All-in-one",
    tagline:
      "One integrated solution unifying every operational module for construction.",
    features: [
      "Planning, site management, quality, non-conformity and cost control",
      "Mobile-first UX designed for the field",
      "Single shared data model across all modules",
      "Role-based dashboards: site, project, executive",
      "Audit trail and document traceability",
    ],
    benefits: [
      "Replace 5+ tools with a single source of truth",
      "Faster onboarding thanks to a unified UX",
      "Decisions based on real-time, end-to-end data",
    ],
  },
  "site-management": {
    icon: HardHat,
    title: "Site Management",
    tagline: "One operating system for every construction site.",
    features: [
      "Live progress tracking with mobile updates",
      "Daily site reports, photos and weather logs",
      "Tasks, punch lists and snag management",
      "Subcontractor coordination and approvals",
    ],
    benefits: [
      "Up to 40% less time spent on reporting",
      "Real-time visibility for project managers",
      "Faster decisions, fewer delays",
    ],
  },
  planning: {
    icon: ClipboardCheck,
    title: "Planning & Time Tracking",
    tagline: "Plan resources and capture every hour worked, accurately.",
    features: [
      "Drag-and-drop schedules and Gantt views",
      "Mobile clock-in / clock-out with geofencing",
      "Productivity dashboards by trade and crew",
      "Approval workflows for hours and overtime",
    ],
    benefits: [
      "Reduce timesheet errors and disputes",
      "Anticipate schedule risks earlier",
      "Pay accurately and on time",
    ],
  },
  quality: {
    icon: ShieldCheck,
    title: "Quality & Non-Conformity",
    tagline: "Digital QHSE made simple, traceable and audit-ready.",
    features: [
      "Configurable inspection forms",
      "Non-conformity reports and corrective actions",
      "Certifications and document expiry tracking",
      "Audit trail for full traceability",
    ],
    benefits: [
      "Reduce non-conformities by up to 30%",
      "Stay audit-ready at all times",
      "Standardize quality across all sites",
    ],
  },
  budget: {
    icon: Wallet,
    title: "Budget & Cost Control",
    tagline:
      "Know your numbers — from initial budget to forecast at completion.",
    features: [
      "Multi-level WBS budgeting",
      "Commitments, invoices and actuals tracking",
      "Forecast at completion and variance analysis",
      "Cash flow forecasting",
    ],
    benefits: [
      "Anticipate cost overruns before they happen",
      "Single financial source of truth",
      "Faster and more reliable closing",
    ],
  },
};

const SolutionDetail = () => {
  const { slug = "" } = useParams();
  const entry = data[slug];
  if (!entry) return <Navigate to="/solutions" replace />;
  const Icon = entry.icon;
  const isPlatform = slug === "platform";

  return (
    <>
      <PageHero
        eyebrow={isPlatform ? "All-in-one platform" : "Module"}
        title={entry.title}
        subtitle={entry.tagline}
      />

      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center mb-5 shadow-orange">
              <Icon className="text-accent-foreground" size={22} />
            </div>
            <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Key features
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">
              {isPlatform
                ? "Everything in one platform"
                : "Everything teams need, in one place"}
            </h2>
            <ul className="space-y-3 mb-8">
              {entry.features.map((f) => (
                <li key={f} className="flex gap-3 text-foreground">
                  <CheckCircle2
                    className="text-accent shrink-0 mt-0.5"
                    size={18}
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/book-a-demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-gradient text-accent-foreground font-semibold shadow-orange hover:brightness-110 transition"
            >
              Request a demo
            </Link>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-accent/10 rounded-2xl blur-2xl" />
            <img
              src={dashboardMockup}
              alt={`${entry.title} dashboard preview`}
              className="relative rounded-xl shadow-elevated border border-border"
            />
          </div>
        </div>
      </section>

      {isPlatform && (
        <section className="section-padding bg-secondary/40 pt-0">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-xl mx-auto mb-10">
              <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
                Modules included
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                All modules, one platform
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: HardHat,
                  title: "Site Management",
                  to: "/solutions/site-management",
                },
                {
                  icon: ClipboardCheck,
                  title: "Planning & Time",
                  to: "/solutions/planning",
                },
                {
                  icon: ShieldCheck,
                  title: "Quality & NCR",
                  to: "/solutions/quality",
                },
                {
                  icon: Wallet,
                  title: "Budget & Cost",
                  to: "/solutions/budget",
                },
              ].map((m) => (
                <Link
                  key={m.to}
                  to={m.to}
                  className="bg-card border border-border rounded-xl p-5 hover:border-accent/40 hover:shadow-elevated transition group"
                >
                  <m.icon className="text-accent mb-3" size={22} />
                  <div className="font-display font-semibold text-foreground text-sm">
                    {m.title}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-padding bg-secondary/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Benefits
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              Outcomes you can measure
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {entry.benefits.map((b) => (
              <div
                key={b}
                className="bg-card border border-border rounded-xl p-6 shadow-card"
              >
                <CheckCircle2 className="text-accent mb-3" size={24} />
                <p className="text-foreground font-medium">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SolutionDetail;
