import { NextResponse } from "next/server";

//const API_URL = "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true";
//const API_URL = "https://scoreboard.argamon.com:8443/api/costs/comparison?period=1d&brokers=&symbols=All%20pairs&commission=true&mode=24h";
// const API_URL = "https://scoreboard.argamon.com:8443/api/costs/comparison?period=1d&brokers=&symbols=All%20pairs&commission=true&mode=day";

const API_URL = "https://feed.afterprime.com/api/costs"
export async function GET() {
  try {
      if(!API_URL){
          return NextResponse.json(
              {error:"API endpoint configuration error"},
              {status:500}
          );
      }
      const res = await fetch(API_URL, {
          next:{revalidate:21600},
          //if EP managed in Cloudflare
           headers: {
            "Accept": "application/json",
            "User-Agent": "Next.js Server",
          },
      });
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
      console.error("Failed to fetch costs from upstream API:", err);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
  }
}
