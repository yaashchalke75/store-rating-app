import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import Loader from '../../components/Loader';
import StarRating from '../../components/StarRating';
import Pagination from '../../components/Pagination';
import { listStores, submitRating, updateRating } from '../../services/stores';
import { useToast } from '../../context/ToastContext';

export default function Stores() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [data, setData] = useState(null);
  const { showToast } = useToast();

  const load = () => {
    listStores({ search, page, limit: 10 })
      .then(setData)
      .catch(() => setData({ items: [], totalPages: 1 }));
  };

  useEffect(() => {
    const t = setTimeout(load, 300);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, page]);

  const handleRate = async (store, rating) => {
    try {
      if (store.myRating) await updateRating(store.id, rating);
      else await submitRating(store.id, rating);
      showToast('Rating saved', 'success');
      load();
    } catch (err) {
      showToast(err.response?.data?.message || 'Could not save rating', 'error');
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Stores</h2>
      <div className="mb-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search by name or address" />
      </div>

      {!data ? <Loader /> : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.items.map((s) => (
              <div key={s.id} className="bg-white border rounded p-5">
                <h3 className="font-semibold">{s.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{s.address}</p>
                <div className="mt-3 text-sm">
                  <span className="text-gray-500">Overall: </span>
                  {s.avgRating ? Number(s.avgRating).toFixed(1) : '—'}
                </div>
                <div className="mt-3">
                  <p className="text-sm text-gray-500 mb-1">My rating</p>
                  <StarRating value={s.myRating || 0} onChange={(n) => handleRate(s, n)} />
                </div>
              </div>
            ))}
            {data.items.length === 0 && (
              <p className="text-sm text-gray-500">No stores found.</p>
            )}
          </div>
          <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
        </>
      )}
    </div>
  );
}
