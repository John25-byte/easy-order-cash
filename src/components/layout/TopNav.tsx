 import { Link, useLocation } from 'react-router-dom';
 import { useState } from 'react';
 import {
   LayoutDashboard,
   UtensilsCrossed,
   ClipboardList,
   CreditCard,
   BarChart3,
   Settings,
   Menu,
   X,
 } from 'lucide-react';
 import { cn } from '@/lib/utils';
 import { Button } from '@/components/ui/button';
 import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
 
 const navItems = [
   { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
   { path: '/admin/menu', icon: UtensilsCrossed, label: 'Menu' },
   { path: '/admin/orders', icon: ClipboardList, label: 'Orders' },
   { path: '/admin/payments', icon: CreditCard, label: 'Payments' },
   { path: '/admin/reports', icon: BarChart3, label: 'Reports' },
   { path: '/admin/settings', icon: Settings, label: 'Settings' },
 ];
 
 export function TopNav() {
   const location = useLocation();
   const [isOpen, setIsOpen] = useState(false);
 
   const isActive = (path: string) => {
     if (path === '/admin') {
       return location.pathname === '/admin';
     }
     return location.pathname.startsWith(path);
   };
 
   return (
     <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
       <div className="container mx-auto px-4">
         <div className="flex h-16 items-center justify-between">
           {/* Logo */}
           <Link to="/admin" className="flex items-center gap-2">
             <span className="font-display text-xl font-bold text-gradient-primary">
               Easy Order
             </span>
           </Link>
 
           {/* Desktop Navigation */}
           <nav className="hidden md:flex items-center gap-1">
             {navItems.map((item) => (
               <Link
                 key={item.path}
                 to={item.path}
                 className={cn(
                   'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                   isActive(item.path)
                     ? 'bg-gradient-primary text-primary-foreground shadow-primary'
                     : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                 )}
               >
                 <item.icon className="w-4 h-4" />
                 <span>{item.label}</span>
               </Link>
             ))}
           </nav>
 
           {/* Mobile Menu */}
           <Sheet open={isOpen} onOpenChange={setIsOpen}>
             <SheetTrigger asChild className="md:hidden">
               <Button variant="ghost" size="icon">
                 <Menu className="h-5 w-5" />
                 <span className="sr-only">Toggle menu</span>
               </Button>
             </SheetTrigger>
             <SheetContent side="right" className="w-[280px] bg-card">
               <div className="flex flex-col gap-4 mt-8">
                 {navItems.map((item) => (
                   <Link
                     key={item.path}
                     to={item.path}
                     onClick={() => setIsOpen(false)}
                     className={cn(
                       'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                       isActive(item.path)
                         ? 'bg-gradient-primary text-primary-foreground shadow-primary'
                         : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                     )}
                   >
                     <item.icon className="w-5 h-5" />
                     <span>{item.label}</span>
                   </Link>
                 ))}
               </div>
             </SheetContent>
           </Sheet>
         </div>
       </div>
     </header>
   );
 }