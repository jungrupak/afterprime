import { NextResponse } from "next/server";

export async function GET(
    request: Request,
  { params }: { params: { instrument: string } }

) {
    try{
        const { instrument } = params;
        if (!instrument) {
      return NextResponse.json(
        { error: "Instrument not provided" },
        { status: 400 }
      );
    }

    const API_URL = `https://feed.afterprime.com/api/symbol/${instrument}`;
    if(!API_URL){
        return NextResponse.json(
            {error:"API end point configuration error"},
            {status:500}
        ) 
    }
    const res = await fetch(API_URL,{
        next:{revalidate:21600},
        headers: {
            "Accept": "application/json",
            "User-Agent": "Next.js Server",
          },
    });

    if(!res.ok){
        console.error("Upstream service failed:", res.status)
        return NextResponse.json(
            {error:"Failed to retrieve external service"},
            {status:502}
        )
    }

    const data = await res.json();
    return NextResponse.json(data, {status:200})
    }catch(err){
        console.error("Failed to fetch Brokers costs from upstream API:", err)
        return  NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }    
}