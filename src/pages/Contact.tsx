import { useState } from "react";
import { z } from "zod";
import PageHero from "@/components/PageHero";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const schema = z.object({
  name: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(5, "Message too short").max(1000),
});

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    toast({
      title: "Message sent",
      description: "We'll get back to you within one business day.",
    });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your projects"
        subtitle="Our team typically replies within one business day. For a personalized walkthrough, book a demo directly."
      />
      <section className="section-padding">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <Mail className="text-accent mb-3" size={22} />
              <div className="text-sm text-muted-foreground mb-1">Email</div>
              <a
                href="mailto:contact@wape.io"
                className="font-medium text-foreground hover:text-accent"
              >
                contact@wape.io
              </a>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <Phone className="text-accent mb-3" size={22} />
              <div className="text-sm text-muted-foreground mb-1">Phone</div>
              <div className="font-medium text-foreground">
                +33 1 23 45 67 89
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <MapPin className="text-accent mb-3" size={22} />
              <div className="text-sm text-muted-foreground mb-1">Offices</div>
              <div className="font-medium text-foreground">
                Paris · Casablanca
              </div>
            </div>
            <Link
              to="/book-a-demo"
              className="block text-center px-5 py-3 rounded-lg bg-accent-gradient text-accent-foreground font-semibold shadow-orange hover:brightness-110 transition"
            >
              Book a Demo
            </Link>
          </div>

          <form
            onSubmit={onSubmit}
            className="lg:col-span-2 bg-card border border-border rounded-2xl p-8 shadow-card space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Full name
              </label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Jane Doe"
                maxLength={100}
              />
              {errors.name && (
                <p className="text-sm text-destructive mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <Input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="jane@company.com"
                maxLength={255}
              />
              {errors.email && (
                <p className="text-sm text-destructive mt-1">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <Textarea
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your projects..."
                maxLength={1000}
              />
              {errors.message && (
                <p className="text-sm text-destructive mt-1">
                  {errors.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-accent-gradient text-accent-foreground hover:brightness-110 shadow-orange"
            >
              <Send size={16} /> Send message
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
