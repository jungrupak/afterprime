import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://marketprice.afterprime.io:5001/Spread/comparison?period=7d&symbols=All%20pairs&commission=true&mode=24h",
      {
        // Let Next.js cache and revalidate automatically
        next: { revalidate: 60 },
      }
    );
    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
