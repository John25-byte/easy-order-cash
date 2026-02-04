import { AdminNav } from '@/components/admin/AdminNav';
import { OrderCard } from '@/components/admin/OrderCard';
import { useOrders } from '@/context/OrderContext';
import { DollarSign, ShoppingBag, Clock, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const { orders } = useOrders();

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const stats = [
    {
      label: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      color: 'text-primary',
    },
    {
      label: 'Pending',
      value: pendingOrders.length,
      icon: Clock,
      color: 'text-yellow-500',
    },
    {
      label: 'Preparing',
      value: preparingOrders.length,
      icon: TrendingUp,
      color: 'text-blue-500',
    },
    {
      label: 'Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'text-green-500',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <AdminNav />

      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back to your restaurant management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-card rounded-xl border border-border p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-elegant"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
              <p className="font-display text-2xl font-semibold text-foreground mt-1">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Orders */}
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Pending Orders
            </h2>
            <div className="space-y-4">
              {pendingOrders.length > 0 ? (
                pendingOrders.slice(0, 5).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <div className="bg-card rounded-xl border border-border p-8 text-center">
                  <p className="text-muted-foreground">No pending orders</p>
                </div>
              )}
            </div>
          </div>

          {/* Preparing Orders */}
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground mb-4">
              Being Prepared
            </h2>
            <div className="space-y-4">
              {preparingOrders.length > 0 ? (
                preparingOrders.slice(0, 5).map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              ) : (
                <div className="bg-card rounded-xl border border-border p-8 text-center">
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
