import { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const PageHero = ({ eyebrow, title, subtitle, children }: PageHeroProps) => {
  return (
    <section className="relative bg-hero pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      <div className="relative max-w-5xl mx-auto px-6 lg:px-8 text-center">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground/80 text-sm mb-6 animate-fade-up">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            {eyebrow}
          </div>
        )}
        <h1
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gradient-hero animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div
            className="mt-8 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
