import {NextResponse} from "next/server";

const API_URL = "https://marketprice.afterprime.io:5000/MarketPrice";

export async function GET() {

    try {
        if (!API_URL) {
            return NextResponse.json(
                {error: "API service configuration error"},
                {status: 500}
            );
        }
        const res = await fetch(API_URL, {
            next: {revalidate: 21600},
            headers: {
                "Accept": "application/json",
                "User-Agent": "Next.js Server"
            }
        });

        if (!res.ok) {
            console.error(`Upstream API failed: ${res.status} ${res.statusText}`);
            return NextResponse.json(
                {error: "Failed to retrieve data from external service. "},
                {status: 502}
            )
        }

        const data = await res.json();
        return NextResponse.json(data, {status: 200})

    } catch (err) {
        console.error("Failed to fetch markets data from upstream API:", err);
        return NextResponse.json(
            {error: "Internal Server Error"},
            {status: 500}
        );

    }


}