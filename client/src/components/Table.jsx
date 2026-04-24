export default function Table({ columns, rows, onSort, sortBy, order }) {
  const toggle = (key) => {
    if (!onSort) return;
    if (sortBy === key) onSort(key, order === 'asc' ? 'desc' : 'asc');
    else onSort(key, 'asc');
  };

  return (
    <div className="overflow-x-auto border rounded bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            {columns.map((c) => (
              <th
                key={c.key}
                className={`px-4 py-2 font-medium ${c.sortable ? 'cursor-pointer select-none' : ''}`}
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
              <td colSpan={columns.length} className="text-center py-6 text-gray-400">
                No data
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr key={row.id || i} className="border-t hover:bg-gray-50">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-2">
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
