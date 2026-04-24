import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Loader from '../../components/Loader';
import { getOwnerDashboard, getOwnerRatings } from '../../services/owner';

const columns = [
  { key: 'userName', label: 'User Name' },
  { key: 'userEmail', label: 'Email' },
  { key: 'rating', label: 'Rating' },
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
      <h2 className="text-lg font-semibold mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card title="Average Rating" value={summary.avgRating ? Number(summary.avgRating).toFixed(1) : '—'} />
        <Card title="Total Ratings" value={summary.totalRatings ?? ratings.length} />
      </div>

      <h3 className="font-semibold mb-2 text-sm">Users Who Rated</h3>
      <Table columns={columns} rows={ratings} />
    </div>
  );
}
