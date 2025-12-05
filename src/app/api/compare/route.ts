import axios from "axios";
import https from "https";
import fs from "fs";
//import path from "path";

export async function GET() {
  try {
    const baseUrl = process.env.COST_COMPARE_BASE_URL;

    if (!baseUrl) {
      return Response.json({ error: "Missing base URL" }, { status: 500 });
    }

    //const certPath = path.join(process.cwd(), "argamon-com-chain.pem");

    const agent = new https.Agent({
      ca: fs.readFileSync("argamon-com-chain.pem"), // This tells Node: trust THIS cert
    });

    const finalUrl =
      baseUrl +
      "?period=7d&symbols=All%20pairs&mode=day&commission=true";

    const res = await axios.get(finalUrl, { httpsAgent: agent });

    return Response.json(res.data);
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch / SSL error" },
      { status: 500 }
    );
  }
}
