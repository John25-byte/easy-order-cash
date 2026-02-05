 import { AdminLayout } from '@/components/layout/AdminLayout';
 import { Button } from '@/components/ui/button';
 import { Input } from '@/components/ui/input';
 import { Switch } from '@/components/ui/switch';
 import { User, Store, Bell, Shield, Palette } from 'lucide-react';
 
 export default function SettingsPage() {
   return (
     <AdminLayout>
       <div className="space-y-6 max-w-2xl">
         {/* Header */}
         <div>
           <h1 className="font-display text-3xl font-bold text-foreground">Settings</h1>
           <p className="text-muted-foreground mt-1">Manage your restaurant settings</p>
         </div>
 
         {/* Profile Section */}
         <div className="bg-card rounded-xl border border-border p-6 shadow-card">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-primary/10 rounded-lg">
               <User className="w-5 h-5 text-primary" />
             </div>
             <h2 className="font-display text-lg font-semibold text-foreground">Profile</h2>
           </div>
           <div className="space-y-4">
             <div>
               <label className="text-sm font-medium text-foreground">Name</label>
               <Input defaultValue="Restaurant Manager" className="mt-1" />
             </div>
             <div>
               <label className="text-sm font-medium text-foreground">Email</label>
               <Input defaultValue="manager@easyorder.com" type="email" className="mt-1" />
             </div>
           </div>
         </div>
 
         {/* Restaurant Section */}
         <div className="bg-card rounded-xl border border-border p-6 shadow-card">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-primary/10 rounded-lg">
               <Store className="w-5 h-5 text-primary" />
             </div>
             <h2 className="font-display text-lg font-semibold text-foreground">Restaurant</h2>
           </div>
           <div className="space-y-4">
             <div>
               <label className="text-sm font-medium text-foreground">Restaurant Name</label>
               <Input defaultValue="Easy Order Restaurant" className="mt-1" />
             </div>
             <div>
               <label className="text-sm font-medium text-foreground">Address</label>
               <Input defaultValue="123 Main Street, Nairobi" className="mt-1" />
             </div>
             <div>
               <label className="text-sm font-medium text-foreground">Phone</label>
               <Input defaultValue="+254 700 000 000" className="mt-1" />
             </div>
           </div>
         </div>
 
         {/* Notifications Section */}
         <div className="bg-card rounded-xl border border-border p-6 shadow-card">
           <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-primary/10 rounded-lg">
               <Bell className="w-5 h-5 text-primary" />
             </div>
             <h2 className="font-display text-lg font-semibold text-foreground">Notifications</h2>
           </div>
           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-foreground">New Order Alerts</p>
                 <p className="text-sm text-muted-foreground">Get notified for new orders</p>
               </div>
               <Switch defaultChecked />
             </div>
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-foreground">Payment Confirmations</p>
                 <p className="text-sm text-muted-foreground">Notify on successful payments</p>
               </div>
               <Switch defaultChecked />
             </div>
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium text-foreground">Sound Alerts</p>
                 <p className="text-sm text-muted-foreground">Play sound for new orders</p>
               </div>
               <Switch />
             </div>
           </div>
         </div>
 
         {/* Save Button */}
         <Button variant="orange" size="lg" className="w-full">
           Save Changes
         </Button>
       </div>
     </AdminLayout>
   );
 }