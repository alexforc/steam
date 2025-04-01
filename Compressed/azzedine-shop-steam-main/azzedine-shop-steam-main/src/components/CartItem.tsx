
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Trash, Minus, Plus } from 'lucide-react';
import { Product } from '@/data/products';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export default function CartItem({ product, quantity }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b">
      <div className="flex items-center mb-4 sm:mb-0">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-20 h-20 object-cover rounded"
        />
        
        <div className="ml-4">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-gray-600">${product.price.toFixed(2)} each</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(product.id, quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          
          <span className="mx-2 w-8 text-center">{quantity}</span>
          
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => updateQuantity(product.id, quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="w-24 text-right font-medium">
          ${(product.price * quantity).toFixed(2)}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(product.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50"
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
