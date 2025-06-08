// app/api/testcases/generate/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const generateTestCaseSchema = z.object({
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional().default("MEDIUM"),
  userStory: z.string().min(1),
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = generateTestCaseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { userStory, priority } = parsed.data;

    const prompt = `
      You are a highly experienced Senior QA Engineer. Based on the provided user story and its priority, generate a set of comprehensive, distinct, and realistic test cases in **raw JSON format only**.

      Your job:
      - Analyze the user story carefully.
      - Identify key functionalities and edge cases.
      - Generate a comprehensive test case with **title**, **description**, **module**, **priority**, **steps**, and **expected results for every step**.

      🎯 **Output Format** — respond with valid JSON array only, no markdown/code block:
      [
        {
          "title": "Meaningful and concise test case title",
          "description": "Short explanation of what this test case validates",
          "module": "Relevant module name (e.g., 'Authentication', 'Search')",
          "priority": "LOW" | "MEDIUM" | "HIGH",  // match the input priority
          "testSteps": [
            {
              "id": "1",
              "action": "Step the user performs",
              "expectedResult": "Expected outcome after performing the step"
            },
            {
              "id": "2",
              "action": "Next user/system interaction",
              "expectedResult": "Expected outcome after this step"
            }
          ]
        },
        ...
      ]

      ✅ **Rules**:
      - Output all possible unique test cases.
      - List all possible steps per test cases and each step must include an **expectedResult** field directly tied to the action.
      - Write realistic actions (e.g., 'Click Login button') and match with clear expected results (e.g., 'User is redirected to dashboard').
      - Use human-friendly, domain-relevant terminology.
      - Infer the module name based on the test context — be specific.
      - Use the provided priority in all test cases.
      - Do **not** wrap the response in quotes, markdown, or code blocks.

      📘 Examples of modules: "Login", "Profile", "Dashboard", "Notifications", "Checkout", "Search", "Settings", etc.

      📋 User Story:"${userStory}"
      🏷️ Priority: ${priority}
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    let generated;
    try {
      generated = JSON.parse(text);
    } catch (err) {
      return NextResponse.json({ error: "Failed to parse AI response", raw: text }, { status: 500 });
    }

    const testCases = generated.map((tc: any) => ({
      ...tc,
      priority,
      status: "PENDING",
    }));

    return NextResponse.json({ testCases }, { status: 200 });
  } catch (error) {
    console.error("Generate Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


