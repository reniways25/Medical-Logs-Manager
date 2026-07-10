import LogItem from './LogItem';
function LogList({ logs, searchTerm, onDeleteLog }) {
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
        <LogItem key={log.id} log={log} onDeleteLog={onDeleteLog} />
      ))}
    </ul>
  );
}

export default LogList;
