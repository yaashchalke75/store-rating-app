import { FiHome } from 'react-icons/fi';
import DashboardLayout from './DashboardLayout';

const links = [
  { to: '/owner', label: 'Dashboard', icon: <FiHome />, end: true },
];

export default function OwnerLayout() {
  return <DashboardLayout links={links} title="Store Owner" />;
}
