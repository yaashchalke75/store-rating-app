import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import { getUser } from '../../services/admin';
import { ROLES } from '../../utils/constants';

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(id).then(setUser).catch(() => setUser(null));
  }, [id]);

  if (!user) return <Loader />;

  return (
    <div className="max-w-lg">
      <Link to="/admin/users" className="text-sm text-indigo-600 hover:underline">
        ← Back to users
      </Link>
      <div className="bg-white border rounded p-6 mt-3 space-y-2">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <p className="text-sm"><span className="text-gray-500">Email:</span> {user.email}</p>
        <p className="text-sm"><span className="text-gray-500">Address:</span> {user.address}</p>
        <p className="text-sm"><span className="text-gray-500">Role:</span> {user.role}</p>
        {user.role === ROLES.OWNER && (
          <p className="text-sm">
            <span className="text-gray-500">Store Rating:</span>{' '}
            {user.storeRating != null ? Number(user.storeRating).toFixed(1) : 'No ratings yet'}
          </p>
        )}
      </div>
    </div>
  );
}
