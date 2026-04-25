import { FiShoppingBag, FiLock } from 'react-icons/fi';
import DashboardLayout from './DashboardLayout';

const links = [
  { to: '/stores', label: 'Stores', icon: <FiShoppingBag />, end: true },
  { to: '/change-password', label: 'Change Password', icon: <FiLock /> },
];

export default function UserLayout() {
  return <DashboardLayout links={links} title="User" />;
}
