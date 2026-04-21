import {NextResponse} from "next/server";

const API_URL = "https://scoreboard.argamon.com:8443/api/rebates/current"
const TIMEOUT_MS = 10000;

export async function GET() {
    try {
        if (!API_URL) {
            return NextResponse.json(
                {error: "API service configuration error"},
                {status: 500}
            )
        }
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

        const res = await fetch(API_URL, {
            signal: controller.signal,
            next: {
                revalidate: 86400
            },
            headers: {
                "Accept": "application/json",
                "User-Agent": "Next.js Server",
            },
        });
        clearTimeout(timeout);
        if (!res.ok) {
            console.error(`Upstream API failed: ${res.status} ${res.statusText}`);
            return NextResponse.json(
                {error: "Failed to retrieve data from external service."},
                {status: 502}
            )
        }
        const data = await res.json();
        return NextResponse.json(data, {status: 200});
    } catch (err) {
        const isAborted = err instanceof Error && err.name === 'AbortError';
        console.error("Failed to fetch rebates from upstream API:", isAborted ? 'Request timed out' : err);
        return NextResponse.json(
            {error: isAborted ? "Request timed out" : "Internal Server Error"},
            {status: isAborted ? 504 : 500}
        );
    }
}
