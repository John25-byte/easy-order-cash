import React, { createContext, useContext, useState, useCallback } from 'react';
import { Order, CartItem } from '@/types/menu';

interface OrderContextType {
  orders: Order[];
  addOrder: (tableNumber: string, items: CartItem[], total: number, specialRequests?: string) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrdersByStatus: (status: Order['status']) => Order[];
  getOrdersByTable: (tableNumber: string) => Order[];
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const addOrder = useCallback((
    tableNumber: string,
    items: CartItem[],
    total: number,
    specialRequests?: string
  ): Order => {
    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      tableNumber,
      items,
      status: 'pending',
      total,
      createdAt: new Date(),
      specialRequests,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  }, []);

  const getOrdersByStatus = useCallback((status: Order['status']) => {
    return orders.filter((order) => order.status === status);
  }, [orders]);

  const getOrdersByTable = useCallback((tableNumber: string) => {
    return orders.filter((order) => order.tableNumber === tableNumber);
  }, [orders]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getOrdersByStatus,
        getOrdersByTable,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}
