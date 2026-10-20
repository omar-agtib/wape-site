import { useState, type FormEvent } from "react";
import { z } from "zod";
import { format } from "date-fns";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";

import PageHero from "@/components/PageHero";
import { Calendar as DateCalendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const TIMEZONE = "Africa/Casablanca";

const availableTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const industries = [
  "Construction (BTP)",
  "Logistics",
  "Manufacturing",
  "Energy",
  "Other",
];

const schema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  company: z.string().trim().min(1, "Company is required").max(120),
  email: z.email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s().-]{8,20}$/, "Please enter a valid phone number"),
  industry: z
    .string()
    .refine((value) => industries.includes(value), "Please select an industry"),
  needs: z.string().trim().min(5, "Please describe your needs").max(1000),
  date: z.iso.date("Please select a valid date"),
  time: z
    .string()
    .refine((value) => availableTimes.includes(value), "Please select a time"),
});

type DemoForm = z.infer<typeof schema>;

const initialForm: DemoForm = {
  name: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  needs: "",
  date: "",
  time: "",
};

const getMoroccoNow = () => {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());

  const values = Object.fromEntries(
    parts.map(({ type, value }) => [type, value]),
  );

  return {
    date: `${values.year}-${values.month}-${values.day}`,
    time: `${values.hour}:${values.minute}`,
  };
};

const toDateKey = (date: Date) => format(date, "yyyy-MM-dd");

const formatSelectedDate = (date: string) =>
  format(new Date(`${date}T12:00:00`), "EEEE, MMMM d, yyyy");

