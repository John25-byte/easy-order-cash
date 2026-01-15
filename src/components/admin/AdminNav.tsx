import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, ClipboardList, QrCode, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/menu', icon: UtensilsCrossed, label: 'Menu' },
  { path: '/admin/orders', icon: ClipboardList, label: 'Orders' },
  { path: '/kitchen', icon: QrCode, label: 'Kitchen' },
];

export function AdminNav() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <h1 className="font-display text-xl font-semibold text-gradient-gold">
          La Maison D'Or
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Management System</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
              location.pathname === item.path
                ? 'bg-gradient-gold text-primary-foreground shadow-gold'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-border">
        <Link
          to="/admin/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  );
}
