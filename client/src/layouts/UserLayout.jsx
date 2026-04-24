import DashboardLayout from './DashboardLayout';

const links = [
  { to: '/stores', label: 'Stores', end: true },
  { to: '/change-password', label: 'Change Password' },
];

export default function UserLayout() {
  return <DashboardLayout links={links} title="User" />;
}
