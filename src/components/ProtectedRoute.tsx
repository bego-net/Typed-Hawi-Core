import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isAdminLoggedIn } from '../auth/token'

export default function ProtectedRoute() {
  const location = useLocation()

  if (!isAdminLoggedIn()) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />
  }

  return <Outlet />
}

