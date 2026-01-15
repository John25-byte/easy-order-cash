import { ShoppingBag, Minus, Plus, Trash2, Send } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/context/CartContext';
import { useOrders } from '@/context/OrderContext';
import { useState } from 'react';
import { toast } from 'sonner';

interface CartSheetProps {
  tableNumber: string;
}

export function CartSheet({ tableNumber }: CartSheetProps) {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();
  const { addOrder } = useOrders();
  const [specialRequests, setSpecialRequests] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handlePlaceOrder = () => {
    if (items.length === 0) return;

    const order = addOrder(tableNumber, items, total, specialRequests);
    clearCart();
    setSpecialRequests('');
    setIsOpen(false);

    toast.success('Order Placed Successfully!', {
      description: `Order ${order.id} - Your order has been sent to the kitchen.`,
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="gold"
          size="lg"
          className="fixed bottom-6 right-6 z-50 shadow-elegant rounded-full h-14 px-6"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          <span className="font-semibold">${total.toFixed(2)}</span>
          {itemCount > 0 && (
            <span className="ml-2 bg-background text-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md bg-background border-border flex flex-col">
        <SheetHeader className="border-b border-border pb-4">
          <SheetTitle className="font-display text-2xl text-gradient-gold">
            Your Order
          </SheetTitle>
          <p className="text-sm text-muted-foreground">Table {tableNumber}</p>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="font-display text-xl text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground text-sm">
              Add some delicious items to get started
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((cartItem) => (
                <div
                  key={cartItem.item.id}
                  className="bg-card rounded-lg p-4 border border-border/50"
                >
                  <div className="flex gap-3">
                    <img
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-display text-sm font-medium text-foreground truncate">
                        {cartItem.item.name}
                      </h4>
                      <p className="text-primary font-semibold text-sm mt-0.5">
                        ${cartItem.item.price}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(cartItem.item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-6 text-center font-semibold text-sm">
                        {cartItem.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => updateQuantity(cartItem.item.id, cartItem.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <span className="font-display font-semibold text-foreground">
                      ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <Textarea
                placeholder="Special requests or dietary notes..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="bg-secondary/50 border-border resize-none"
                rows={2}
              />

              <div className="flex items-center justify-between py-2">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-display text-xl font-semibold text-foreground">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button
                variant="gold"
                size="xl"
                className="w-full"
                onClick={handlePlaceOrder}
              >
                <Send className="w-5 h-5 mr-2" />
                Place Order
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
