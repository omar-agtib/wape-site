import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { BarChart3, Eye, ShieldCheck, Brain } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    title: "Process Optimization",
    desc: "Streamline operations and eliminate inefficiencies across your construction workflows.",
  },
  {
    icon: Eye,
    title: "Real-time Visibility",
    desc: "Monitor every project in real-time with live dashboards and instant alerts.",
  },
  {
    icon: ShieldCheck,
    title: "Quality & Compliance",
    desc: "Ensure standards are met with automated quality checks and compliance tracking.",
  },
  {
    icon: Brain,
    title: "Data-driven Decisions",
    desc: "Leverage analytics and KPIs to make smarter, faster business decisions.",
  },
];

const About = () => {
  const ref = useScrollAnimation();

  return (
    <section id="about" className="section-padding bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-on-scroll">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              About WAPE
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              Integrated Digital Transformation for the Construction Industry
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              WAPE — <strong>Work Actively, Proactively, Efficiently</strong> —
              is a comprehensive ERP platform purpose-built for construction
              companies. We enable businesses to digitize their operations, from
              project planning to site monitoring, ensuring every stakeholder
              has the visibility and tools they need to deliver projects on time
              and on budget.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 stagger-children animate-on-scroll">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl bg-card shadow-card border border-border hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <f.icon className="text-accent" size={22} />
                </div>
                <h3 className="font-display font-semibold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
