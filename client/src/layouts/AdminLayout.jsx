import DashboardLayout from './DashboardLayout';

const links = [
  { to: '/admin', label: 'Dashboard', end: true },
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/stores', label: 'Stores' },
  { to: '/admin/users/new', label: 'Add User' },
  { to: '/admin/stores/new', label: 'Add Store' },
];

export default function AdminLayout() {
  return <DashboardLayout links={links} title="Admin Panel" />;
}
