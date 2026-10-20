const allowedTimes = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

const htmlEscape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char],
  );

export default async function handler(request) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const body = await request.json();

    // Verify Cloudflare Turnstile before sending email.
    const turnstileToken = body.turnstileToken;
    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;

    if (!turnstileSecret) {
      console.error("TURNSTILE_SECRET_KEY is missing");

      return Response.json(
        { error: "Security verification is unavailable." },
        { status: 503 },
      );
    }

    if (
      typeof turnstileToken !== "string" ||
      !turnstileToken ||
      turnstileToken.length > 2048
    ) {
      return Response.json(
        { error: "Security verification is required." },
        { status: 403 },
      );
    }

    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: turnstileSecret,
          response: turnstileToken,
        }),
      },
    );

    if (!verificationResponse.ok) {
      console.error(
        "Turnstile verification service failed",
        verificationResponse.status,
      );

      return Response.json(
        { error: "Security verification is temporarily unavailable." },
        { status: 502 },
      );
    }

    const verification = await verificationResponse.json();

    if (!verification.success) {
      return Response.json(
        { error: "Security verification failed. Please try again." },
        { status: 403 },
      );
    }

    // Restrict successful verifications to our configured hostnames.
    const allowedHostnames = [
      "wape.ma",
      "www.wape.ma",
      "localhost",
      "deploy-preview-1--comforting-conkies-87e555.netlify.app",
    ];

    if (!allowedHostnames.includes(verification.hostname)) {
      console.error("Unexpected Turnstile hostname");

      return Response.json(
        { error: "Security verification failed." },
        { status: 403 },
      );
    }

    const { name, company, email, phone, industry, needs, date, time } = body;

    if (
      ![name, company, email, phone, industry, needs, date, time].every(
        (value) => typeof value === "string" && value.trim(),
      )
    ) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (
      name.length > 100 ||
      company.length > 120 ||
      email.length > 255 ||
      phone.length > 20 ||
      needs.length > 1000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      !/^\+?[0-9\s().-]{8,20}$/.test(phone) ||
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !allowedTimes.includes(time)
    ) {
      return Response.json({ error: "Invalid form data." }, { status: 400 });
    }

    // Validate the requested appointment in Morocco time.
    const now = new Date();
    const localDateTime = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Casablanca",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    }).formatToParts(now);

    const parts = Object.fromEntries(
      localDateTime.map(({ type, value }) => [type, value]),
    );

    const today = `${parts.year}-${parts.month}-${parts.day}`;

    const currentTime = `${parts.hour}:${parts.minute}`;

    const selected = new Date(`${date}T12:00:00Z`);

    if (
      Number.isNaN(selected.getTime()) ||
      selected.toISOString().slice(0, 10) !== date ||
      [0, 6].includes(selected.getUTCDay()) ||
      date < today ||
      (date === today && time <= currentTime)
    ) {
      return Response.json(
        { error: "Please select a future weekday and time." },
        { status: 400 },
      );
    }

    const safe = Object.fromEntries(
      Object.entries({
        name,
        company,
        email,
        phone,
        industry,
        needs,
        date,
        time,
      }).map(([key, value]) => [key, htmlEscape(value)]),
    );

    const emailBody = `
      <h2>New WAPE Demo Request</h2>
      <p><strong>Name:</strong> ${safe.name}</p>
      <p><strong>Company:</strong> ${safe.company}</p>
      <p><strong>Email:</strong> ${safe.email}</p>
      <p><strong>Phone:</strong> ${safe.phone}</p>
      <p><strong>Industry:</strong> ${safe.industry}</p>
      <p><strong>Needs:</strong> ${safe.needs}</p>
      <hr />
      <p><strong>Preferred date:</strong> ${safe.date}</p>
      <p><strong>Preferred time:</strong> ${safe.time}</p>
      <p><strong>Timezone:</strong> Africa/Casablanca</p>
      <p>This is a request, not a confirmed booking.</p>
    `;

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "WAPE Website <notifications@wape.ma>",
        to: ["contact@wape.ma"],
        reply_to: email,
        subject: `New demo request - ${company}`,
        html: emailBody,
      }),
    });

    if (!emailResponse.ok) {
      const errorBody = await emailResponse.text();

      console.error("Resend error:", {
        status: emailResponse.status,
        body: errorBody,
      });

      return Response.json(
        { error: "Email delivery failed." },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("========== DEMO REQUEST ERROR ==========");
    console.error("Message:", error?.message);
    console.error("Stack:", error?.stack);
    console.error("========================================");

    return Response.json(
      { error: "Unable to process the demo request." },
      { status: 500 },
    );
  }
}

export const config = {
  path: "/api/request-demo",
  rateLimit: {
    action: "rate_limit",
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ["ip"],
  },
};
