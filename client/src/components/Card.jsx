export default function Card({ title, value }) {
  return (
    <div className="bg-white border rounded p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-1">{value}</p>
    </div>
  );
}
