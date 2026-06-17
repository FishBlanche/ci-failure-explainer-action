import OpenAI from "openai";

export async function analyzeFailure(openaiApiKey: string, log: string): Promise<string> {
  const client = new OpenAI({
    apiKey: openaiApiKey,
  });

  const prompt = `
You are a senior DevOps engineer.

Analyze this GitHub Actions CI failure log.

Return the result in this markdown format:

## CI Failure Analysis

### Summary
Explain what failed in 1-2 sentences.

### Root Cause
Explain the most likely root cause.

### Evidence
Quote the relevant log lines.

### Suggested Fix
Give concrete steps to fix it.

### Confidence
Give a confidence score from 0 to 100.

Rules:
- Do not invent facts.
- If the log is incomplete, say so.
- Be concise and practical.

Log:
${log}
`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.2,
  });

  return response.choices[0]?.message?.content ?? "No analysis generated.";
}