import { NextResponse } from "next/server";
export async function GET(){
    try{

        const endPoint = process.env.COST_COMPARE_BASE_URL + "?period=7d&symbols=All%20pairs&mode=day&commission=true";
        if(!endPoint){
            return NextResponse.json(
                {error: "COST_COMPARE_BASE_URL is un defined"},
                {status:500}
            )
        }
        const res = await fetch(endPoint, {
            cache: "no-store"
        });
        const data = await res.json();
        return NextResponse.json(data)

    }catch (err: unknown) {
    //Error Message handling
    const message = err instanceof Error ? err.message : "Unknown error occurred";
    //##

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}