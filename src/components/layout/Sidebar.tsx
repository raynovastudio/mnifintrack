import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  ArrowRightLeft,
  FolderTree,
  FileBarChart,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { currentUser } from '@/lib/auth';

const baseNavigation = [
  { name: 'Dashboard', href: currentUser.role === 'super_admin' ? '/dashboard/super-admin' : '/dashboard/admin', icon: LayoutDashboard },
  { name: 'Businesses', href: '/businesses', icon: Building2 },
  { name: 'Transactions', href: '/transactions', icon: ArrowRightLeft },
];

// Reports only visible to super admin
const navigation = currentUser.role === 'super_admin' 
  ? [...baseNavigation, { name: 'Reports', href: '/reports', icon: FileBarChart }]
  : baseNavigation;

const bottomNavigation = [
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary">
          <TrendingUp className="h-5 w-5 text-sidebar-primary-foreground" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-sidebar-foreground">FinTrack</h1>
          <p className="text-xs text-sidebar-muted">Business Dashboard</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
        <p className="px-3 py-2 text-xs font-semibold text-sidebar-muted uppercase tracking-wider">
          Main Menu
        </p>
        {navigation.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== '/' && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'sidebar-link group',
                isActive && 'sidebar-link-active'
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className="flex-1">{item.name}</span>
              <ChevronRight 
                className={cn(
                  'h-4 w-4 opacity-0 -translate-x-2 transition-all',
                  'group-hover:opacity-100 group-hover:translate-x-0',
                  isActive && 'opacity-100 translate-x-0'
                )} 
              />
            </Link>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="px-4 py-4 border-t border-sidebar-border space-y-1">
        {bottomNavigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              'sidebar-link',
              location.pathname === item.href && 'sidebar-link-active'
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span>{item.name}</span>
          </Link>
        ))}
        <button className="sidebar-link w-full text-left hover:text-expense">
          <LogOut className="h-5 w-5 shrink-0" />
          <span>Log Out</span>
        </button>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-sm font-semibold text-sidebar-foreground">{currentUser.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{currentUser.name}</p>
            <p className="text-xs text-sidebar-muted truncate capitalize">
              {currentUser.role === 'super_admin' ? 'Super Admin' : 'Admin'}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
