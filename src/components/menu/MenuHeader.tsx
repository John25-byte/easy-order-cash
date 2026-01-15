import { MapPin } from 'lucide-react';

interface MenuHeaderProps {
  tableNumber?: string;
}

export function MenuHeader({ tableNumber }: MenuHeaderProps) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-display text-2xl font-semibold text-gradient-gold">
              La Maison D'Or
            </h1>
            <p className="text-xs text-muted-foreground font-body tracking-wider uppercase">
              Fine Dining Experience
            </p>
          </div>
          {tableNumber && (
            <div className="flex items-center gap-2 bg-secondary/50 px-3 py-2 rounded-lg border border-border">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Table {tableNumber}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
