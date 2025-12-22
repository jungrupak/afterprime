import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(){

    try{

        const res = await axios.get("https://scoreboard.argamon.com:8443/api/instruments/", {
            headers:{
                "Cache-Control": "no-store",
            }
        });
        const data = await res.data;
        return NextResponse.json(data);

    }catch(err:unknown){
        console.error(err);
        const message = err instanceof Error ? err.message : "Unknown error occurred";
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );

    }

}