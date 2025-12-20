import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
    try{
        const res = await axios.get("https://marketprice.afterprime.io:5000/MarketPrice", {
            headers: {
                "Cache-Control": "no-store",
            }}
        );
        const data = res.data;
        return NextResponse.json(data);

    }catch(err:unknown){
    //Error Message handling
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    //##
     return NextResponse.json(
      { error: message },
      { status: 500 }
    );
    }
}