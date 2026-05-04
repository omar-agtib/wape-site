import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  CalendarDays,
  DollarSign,
  ClipboardCheck,
  FileText,
  HardHat,
  Wrench,
} from "lucide-react";

const modules = [
  {
    icon: CalendarDays,
    title: "Project Planning & Scheduling",
    desc: "Create detailed project timelines, assign tasks, and track milestones with Gantt charts and real-time progress updates.",
  },
  {
    icon: DollarSign,
    title: "Budget & Cost Control",
    desc: "Monitor budgets in real-time, track expenses per project phase, and generate accurate financial reports.",
  },
  {
    icon: ClipboardCheck,
    title: "Quality & Compliance Management",
    desc: "Automate quality inspections, manage non-conformances, and ensure regulatory compliance at every stage.",
  },
  {
    icon: FileText,
    title: "Document & Plan Tracking",
    desc: "Centralize all project documents, blueprints, and plans with version control and approval workflows.",
  },
  {
    icon: HardHat,
    title: "Site Progress Monitoring",
    desc: "Track on-site activities with photo reports, checklists, and real-time progress dashboards.",
  },
  {
    icon: Wrench,
    title: "Resource & Equipment Management",
    desc: "Optimize resource allocation, track equipment usage, and schedule maintenance to minimize downtime.",
  },
];

const Modules = () => {
  const ref = useScrollAnimation();

  return (
    <section id="modules" className="section-padding bg-secondary/50" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Core Modules
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Everything You Need to Run Construction Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Six powerful modules designed to cover every aspect of construction
            management.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children animate-on-scroll">
          {modules.map((m) => (
            <div
              key={m.title}
              className="group relative p-7 rounded-xl bg-card shadow-card border border-border hover:shadow-elevated hover:border-accent/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-5 group-hover:bg-accent-gradient transition-all duration-300">
                <m.icon className="text-primary-foreground" size={24} />
              </div>
              <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                {m.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {m.desc}
              </p>
              <div className="absolute bottom-0 left-7 right-7 h-0.5 bg-accent-gradient scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
