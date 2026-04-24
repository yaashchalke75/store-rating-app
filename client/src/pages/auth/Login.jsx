import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { login } from '../../services/auth';
import { ROLE_HOME } from '../../utils/constants';
import Input from '../../components/Input';
import Button from '../../components/Button';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(form);
      auth.login(res.token, res.user);
      showToast('Welcome back', 'success');
      navigate(ROLE_HOME[res.user.role] || '/');
    } catch (err) {
      showToast(err.response?.data?.message || 'Login failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white border rounded-lg shadow-sm p-8 space-y-5"
      >
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-semibold text-indigo-600">StoreRatePro</h1>
          <p className="text-sm text-gray-500">Sign in to your account</p>
        </div>

        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          required
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Login'}
        </Button>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
