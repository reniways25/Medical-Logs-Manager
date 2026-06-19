// useLocalStorage.js
// Custom hook: composes useState + useEffect to persist a piece of state
// to localStorage automatically. Used only by App.jsx, since App.jsx is
// the component that owns the `logs` state.

import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    // Lazy initializer: runs once on first render only, not on every render.
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key:', key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing localStorage key:', key, error);
    }
  }, [key, storedValue]);

  // Mirrors useState's own return signature: [value, setter]
  return [storedValue, setStoredValue];
}

export default useLocalStorage;
