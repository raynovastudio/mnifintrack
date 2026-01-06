// User roles for the application
export type UserRole = 'admin' | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

// Mock current user (in a real app, this would come from an auth system)
export const currentUser: User = {
  id: '1',
  name: 'Admin User',
  email: 'admin@mnifintrack.com',
  role: 'super_admin', // Change to 'admin' to test admin dashboard
};

export const isSuperAdmin = (user: User): boolean => user.role === 'super_admin';
export const isAdmin = (user: User): boolean => user.role === 'admin';
