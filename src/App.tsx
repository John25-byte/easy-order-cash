import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CartProvider } from "@/context/CartContext";
import { OrderProvider } from "@/context/OrderContext";
 import { MenuProvider } from "@/context/MenuContext";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MenuPage from "./pages/MenuPage";
import AdminDashboard from "./pages/AdminDashboard";
 import MenuManagement from "./pages/admin/MenuManagement";
 import OrderManagement from "./pages/admin/OrderManagement";
 import PaymentsPage from "./pages/admin/PaymentsPage";
 import ReportsPage from "./pages/admin/ReportsPage";
 import SettingsPage from "./pages/admin/SettingsPage";
import KitchenDisplay from "./pages/KitchenDisplay";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <MenuProvider>
        <CartProvider>
          <OrderProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/menu" element={<MenuPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/menu" element={<MenuManagement />} />
              <Route path="/admin/orders" element={<OrderManagement />} />
              <Route path="/admin/payments" element={<PaymentsPage />} />
              <Route path="/admin/reports" element={<ReportsPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/kitchen" element={<KitchenDisplay />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </OrderProvider>
        </CartProvider>
      </MenuProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
