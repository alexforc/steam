
import { useState } from 'react';
import { products, getProductsByCategory } from '@/data/products';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductGrid from '@/components/ProductGrid';
import Chat from '@/components/Chat';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function Index() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(getProductsByCategory('game'));
  
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredGames(getProductsByCategory('game'));
    } else {
      const filtered = getProductsByCategory('game').filter(game => 
        game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (game.publisher && game.publisher.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredGames(filtered);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        
        {/* Search Bar */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 max-w-xl mx-auto">
            <Input 
              placeholder="Search for games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSearch}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>
        
        <ProductGrid 
          products={filteredGames} 
          title="Game Keys for Sale" 
          id="games" 
          emptyMessage="No games found matching your search. Try a different search term."
        />
        
        <ProductGrid 
          products={getProductsByCategory('tshirt')} 
          title="Gaming Merchandise" 
          id="tshirts" 
        />
      </main>
      <Footer />
      <Chat />
    </div>
  );
}
