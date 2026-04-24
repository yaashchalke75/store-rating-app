import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ROLE_HOME, ROLES } from '../utils/constants';
import ProtectedRoute from './ProtectedRoute';

import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';

import AdminLayout from '../layouts/AdminLayout';
import AdminDashboard from '../pages/admin/Dashboard';
import AdminUsers from '../pages/admin/Users';
import AdminStores from '../pages/admin/Stores';
import AddUser from '../pages/admin/AddUser';
import AddStore from '../pages/admin/AddStore';
import UserDetail from '../pages/admin/UserDetail';

import UserLayout from '../layouts/UserLayout';
import UserStores from '../pages/user/Stores';
import UserChangePassword from '../pages/user/ChangePassword';

import OwnerLayout from '../layouts/OwnerLayout';
import OwnerDashboard from '../pages/owner/Dashboard';
import OwnerChangePassword from '../pages/owner/ChangePassword';

export default function AppRoutes() {
  const { user } = useAuth();
  const home = user ? ROLE_HOME[user.role] : '/login';

  return (
    <Routes>
      <Route path="/" element={<Navigate to={home} replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        element={
          <ProtectedRoute roles={[ROLES.ADMIN]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/users/new" element={<AddUser />} />
        <Route path="/admin/users/:id" element={<UserDetail />} />
        <Route path="/admin/stores" element={<AdminStores />} />
        <Route path="/admin/stores/new" element={<AddStore />} />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={[ROLES.USER]}>
            <UserLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/stores" element={<UserStores />} />
        <Route path="/change-password" element={<UserChangePassword />} />
      </Route>

      <Route
        element={
          <ProtectedRoute roles={[ROLES.OWNER]}>
            <OwnerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/change-password" element={<OwnerChangePassword />} />
      </Route>

      <Route path="*" element={<Navigate to={home} replace />} />
    </Routes>
  );
}
