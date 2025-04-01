
import { Link } from 'react-router-dom';
import { ShoppingCart, LogOut } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold bg-gradient-to-r from-azzedine-primary to-azzedine-secondary bg-clip-text text-transparent">
            Azzedine Workshop
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-600 hover:text-azzedine-primary transition-colors">
            Home
          </Link>
          <Link to="/#games" className="text-gray-600 hover:text-azzedine-primary transition-colors">
            Games
          </Link>
          <Link to="/#tshirts" className="text-gray-600 hover:text-azzedine-primary transition-colors">
            T-Shirts
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          {user && (
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 hidden md:inline-block">
                Hello, {user.name}
              </span>
              <Button variant="ghost" size="sm" onClick={logout} className="text-gray-600">
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          )}
          
          <Link to="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-5 w-5 mr-2" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className={cn(
                  "absolute -top-2 -right-2 flex items-center justify-center",
                  "w-5 h-5 rounded-full text-xs text-white bg-azzedine-primary"
                )}>
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
