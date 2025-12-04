import { NextRequest, NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function cleanInvalidUnicode(str: string) {
  return str.replace(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])/g, "") // high surrogate without low
            .replace(/(?<![\uD800-\uDBFF])[\uDC00-\uDFFF]/g, ""); // low surrogate without high
}

// Handle OPTIONS (CORS preflight)
export function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const cleaned = JSON.parse(
      cleanInvalidUnicode(JSON.stringify(body))
    );

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: cleaned,
    });

    // Log response status + headers
    //console.log("🔵 Anthropic API Status:", response.status);
    //console.log("🔵 Anthropic Headers:", Object.fromEntries(response.headers.entries()));

    // Clone the body to inspect it
    const text = await response.text();
    //console.log("🟣 Anthropic Raw Response Body:", text);

    // Convert back to JSON
    const data = JSON.parse(text);

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("❌ SERVER ERROR:", error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  }
}



