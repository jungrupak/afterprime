import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ symbol: string }> } // ✅ params is a Promise
) {
  const { symbol } = await context.params; // ✅ MUST await

  try {
    const res = await fetch(`https://feed.afterprime.com/api/symbol/${symbol}`, {
      headers: {
        "User-Agent": "Next.js Server",
        Accept: "application/json",
        // Authorization if needed
      },
    });

    if (!res.ok) return NextResponse.json(null, { status: res.status });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Proxy fetch error:", err);
    return NextResponse.json(null, { status: 500 });
  }
}
