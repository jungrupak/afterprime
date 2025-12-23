import { NextResponse } from "next/server";
import axios from "axios";

const API_URL = "https://marketprice.afterprime.io:5000/MarketPrice";

export async function GET() {
    try{
        const res = await axios.get(API_URL, {
            headers: {"Cache-Control": "no-store"},
            timeout:5000,
            }
        );
        const data = res.data;
        return NextResponse.json(data, {status:200});
    }catch(err:unknown){
        console.error("Failed to fetch market data:", err)
     return NextResponse.json(
      { error: "Failed to fetch market data" },
      { status: 500 }
    );
    }
}