import { NextRequest, NextResponse } from "next/server";

const TIMEOUT_MS = 10000;

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await context.params;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const res = await fetch(`https://feed.afterprime.com/api/symbol/${symbol}`, {
        signal: controller.signal,
        cache : "force-cache",
      headers: {
        "User-Agent": "Next.js Server",
        Accept: "application/json",
      },
    });
    clearTimeout(timeout);

    if (!res.ok) {
      console.error("Afterprime fetch failed:", res.status);
      return NextResponse.json(null, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    const isAborted = err instanceof Error && err.name === 'AbortError';
    console.error("Proxy fetch error:", isAborted ? 'Request timed out' : err);
    return NextResponse.json(
        { error: isAborted ? "Request timed out" : "Internal Server Error" },
        { status: isAborted ? 504 : 500 }
    );
  }
}
