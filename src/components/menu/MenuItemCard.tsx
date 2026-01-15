import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { MenuItem } from '@/types/menu';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

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
        'group relative bg-gradient-card rounded-xl border border-border/50 overflow-hidden transition-all duration-500',
        'hover:border-primary/30 hover:shadow-elegant',
        !item.available && 'opacity-60'
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
        
        {/* Dietary Tags */}
        {item.dietaryTags && item.dietaryTags.length > 0 && (
          <div className="absolute top-3 left-3 flex gap-1.5">
            {item.dietaryTags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium bg-background/80 backdrop-blur-sm rounded-full text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Unavailable Badge */}
        {!item.available && (
          <div className="absolute top-3 right-3 px-2 py-1 text-xs font-medium bg-destructive/90 text-destructive-foreground rounded-md">
            Unavailable
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-medium text-foreground leading-tight">
            {item.name}
          </h3>
          <span className="font-display text-lg font-semibold text-primary shrink-0">
            ${item.price}
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
                variant="gold"
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
              <div className="flex items-center justify-between bg-secondary/50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={handleDecrease}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="font-semibold text-primary">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
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
