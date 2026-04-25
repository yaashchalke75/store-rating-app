const ACCENTS = {
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-300',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-900/40 dark:text-amber-300',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300',
};

export default function Card({ title, value, icon, accent = 'indigo' }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          <p className="text-3xl font-semibold mt-2 text-gray-800 dark:text-gray-100">{value}</p>
        </div>
        {icon && (
          <div className={`h-10 w-10 rounded-lg flex items-center justify-center text-lg ${ACCENTS[accent] || ACCENTS.indigo}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
