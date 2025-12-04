
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  try {
    const baseUrl = process.env.COST_COMPARE_BASE_URL;

    if(!baseUrl){
        return NextResponse.json(
          {error:"COST_COMPARE_BASE_URL data is missing"},
          {status:500}
        )
      }

    const finalUrl = baseUrl + "?period=7d&symbols=All%20pairs&mode=day&commission=true";
    
    const res = await axios.get(finalUrl);

    return NextResponse.json(res.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to Fetch Data from Source" }, 
      { status: 500 }
    );
  }
}
