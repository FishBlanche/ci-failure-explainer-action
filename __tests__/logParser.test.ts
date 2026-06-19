import { extractImportantLines, sanitizeLog } from "../src/logParser";

test("extracts important error lines", () => {
  const log = `
installing dependencies
running tests
Error: Cannot find module 'react'
build failed
done
`;

  const result = extractImportantLines(log);

  expect(result).toContain("Error");
  expect(result).toContain("build failed");
});

test("sanitizes secrets", () => {
  const log = `
token=abc123
password=my-secret-password
ghp_1234567890abcdef
`;

  const result = sanitizeLog(log);

  expect(result).toContain("[REDACTED");
  expect(result).not.toContain("my-secret-password");
});