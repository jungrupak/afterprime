
import { NextResponse } from "next/server";

// Optional in-memory cache for instant response
let cache: { timestamp: number; data: unknown } | null = null;
const CACHE_TTL = 4 * 60 * 60 * 1000; // 4 hours in ms

async function fetchData() {
  const res = await fetch(
    "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true",
    { next: { revalidate: 14400 } } // ISR: revalidate every 4 hours
  );
  if(!res.ok){
    throw new Error(`Failed to fetch API: ${res.status}`)
  }

  return res.json();
}

async function updateCache() {
  try {
    const data = await fetchData();
    if (!cache || JSON.stringify(cache.data) !== JSON.stringify(data)) {
      cache = { timestamp: Date.now(), data };
    }
  } catch (err) {
    console.error("Failed to update cache:", err);
  }
}

export async function GET() {
  try {
    const now = Date.now();

    // Serve cache immediately if available
    if (cache && now - cache.timestamp <= CACHE_TTL) {
      return NextResponse.json(cache.data);
    }

    // Update cache in background if expired
    updateCache();

    // If no cache yet, wait for fresh data
    if (!cache) {
      const data = await fetchData();
      cache = { timestamp: now, data };
      return NextResponse.json(data);
    }

    return NextResponse.json(cache.data);

  } catch (error: unknown) {
     const message =
      error instanceof Error ? error.message : "Unknown error occurred";
    console.error("API error:", message);
    return NextResponse.json({ error: "Error Occurred" }, { status: 500 });
  }
}
