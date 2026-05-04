import { useState } from "react";
import { z } from "zod";
import PageHero from "@/components/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  company: z.string().trim().min(1, "Company required").max(120),
  email: z.string().trim().email("Invalid email").max(255),
  industry: z.string().min(1, "Select an industry"),
  needs: z.string().trim().min(5, "Describe your needs").max(1000),
  slot: z.string().min(1, "Pick a time slot"),
});

const slots = [
  "Mon · 10:00",
  "Mon · 14:00",
  "Tue · 11:00",
  "Wed · 09:30",
  "Thu · 15:00",
  "Fri · 16:30",
];

const BookDemo = () => {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    industry: "",
    needs: "",
    slot: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => {
        fieldErrors[i.path[0] as string] = i.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setDone(true);
    toast({
      title: "Demo requested",
      description: `We'll confirm ${form.slot} by email shortly.`,
    });
  };

  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="See WAPE in action, tailored to your industry"
        subtitle="A 30-minute personalized walkthrough with one of our solution experts. No commitment, just clarity."
      />
      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 space-y-5">
            {[
              {
                icon: Clock,
                title: "30 minutes",
                desc: "Quick, focused walkthrough of your priority use cases.",
              },
              {
                icon: Calendar,
                title: "Flexible scheduling",
                desc: "Pick a slot that suits your team — we'll confirm by email.",
              },
              {
                icon: CheckCircle2,
                title: "Tailored content",
                desc: "Real scenarios from your industry, not a generic demo.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="bg-card border border-border rounded-2xl p-5 shadow-card flex gap-4"
              >
                <div className="w-11 h-11 rounded-lg bg-accent-gradient flex items-center justify-center shrink-0 shadow-orange">
                  <b.icon className="text-accent-foreground" size={20} />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {b.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-3">
            {done ? (
              <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-elevated">
                <div className="w-16 h-16 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-5">
                  <CheckCircle2 className="text-accent" size={32} />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Thank you, {form.name.split(" ")[0]}!
                </h3>
                <p className="text-muted-foreground">
                  Your demo request for{" "}
                  <span className="font-semibold text-foreground">
                    {form.slot}
                  </span>{" "}
                  has been received. We'll confirm by email at{" "}
                  <span className="font-semibold text-foreground">
                    {form.email}
                  </span>{" "}
                  shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                className="bg-card border border-border rounded-2xl p-8 shadow-card space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full name
                    </label>
                    <Input
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      maxLength={100}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Company
                    </label>
                    <Input
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      maxLength={120}
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive mt-1">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Work email
                  </label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    maxLength={255}
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.email}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Industry
                  </label>
                  <select
                    value={form.industry}
                    onChange={(e) =>
                      setForm({ ...form, industry: e.target.value })
                    }
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select your industry</option>
                    <option>Construction (BTP)</option>
                    <option>Logistics</option>
                    <option>Manufacturing</option>
                    <option>Energy</option>
                    <option>Other</option>
                  </select>
                  {errors.industry && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.industry}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Your needs
                  </label>
                  <Textarea
                    rows={4}
                    value={form.needs}
                    onChange={(e) =>
                      setForm({ ...form, needs: e.target.value })
                    }
                    maxLength={1000}
                    placeholder="What are you looking to solve?"
                  />
                  {errors.needs && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.needs}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Preferred time slot
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {slots.map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setForm({ ...form, slot: s })}
                        className={`px-3 py-2.5 rounded-lg border text-sm font-medium transition ${
                          form.slot === s
                            ? "bg-accent-gradient text-accent-foreground border-transparent shadow-orange"
                            : "border-border bg-background text-foreground hover:border-accent/50"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  {errors.slot && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.slot}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-accent-gradient text-accent-foreground hover:brightness-110 shadow-orange"
                >
                  Confirm my demo
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookDemo;
