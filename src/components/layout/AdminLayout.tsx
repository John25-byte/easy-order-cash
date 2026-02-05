 import { TopNav } from './TopNav';
 
 interface AdminLayoutProps {
   children: React.ReactNode;
 }
 
 export function AdminLayout({ children }: AdminLayoutProps) {
   return (
     <div className="min-h-screen bg-background">
       <TopNav />
       <main className="container mx-auto px-4 py-8">
         {children}
       </main>
     </div>
   );
 }