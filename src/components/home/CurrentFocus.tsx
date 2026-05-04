import { Building2, Package, Target } from "lucide-react";
import { Link } from "react-router-dom";

const CurrentFocus = () => {
  return (
    <section className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
            Live today
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Where WAPE operates today
          </h2>
          <p className="text-muted-foreground text-lg">
            We are 100% focused on solving real problems on construction sites —
            with one integrated solution, deployed and used in the field.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-elevated transition">
            <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center mb-5 shadow-orange">
              <Building2 className="text-accent-foreground" size={22} />
            </div>
            <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
              Industry · Active
            </div>
            <h3 className="font-display font-semibold text-xl text-foreground mb-3">
              Construction (BTP)
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              Civil works, building, infrastructure. WAPE digitizes the entire
              site lifecycle — from planning to handover — on a single,
              mobile-first platform.
            </p>
            <Link
              to="/industries/construction"
              className="text-sm font-semibold text-accent inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
            >
              Explore the construction solution <Target size={14} />
            </Link>
          </div>

          <div className="bg-deep-blue text-primary-foreground rounded-2xl p-8 shadow-elevated relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center mb-5 shadow-orange">
                <Package className="text-accent-foreground" size={22} />
              </div>
              <div className="text-xs font-semibold text-accent uppercase tracking-wider mb-2">
                Product · One platform
              </div>
              <h3 className="font-display font-semibold text-xl mb-3">
                The WAPE all-in-one platform
              </h3>
              <p className="text-sm text-primary-foreground/75 leading-relaxed mb-5">
                A single, integrated solution covering planning, site
                monitoring, non-conformity, time tracking, budget and quality —
                no more disconnected tools.
              </p>
              <Link
                to="/solutions/platform"
                className="text-sm font-semibold text-accent inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                See what's inside <Target size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentFocus;
