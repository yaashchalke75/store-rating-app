import { useEffect, useState } from 'react';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import { getDashboard } from '../../services/admin';

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboard().then(setData).catch(() => setData({ totalUsers: 0, totalStores: 0, totalRatings: 0 }));
  }, []);

  if (!data) return <Loader />;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Users" value={data.totalUsers} />
        <Card title="Total Stores" value={data.totalStores} />
        <Card title="Total Ratings" value={data.totalRatings} />
      </div>
    </div>
  );
}
