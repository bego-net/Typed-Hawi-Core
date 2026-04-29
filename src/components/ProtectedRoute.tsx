import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAdminLoggedIn } from '../auth/token'
import AdminLayout from './admin/AdminLayout'

export default function ProtectedRoute() {
  const location = useLocation()

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <AdminLayout />
}

