import { useEffect, useState } from 'react';
import { FiUsers, FiShoppingBag, FiStar } from 'react-icons/fi';
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
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Overview</h2>
        <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">Quick snapshot of your platform</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Users" value={data.totalUsers} icon={<FiUsers />} accent="indigo" />
        <Card title="Total Stores" value={data.totalStores} icon={<FiShoppingBag />} accent="emerald" />
        <Card title="Total Ratings" value={data.totalRatings} icon={<FiStar />} accent="amber" />
      </div>
    </div>
  );
}
