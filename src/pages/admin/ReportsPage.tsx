 import { AdminLayout } from '@/components/layout/AdminLayout';
 import { useOrders } from '@/context/OrderContext';
 import { useMenu } from '@/context/MenuContext';
 import { formatPrice } from '@/lib/currency';
 import { BarChart3, TrendingUp, ShoppingBag, DollarSign } from 'lucide-react';
 
 export default function ReportsPage() {
   const { orders } = useOrders();
   const { menuItems } = useMenu();
 
   const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
   const totalOrders = orders.length;
   const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
 
   // Calculate top selling items
   const itemSales: Record<string, { name: string; quantity: number; revenue: number }> = {};
   orders.forEach((order) => {
     order.items.forEach((cartItem) => {
       const id = cartItem.item.id;
       if (!itemSales[id]) {
         itemSales[id] = { name: cartItem.item.name, quantity: 0, revenue: 0 };
       }
       itemSales[id].quantity += cartItem.quantity;
       itemSales[id].revenue += cartItem.item.price * cartItem.quantity;
     });
   });
 
   const topItems = Object.values(itemSales)
     .sort((a, b) => b.quantity - a.quantity)
     .slice(0, 5);
 
   const stats = [
     {
       label: 'Total Revenue',
       value: formatPrice(totalRevenue),
       icon: DollarSign,
       color: 'text-green-600',
       bg: 'bg-green-100',
     },
     {
       label: 'Total Orders',
       value: totalOrders.toString(),
       icon: ShoppingBag,
       color: 'text-primary',
       bg: 'bg-primary/10',
     },
     {
       label: 'Avg Order Value',
       value: formatPrice(avgOrderValue),
       icon: TrendingUp,
       color: 'text-blue-600',
       bg: 'bg-blue-100',
     },
     {
       label: 'Menu Items',
       value: menuItems.length.toString(),
       icon: BarChart3,
       color: 'text-purple-600',
       bg: 'bg-purple-100',
     },
   ];
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         {/* Header */}
         <div>
           <h1 className="font-display text-3xl font-bold text-foreground">Reports</h1>
           <p className="text-muted-foreground mt-1">Analytics and insights for your restaurant</p>
         </div>
 
         {/* Stats Grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {stats.map((stat) => (
             <div
               key={stat.label}
               className="bg-card rounded-xl border border-border p-6 shadow-card hover:shadow-elevated transition-all duration-300"
             >
               <div className="flex items-center gap-3 mb-3">
                 <div className={`p-2 rounded-lg ${stat.bg}`}>
                   <stat.icon className={`w-5 h-5 ${stat.color}`} />
                 </div>
               </div>
               <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
               <p className="font-display text-2xl font-bold text-foreground mt-1">{stat.value}</p>
             </div>
           ))}
         </div>
 
         {/* Top Selling Items */}
         <div className="bg-card rounded-xl border border-border p-6 shadow-card">
           <h2 className="font-display text-xl font-bold text-foreground mb-4">Top Selling Items</h2>
           {topItems.length > 0 ? (
             <div className="space-y-3">
               {topItems.map((item, index) => (
                 <div
                   key={item.name}
                   className="flex items-center justify-between p-3 bg-muted rounded-lg"
                 >
                   <div className="flex items-center gap-3">
                     <span className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center text-white text-xs font-bold">
                       {index + 1}
                     </span>
                     <span className="font-medium text-foreground">{item.name}</span>
                   </div>
                   <div className="text-right">
                     <p className="text-sm font-medium text-foreground">{item.quantity} sold</p>
                     <p className="text-xs text-muted-foreground">{formatPrice(item.revenue)}</p>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             <p className="text-muted-foreground text-center py-8">No sales data yet</p>
           )}
         </div>
 
         {/* Order Status Distribution */}
         <div className="bg-card rounded-xl border border-border p-6 shadow-card">
           <h2 className="font-display text-xl font-bold text-foreground mb-4">Order Status Overview</h2>
           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
             {['pending', 'preparing', 'ready', 'delivered'].map((status) => {
               const count = orders.filter((o) => o.status === status).length;
               return (
                 <div key={status} className="text-center p-4 bg-muted rounded-lg">
                   <p className="font-display text-2xl font-bold text-foreground">{count}</p>
                   <p className="text-sm text-muted-foreground capitalize">{status}</p>
                 </div>
               );
             })}
           </div>
         </div>
       </div>
     </AdminLayout>
   );
 }