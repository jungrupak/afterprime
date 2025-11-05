import { NextResponse } from "next/server";


export async function GET() {
  try {
    const res = await fetch(
      "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true",
      //"https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=24h&commission=true",
      {
        // Let Next.js cache and revalidate automatically in 4 hrs
        next: { revalidate: 14400 },
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
    return NextResponse.json({ error: "Error Occured" }, { status: 500 });
  }
}
