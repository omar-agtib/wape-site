import { useRef, useState, type ComponentRef, type FormEvent } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, ShieldCheck, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

import PageHero from "@/components/PageHero";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  email: z.email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s().-]{8,20}$/, "Please enter a valid phone number"),
  message: z
    .string()
    .trim()
    .min(5, "Please enter at least 5 characters")
    .max(2000, "Message cannot exceed 2000 characters"),
});

type ContactForm = z.infer<typeof schema>;

const initialForm: ContactForm = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

const Contact = () => {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileError, setTurnstileError] = useState("");

  const turnstileRef = useRef<ComponentRef<typeof Turnstile>>(null);
  const siteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  const resetTurnstile = () => {
    setTurnstileToken("");
    turnstileRef.current?.reset();
  };

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;

    const result = schema.safeParse(form);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    if (!turnstileToken) {
      setTurnstileError("Please complete security verification.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/contact-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...result.data,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to send message.",
        );
      }

      toast({
        title: "Message sent successfully!",
        description:
          "Thank you for contacting WAPE. We'll get back to you soon.",
      });

      setForm({ ...initialForm });
      setTurnstileError("");
      resetTurnstile();
    } catch (error) {
      resetTurnstile();

      toast({
        title: "Unable to send message",
        description:
          error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your projects"
        subtitle="Our team typically replies within one business day. For a personalized walkthrough, book a demo directly."
      />

      <section className="section-padding">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <Mail className="mb-3 text-accent" size={22} />
              <p className="mb-1 text-sm text-muted-foreground">Email</p>
              <a
                href="mailto:contact@wape.ma"
                className="font-medium text-foreground hover:text-accent"
              >
                contact@wape.ma
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <Phone className="mb-3 text-accent" size={22} />
              <p className="mb-1 text-sm text-muted-foreground">Phone</p>
              <a
                href="tel:+212785652581"
                className="font-medium text-foreground hover:text-accent"
              >
                +212 7 85 65 25 81
              </a>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <MapPin className="mb-3 text-accent" size={22} />
              <p className="mb-1 text-sm text-muted-foreground">Office</p>
              <p className="font-medium text-foreground">Agadir, Morocco</p>
            </div>

            <Link
              to="/book-a-demo"
              className="block rounded-lg bg-accent-gradient px-5 py-3 text-center font-semibold text-accent-foreground shadow-orange transition hover:brightness-110"
            >
              Book a Demo
            </Link>
          </div>

          <form
            onSubmit={onSubmit}
            noValidate
            className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-card sm:p-8 lg:col-span-2"
          >
            <div>
              <h2 className="font-display text-xl font-bold text-foreground">
                Send us a message
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the form and our team will get in touch.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium"
                >
                  Full name *
                </label>
                <Input
                  id="contact-name"
                  value={form.name}
                  autoComplete="name"
                  placeholder="Jane Doe"
                  maxLength={100}
                  onChange={(e) => updateField("name", e.target.value)}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-phone"
                  className="mb-2 block text-sm font-medium"
                >
                  Phone number *
                </label>
                <Input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  placeholder="+212 6 XX XX XX XX"
                  maxLength={20}
                  onChange={(e) => updateField("phone", e.target.value)}
                />
                {errors.phone && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact-email"
                className="mb-2 block text-sm font-medium"
              >
                Email *
              </label>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                value={form.email}
                placeholder="jane@company.com"
                maxLength={255}
                onChange={(e) => updateField("email", e.target.value)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                className="mb-2 block text-sm font-medium"
              >
                Message *
              </label>
              <Textarea
                id="contact-message"
                rows={6}
                value={form.message}
                placeholder="Tell us about your projects..."
                maxLength={2000}
                onChange={(e) => updateField("message", e.target.value)}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-destructive">
                  {errors.message}
                </p>
              )}
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-4">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-accent" />
                <span className="text-sm font-medium text-foreground">
                  Security verification
                </span>
              </div>

              {siteKey ? (
                <Turnstile
                  ref={turnstileRef}
                  siteKey={siteKey}
                  options={{ theme: "light", size: "flexible" }}
                  onSuccess={(token) => {
                    setTurnstileToken(token);
                    setTurnstileError("");
                  }}
                  onExpire={() => {
                    setTurnstileToken("");
                    setTurnstileError(
                      "Verification expired. Please verify again.",
                    );
                  }}
                  onError={() => {
                    setTurnstileToken("");
                    setTurnstileError(
                      "Security verification failed. Please try again.",
                    );
                  }}
                />
              ) : (
                <p className="text-sm text-destructive">
                  Security verification is not configured.
                </p>
              )}

              {turnstileError && (
                <p className="mt-2 text-xs text-destructive">
                  {turnstileError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting || !siteKey}
              className="gap-2 bg-accent-gradient text-accent-foreground shadow-orange hover:brightness-110"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Send message
                </>
              )}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
