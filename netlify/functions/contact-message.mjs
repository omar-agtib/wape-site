const allowedHostnames = [
  "wape.ma",
  "www.wape.ma",
  "localhost",
  "deploy-preview-1--comforting-conkies-87e555.netlify.app",
  "deploy-preview-2--comforting-conkies-87e555.netlify.app",
];

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
    return Response.json({ error: "Method not allowed." }, { status: 405 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";

    if (!contentType.toLowerCase().includes("application/json")) {
      return Response.json(
        { error: "Content-Type must be application/json." },
        { status: 415 },
      );
    }

    const body = await request.json();

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return Response.json({ error: "Invalid request." }, { status: 400 });
    }

    const { name, email, phone, message, turnstileToken } = body;

    // Validate submitted data.
    if (
      ![name, email, phone, message].every(
        (value) => typeof value === "string" && value.trim(),
      )
    ) {
      return Response.json(
        { error: "All fields are required." },
        { status: 400 },
      );
    }

    if (
      name.trim().length > 100 ||
      email.trim().length > 255 ||
      phone.trim().length > 20 ||
      message.trim().length < 5 ||
      message.trim().length > 2000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      !/^\+?[0-9\s().-]{8,20}$/.test(phone.trim())
    ) {
      return Response.json({ error: "Invalid form data." }, { status: 400 });
    }

    // Validate Cloudflare Turnstile token.
    const secret = process.env.TURNSTILE_SECRET_KEY;

    if (!secret) {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret,
          response: turnstileToken,
        }),
      },
    );

    if (!verificationResponse.ok) {
      return Response.json(
        { error: "Security verification temporarily unavailable." },
        { status: 502 },
      );
    }

    const verification = await verificationResponse.json();

    if (
      !verification.success ||
      !allowedHostnames.includes(verification.hostname)
    ) {
      return Response.json(
        { error: "Security verification failed. Please try again." },
        { status: 403 },
      );
    }

    // Prepare the contact email.
    const safe = {
      name: htmlEscape(name.trim()),
      email: htmlEscape(email.trim()),
      phone: htmlEscape(phone.trim()),
      message: htmlEscape(message.trim()).replace(/\r?\n/g, "<br />"),
    };

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:640px;margin:auto;">
        <h2 style="color:#10264B;">New WAPE Contact Message</h2>
        <p>A visitor has submitted a message through the WAPE website.</p>
        <hr style="border:0;border-top:1px solid #eee;" />

        <p><strong>Full name:</strong> ${safe.name}</p>
        <p><strong>Email:</strong> ${safe.email}</p>
        <p><strong>Phone:</strong> ${safe.phone}</p>

        <h3 style="color:#10264B;">Message</h3>
        <div style="background:#f8fafc;padding:16px;border-radius:8px;overflow-wrap:anywhere;">
          ${safe.message}
        </div>

        <hr style="border:0;border-top:1px solid #eee;" />
        <p style="font-size:12px;color:#777;">
          Submitted from the WAPE website contact form.
        </p>
      </div>
    `;

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("RESEND_API_KEY is missing");
      return Response.json(
        { error: "Email service is unavailable." },
        { status: 503 },
      );
    }

    // Send the message directly to WAPE via Resend.
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "WAPE Website <notifications@wape.ma>",
        to: ["contact@wape.ma"],
        reply_to: email.trim(),
        subject: "New contact message from WAPE website",
        html,
      }),
    });

    if (!emailResponse.ok) {
      console.error("Resend email request failed", emailResponse.status);

      return Response.json(
        { error: "Unable to send your message. Please try again." },
        { status: 502 },
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact message request failed:", error);

    return Response.json(
      { error: "Unable to process your request." },
      { status: 500 },
    );
  }
}

export const config = {
  path: "/api/contact-message",
  rateLimit: {
    action: "rate_limit",
    windowLimit: 5,
    windowSize: 60,
    aggregateBy: ["ip"],
  },
};
