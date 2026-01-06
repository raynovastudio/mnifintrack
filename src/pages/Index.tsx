import { currentUser } from '@/lib/auth';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';

export default function Index() {
  // Route to appropriate dashboard based on user role
  return currentUser.role === 'super_admin' ? <SuperAdminDashboard /> : <AdminDashboard />;
}
