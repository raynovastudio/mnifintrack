import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { currentUser } from '@/lib/auth';

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to appropriate dashboard based on user role
    const dashboardUrl = currentUser.role === 'super_admin' 
      ? '/dashboard/super-admin' 
      : '/dashboard/admin';
    navigate(dashboardUrl);
  }, [navigate]);

  return null; // This page just redirects
}
