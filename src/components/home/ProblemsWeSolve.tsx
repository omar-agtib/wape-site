import { AlertTriangle, Clock, FileWarning, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Project Delays",
    desc: "Fragmented planning and lack of real-time visibility cause schedule overruns.",
  },
  {
    icon: TrendingDown,
    title: "Cost Overruns",
    desc: "Disconnected budget tools make it impossible to anticipate financial drift.",
  },
  {
    icon: FileWarning,
    title: "Quality Gaps",
    desc: "Paper-based controls slow down compliance and increase non-conformities.",
  },
  {
    icon: AlertTriangle,
    title: "Data Silos",
    desc: "Sites, offices and finance teams work with disconnected, outdated data.",
  },
];

const ProblemsWeSolve = () => {
  return (
    <section className="section-padding bg-secondary/40">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Problems we solve
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            The hidden costs of fragmented construction operations
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className="bg-card border border-border rounded-xl p-6 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <p.icon className="text-accent" size={22} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemsWeSolve;
