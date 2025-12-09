import { NextResponse } from "next/server";
export async function GET() {

  try {
    const ep = process.env.REBATE_BASE_URL!;

    if (!ep) {
      return NextResponse.json(
        { error: "REBATE_BASE_URL is not defined" },
        { status: 500 }
      );
    }

     const res = await fetch(ep, {
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
