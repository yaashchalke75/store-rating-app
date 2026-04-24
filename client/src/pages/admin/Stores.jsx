import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import Loader from '../../components/Loader';
import { getStores } from '../../services/admin';

const columns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
  { key: 'address', label: 'Address' },
  {
    key: 'avgRating',
    label: 'Avg Rating',
    render: (r) => (r.avgRating ? Number(r.avgRating).toFixed(1) : '-'),
  },
];

export default function Stores() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => {
      getStores({ search, sortBy, order, page, limit: 10 })
        .then(setData)
        .catch(() => setData({ items: [], totalPages: 1 }));
    }, 300);
    return () => clearTimeout(t);
  }, [search, sortBy, order, page]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Stores</h2>
        <Link to="/admin/stores/new" className="text-sm text-indigo-600 hover:underline">
          + Add Store
        </Link>
      </div>

      <div className="mb-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search name, email, address" />
      </div>

      {!data ? <Loader /> : (
        <>
          <Table
            columns={columns}
            rows={data.items}
            onSort={(k, d) => { setSortBy(k); setOrder(d); }}
            sortBy={sortBy}
            order={order}
          />
          <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
