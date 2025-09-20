import { useState } from 'react';

export default function SetPassword({ onPasswordSet }) {
  const [password, setPassword] = useState('');

  function handleSave() {
    localStorage.setItem('userPassword', password);
    onPasswordSet();
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Set Your Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-4"
      />
      <button
        onClick={handleSave}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save Password
      </button>
    </div>
  );
}