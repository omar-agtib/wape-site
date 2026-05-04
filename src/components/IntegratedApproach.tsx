import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Monitor, Headphones, Settings } from "lucide-react";

const pillars = [
  {
    icon: Monitor,
    title: "Digital Platform",
    desc: "A powerful cloud-based ERP that unifies all your construction workflows in one place — from planning to delivery.",
  },
  {
    icon: Headphones,
    title: "Continuous Support & Training",
    desc: "Dedicated onboarding, training programs, and ongoing technical support to ensure your team succeeds from day one.",
  },
  {
    icon: Settings,
    title: "Process Optimization Expertise",
    desc: "Our consultants help you redesign processes to maximize efficiency, reduce waste, and improve project outcomes.",
  },
];

const IntegratedApproach = () => {
  const ref = useScrollAnimation();

  return (
    <section
      id="approach"
      className="relative section-padding bg-hero overflow-hidden"
      ref={ref}
    >
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.2) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Our Approach
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-hero mt-3 mb-4">
            A Unique Integrated Approach
          </h2>
          <p className="text-primary-foreground/70 text-lg">
            WAPE is more than software — it's a complete digital transformation
            solution combining technology, expertise, and ongoing support.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 stagger-children animate-on-scroll">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="relative p-8 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm hover:bg-primary-foreground/10 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-accent-gradient flex items-center justify-center mx-auto mb-6 shadow-orange">
                <p.icon className="text-accent-foreground" size={26} />
              </div>
              <h3 className="font-display font-semibold text-xl text-primary-foreground mb-3">
                {p.title}
              </h3>
              <p className="text-primary-foreground/70 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegratedApproach;
