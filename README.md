# CI Failure Explainer Action

An AI-powered GitHub Action that analyzes failed CI logs and explains the root cause, evidence, and suggested fixes directly in pull requests.

## Why I Built This

CI failures are often time-consuming to debug, especially when logs are long and noisy. This tool helps developers quickly understand why a pipeline failed and what to do next.

## Features

- Analyze failed CI logs
- Extract important error lines
- Sanitize secrets before sending logs to AI
- Generate root-cause analysis
- Suggest practical fixes
- Post analysis as a pull request comment

## Tech Stack

- TypeScript
- GitHub Actions Toolkit
- OpenAI API
- Jest

## Planned Workflow

```text
GitHub Actions CI fails
↓
CI log is collected
↓
Important error lines are extracted
↓
Secrets are sanitized
↓
AI analyzes the failure
↓
Result is posted to the pull request