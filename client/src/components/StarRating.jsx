export default function StarRating({ value = 0, onChange, readOnly = false }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          disabled={readOnly}
          onClick={() => !readOnly && onChange?.(n)}
          className={`text-xl ${n <= value ? 'text-yellow-500' : 'text-gray-300'} ${
            readOnly ? 'cursor-default' : 'cursor-pointer'
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
