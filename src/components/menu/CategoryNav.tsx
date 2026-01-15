import { cn } from '@/lib/utils';
import { Category } from '@/types/menu';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav className="sticky top-[73px] z-40 glass border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300',
                activeCategory === category.id
                  ? 'bg-gradient-gold text-primary-foreground shadow-gold'
                  : 'bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary'
              )}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
