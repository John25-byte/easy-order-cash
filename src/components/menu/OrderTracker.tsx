import { useState } from 'react';
import { useOrders } from '@/context/OrderContext';
import { Order } from '@/types/menu';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatPrice } from '@/lib/currency';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { ClipboardList, Clock, ChefHat, Check, Truck, CreditCard, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { toast } from 'sonner';

interface OrderTrackerProps {
  tableNumber: string;
}

const statusSteps = [
  { status: 'pending', label: 'Pending', icon: Clock, progress: 25 },
  { status: 'preparing', label: 'Preparing', icon: ChefHat, progress: 50 },
  { status: 'ready', label: 'Ready', icon: Check, progress: 75 },
  { status: 'delivered', label: 'Delivered', icon: Truck, progress: 100 },
] as const;

const statusColors: Record<string, string> = {
  pending: 'text-yellow-600 bg-yellow-100',
  preparing: 'text-blue-600 bg-blue-100',
  ready: 'text-green-600 bg-green-100',
  delivered: 'text-muted-foreground bg-muted',
};

export function OrderTracker({ tableNumber }: OrderTrackerProps) {
  const { orders, updatePaymentStatus } = useOrders();
  const [isOpen, setIsOpen] = useState(false);
  const [paymentDialog, setPaymentDialog] = useState<Order | null>(null);

  const tableOrders = orders
    .filter((o) => o.tableNumber === tableNumber)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  const activeOrders = tableOrders.filter((o) => o.status !== 'delivered' || o.paymentStatus === 'requested');

  const getProgressValue = (status: Order['status']) => {
    return statusSteps.find((s) => s.status === status)?.progress || 0;
  };

  const handleConfirmPayment = (order: Order) => {
    updatePaymentStatus(order.id, 'paid');
    setPaymentDialog(null);
    toast.success('Payment confirmed!', {
      description: `Order ${order.id} has been marked as paid.`,
    });
  };

  if (tableOrders.length === 0) return null;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            className="fixed bottom-6 left-6 z-50 shadow-elevated rounded-full h-14 px-6 border-primary/30 bg-card"
          >
            <ClipboardList className="w-5 h-5 mr-2 text-primary" />
            <span className="font-semibold">My Orders</span>
            {activeOrders.length > 0 && (
              <span className="ml-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                {activeOrders.length}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-full sm:max-w-md bg-background border-border flex flex-col">
          <SheetHeader className="border-b border-border pb-4">
            <SheetTitle className="font-display text-2xl text-gradient-primary">
              Order Tracking
            </SheetTitle>
            <p className="text-sm text-muted-foreground">Table {tableNumber}</p>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-4 space-y-4">
            {tableOrders.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <ClipboardList className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <h3 className="font-display text-xl text-foreground mb-2">No orders yet</h3>
                <p className="text-muted-foreground text-sm">Place an order to track it here</p>
              </div>
            ) : (
              tableOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-card rounded-xl border border-border shadow-card p-4 space-y-4"
                >
                  {/* Order header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display text-lg font-semibold text-foreground">
                        {order.id}
                      </span>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(order.createdAt, { addSuffix: true })}
                      </p>
                    </div>
                    <Badge className={cn('text-xs', statusColors[order.status])}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-2">
                    <Progress value={getProgressValue(order.status)} className="h-2" />
                    <div className="flex justify-between">
                      {statusSteps.map((step) => {
                        const Icon = step.icon;
                        const isActive = getProgressValue(order.status) >= step.progress;
                        return (
                          <div
                            key={step.status}
                            className={cn(
                              'flex flex-col items-center gap-1',
                              isActive ? 'text-primary' : 'text-muted-foreground/40'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            <span className="text-[10px] font-medium">{step.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Items */}
                  <div className="space-y-1 border-t border-border pt-3">
                    {order.items.map((cartItem) => (
                      <div key={cartItem.item.id} className="flex justify-between text-sm">
                        <span className="text-foreground">
                          <span className="text-primary font-semibold">{cartItem.quantity}×</span>{' '}
                          {cartItem.item.name}
                        </span>
                        <span className="text-muted-foreground">
                          {formatPrice(cartItem.item.price * cartItem.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total & Payment */}
                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <span className="font-display text-lg font-semibold text-primary">
                      {formatPrice(order.total)}
                    </span>

                    {order.paymentStatus === 'requested' && (
                      <Button
                        variant="orange"
                        size="sm"
                        onClick={() => setPaymentDialog(order)}
                        className="animate-pulse"
                      >
                        <CreditCard className="w-4 h-4 mr-1" />
                        Pay Now
                      </Button>
                    )}

                    {order.paymentStatus === 'paid' && (
                      <Badge className="bg-green-100 text-green-700 gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Paid
                      </Badge>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Payment Confirmation Dialog */}
      <Dialog open={!!paymentDialog} onOpenChange={() => setPaymentDialog(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Payment Request</DialogTitle>
            <DialogDescription>
              The restaurant has requested payment for your order.
            </DialogDescription>
          </DialogHeader>

          {paymentDialog && (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Order</span>
                  <span className="font-semibold">{paymentDialog.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Table</span>
                  <span className="font-semibold">{paymentDialog.tableNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-semibold">{paymentDialog.items.length}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-border">
                  <span className="font-semibold text-foreground">Total</span>
                  <span className="font-display text-xl font-bold text-primary">
                    {formatPrice(paymentDialog.total)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Please proceed to the counter or use M-Pesa to complete payment.
              </p>
            </div>
          )}

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setPaymentDialog(null)}>
              Later
            </Button>
            <Button variant="orange" onClick={() => paymentDialog && handleConfirmPayment(paymentDialog)}>
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
