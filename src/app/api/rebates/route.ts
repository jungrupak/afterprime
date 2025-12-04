import { NextResponse } from "next/server";
import axios from "axios";

//Remember if CORSS Issue occuring locally, install Cert locally NODE_EXTRA_CA_CERTS environment variable. 
//in project root folder in terminal type: export NODE_EXTRA_CA_CERTS="argamon_chain.pem" ## .pem is already ingnored in .gitignore


export async function GET() {
  try {
    const baseURL = process.env.REBATE_BASE_URL;

    if (!baseURL) {
      return NextResponse.json(
        { error: "REBATE_BASE_URL is missing" },
        { status: 500 }
      );
    }
    const res = await axios.get(
      baseURL
    );
    return NextResponse.json(res.data);
  } catch (err) {
    console.error("Failed to fetch rebates:", err);
    return NextResponse.json({ error: "Failed to fetch rebates" }, { status: 500 });
  }
}