const BookDemo = () => {
  const [form, setForm] = useState<DemoForm>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const [calendarMonth, setCalendarMonth] = useState<Date>(() => new Date());

  const [moroccoNow, setMoroccoNow] = useState(getMoroccoNow);

  const updateField = <K extends keyof DemoForm>(
    field: K,
    value: DemoForm[K],
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => {
      if (!previous[field]) return previous;

      const updated = { ...previous };
      delete updated[field];
      return updated;
    });
  };

  const isDateDisabled = (date: Date) => {
    const day = date.getDay();
    const dateKey = toDateKey(date);

    return day === 0 || day === 6 || dateKey < moroccoNow.date;
  };

  const getAvailableTimes = () => {
    if (!form.date) return [];

    const now = moroccoNow;

    return availableTimes.filter((time) => {
      if (form.date < now.date) return false;

      if (form.date === now.date) {
        return time > now.time;
      }

      return true;
    });
  };

  const visibleTimes = getAvailableTimes();

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

      toast({
        title: "Please complete the form",
        description: "Check the highlighted fields.",
        variant: "destructive",
      });

      return;
    }

    const now = getMoroccoNow();
    setMoroccoNow(now);

    const selectedDate = new Date(`${result.data.date}T12:00:00`);

    if (
      isNaN(selectedDate.getTime()) ||
      selectedDate.getDay() === 0 ||
      selectedDate.getDay() === 6 ||
      result.data.date < now.date ||
      (result.data.date === now.date && result.data.time <= now.time)
    ) {
      setErrors((previous) => ({
        ...previous,
        date: "Please select a future weekday and time.",
      }));

      toast({
        title: "Invalid appointment",
        description: "Please select a future date and time.",
        variant: "destructive",
      });

      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          typeof data?.error === "string"
            ? data.error
            : "Unable to send demo request.",
        );
      }

      setDone(true);

      toast({
        title: "Demo request sent!",
        description: "Our team will contact you to confirm your appointment.",
      });
    } catch (error) {
      toast({
        title: "Unable to send request",
        description:
          error instanceof Error ? error.message : "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: Clock3,
      title: "30-minute consultation",
      description: "A focused walkthrough tailored to your business.",
    },
    {
      icon: CalendarDays,
      title: "Flexible scheduling",
      description: "Choose a preferred date and time that suits you.",
    },
    {
      icon: Sparkles,
      title: "Personalized experience",
      description: "Discover how WAPE can solve your challenges.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Book a Demo"
        title="See WAPE in action, tailored to your industry"
        subtitle="A 30-minute personalized walkthrough with one of our solution experts. No commitment, just clarity."
      />

      <section className="section-padding">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-5">
          {/* Left side */}
          <div className="space-y-5 lg:col-span-2">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="flex gap-4 rounded-2xl border border-border bg-card p-5 shadow-card"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent-gradient shadow-orange">
                    <Icon size={21} className="text-accent-foreground" />
                  </div>

                  <div>
                    <h3 className="mb-1 font-display font-semibold text-foreground">
                      {benefit.title}
                    </h3>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}

            <div className="rounded-2xl border border-border bg-muted/30 p-6">
              <div className="mb-3 flex items-center gap-2">
                <ShieldCheck size={19} className="text-accent" />

                <h3 className="font-semibold text-foreground">
                  No commitment required
                </h3>
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">
                This is an opportunity to explore WAPE, ask questions, and see
                how our platform can support your operations.
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="min-w-0 lg:col-span-3">
            {done ? (
              <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-elevated sm:px-10">
                <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-orange-50">
                  <CheckCircle2 size={42} className="text-orange-500" />
                </div>

                <h2 className="mb-3 font-display text-2xl font-bold text-foreground">
                  Thank you, {form.name.split(" ")[0]}!
                </h2>

                <p className="mx-auto max-w-md leading-relaxed text-muted-foreground">
                  Your demo request has been successfully submitted. Our team
                  will contact you to confirm your preferred appointment.
                </p>

                <div className="mx-auto mt-7 max-w-sm rounded-xl border border-border bg-muted/30 p-5 text-left">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Requested appointment
                  </p>

                  <p className="font-semibold text-foreground">
                    {formatSelectedDate(form.date)}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {form.time} · Morocco time
                  </p>

                  <div className="my-4 border-t border-border" />

                  <p className="text-xs text-muted-foreground">Contact email</p>

                  <p className="break-all text-sm font-medium text-foreground">
                    {form.email}
                  </p>
                </div>

                <p className="mt-5 text-xs text-muted-foreground">
                  Your appointment is not confirmed yet.
                </p>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="space-y-7 rounded-2xl border border-border bg-card p-5 shadow-card sm:p-8"
              >
                {/* Form heading */}
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Request your personalized demo
                  </h2>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Tell us a little about yourself to get started.
                  </p>
                </div>

                {/* Name and company */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="demo-name"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Full name *
                    </label>

                    <Input
                      id="demo-name"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      placeholder="John Doe"
                      maxLength={100}
                    />

                    {errors.name && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="demo-company"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Company *
                    </label>

                    <Input
                      id="demo-company"
                      value={form.company}
                      onChange={(e) => updateField("company", e.target.value)}
                      placeholder="Your company"
                      maxLength={120}
                    />

                    {errors.company && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.company}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email and phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="demo-email"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Work email *
                    </label>

                    <Input
                      id="demo-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      placeholder="john@company.com"
                      maxLength={255}
                    />

                    {errors.email && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="demo-phone"
                      className="mb-2 block text-sm font-medium text-foreground"
                    >
                      Phone number *
                    </label>

                    <Input
                      id="demo-phone"
                      type="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => updateField("phone", e.target.value)}
                      placeholder="+212 6 XX XX XX XX"
                      maxLength={20}
                    />

                    {errors.phone && (
                      <p className="mt-1 text-xs text-destructive">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Industry */}
                <div>
                  <label
                    htmlFor="demo-industry"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Industry *
                  </label>

                  <select
                    id="demo-industry"
                    value={form.industry}
                    onChange={(e) => updateField("industry", e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Select your industry</option>

                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>

                  {errors.industry && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.industry}
                    </p>
                  )}
                </div>

                {/* Needs */}
                <div>
                  <label
                    htmlFor="demo-needs"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Your needs *
                  </label>

                  <Textarea
                    id="demo-needs"
                    rows={4}
                    value={form.needs}
                    onChange={(e) => updateField("needs", e.target.value)}
                    placeholder="Tell us about your challenges and what you'd like to achieve..."
                    maxLength={1000}
                  />

                  {errors.needs && (
                    <p className="mt-1 text-xs text-destructive">
                      {errors.needs}
                    </p>
                  )}
                </div>

                {/* Booking section */}
                <div className="space-y-4">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <CalendarDays size={20} className="text-accent" />

                      <h3 className="font-display text-lg font-bold text-foreground">
                        Schedule your demo
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Pick your preferred date and time. No appointment is
                      selected by default.
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-border bg-card">
                    <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
                      {/* Calendar panel */}
                      <div className="min-w-0 border-b border-border p-3 sm:p-5 lg:border-b-0 lg:border-r">
                        <div className="mb-3">
                          <p className="text-sm font-semibold text-foreground">
                            Select a date
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Monday to Friday
                          </p>
                        </div>

                        <div className="flex justify-center overflow-x-auto">
                          <DateCalendar
                            mode="single"
                            month={calendarMonth}
                            onMonthChange={setCalendarMonth}
                            selected={
                              form.date
                                ? new Date(`${form.date}T12:00:00`)
                                : undefined
                            }
                            onSelect={(date) => {
                              updateField("date", date ? toDateKey(date) : "");

                              updateField("time", "");

                              setMoroccoNow(getMoroccoNow());
                            }}
                            disabled={isDateDisabled}
                            className="mx-auto max-w-full"
                            classNames={{
                              selected: "bg-[#10264B] text-white rounded-lg",
                              today: "font-bold text-[#F97316]",
                            }}
                          />
                        </div>

                        {errors.date && (
                          <p className="mt-3 text-xs text-destructive">
                            {errors.date}
                          </p>
                        )}
                      </div>

                      {/* Time panel */}
                      <div className="flex min-w-0 flex-col bg-muted/20 p-4 sm:p-5">
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Select a time
                          </p>

                          <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock3 size={13} />
                            Morocco time · 30 minutes
                          </div>
                        </div>

                        {!form.date ? (
                          <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12 text-center">
                            <div className="flex size-12 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                              <CalendarDays
                                size={22}
                                className="text-muted-foreground"
                              />
                            </div>

                            <p className="max-w-48 text-sm leading-relaxed text-muted-foreground">
                              Choose a date from the calendar to see the time
                              options.
                            </p>
                          </div>
                        ) : visibleTimes.length === 0 ? (
                          <div className="flex flex-1 items-center justify-center py-12 text-center">
                            <p className="max-w-48 text-sm text-muted-foreground">
                              No remaining time slots for this day. Please
                              choose another date.
                            </p>
                          </div>
                        ) : (
                          <div className="mt-5 grid grid-cols-2 gap-2">
                            {visibleTimes.map((time) => {
                              const selected = form.time === time;

                              return (
                                <button
                                  key={time}
                                  type="button"
                                  aria-pressed={selected}
                                  onClick={() => updateField("time", time)}
                                  className={`rounded-xl border px-3 py-3 text-sm font-semibold transition-all duration-200 ${
                                    selected
                                      ? "border-[#F97316] bg-[#F97316] text-white shadow-md"
                                      : "border-border bg-card text-foreground hover:border-[#F97316] hover:text-[#F97316]"
                                  }`}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {errors.time && (
                          <p className="mt-3 text-xs text-destructive">
                            {errors.time}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Booking summary */}
                    <div className="flex items-start gap-3 border-t border-border bg-muted/30 px-4 py-4 sm:px-5">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                        <Clock3 size={20} className="text-orange-500" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-xs font-medium text-muted-foreground">
                          Your preferred appointment
                        </p>

                        <p className="mt-1 text-sm font-semibold text-foreground">
                          {form.date && form.time
                            ? `${formatSelectedDate(form.date)} at ${form.time}`
                            : "No date or time selected"}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          30-minute consultation · Africa/Casablanca
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="space-y-3 pt-2">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="h-12 w-full gap-2 rounded-xl bg-accent-gradient text-base font-semibold text-accent-foreground shadow-orange transition hover:brightness-110 disabled:opacity-60"
                  >
                    {submitting ? (
                      "Sending your request..."
                    ) : (
                      <>
                        Confirm my demo
                        <ArrowRight size={18} />
                      </>
                    )}
                  </Button>

                  <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    Your preferred appointment will be reviewed and confirmed by
                    our team.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default BookDemo;
