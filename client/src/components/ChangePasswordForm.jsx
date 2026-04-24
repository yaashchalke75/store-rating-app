import { useState } from 'react';
import Input from './Input';
import Button from './Button';
import { changePassword } from '../services/auth';
import { useToast } from '../context/ToastContext';
import { validatePassword } from '../utils/validators';

export default function ChangePasswordForm() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = validatePassword(form.newPassword);
    if (newError) return setErrors({ newPassword: newError });
    setErrors({});
    setLoading(true);
    try {
      await changePassword(form);
      showToast('Password changed', 'success');
      setForm({ currentPassword: '', newPassword: '' });
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to change password', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit} className="bg-white border rounded p-6 space-y-4">
        <Input
          label="Current Password"
          name="currentPassword"
          type="password"
          value={form.currentPassword}
          onChange={handleChange}
          required
        />
        <Input
          label="New Password"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Update Password'}
        </Button>
      </form>
    </div>
  );
}
