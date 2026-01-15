import { useOrders } from '@/context/OrderContext';
import { OrderCard } from '@/components/admin/OrderCard';
import { ChefHat, Clock, Check } from 'lucide-react';

export default function KitchenDisplay() {
  const { orders } = useOrders();

  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const preparingOrders = orders.filter((o) => o.status === 'preparing');
  const readyOrders = orders.filter((o) => o.status === 'ready');

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-gold rounded-xl">
            <ChefHat className="w-8 h-8 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">
              Kitchen Display
            </h1>
            <p className="text-sm text-muted-foreground">Real-time order management</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2 bg-yellow-500/10 text-yellow-500 px-3 py-1.5 rounded-full">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{pendingOrders.length} Pending</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-500/10 text-blue-500 px-3 py-1.5 rounded-full">
            <ChefHat className="w-4 h-4" />
            <span className="font-medium">{preparingOrders.length} Preparing</span>
          </div>
          <div className="flex items-center gap-2 bg-green-500/10 text-green-500 px-3 py-1.5 rounded-full">
            <Check className="w-4 h-4" />
            <span className="font-medium">{readyOrders.length} Ready</span>
          </div>
        </div>
      </header>

      {/* Order Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pending Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              New Orders
            </h2>
          </div>
          <div className="space-y-4">
            {pendingOrders.length > 0 ? (
              pendingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="bg-card rounded-xl border border-dashed border-border p-8 text-center">
                <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No new orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Preparing Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              In Preparation
            </h2>
          </div>
          <div className="space-y-4">
            {preparingOrders.length > 0 ? (
              preparingOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="bg-card rounded-xl border border-dashed border-border p-8 text-center">
                <ChefHat className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">Nothing cooking yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Ready Column */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <h2 className="font-display text-xl font-semibold text-foreground">
              Ready to Serve
            </h2>
          </div>
          <div className="space-y-4">
            {readyOrders.length > 0 ? (
              readyOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))
            ) : (
              <div className="bg-card rounded-xl border border-dashed border-border p-8 text-center">
                <Check className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-muted-foreground">No orders ready</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
