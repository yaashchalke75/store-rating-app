import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/ThemeToggle';

const ROLE_LABELS = {
  admin: 'Admin',
  owner: 'Store Owner',
  user: 'User',
};

export default function DashboardLayout({ links, title }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const roleLabel = ROLE_LABELS[user?.role] || user?.role;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <header className="bg-white border-b px-6 py-3 flex items-center justify-between dark:bg-gray-800 dark:border-gray-700">
        <h1 className="font-semibold text-indigo-600 dark:text-indigo-400">StoreRatePro</h1>
        <div className="flex items-center gap-3 text-sm">
          <ThemeToggle />
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center dark:bg-indigo-900/40 dark:text-indigo-300">
              <FiUser />
            </span>
            <span className="text-gray-700 font-medium dark:text-gray-200">{user?.name}</span>
            {roleLabel && (
              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-xs dark:bg-indigo-900/40 dark:text-indigo-300">
                {roleLabel}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        <aside className="w-56 bg-white border-r p-4 flex flex-col dark:bg-gray-800 dark:border-gray-700">
          <div className="px-3 pb-3 mb-2 border-b text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 dark:border-gray-700">
            {title}
          </div>
          <div className="space-y-1 flex-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded text-sm ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`
                }
              >
                {l.icon && <span className="text-base">{l.icon}</span>}
                {l.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-md text-sm font-medium text-red-600 border border-red-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-colors duration-150 shadow-sm dark:text-red-400 dark:border-red-900 dark:hover:bg-red-600 dark:hover:text-white"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </aside>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
