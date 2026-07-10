function LogItem({ log, onDeleteLog }) {
  return (
    <li className={`log-item ${log.category.toLowerCase()}`}>
      <span>
        <strong>[{log.category}]</strong> {log.message}
        <br />
        <small>{log.timestamp}</small>
      </span>
      <button onClick={() => onDeleteLog(log.id)}>Delete</button>
    </li>
  );
}

export default LogItem;
