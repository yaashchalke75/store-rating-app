import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

export default function Input({ label, error, className = '', type = 'text', ...rest }) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && show ? 'text' : type;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{label}</label>
      )}
      <div className="relative">
        <input
          type={inputType}
          className={`w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500 ${
            isPassword ? 'pr-10' : ''
          }`}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            aria-label={show ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            {show ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-600 mt-1 dark:text-red-400">{error}</p>}
    </div>
  );
}
