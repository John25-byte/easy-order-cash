import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MenuHeader } from '@/components/menu/MenuHeader';
import { CategoryNav } from '@/components/menu/CategoryNav';
import { MenuItemCard } from '@/components/menu/MenuItemCard';
import { CartSheet } from '@/components/menu/CartSheet';
import { categories, menuItems } from '@/data/menuData';

export default function MenuPage() {
  const [searchParams] = useSearchParams();
  const tableNumber = searchParams.get('table') || '1';
  const [activeCategory, setActiveCategory] = useState(categories[0].id);

  const filteredItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory]
  );

  const currentCategory = categories.find((c) => c.id === activeCategory);

  return (
    <div className="min-h-screen bg-background pb-24">
      <MenuHeader tableNumber={tableNumber} />
      <CategoryNav
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="container mx-auto px-4 py-6">
        {/* Category Header */}
        <div className="mb-6 animate-fade-in">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            {currentCategory?.name}
          </h2>
          {currentCategory?.description && (
            <p className="text-muted-foreground mt-1">{currentCategory.description}</p>
          )}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <MenuItemCard item={item} />
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items available in this category.</p>
          </div>
        )}
      </main>

      <CartSheet tableNumber={tableNumber} />
    </div>
  );
}
