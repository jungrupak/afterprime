// app/api/afterprime/[symbol]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ symbol: string }> }
) {
  const { symbol } = await context.params; // ✅ unwrap

  try {
    const res = await fetch(`https://feed.afterprime.com/api/symbol/${symbol}`, {
        cache : "force-cache",
      headers: {
        "User-Agent": "Next.js Server",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      console.error("Afterprime fetch failed:", res.status);
      return NextResponse.json(null, { status: res.status });
    }

    const data = await res.json();
    console.log("Proxy data:", data); // ✅ Check server terminal
    return NextResponse.json(data);
  } catch (err) {
    console.error("Proxy fetch error:", err);
    return NextResponse.json(null, { status: 500 });
  }
}
