
export function createLog(message, category, timestamp) {
  return {
    id: Date.now(), 
    message,
    category,
    timestamp: timestamp || new Date().toLocaleString(),
  };
}

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
