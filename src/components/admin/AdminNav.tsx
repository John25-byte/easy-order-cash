import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ClipboardList, ChefHat, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/menu', icon: UtensilsCrossed, label: 'Menu' },
  { path: '/admin/orders', icon: ClipboardList, label: 'Orders' },
  { path: '/kitchen', icon: ChefHat, label: 'Kitchen' },
];

export function AdminNav() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col shadow-card">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="font-display text-xl font-bold text-gradient-primary">
          Easy Order
        </h1>
        <p className="text-xs text-muted-foreground mt-1 font-medium">Management System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium',
              location.pathname === item.path
                ? 'bg-gradient-primary text-primary-foreground shadow-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
        >
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
