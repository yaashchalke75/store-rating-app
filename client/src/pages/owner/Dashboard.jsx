import { useEffect, useState } from 'react';
import { FiStar, FiBarChart2 } from 'react-icons/fi';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Loader from '../../components/Loader';
import { getOwnerDashboard, getOwnerRatings } from '../../services/owner';

const columns = [
  { key: 'userName', label: 'User Name' },
  { key: 'userEmail', label: 'Email' },
  { key: 'rating', label: 'Rating', render: (r) => `${r.rating}/5` },
  {
    key: 'date',
    label: 'Date',
    render: (r) => new Date(r.date).toLocaleDateString(),
  },
];

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    getOwnerDashboard().then(setSummary).catch(() => setSummary({ avgRating: 0, totalRatings: 0 }));
    getOwnerRatings().then((r) => setRatings(r.items || r)).catch(() => setRatings([]));
  }, []);

  if (!summary || !ratings) return <Loader />;

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Dashboard</h2>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">Your store's ratings at a glance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Card
          title="Average Rating"
          value={summary.avgRating ? `${Number(summary.avgRating).toFixed(1)}/5` : '—'}
          icon={<FiStar />}
          accent="amber"
        />
        <Card
          title="Total Ratings"
          value={summary.totalRatings ?? ratings.length}
          icon={<FiBarChart2 />}
          accent="indigo"
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 dark:bg-gray-800 dark:border-gray-700">
        <h3 className="font-semibold text-gray-800 mb-4 dark:text-gray-100">Users Who Rated</h3>
        <Table columns={columns} rows={ratings} />
      </div>
    </div>
  );
}
