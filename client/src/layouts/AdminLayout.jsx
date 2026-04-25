import { FiHome, FiUsers, FiShoppingBag, FiUserPlus, FiPlusSquare } from 'react-icons/fi';
import DashboardLayout from './DashboardLayout';

const links = [
  { to: '/admin', label: 'Dashboard', icon: <FiHome />, end: true },
  { to: '/admin/users', label: 'Users', icon: <FiUsers /> },
  { to: '/admin/stores', label: 'Stores', icon: <FiShoppingBag /> },
  { to: '/admin/users/new', label: 'Add User', icon: <FiUserPlus /> },
  { to: '/admin/stores/new', label: 'Add Store', icon: <FiPlusSquare /> },
];

export default function AdminLayout() {
  return <DashboardLayout links={links} title="Admin Panel" />;
}
