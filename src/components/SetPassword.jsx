import { useState } from 'react'

export default function SetPassword({ onPasswordSet }) {
  const [password, setPassword] = useState('');

  function handleSave() {
    localStorage.setItem('userPassword', password);
    onPasswordSet();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center text-gray-800">Set Your Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 sm:p-4 mb-6 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
        <button
          onClick={handleSave}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 sm:py-4 rounded-md text-sm sm:text-base font-medium transition-colors"
        >
          Save Password
        </button>
      </div>
    </div>
  );
}