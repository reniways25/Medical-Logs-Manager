import { SEED_LOGS } from './logModel';
export function fetchLogs() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(SEED_LOGS);
    }, 1000);   });
}
