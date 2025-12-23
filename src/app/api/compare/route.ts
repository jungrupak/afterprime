import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = "https://scoreboard.argamon.com:8443/api/costs/comparison?period=7d&symbols=All%20pairs&mode=day&commission=true";

export async function GET() {
  try {  
      const res = await axios.get(API_URL, {
      headers: { "Cache-Control": "no-store" },
      timeout:5000, //prevents hanging on requests
      });
      const data = await res.data;
      return NextResponse.json(data,{status:200});
  } catch (err: unknown) {
      console.error("Error fetching Compare data:", err);
      return NextResponse.json(
        { error: "Error fetching Compare data" },
        { status: 500 }
      );
  }
}
