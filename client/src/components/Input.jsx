export default function Input({ label, error, className = '', ...rest }) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">{label}</label>
      )}
      <input
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-500"
        {...rest}
      />
      {error && <p className="text-xs text-red-600 mt-1 dark:text-red-400">{error}</p>}
    </div>
  );
}
