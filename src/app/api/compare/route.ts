import axios from "axios";
import https from "https";

export async function GET() {
  try {
    const baseUrl = process.env.COST_COMPARE_BASE_URL;

    const httpsAgent = new https.Agent({
      rejectUnauthorized: false, // ⭐ allow self-signed SSL
    });

    const finalUrl =
      baseUrl +
      "?period=7d&symbols=All%20pairs&mode=day&commission=true";

    const res = await axios.get(finalUrl, { httpsAgent });

    return Response.json(res.data);
  } catch (error) {
    
    return Response.json({ error: "Failed to Fetch Data from Source" }, { status: 500 });
  }
}
