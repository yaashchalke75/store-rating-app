import DashboardLayout from './DashboardLayout';

const links = [
  { to: '/owner', label: 'Dashboard', end: true },
  { to: '/owner/change-password', label: 'Change Password' },
];

export default function OwnerLayout() {
  return <DashboardLayout links={links} title="Store Owner" />;
}
