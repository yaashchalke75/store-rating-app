import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { createStore, getUsers } from '../../services/admin';
import { useToast } from '../../context/ToastContext';
import { ROLES } from '../../utils/constants';
import { validateName, validateEmail, validateAddress } from '../../utils/validators';

export default function AddStore() {
  const [form, setForm] = useState({ name: '', email: '', address: '', ownerId: '' });
  const [owners, setOwners] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getUsers({ role: ROLES.OWNER, limit: 100 })
      .then((r) => setOwners(r.items || []))
      .catch(() => setOwners([]));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      address: validateAddress(form.address),
      ownerId: form.ownerId ? '' : 'Select an owner',
    };
    setErrors(e);
    return Object.values(e).every((x) => !x);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await createStore(form);
      showToast('Store created', 'success');
      navigate('/admin/stores');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create store', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-lg font-semibold mb-4">Add Store</h2>
      <form onSubmit={handleSubmit} className="bg-white border rounded p-6 space-y-4">
        <Input label="Name" name="name" placeholder="Store name (20-60 characters)" value={form.name} onChange={handleChange} error={errors.name} />
        <Input label="Email" name="email" type="email" placeholder="store@example.com" value={form.email} onChange={handleChange} error={errors.email} />
        <Input label="Address" name="address" placeholder="Shop address with city, state" value={form.address} onChange={handleChange} error={errors.address} />
        <div>
          <label className="block text-sm font-medium mb-1">Owner</label>
          <select
            name="ownerId"
            value={form.ownerId}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="">Select owner</option>
            {owners.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name} ({o.email})
              </option>
            ))}
          </select>
          {errors.ownerId && <p className="text-xs text-red-600 mt-1">{errors.ownerId}</p>}
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Create Store'}
        </Button>
      </form>
    </div>
  );
}
