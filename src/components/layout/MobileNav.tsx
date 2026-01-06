import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  ArrowRightLeft,
  FolderTree,
  FileBarChart,
  Menu,
  X,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Businesses', href: '/businesses', icon: Building2 },
  { name: 'Transactions', href: '/transactions', icon: ArrowRightLeft },
  { name: 'Categories', href: '/categories', icon: FolderTree },
  { name: 'Reports', href: '/reports', icon: FileBarChart },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-sidebar border-b border-sidebar-border">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary">
            <TrendingUp className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-bold text-sidebar-foreground">FinTrack</span>
        </div>
        
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground hover:bg-sidebar-accent">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar border-sidebar-border">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-4 py-4 border-b border-sidebar-border">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sidebar-primary">
                    <TrendingUp className="h-4 w-4 text-sidebar-primary-foreground" />
                  </div>
                  <span className="text-lg font-bold text-sidebar-foreground">FinTrack</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setOpen(false)}
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 px-4 py-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-colors',
                        isActive && 'bg-sidebar-accent text-sidebar-foreground font-medium'
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="px-4 py-4 border-t border-sidebar-border">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="h-9 w-9 rounded-full bg-sidebar-accent flex items-center justify-center">
                    <span className="text-sm font-semibold text-sidebar-foreground">JD</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
                    <p className="text-xs text-sidebar-muted">Administrator</p>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
