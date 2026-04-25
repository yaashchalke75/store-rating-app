import { FiShoppingBag } from 'react-icons/fi';
import DashboardLayout from './DashboardLayout';

const links = [
  { to: '/stores', label: 'Stores', icon: <FiShoppingBag />, end: true },
];

export default function UserLayout() {
  return <DashboardLayout links={links} title="User" />;
}
