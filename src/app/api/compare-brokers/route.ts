import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
    try{
            const API_URL = `https://feed.afterprime.com/api/symbol`;
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