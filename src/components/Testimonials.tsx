import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ahmed Benali",
    role: "CEO, Atlas Construction Group",
    text: "WAPE transformed the way we manage our construction projects. We now have real-time visibility into every site, and our project delivery time improved by 35%.",
    rating: 5,
  },
  {
    name: "Sophie Martin",
    role: "Operations Director, BatiPlus SA",
    text: "The quality management module alone saved us countless hours of manual inspections. WAPE's integrated approach makes it the perfect solution for BTP companies.",
    rating: 5,
  },
  {
    name: "Karim Touzani",
    role: "Project Manager, Meridian Builds",
    text: "We evaluated several ERPs, but WAPE was the only one truly designed for construction. The onboarding was smooth, and our teams adopted it within weeks.",
    rating: 5,
  },
];

const Testimonials = () => {
  const ref = useScrollAnimation();

  return (
    <section
      id="testimonials"
      className="section-padding bg-secondary/50"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-on-scroll">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider">
            Testimonials
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Trusted by Construction Leaders
          </h2>
          <p className="text-muted-foreground text-lg">
            See how WAPE is helping construction companies digitize and deliver
            better.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 stagger-children animate-on-scroll">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-7 rounded-xl bg-card shadow-card border border-border hover:shadow-elevated transition-all duration-300 flex flex-col"
            >
              <Quote className="text-accent/30 mb-4" size={32} />
              <p className="text-foreground leading-relaxed flex-1 mb-6">
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="text-accent fill-accent" size={16} />
                ))}
              </div>
              <div>
                <div className="font-display font-semibold text-foreground">
                  {t.name}
                </div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
