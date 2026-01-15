import { Clock, ChefHat, Check, Truck } from 'lucide-react';
import { Order } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { useOrders } from '@/context/OrderContext';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface OrderCardProps {
  order: Order;
  showActions?: boolean;
}

const statusConfig = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
  },
  preparing: {
    label: 'Preparing',
    icon: ChefHat,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
  },
  ready: {
    label: 'Ready',
    icon: Check,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    border: 'border-green-500/30',
  },
  delivered: {
    label: 'Delivered',
    icon: Truck,
    color: 'text-muted-foreground',
    bg: 'bg-muted/50',
    border: 'border-muted',
  },
};

export function OrderCard({ order, showActions = true }: OrderCardProps) {
  const { updateOrderStatus } = useOrders();
  const config = statusConfig[order.status];
  const StatusIcon = config.icon;

  const getNextStatus = (): Order['status'] | null => {
    switch (order.status) {
      case 'pending':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'delivered';
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus();

  return (
    <div
      className={cn(
        'bg-card rounded-xl border p-4 transition-all duration-300',
        config.border
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold text-foreground">
              {order.id}
            </span>
            <span className="text-sm text-muted-foreground">
              Table {order.tableNumber}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDistanceToNow(order.createdAt, { addSuffix: true })}
          </p>
        </div>

        <div
          className={cn(
            'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
            config.bg,
            config.color
          )}
        >
          <StatusIcon className="w-4 h-4" />
          {config.label}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-2 mb-4">
        {order.items.map((cartItem) => (
          <div key={cartItem.item.id} className="flex items-center justify-between text-sm">
            <span className="text-foreground">
              <span className="text-primary font-medium">{cartItem.quantity}×</span>{' '}
              {cartItem.item.name}
            </span>
            <span className="text-muted-foreground">
              ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Special Requests */}
      {order.specialRequests && (
        <div className="bg-secondary/30 rounded-lg p-3 mb-4">
          <p className="text-xs text-muted-foreground mb-1">Special Requests:</p>
          <p className="text-sm text-foreground">{order.specialRequests}</p>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="font-display text-lg font-semibold text-primary">
          ${order.total.toFixed(2)}
        </span>

        {showActions && nextStatus && (
          <Button
            variant="gold"
            size="sm"
            onClick={() => updateOrderStatus(order.id, nextStatus)}
          >
            Mark as {statusConfig[nextStatus].label}
          </Button>
        )}
      </div>
    </div>
  );
}
