import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import { getUsers } from '../../services/admin';
import { ROLES } from '../../utils/constants';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'address', label: 'Address' },
  { key: 'role', label: 'Role', sortable: true },
  {
    key: 'actions',
    label: '',
    render: (r) => (
      <Link to={`/admin/users/${r.id}`} className="text-indigo-600 hover:underline">
        View
      </Link>
    ),
  },
];

export default function Users() {
  const [search, setSearch] = useState('');
  const [role, setRole] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      getUsers({ search, role, sortBy, order, page, limit: 10 })
        .then(setData)
        .catch(() => setData({ items: [], totalPages: 1 }));
    }, 300);
    return () => clearTimeout(t);
  }, [search, role, sortBy, order, page]);

  const handleSort = (key, dir) => {
    setSortBy(key);
    setOrder(dir);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Users</h2>
        <Link to="/admin/users/new" className="text-sm text-indigo-600 hover:underline">
          + Add User
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search name, email, address" />
        <select
          value={role}
          onChange={(e) => { setRole(e.target.value); setPage(1); }}
          className="border rounded px-3 py-2 text-sm"
        >
          <option value="">All roles</option>
          <option value={ROLES.ADMIN}>Admin</option>
          <option value={ROLES.USER}>User</option>
          <option value={ROLES.OWNER}>Owner</option>
        </select>
      </div>

      {!data ? <Loader /> : (
        <>
          <Table columns={columns} rows={data.items} onSort={handleSort} sortBy={sortBy} order={order} />
          <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
