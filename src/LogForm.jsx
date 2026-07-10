
import { useState, useEffect, useRef } from 'react';
function LogForm({ onAddLog }) {
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('Info');
  const [timestamp, setTimestamp] = useState('');
  const messageInputRef = useRef(null);
  useEffect(() => {
    messageInputRef.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onAddLog(message, category, timestamp);
    // resets local fields after a successful add
    setMessage('');
    setCategory('Info');
    setTimestamp('');

    // Re-focus so the user can immediately add another entry without
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
