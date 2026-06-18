import * as core from "@actions/core";
import { readFileSync } from "fs";
import { analyzeFailure } from "./ai";
import { extractImportantLines, sanitizeLog } from "./logParser";
import { postPrComment } from "./comment";

async function run(): Promise<void> {
  try {
    const githubToken = core.getInput("github-token", { required: true });
    const openaiApiKey = core.getInput("openai-api-key", { required: true });
    const maxLogLines = Number(core.getInput("max-log-lines") || "300");

    const logPath = process.env.LOG_FILE_PATH;

    if (!logPath) {
      core.setFailed("LOG_FILE_PATH is required.");
      return;
    }

    const rawLog = readFileSync(logPath, "utf-8");

    const sanitized = sanitizeLog(rawLog);
    const importantLog = extractImportantLines(sanitized, maxLogLines);

    const analysis = await analyzeFailure(openaiApiKey, importantLog);

    await postPrComment(githubToken, analysis);

    core.info("CI failure analysis posted successfully.");
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();