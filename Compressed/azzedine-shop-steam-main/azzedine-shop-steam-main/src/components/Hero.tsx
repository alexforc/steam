
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="relative bg-azzedine-dark text-white">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000')" 
        }}
      />
      
      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to Azzedine Workshop
          </h1>
          
          <p className="text-xl mb-8">
            Discover the best games and gaming merchandise all in one place.
            Join our community of gamers today!
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg"
              className="bg-azzedine-primary hover:bg-azzedine-primary/90"
              asChild
            >
              <Link to="/#games">Explore Games</Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white/10"
              asChild
            >
              <Link to="/#tshirts">View T-Shirts</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
