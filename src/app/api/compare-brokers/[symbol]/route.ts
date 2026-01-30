import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: { symbol: string } }
) {
  const { symbol } = params;

  try {
    // Proxy fetch to Afterprime API
    const res = await fetch(`https://feed.afterprime.com/api/symbol/${symbol}`, {
      headers: {
        "User-Agent": "Next.js Server", // required
        Accept: "application/json",
        // If Afterprime requires API key:
        // Authorization: `Bearer ${process.env.AFTERPRIME_API_KEY}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json(null, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy fetch failed:", error);
    return NextResponse.json(null, { status: 500 });
  }
}
