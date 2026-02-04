import { cn } from '@/lib/utils';
import { Category } from '@/types/menu';

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryNav({ categories, activeCategory, onCategoryChange }: CategoryNavProps) {
  return (
    <nav className="sticky top-[73px] z-40 bg-white/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 py-3 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200',
                activeCategory === category.id
                  ? 'bg-gradient-primary text-primary-foreground shadow-primary'
                  : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
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
