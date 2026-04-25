import { FiHome, FiLock } from 'react-icons/fi';
import DashboardLayout from './DashboardLayout';

const links = [
  { to: '/owner', label: 'Dashboard', icon: <FiHome />, end: true },
  { to: '/owner/change-password', label: 'Change Password', icon: <FiLock /> },
];

export default function OwnerLayout() {
  return <DashboardLayout links={links} title="Store Owner" />;
}
