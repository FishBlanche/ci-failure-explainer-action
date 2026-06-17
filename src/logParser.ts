export function extractImportantLines(log: string, maxLines: number = 300): string {
  const keywords = [
    "error",
    "failed",
    "failure",
    "exception",
    "cannot",
    "not found",
    "permission denied",
    "npm err",
    "build failed",
    "test failed",
    "caused by"
  ];

  const lines = log.split("\n");

  const importantLines = lines.filter((line) =>
    keywords.some((keyword) => line.toLowerCase().includes(keyword))
  );

  const result = importantLines.length > 0 ? importantLines : lines.slice(-maxLines);

  return result.slice(-maxLines).join("\n");
}

export function sanitizeLog(log: string): string {
  return log
    .replace(/ghp_[A-Za-z0-9_]+/g, "[REDACTED_GITHUB_TOKEN]")
    .replace(/sk-[A-Za-z0-9]+/g, "[REDACTED_OPENAI_KEY]")
    .replace(/password\s*=\s*.+/gi, "password=[REDACTED]")
    .replace(/token\s*=\s*.+/gi, "token=[REDACTED]");
}