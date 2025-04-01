
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Product, getDiscountedPrice } from '@/data/products';
import { ShoppingCart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";
import { useChatStore } from '@/stores/chatStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { openChat } = useChatStore();
  
  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = product.discount && product.discount > 0;
  
  const handleChatAboutGame = () => {
    openChat(product.id, product.name);
  };
  
  return (
    <div className="product-card group bg-card">
      <div className="overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
            -{product.discount}%
          </Badge>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          {product.stock && product.stock < 50 ? (
            <Badge variant="outline" className="text-amber-500 border-amber-500">
              Only {product.stock} left
            </Badge>
          ) : null}
        </div>
        
        {product.publisher && (
          <div className="text-sm text-muted-foreground mt-1">
            {product.publisher} • {product.releaseYear}
          </div>
        )}
        
        <div className="mt-1 flex items-center">
          {hasDiscount ? (
            <>
              <span className="text-azzedine-primary font-bold">${discountedPrice.toFixed(2)}</span>
              <span className="text-muted-foreground line-through text-sm ml-2">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="text-azzedine-primary font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>
        
        <div className="flex gap-2 mt-4">
          <Button 
            className="flex-1 bg-azzedine-primary hover:bg-azzedine-primary/90"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          
          <Button 
            variant="outline"
            className="flex-none"
            onClick={handleChatAboutGame}
          >
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
