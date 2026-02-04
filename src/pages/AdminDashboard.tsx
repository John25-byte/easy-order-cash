import { AdminNav } from '@/components/admin/AdminNav';
import { OrderCard } from '@/components/admin/OrderCard';
import { useOrders } from '@/context/OrderContext';
import { ShoppingBag, Clock, TrendingUp, Banknote } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

export default function AdminDashboard() {
  const { orders } = useOrders();

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      label: 'Total Orders',
      value: orders.length.toString(),
      icon: ShoppingBag,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      label: 'Pending',
      value: pendingOrders.length.toString(),
      icon: Clock,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
    {
      label: 'Preparing',
      value: preparingOrders.length.toString(),
      icon: TrendingUp,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Revenue',
      value: formatPrice(totalRevenue),
      icon: Banknote,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to your restaurant management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-6 transition-all duration-300 hover:shadow-elevated shadow-card"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
              <p className="font-display text-2xl font-bold text-foreground mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Orders */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Pending Orders
            </h2>
            <div className="space-y-4">
              {pendingOrders.length > 0 ? (
                pendingOrders.slice(0, 5).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <div className="bg-card rounded-xl border border-border p-8 text-center shadow-card">
                  <p className="text-muted-foreground">No pending orders</p>
                </div>
              )}
            </div>
          </div>

          {/* Preparing Orders */}
          <div>
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Being Prepared
            </h2>
            <div className="space-y-4">
              {preparingOrders.length > 0 ? (
                preparingOrders.slice(0, 5).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <div className="bg-card rounded-xl border border-border p-8 text-center shadow-card">
                  <p className="text-muted-foreground">No orders in preparation</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
