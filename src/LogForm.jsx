// LogForm.jsx
// Owns LOCAL state for its own input fields. App.jsx doesn't need to know
// what's being typed on every keystroke — only the final values once the
// form is submitted, via the onAddLog callback prop.

import { useState, useEffect, useRef } from 'react';

function LogForm({ onAddLog }) {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('Info');
  const [timestamp, setTimestamp] = useState('');

  // useRef lives HERE, not in App.jsx, because the actual <input> DOM node
  // it points to is rendered inside this component.
  const messageInputRef = useRef(null);

  // Focus the input once when LogForm first mounts (i.e. when the
  // app first loads), so the user can start typing immediately.
  useEffect(() => {
    messageInputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return; // guard against empty submissions

    // Call the function passed down from App.jsx. LogForm doesn't create
    // the log object itself or touch the logs array — it just reports
    // "here's what the user entered" upward.
    onAddLog(message, category, timestamp);

    // Reset local fields after a successful add
    setMessage('');
    setCategory('Info');
    setTimestamp('');

    // Re-focus so the user can immediately add another entry without
    // reaching for the mouse — same ref, used a second time.
    messageInputRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        ref={messageInputRef}
        type="text"
        placeholder="Log message / description"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Info">Info</option>
        <option value="Alert">Alert</option>
      </select>
      <input
        type="datetime-local"
        value={timestamp}
        onChange={(e) => setTimestamp(e.target.value)}
      />
      <button type="submit">Add Log</button>
    </form>
  );
}

export default LogForm;
