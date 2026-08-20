import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIMEOUT_MS = 10000;

export async function POST(req: NextRequest) {
  const endpoint = process.env.NEWSLETTER_SIGNUP_ENDPOINT;
  if (!endpoint) {
    console.error("NEWSLETTER_SIGNUP_ENDPOINT is not set");
    return NextResponse.json(
      { error: "Signup is not configured" },
      { status: 500 }
    );
  }

  let body: { email?: unknown; source?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const source = typeof body.source === "string" ? body.source : "unknown";

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error(`Newsletter signup upstream failed: ${res.status} ${res.statusText}`);
      return NextResponse.json({ error: "Signup failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const isAborted = err instanceof Error && err.name === "AbortError";
    console.error("Newsletter signup request failed:", isAborted ? "Request timed out" : err);
    return NextResponse.json(
      { error: isAborted ? "Request timed out" : "Signup failed" },
      { status: isAborted ? 504 : 500 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
