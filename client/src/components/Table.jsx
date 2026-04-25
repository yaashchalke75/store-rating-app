export default function Table({ columns, rows, onSort, sortBy, order }) {
  const toggle = (key) => {
    if (!onSort) return;
    if (sortBy === key) onSort(key, order === 'asc' ? 'desc' : 'asc');
    else onSort(key, 'asc');
  };

  return (
    <div className="overflow-x-auto border rounded-lg bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <table className="min-w-full text-sm">
        <thead className="bg-indigo-600 text-white text-left dark:bg-indigo-700">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={`px-4 py-3 font-medium text-xs uppercase tracking-wide ${
                  c.sortable ? 'cursor-pointer select-none hover:bg-indigo-700 dark:hover:bg-indigo-800' : ''
                }`}
                onClick={() => c.sortable && toggle(c.key)}
              >
                {c.label}
                {c.sortable && sortBy === c.key && (order === 'asc' ? ' ↑' : ' ↓')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8 text-gray-400 dark:text-gray-500">
                No data
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={row.id || i}
                className={`border-t hover:bg-indigo-50 dark:border-gray-700 dark:hover:bg-gray-700 dark:text-gray-200 ${
                  i % 2 === 1 ? 'bg-gray-50 dark:bg-gray-800/60' : ''
                }`}
              >
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3">
                    {c.render ? c.render(row) : row[c.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
