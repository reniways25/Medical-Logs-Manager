// logModel.js
// No React, no hooks — this file is pure data shape/logic.
// Keeping the "shape" of a log separate means if the backend changes
// the structure later, this is the only file that needs updating.

/**
 * Factory function for creating a new log entry with a consistent shape.
 * @param {string} message - the log description
 * @param {"Info"|"Alert"} category - log category
 * @param {string} [timestamp] - optional; defaults to "now" if not provided
 */
export function createLog(message, category, timestamp) {
  return {
    id: Date.now(), // simple unique id; fine for a demo, not for production
    message,
    category,
    timestamp: timestamp || new Date().toLocaleString(),
  };
}

// A couple of seed logs, used by logApi.js to simulate "data from a server".
export const SEED_LOGS = [
  {
    id: 1,
    message: 'Patient vitals checked — stable',
    category: 'Info',
    timestamp: '2026-06-15 09:00',
  },
  {
    id: 2,
    message: 'Abnormal blood pressure reading',
    category: 'Alert',
    timestamp: '2026-06-15 09:30',
  },
];
