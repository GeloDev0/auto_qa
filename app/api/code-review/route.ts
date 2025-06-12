// app/api/code-review/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Accepts any code and optional language + purpose
const codeReviewSchema = z.object({
  code: z.string().min(1, "Code is required"),
  language: z.string().optional().default("unspecified"),
  purpose: z.string().optional(), // Optional: debugging, performance, best practices, etc.
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = codeReviewSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { code, language, purpose } = parsed.data;

    const prompt = `
You are a highly experienced senior software engineer and AI code reviewer.

Your mission is to perform a thorough review of the following code. The user may provide an optional purpose (e.g., debugging, optimization, refactoring, security check, etc.) — use it to guide your review.

📦 Instructions:
1. Analyze the code line by line and identify:
   - Bugs or logic flaws
   - Security issues or vulnerabilities
   - Performance concerns
   - Violations of best practices
   - Maintainability or readability problems
2. For each issue, explain it clearly and provide a suggested fix.
3. If appropriate, provide a fully **refactored** or improved version of the code.
4. Detect and include line numbers if possible — if not, use null.

📋 Language: ${language}
🎯 Purpose: ${purpose || "General review and debugging"}

📤 Output Format — respond with **raw JSON only** (no markdown, no backticks, no comments):
{
  "issues": [
    {
      "line": number | null,
      "issue": "Short summary of the issue",
      "explanation": "Detailed reasoning and why it's a problem",
      "suggestion": "How to fix or improve it"
    }
  ],
  "overallAssessment": "A short summary of the overall quality of the code",
  "refactoredCode": "An improved version of the code (if possible), as plain text"
}

🧩 Code to Review:
${code}

⚠️ Rules:
- Output valid, parsable JSON only
- Do NOT wrap response in markdown or code blocks
- Do NOT include commentary or extra text outside the JSON object
- Be practical and clear — your goal is to help the developer fix and improve this code quickly
`;


    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let response;
    try {
      response = JSON.parse(text);
    } catch (err) {
      return NextResponse.json(
        { error: "Failed to parse Gemini response", raw: text },
        { status: 500 }
      );
    }

    return NextResponse.json({ review: response }, { status: 200 });
  } catch (error) {
    console.error("Code Review Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
