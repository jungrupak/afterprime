import { Groq } from "groq-sdk";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

  const completion = await groq.chat.completions.create({
    model: "mixtral-8x7b-32768",
    messages: [
      { role: "system", content: body.system },
      ...body.messages
    ],
    max_tokens: 1500,
  });

  return NextResponse.json({
    content: completion.choices[0].message.content
  });
}
