 import React, { createContext, useContext, useState, useCallback } from 'react';
 import { MenuItem, Category } from '@/types/menu';
 import { menuItems as initialMenuItems, categories as initialCategories } from '@/data/menuData';
 
 interface MenuContextType {
   menuItems: MenuItem[];
   categories: Category[];
   addMenuItem: (item: Omit<MenuItem, 'id'>) => void;
   updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
   deleteMenuItem: (id: string) => void;
   toggleAvailability: (id: string) => void;
   addCategory: (category: Omit<Category, 'id'>) => void;
   updateCategory: (id: string, updates: Partial<Category>) => void;
   deleteCategory: (id: string) => void;
 }
 
 const MenuContext = createContext<MenuContextType | undefined>(undefined);
 
 export function MenuProvider({ children }: { children: React.ReactNode }) {
   const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
   const [categories, setCategories] = useState<Category[]>(initialCategories);
 
   const addMenuItem = useCallback((item: Omit<MenuItem, 'id'>) => {
     const newItem: MenuItem = {
       ...item,
       id: `item-${Date.now()}`,
     };
     setMenuItems((prev) => [...prev, newItem]);
   }, []);
 
   const updateMenuItem = useCallback((id: string, updates: Partial<MenuItem>) => {
     setMenuItems((prev) =>
       prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
     );
   }, []);
 
   const deleteMenuItem = useCallback((id: string) => {
     setMenuItems((prev) => prev.filter((item) => item.id !== id));
   }, []);
 
   const toggleAvailability = useCallback((id: string) => {
     setMenuItems((prev) =>
       prev.map((item) =>
         item.id === id ? { ...item, available: !item.available } : item
       )
     );
   }, []);
 
   const addCategory = useCallback((category: Omit<Category, 'id'>) => {
     const newCategory: Category = {
       ...category,
       id: `cat-${Date.now()}`,
     };
     setCategories((prev) => [...prev, newCategory]);
   }, []);
 
   const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
     setCategories((prev) =>
       prev.map((cat) => (cat.id === id ? { ...cat, ...updates } : cat))
     );
   }, []);
 
   const deleteCategory = useCallback((id: string) => {
     setCategories((prev) => prev.filter((cat) => cat.id !== id));
   }, []);
 
   return (
     <MenuContext.Provider
       value={{
         menuItems,
         categories,
         addMenuItem,
         updateMenuItem,
         deleteMenuItem,
         toggleAvailability,
         addCategory,
         updateCategory,
         deleteCategory,
       }}
     >
       {children}
     </MenuContext.Provider>
   );
 }
 
 export function useMenu() {
   const context = useContext(MenuContext);
   if (!context) {
     throw new Error('useMenu must be used within a MenuProvider');
   }
   return context;
 }