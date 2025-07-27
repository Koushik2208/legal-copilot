import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { type, context } = await req.json();

  if (
    !type ||
    !context ||
    typeof type !== "string" ||
    typeof context !== "string"
  ) {
    return NextResponse.json(
      { success: false, error: { message: "Invalid input." } },
      { status: 400 }
    );
  }

  const prompt = `
You are a professional Indian legal draftsman. 
Create a formal and legally sound "${type}" using the facts below.

Instructions:
- Use proper legal formatting and tone.
- Do NOT add explanations, just return the full formatted draft.
- Use placeholders if any detail is missing (e.g. [Client Name], [Court Name], etc.).

Facts provided:
${context}
`;

  try {
    const openrouterRes = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.OPENROUTER_REFERER!, // set this in your .env
          "X-Title": "LegalCopilot Draft Generator",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.1-24b-instruct:free", // or try "meta-llama/llama-3-70b-instruct"
          messages: [
            {
              role: "system",
              content:
                "You are a legal draftsman in India. Write formal legal documents based only on the user prompt.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      }
    );

    const data = await openrouterRes.json();
    const draft = data.choices?.[0]?.message?.content ?? "";

    return NextResponse.json({ success: true, data: draft });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: { message: "Something went wrong." } },
      { status: 500 }
    );
  }
}
