import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { validateName, validateEmail, validateAddress, validatePassword } from '../../utils/validators';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
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
      const res = await register(form);
      auth.login(res.token, res.user);
      showToast('Account created', 'success');
      navigate('/stores');
    } catch (err) {
      showToast(err.response?.data?.message || 'Signup failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white border rounded p-6 space-y-4 dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-xl font-semibold dark:text-gray-100">Create Account</h2>
        <Input label="Name" name="name" placeholder="Full name (20-60 characters)" value={form.name} onChange={handleChange} error={errors.name} />
        <Input label="Email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} error={errors.email} />
        <Input label="Address" name="address" placeholder="House, street, city, state" value={form.address} onChange={handleChange} error={errors.address} />
        <Input label="Password" name="password" type="password" placeholder="8-16 chars, 1 uppercase, 1 special" value={form.password} onChange={handleChange} error={errors.password} />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Sign up'}
        </Button>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline dark:text-indigo-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
