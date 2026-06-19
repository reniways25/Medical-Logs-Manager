// logApi.js
// Simulates a network request. No hooks here — this is plain async logic
// that *could* later be swapped for a real fetch('/api/logs') call without
// changing anything in App.jsx, since the function signature stays the same.

import { SEED_LOGS } from './logModel';

/**
 * Simulates GET /api/logs
 * Returns a Promise that resolves after a delay, just like a real request.
 */
export function fetchLogs() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SEED_LOGS);
    }, 1000); // 1 second fake network latency
  });
}
