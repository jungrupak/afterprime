import { NextResponse } from "next/server";
import data from "@/data/traded-symbols.json";

export async function GET() {
  return NextResponse.json(data);
}
