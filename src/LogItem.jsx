// LogItem.jsx
// No hooks here either. This is the smallest, most "leaf-level" component —
// it just displays one log and reports a click upward via onDeleteLog.

function LogItem({ log, onDeleteLog }) {
  return (
    <li className={`log-item ${log.category.toLowerCase()}`}>
      <span>
        <strong>[{log.category}]</strong> {log.message}
        <br />
        <small>{log.timestamp}</small>
      </span>
      {/* We pass log.id upward — LogItem doesn't know HOW deletion works,
          it just calls the function App.jsx ultimately defined. */}
      <button onClick={() => onDeleteLog(log.id)}>Delete</button>
    </li>
  );
}

export default LogItem;
