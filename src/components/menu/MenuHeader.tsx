import { MapPin, UtensilsCrossed } from 'lucide-react';

interface MenuHeaderProps {
  tableNumber?: string;
}

export function MenuHeader({ tableNumber }: MenuHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="font-display text-xl font-bold text-gradient-primary">
                Easy Order
              </h1>
              <p className="text-xs text-muted-foreground font-body tracking-wide">
                Quick & Easy Dining
              </p>
            </div>
          </div>
          {tableNumber && (
            <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg border border-primary/20">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-foreground">Table {tableNumber}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
