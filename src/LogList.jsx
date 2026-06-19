// LogList.jsx
// No hooks here at all — this is a "dumb"/presentational component.
// It receives everything it needs as props and just renders the result.

import LogItem from './LogItem';

function LogList({ logs, searchTerm, onDeleteLog }) {
  // Derived data: calculated fresh on every render from `logs` + `searchTerm`.
  // This is NOT stored in its own useState, because it can always be
  // recalculated from props — storing it separately would risk it
  // going out of sync with the actual source data.
  const filteredLogs = logs.filter((log) => {
    const term = searchTerm.toLowerCase();
    return (
      log.message.toLowerCase().includes(term) ||
      log.category.toLowerCase().includes(term)
    );
  });

  if (filteredLogs.length === 0) {
    return <p>No matching logs found.</p>;
  }

  return (
    <ul>
      {filteredLogs.map((log) => (
        // key={log.id} is required by React to track each list item
        // efficiently across re-renders (not a hook, but a common
        // pairing with list rendering worth mentioning in your presentation).
        <LogItem key={log.id} log={log} onDeleteLog={onDeleteLog} />
      ))}
    </ul>
  );
}

export default LogList;
