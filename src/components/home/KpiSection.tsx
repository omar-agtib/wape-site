const kpis = [
  {
    value: "+40%",
    label: "Productivity gains",
    desc: "Across digitized site teams",
  },
  {
    value: "−25%",
    label: "Cost overruns",
    desc: "Through real-time budget control",
  },
  {
    value: "−30%",
    label: "CO₂ avoided",
    desc: "Less paper, travel and rework",
  },
  {
    value: "x3",
    label: "Faster reporting",
    desc: "From site to executive dashboards",
  },
];

const KpiSection = () => {
  return (
    <section className="section-padding bg-hero relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, hsl(0 0% 100% / 0.15) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-sm font-semibold text-accent uppercase tracking-wider mb-3">
            Measurable impact
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground">
            Results our customers achieve
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((k) => (
            <div
              key={k.label}
              className="bg-primary-foreground/5 border border-primary-foreground/10 backdrop-blur-sm rounded-2xl p-7 hover:border-accent/40 transition"
            >
              <div className="font-display text-4xl lg:text-5xl font-bold text-accent mb-2">
                {k.value}
              </div>
              <div className="text-primary-foreground font-semibold mb-1">
                {k.label}
              </div>
              <div className="text-sm text-primary-foreground/60">{k.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KpiSection;
