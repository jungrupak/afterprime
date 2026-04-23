import { NextResponse } from "next/server";

//const API_URL = "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true";
//const API_URL = "https://scoreboard.argamon.com:8443/api/costs/comparison?period=1d&brokers=&symbols=All%20pairs&commission=true&mode=24h";
// const API_URL = "https://scoreboard.argamon.com:8443/api/costs/comparison?period=1d&brokers=&symbols=All%20pairs&commission=true&mode=day";

const API_URL = "https://feed.afterprime.com/api/costs"
const TIMEOUT_MS = 10000;

export async function GET() {
  try {
      if(!API_URL){
          return NextResponse.json(
              {error:"API endpoint configuration error"},
              {status:500}
          );
      }
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const res = await fetch(API_URL, {
          signal: controller.signal,
           headers: {
            "Accept": "application/json",
            "User-Agent": "Next.js Server",
          },
          next:{revalidate:86400}
      });
      clearTimeout(timeout);
      if(!res.ok){
          console.error(`Upstream API failed: ${res.status} ${res.statusText}`);
           return NextResponse.json(
              {error:"Failed to retrieve data from external service"},
              {status:502}
          );
      }
      const data = await res.json()
      return NextResponse.json(data,{status:200});
  } catch (err: unknown) {
      const isAborted = err instanceof Error && err.name === 'AbortError';
      console.error("Failed to fetch costs from upstream API:", isAborted ? 'Request timed out' : err);
      return NextResponse.json(
        { error: isAborted ? "Request timed out" : "Internal Server Error" },
        { status: isAborted ? 504 : 500 }
      );
  }
}
