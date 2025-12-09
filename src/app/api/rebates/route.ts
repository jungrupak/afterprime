import { NextResponse } from "next/server";
import https from "https";

export async function GET() {

  try {

    const agent = new https.Agent({
      rejectUnauthorized: false, // <-- allows self-signed certificate
    });
        
    
     const res = await fetch("https://scoreboard.argamon.com:8443/api/rebates/current", {
      cache: "no-store",
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err: unknown) {
    //Error Message handling
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    //##

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
