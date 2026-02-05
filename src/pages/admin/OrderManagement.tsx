 import { useState } from 'react';
 import { AdminLayout } from '@/components/layout/AdminLayout';
 import { useOrders } from '@/context/OrderContext';
 import { OrderCard } from '@/components/admin/OrderCard';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { Clock, ChefHat, Check, Truck, RefreshCw } from 'lucide-react';
 import { cn } from '@/lib/utils';
 import { Order } from '@/types/menu';
 
 const statusTabs: { status: Order['status'] | 'all'; label: string; icon: React.ComponentType<any> }[] = [
   { status: 'all', label: 'All Orders', icon: RefreshCw },
   { status: 'pending', label: 'Pending', icon: Clock },
   { status: 'preparing', label: 'Preparing', icon: ChefHat },
   { status: 'ready', label: 'Ready', icon: Check },
   { status: 'delivered', label: 'Delivered', icon: Truck },
 ];
 
 export default function OrderManagement() {
   const { orders } = useOrders();
   const [activeTab, setActiveTab] = useState<Order['status'] | 'all'>('all');
 
   const filteredOrders = activeTab === 'all'
     ? orders
     : orders.filter((order) => order.status === activeTab);
 
   const getStatusCount = (status: Order['status']) => {
     return orders.filter((o) => o.status === status).length;
   };
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         {/* Header */}
         <div>
           <h1 className="font-display text-3xl font-bold text-foreground">Order Management</h1>
           <p className="text-muted-foreground mt-1">Track and manage customer orders in real-time</p>
         </div>
 
         {/* Status Tabs */}
         <div className="flex flex-wrap gap-2">
           {statusTabs.map((tab) => {
             const count = tab.status === 'all' ? orders.length : getStatusCount(tab.status as Order['status']);
             const Icon = tab.icon;
             return (
               <Button
                 key={tab.status}
                 variant={activeTab === tab.status ? 'orange' : 'outline'}
                 size="sm"
                 onClick={() => setActiveTab(tab.status)}
                 className="gap-2"
               >
                 <Icon className="w-4 h-4" />
                 {tab.label}
                 <Badge
                   variant="secondary"
                   className={cn(
                     'ml-1',
                     activeTab === tab.status && 'bg-white/20 text-white'
                   )}
                 >
                   {count}
                 </Badge>
               </Button>
             );
           })}
         </div>
 
         {/* Orders Grid */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {filteredOrders.map((order) => (
             <OrderCard key={order.id} order={order} showActions={true} />
           ))}
         </div>
 
         {filteredOrders.length === 0 && (
           <div className="text-center py-12 bg-card rounded-xl border border-border">
             <p className="text-muted-foreground">
               {activeTab === 'all' ? 'No orders yet' : `No ${activeTab} orders`}
             </p>
           </div>
         )}
       </div>
     </AdminLayout>
   );
 }