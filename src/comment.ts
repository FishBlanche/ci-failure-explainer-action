import * as github from "@actions/github";

export async function postPrComment(
  token: string,
  body: string
): Promise<void> {
  const octokit = github.getOctokit(token);
  const context = github.context;

  const pullRequest = context.payload.pull_request;

  if (!pullRequest) {
    console.log("No pull request found. Skipping PR comment.");
    return;
  }

  await octokit.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: pullRequest.number,
    body,
  });
}