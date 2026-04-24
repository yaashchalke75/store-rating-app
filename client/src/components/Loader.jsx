export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-8 text-sm text-gray-500">{text}</div>
  );
}
