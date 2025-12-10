import { NextResponse } from "next/server";

export async function GET() {

  try {  
    
    const fetchUrl = process.env.REBATE_BASE_URL;

    if(!fetchUrl){
      return NextResponse.json(
        {error: "Didnot Find Env Variable REBATE_BASE_URL"},
        {status:500}
      )
    }
    
     const res = await fetch(fetchUrl, {
      cache: "no-store",
    });
    const data = await res.json();

    //console.log("Rebates data received:", data); // <--- LOG HERE


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
