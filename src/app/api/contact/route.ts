import { parseContact } from "@/lib/contact";

/**
 * Receives the contact form and forwards it by e-mail through Resend.
 * Requires RESEND_API_KEY and CONTACT_TO_EMAIL (see .env.example).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  // Honeypot: real visitors never see nor fill this field.
  if (typeof body.website === "string" && body.website !== "") {
    return Response.json({ ok: true });
  }

  const parsed = parseContact(body);
  if (!parsed.ok) {
    return Response.json({ error: "invalid_fields", fields: parsed.errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const { name, email, company, projectType, message } = parsed.data;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "Novily <site@novily.fr>",
      to,
      reply_to: email,
      subject: `Nouveau projet — ${name}${company ? ` (${company})` : ""}`,
      text: [
        `Nom : ${name}`,
        `E-mail : ${email}`,
        `Entreprise : ${company || "—"}`,
        `Type de projet : ${projectType || "—"}`,
        "",
        message,
      ].join("\n"),
    }),
    signal: AbortSignal.timeout(8000),
  }).catch(() => null);

  if (!res?.ok) {
    return Response.json({ error: "send_failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
