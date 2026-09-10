const ACTIVE_ON_US_STATUSES = [
  "New Request",
  "Needs Clarification",
  "Ready to Assign",
  "In Progress",
];

export function isFlagged(request) {
  if (!ACTIVE_ON_US_STATUSES.includes(request.status)) return false;
  const hoursSinceUpdate =
    (Date.now() - new Date(request.lastUpdatedAt)) / (1000 * 60 * 60);
  return hoursSinceUpdate > 24;
}

export function isWaitingOnClient(request) {
  return request.status === "Waiting on Client";
}

export function isUnassigned(request) {
  return !request.owner && request.status !== "Done";
}

export function isWaitingOnUs(request) {
  return ACTIVE_ON_US_STATUSES.includes(request.status);
}