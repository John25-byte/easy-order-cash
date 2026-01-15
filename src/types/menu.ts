export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  dietaryTags?: string[];
}

export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  total: number;
  createdAt: Date;
  specialRequests?: string;
}

export interface Table {
  id: string;
  number: string;
  qrCode: string;
  status: 'available' | 'occupied' | 'reserved';
}
