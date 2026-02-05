 import { AdminLayout } from '@/components/layout/AdminLayout';
 import { useOrders } from '@/context/OrderContext';
 import { Button } from '@/components/ui/button';
 import { Badge } from '@/components/ui/badge';
 import { CreditCard, Smartphone, CheckCircle, Clock, AlertCircle } from 'lucide-react';
 import { formatPrice } from '@/lib/currency';
 import { formatDistanceToNow } from 'date-fns';
 
 export default function PaymentsPage() {
   const { orders } = useOrders();
 
   // Simulated payment data based on orders
   const deliveredOrders = orders.filter((o) => o.status === 'delivered');
   const pendingPayments = orders.filter((o) => o.status === 'ready');
   const totalPaid = deliveredOrders.reduce((sum, o) => sum + o.total, 0);
   const totalPending = pendingPayments.reduce((sum, o) => sum + o.total, 0);
 
   return (
     <AdminLayout>
       <div className="space-y-6">
         {/* Header */}
         <div>
           <h1 className="font-display text-3xl font-bold text-foreground">Payments</h1>
           <p className="text-muted-foreground mt-1">Track payments and M-Pesa transactions</p>
         </div>
 
         {/* Stats */}
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
           <div className="bg-card rounded-xl border border-border p-6 shadow-card">
             <div className="flex items-center gap-3 mb-3">
               <div className="p-2 bg-green-100 rounded-lg">
                 <CheckCircle className="w-5 h-5 text-green-600" />
               </div>
               <span className="text-sm text-muted-foreground font-medium">Paid</span>
             </div>
             <p className="font-display text-2xl font-bold text-foreground">{formatPrice(totalPaid)}</p>
             <p className="text-xs text-muted-foreground mt-1">{deliveredOrders.length} transactions</p>
           </div>
 
           <div className="bg-card rounded-xl border border-border p-6 shadow-card">
             <div className="flex items-center gap-3 mb-3">
               <div className="p-2 bg-yellow-100 rounded-lg">
                 <Clock className="w-5 h-5 text-yellow-600" />
               </div>
               <span className="text-sm text-muted-foreground font-medium">Pending</span>
             </div>
             <p className="font-display text-2xl font-bold text-foreground">{formatPrice(totalPending)}</p>
             <p className="text-xs text-muted-foreground mt-1">{pendingPayments.length} awaiting payment</p>
           </div>
 
           <div className="bg-card rounded-xl border border-border p-6 shadow-card">
             <div className="flex items-center gap-3 mb-3">
               <div className="p-2 bg-primary/10 rounded-lg">
                 <Smartphone className="w-5 h-5 text-primary" />
               </div>
               <span className="text-sm text-muted-foreground font-medium">M-Pesa</span>
             </div>
             <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
               Not Connected
             </Badge>
             <p className="text-xs text-muted-foreground mt-2">Setup required</p>
           </div>
         </div>
 
         {/* M-Pesa Setup Notice */}
         <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200 dark:border-green-800 p-6">
           <div className="flex items-start gap-4">
             <div className="p-3 bg-green-600 rounded-xl">
               <Smartphone className="w-6 h-6 text-white" />
             </div>
             <div className="flex-1">
               <h3 className="font-display text-lg font-semibold text-foreground">
                 Enable M-Pesa Payments
               </h3>
               <p className="text-muted-foreground mt-1">
                 Accept mobile payments directly from your customers using M-Pesa STK Push.
                 Customers can pay with their phones instantly.
               </p>
               <div className="mt-4 flex flex-wrap gap-2">
                 <Badge variant="outline" className="bg-background">STK Push</Badge>
                 <Badge variant="outline" className="bg-background">Instant Confirmation</Badge>
                 <Badge variant="outline" className="bg-background">Auto Order Updates</Badge>
               </div>
               <Button variant="orange" className="mt-4">
                 <CreditCard className="w-4 h-4 mr-2" />
                 Setup M-Pesa Integration
               </Button>
             </div>
           </div>
         </div>
 
         {/* Recent Transactions */}
         <div>
           <h2 className="font-display text-xl font-bold text-foreground mb-4">Recent Transactions</h2>
           {deliveredOrders.length > 0 ? (
             <div className="space-y-3">
               {deliveredOrders.slice(0, 10).map((order) => (
                 <div
                   key={order.id}
                   className="bg-card rounded-xl border border-border p-4 shadow-card flex items-center justify-between"
                 >
                   <div className="flex items-center gap-4">
                     <div className="p-2 bg-green-100 rounded-lg">
                       <CheckCircle className="w-5 h-5 text-green-600" />
                     </div>
                     <div>
                       <p className="font-medium text-foreground">{order.id}</p>
                       <p className="text-sm text-muted-foreground">
                         Table {order.tableNumber} • {formatDistanceToNow(order.createdAt, { addSuffix: true })}
                       </p>
                     </div>
                   </div>
                   <div className="text-right">
                     <p className="font-display font-semibold text-foreground">{formatPrice(order.total)}</p>
                     <Badge className="bg-green-100 text-green-800 border-green-300">Paid</Badge>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             <div className="text-center py-12 bg-card rounded-xl border border-border">
               <AlertCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
               <p className="text-muted-foreground">No transactions yet</p>
               <p className="text-sm text-muted-foreground mt-1">
                 Completed orders will appear here
               </p>
             </div>
           )}
         </div>
       </div>
     </AdminLayout>
   );
 }