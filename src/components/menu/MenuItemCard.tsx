import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';
import { formatPrice } from '@/lib/currency';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem, items, updateQuantity, removeItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const cartItem = items.find((ci) => ci.item.id === item.id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    setIsAdding(true);
    addItem(item);
    setTimeout(() => setIsAdding(false), 300);
  };

  const handleIncrease = () => {
    updateQuantity(item.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity === 1) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, quantity - 1);
    }
  };

  return (
    <div
      className={cn(
        'group relative bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 shadow-card',
        'hover:shadow-elevated hover:-translate-y-1',
        !item.available && 'opacity-60'
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Dietary Tags */}
        {item.dietaryTags && item.dietaryTags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-1.5">
            {item.dietaryTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-white/90 backdrop-blur-sm rounded-full text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Unavailable Badge */}
        {!item.available && (
          <div className="absolute top-3 right-3 px-2 py-1 text-xs font-semibold bg-destructive text-destructive-foreground rounded-md">
            Unavailable
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-foreground leading-tight">
            {item.name}
          </h3>
          <span className="font-display text-lg font-bold text-primary shrink-0">
            {formatPrice(item.price)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 font-body">
          {item.description}
        </p>

        {/* Add to Cart */}
        {item.available && (
          <div className="pt-2">
            {quantity === 0 ? (
              <Button
                variant="orange"
                size="sm"
                className={cn(
                  'w-full transition-transform',
                  isAdding && 'scale-95'
                )}
                onClick={handleAdd}
              >
                <Plus className="w-4 h-4 mr-1" />
                Add to Order
              </Button>
            ) : (
              <div className="flex items-center justify-between bg-muted rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white"
                  onClick={handleDecrease}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-bold text-primary">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-white"
                  onClick={handleIncrease}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
