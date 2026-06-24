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

---

## Installation

Create:

```text
.github/workflows/ci.yml
```

Add:

```yaml
name: CI

on:
  pull_request:

permissions:
  contents: read
  pull-requests: write
  issues: write

jobs:
  test:

    runs-on: ubuntu-latest

    steps:

      - uses: actions/checkout@v4

      - name: Run tests
        id: run_tests
        continue-on-error: true

        run: |
          npm install
          npm test 2>&1 | tee ci.log

      - name: Explain CI failure

        if: steps.run_tests.outcome == 'failure'

        uses: YOUR_USERNAME/ci-failure-explainer-action@v1

        env:
          LOG_FILE_PATH: ci.log

        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}

          openai-api-key:
            ${{ secrets.OPENAI_API_KEY }}
```

---

## Required Secrets

Repository →

Settings →

Secrets and variables →

Actions

Create:

```text
OPENAI_API_KEY
```

Get API key:

https://platform.openai.com/api-keys

---