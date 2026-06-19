// App.jsx
// The root component. This is where GLOBAL state lives — state that more
// than one component needs to read or change (logs is needed by both the
// form, which adds to it, and the list, which displays/deletes from it).

import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { fetchLogs } from './logApi';
import { createLog } from './logModel';
import LogForm from './LogForm';
import LogList from './LogList';
import './App.css';

function App() {
  // useLocalStorage instead of plain useState — this is our custom hook
  // from Step 5. It behaves exactly like useState([]) from the outside,
  // but automatically persists `logs` to localStorage under the hood.
  const [logs, setLogs] = useLocalStorage('medicalLogs', []);

  // Tracks whether the initial "fetch" is still in progress.
  const [isLoading, setIsLoading] = useState(true);

  // Lives here (not inside LogList) because it conceptually sits with the
  // search bar in the UI, and keeping it lifted means App.jsx is the
  // single source of truth for "what is currently displayed".
  const [searchTerm, setSearchTerm] = useState('');

  // useEffect: simulates fetching logs from a server on mount.
  // Empty dependency array [] -> runs exactly once, right after the
  // first render, mimicking a real "load data when the page opens" flow.
  useEffect(() => {
    let isMounted = true; // guard against setting state after unmount

    fetchLogs().then((data) => {
      if (isMounted) {
        // Only overwrite localStorage-loaded logs with the "fetched" ones
        // if there's nothing already stored — otherwise a refresh would
        // wipe out logs the user added during a previous session.
        setLogs((prevLogs) => (prevLogs.length > 0 ? prevLogs : data));
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false; // cleanup: prevents a "setState on unmounted component" warning
    };
  }, [setLogs]);

  // Handler passed DOWN to LogForm. LogForm doesn't know HOW logs are
  // stored — it just calls this function with the data the user typed.
  const handleAddLog = (message, category, timestamp) => {
    const newLog = createLog(message, category, timestamp);

    // Never mutate state directly — always create a new array reference
    // so React's change-detection (via Object.is comparison) catches it.
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };

  // Handler passed DOWN to LogList (which passes it further down to LogItem).
  const handleDeleteLog = (idToDelete) => {
    setLogs((prevLogs) => prevLogs.filter((log) => log.id !== idToDelete));
  };

  return (
    <div className="container">
      <h1>Medical Logs Manager</h1>

      {/* LogForm only needs a way to ADD a log — it receives the handler
          as a prop and has no idea `logs` even exists. */}
      <LogForm onAddLog={handleAddLog} />

      <input
        type="text"
        placeholder="Search by message or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {isLoading ? (
        <p>Loading logs...</p>
      ) : (
        <LogList
          logs={logs}
          searchTerm={searchTerm}
          onDeleteLog={handleDeleteLog}
        />
      )}
    </div>
  );
}

export default App;
