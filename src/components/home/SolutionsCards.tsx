import { Link } from "react-router-dom";
import {
  HardHat,
  ShieldCheck,
  ClipboardCheck,
  Wallet,
  Package,
  ArrowRight,
} from "lucide-react";

const modules = [
  {
    icon: HardHat,
    title: "Site Management",
    desc: "Live progress, daily reports, snag lists.",
    to: "/solutions/site-management",
  },
  {
    icon: ClipboardCheck,
    title: "Planning & Time Tracking",
    desc: "Schedules, attendance, productivity.",
    to: "/solutions/planning",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Non-Conformity",
    desc: "Inspections, NCRs, corrective actions.",
    to: "/solutions/quality",
  },
  {
    icon: Wallet,
    title: "Budget & Cost Control",
    desc: "Commitments, actuals, forecast.",
    to: "/solutions/budget",
  },
];

const SolutionsCards = () => {
  return (
    <section className="section-padding bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            One platform · Many modules
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Inside the WAPE all-in-one solution
          </h2>
          <p className="text-muted-foreground mt-3">
            A single integrated platform for construction — every module shares
            the same data, the same UX, the same source of truth.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {modules.map((m) => (
            <Link
              key={m.to}
              to={m.to}
              className="group bg-card border border-border rounded-xl p-6 hover:border-accent/40 hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent-gradient transition">
                <m.icon
                  className="text-accent group-hover:text-accent-foreground transition"
                  size={20}
                />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-1.5">
                {m.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-3">{m.desc}</p>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                Discover <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/solutions/platform"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-gradient text-accent-foreground font-semibold shadow-orange hover:brightness-110 transition"
          >
            <Package size={16} /> Explore the full platform
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SolutionsCards;
