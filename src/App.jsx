import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import { fetchLogs } from './logApi';
import { createLog } from './logModel';
import LogForm from './LogForm';
import LogList from './LogList';
import './App.css';

function App() {
  const [logs, setLogs] = useLocalStorage('medicalLogs', []);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    let isMounted = true; // guard against setting state after unmount
    fetchLogs().then((data) => {
      if (isMounted) {
        setLogs((prevLogs) => (prevLogs.length > 0 ? prevLogs : data));
        setIsLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [setLogs]);
  const handleAddLog = (message, category, timestamp) => {
    const newLog = createLog(message, category, timestamp);
    setLogs((prevLogs) => [newLog, ...prevLogs]);
  };
  const handleDeleteLog = (idToDelete) => {
    setLogs((prevLogs) => prevLogs.filter((log) => log.id !== idToDelete));
  };

  return (
    <div className="container">
      <h1>Medical Logs Manager</h1>

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
