
import { Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title: string;
  id?: string;
  emptyMessage?: string;
}

export default function ProductGrid({ products, title, id, emptyMessage = "No products available" }: ProductGridProps) {
  return (
    <section id={id} className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="bg-gradient-to-r from-azzedine-primary to-azzedine-secondary bg-clip-text text-transparent">
            {title}
          </span>
        </h2>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            {emptyMessage}
          </div>
        )}
      </div>
    </section>
  );
}
