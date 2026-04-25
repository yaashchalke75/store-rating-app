import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { createUser } from '../../services/admin';
import { useToast } from '../../context/ToastContext';
import { ROLES } from '../../utils/constants';
import { validateName, validateEmail, validateAddress, validatePassword } from '../../utils/validators';

export default function AddUser() {
  const [form, setForm] = useState({ name: '', email: '', password: '', address: '', role: ROLES.USER });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const e = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      address: validateAddress(form.address),
      password: validatePassword(form.password),
    };
    setErrors(e);
    return Object.values(e).every((x) => !x);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await createUser(form);
      showToast('User created', 'success');
      navigate('/admin/users');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create user', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Add User</h2>
      <form onSubmit={handleSubmit} className="bg-white border rounded p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
        <Input label="Name" name="name" placeholder="Full name (20-60 characters)" value={form.name} onChange={handleChange} error={errors.name} />
        <Input label="Email" name="email" type="email" placeholder="user@example.com" value={form.email} onChange={handleChange} error={errors.email} />
        <Input label="Address" name="address" placeholder="House, street, city, state" value={form.address} onChange={handleChange} error={errors.address} />
        <Input label="Password" name="password" type="password" placeholder="8-16 chars, 1 uppercase, 1 special" value={form.password} onChange={handleChange} error={errors.password} />
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-gray-300">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          >
            <option value={ROLES.USER}>User</option>
            <option value={ROLES.ADMIN}>Admin</option>
            <option value={ROLES.OWNER}>Owner</option>
          </select>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Create User'}
        </Button>
      </form>
    </div>
  );
}
