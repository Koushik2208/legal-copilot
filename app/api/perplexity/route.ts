import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { query } = await req.json();

  const perplexityRes = await fetch(
    "https://api.perplexity.ai/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PERPLEXITY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "sonar-pro",
        messages: [
          {
            role: "system",
            content:
              "You are an expert Indian legal research assistant. Only answer using reliable Indian legal sources such as case law, statutes, and constitutional provisions. Format your output as instructed.",
          },
          {
            role: "user",
            content: `
                Respond to the following legal query using the JSON structure below:

                {
                "title": "<Short title for the query>",
                "summary": "<One-paragraph overview>",
                "keyPoints": [
                    "<Bullet point 1>",
                    "<Bullet point 2>"
                ],
                "cases": [
                    {
                    "name": "<Case Name>",
                    "citation": "<Citation or Year>",
                    "principle": "<What legal principle it established>"
                    }
                ],
                "caution": "<Optional notes or caveats>"
                }

                Query:
                "${query}"
                    `,
          },
        ],
      }),
    }
  );

  const data = await perplexityRes.json();
  return NextResponse.json(data);
}
