import { useNavigate } from 'react-router-dom';
import { QrCode, ChefHat, LayoutDashboard, ArrowRight, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-2xl animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          {/* Logo */}
          <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-primary animate-fade-in">
            <UtensilsCrossed className="w-10 h-10 text-white" />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-semibold">
              QR-Powered Restaurant Management
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4 animate-fade-in-up">
            <span className="text-gradient-primary">Easy Order</span>
            <span className="block text-2xl md:text-3xl font-medium text-muted-foreground mt-2">
              Cash & Digital
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            A seamless digital dining experience. Scan, order, and enjoy – all from your table.
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {/* Guest Menu */}
            <button
              onClick={() => navigate('/menu?table=1')}
              className="group bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-elevated hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <QrCode className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                Guest Menu
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Browse & order as a guest
              </p>
              <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                Open Menu
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Admin Dashboard */}
            <button
              onClick={() => navigate('/admin')}
              className="group bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 hover:border-secondary/50 hover:shadow-elevated hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                Admin Panel
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage menu & orders
              </p>
              <div className="flex items-center text-secondary text-sm font-semibold group-hover:gap-2 transition-all">
                Dashboard
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </button>

            {/* Kitchen Display */}
            <button
              onClick={() => navigate('/kitchen')}
              className="group bg-card border border-border rounded-2xl p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-elevated hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                <ChefHat className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                Kitchen View
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Real-time order queue
              </p>
              <div className="flex items-center text-primary text-sm font-semibold group-hover:gap-2 transition-all">
                Kitchen
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4 bg-card">
        <p className="text-center text-sm text-muted-foreground font-medium">
          © 2024 Easy Order Cash · Fast & Convenient Dining
        </p>
      </footer>
    </div>
  );
}
