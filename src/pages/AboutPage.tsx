import PageHero from "@/components/PageHero";
import {
  Target,
  Eye,
  Heart,
  Sparkles,
  Mail,
  HardHat,
  Map,
  Compass,
} from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  {
    icon: Target,
    title: "Mission",
    desc: "Empower construction teams with one integrated digital platform that turns operational complexity into measurable, daily performance — on every site, in every condition.",
  },
  {
    icon: Eye,
    title: "Vision",
    desc: "Become the operational backbone of asset-intensive industries — starting with construction, and progressively extending to logistics, manufacturing and energy.",
  },
  {
    icon: Heart,
    title: "Values",
    desc: "Field-driven, transparent, pragmatic. We build tools that the people on site actually want to use — not what looks good in a slide deck.",
  },
];

const team = [
  { name: "Yassine A.", role: "Founder & CEO", initials: "YA" },
  { name: "Sara B.", role: "Head of Product", initials: "SB" },
  { name: "Karim L.", role: "CTO", initials: "KL" },
  { name: "Nora M.", role: "Customer Success", initials: "NM" },
];

const About = () => {
  return (
    <>
      <PageHero
        eyebrow="About WAPE"
        title="Born on construction sites"
        subtitle="WAPE — Work Accurately, Proactively and Efficiently — was created by construction professionals who lived the daily cost of fragmented tools, paper-based processes and disconnected teams."
      />

      {/* Origin story */}
      <section className="section-padding">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-1">
            <div className="w-14 h-14 rounded-xl bg-accent-gradient flex items-center justify-center mb-4 shadow-orange">
              <HardHat className="text-accent-foreground" size={24} />
            </div>
            <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
              Our Story
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              From the field to the cloud
            </h2>
          </div>
          <div className="md:col-span-2 space-y-5 text-muted-foreground leading-relaxed text-base">
            <p>
              After years spent managing major BTP projects, our founding team
              kept facing the same problem: site teams, quality engineers and
              finance departments were each working in their own tools. Reports
              arrived late, decisions were based on outdated data, and value was
              leaking everywhere.
            </p>
            <p>
              We tried every tool on the market. Some were great at scheduling,
              others at cost, others at quality. None of them spoke the language
              of a site supervisor. None of them gave a project director one
              screen with the truth.
            </p>
            <p>
              <span className="text-foreground font-semibold">
                So we built WAPE.
              </span>{" "}
              One integrated platform, designed by construction people for
              construction people — starting with the use cases we know best,
              and built to scale into other industries that share the same
              operational DNA.
            </p>
          </div>
        </div>
      </section>

      {/* Today / Tomorrow */}
      <section className="section-padding bg-secondary/40 pt-0">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />{" "}
              Today
            </div>
            <Map className="text-accent mb-4" size={26} />
            <h3 className="font-display text-xl font-bold text-foreground mb-3">
              Focused on construction
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We deliver a single integrated solution covering planning, site,
              quality, NCR, time tracking and cost — used by construction teams
              in the field every day.
            </p>
          </div>
          <div className="bg-deep-blue text-primary-foreground rounded-2xl p-8 shadow-elevated relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-xs font-semibold uppercase tracking-wider mb-4">
                <Compass size={12} /> Tomorrow
              </div>
              <Sparkles className="text-accent mb-4" size={26} />
              <h3 className="font-display text-xl font-bold mb-3">
                A multi-industry SaaS platform
              </h3>
              <p className="text-sm text-primary-foreground/75 leading-relaxed">
                The same modular architecture will progressively serve
                logistics, manufacturing and energy — all sectors where field
                operations meet complex projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              What drives us
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Mission, vision, values
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-card border border-border rounded-2xl p-7 shadow-card hover:shadow-elevated transition"
              >
                <div className="w-12 h-12 rounded-xl bg-accent-gradient flex items-center justify-center mb-5 shadow-orange">
                  <v.icon className="text-accent-foreground" size={22} />
                </div>
                <h3 className="font-display font-semibold text-xl text-foreground mb-3">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-secondary/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
              Our Team
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              A team of builders and engineers
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((m) => (
              <div
                key={m.name}
                className="group bg-card border border-border rounded-2xl p-6 text-center hover:shadow-elevated hover:-translate-y-1 transition-all"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-accent-gradient flex items-center justify-center mb-4 shadow-orange">
                  <span className="text-accent-foreground font-display font-bold text-xl">
                    {m.initials}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-foreground">
                  {m.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">{m.role}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  <Mail size={14} /> LinkedIn
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why WAPE */}
      <section className="section-padding bg-hero relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.15) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-5xl mx-auto text-center">
          <Sparkles className="mx-auto text-accent mb-5" size={32} />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-5">
            Why WAPE
          </h2>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto mb-8">
            Because no other platform combines field-grade UX, deep operational
            capabilities and real construction expertise in a single integrated
            solution that is fast to deploy and built to scale across
            industries.
          </p>
          <Link
            to="/book-a-demo"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg bg-accent-gradient text-accent-foreground font-semibold shadow-orange hover:brightness-110 transition"
          >
            Book a Demo
          </Link>
        </div>
      </section>
    </>
  );
};

export default About;
