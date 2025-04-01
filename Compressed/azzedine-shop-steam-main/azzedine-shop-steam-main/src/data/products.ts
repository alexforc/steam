
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: 'game' | 'tshirt';
  publisher?: string;
  releaseYear?: number;
  discount?: number;
  stock?: number;
}

// Sample of 20 games (you can expand this to more games as needed)
export const products: Product[] = [
  {
    id: 'game-1',
    name: 'Red Dead Redemption 2',
    description: 'An epic tale of life in America\'s unforgiving heartland. The game\'s vast and atmospheric world also provides the foundation for a brand new online multiplayer experience.',
    price: 15,
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Rockstar Games',
    releaseYear: 2018,
    stock: 145
  },
  {
    id: 'game-2',
    name: 'Cyberpunk 2077',
    description: 'An open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1614469723922-c043926cbec7?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'CD Projekt Red',
    releaseYear: 2020,
    discount: 25,
    stock: 78
  },
  {
    id: 'game-3',
    name: 'The Witcher 3: Wild Hunt',
    description: 'A story-driven, open world adventure set in a dark fantasy universe, where you play as Geralt of Rivia, a monster hunter known as a Witcher.',
    price: 9.99,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'CD Projekt Red',
    releaseYear: 2015,
    stock: 42
  },
  {
    id: 'game-4',
    name: 'Grand Theft Auto V',
    description: 'The criminal enterprise in Los Santos and Blaine County for PlayStation, Xbox, and PC.',
    price: 14.99,
    imageUrl: 'https://images.unsplash.com/photo-1518113399408-b57598c0f406?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Rockstar Games',
    releaseYear: 2013,
    stock: 231
  },
  {
    id: 'game-5',
    name: 'Elden Ring',
    description: 'A fantasy action-RPG adventure set within a world created by Hidetaka Miyazaki and George R. R. Martin.',
    price: 49.99,
    imageUrl: 'https://images.unsplash.com/photo-1616567214738-22b035cea9fc?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'FromSoftware',
    releaseYear: 2022,
    stock: 56
  },
  {
    id: 'game-6',
    name: 'Half-Life: Alyx',
    description: 'Valve\'s return to the Half-Life series. It\'s a full-length game built for virtual reality.',
    price: 39.99,
    imageUrl: 'https://images.unsplash.com/photo-1575321539738-5629665db406?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Valve',
    releaseYear: 2020,
    stock: 18
  },
  {
    id: 'game-7',
    name: 'The Legend of Zelda: Breath of the Wild',
    description: 'An open-world adventure game that challenges players to explore and interact with the world in new ways.',
    price: 54.99,
    imageUrl: 'https://images.unsplash.com/photo-1500856056008-859079534e9e?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Nintendo',
    releaseYear: 2017,
    discount: 10,
    stock: 29
  },
  {
    id: 'game-8',
    name: 'FIFA 23',
    description: 'Experience the world\'s game with realistic gameplay and unmatched authenticity.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'EA Sports',
    releaseYear: 2022,
    discount: 50,
    stock: 183
  },
  {
    id: 'game-9',
    name: 'Call of Duty: Modern Warfare II',
    description: 'The sequel to the record-breaking Call of Duty: Modern Warfare.',
    price: 34.99,
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Activision',
    releaseYear: 2022,
    stock: 94
  },
  {
    id: 'game-10',
    name: 'Minecraft',
    description: 'A game about placing blocks and going on adventures. Explore randomly generated worlds and build amazing things.',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1627856013091-fed6e4e30025?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Mojang',
    releaseYear: 2011,
    stock: 999
  },
  {
    id: 'game-11',
    name: 'Horizon Forbidden West',
    description: 'Explore distant lands, fight bigger and more awe-inspiring machines, and encounter astonishing new tribes.',
    price: 44.99,
    imageUrl: 'https://images.unsplash.com/photo-1614469723922-c043926cbec7?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Sony Interactive Entertainment',
    releaseYear: 2022,
    discount: 15,
    stock: 42
  },
  {
    id: 'game-12',
    name: 'Assassin\'s Creed Valhalla',
    description: 'Become a legendary Viking warrior raised on tales of battle and glory.',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-59150ce462a0?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Ubisoft',
    releaseYear: 2020,
    stock: 63
  },
  {
    id: 'game-13',
    name: 'Halo Infinite',
    description: 'The Master Chief returns in the next chapter of the legendary franchise.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Xbox Game Studios',
    releaseYear: 2021,
    stock: 77
  },
  {
    id: 'game-14',
    name: 'Death Stranding',
    description: 'From legendary game creator Hideo Kojima comes an all-new, genre-defying experience.',
    price: 19.99,
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Kojima Productions',
    releaseYear: 2019,
    discount: 20,
    stock: 31
  },
  {
    id: 'game-15',
    name: 'Resident Evil Village',
    description: 'Experience survival horror like never before in the 8th major installment in the Resident Evil franchise.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1605806616949-59150ce462a0?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'game',
    publisher: 'Capcom',
    releaseYear: 2021,
    stock: 52
  },
  {
    id: 'tshirt-1',
    name: 'Gaming Legend T-Shirt',
    description: 'Show your gaming pride with this comfortable cotton t-shirt featuring a classic controller design.',
    price: 24.99,
    imageUrl: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'tshirt'
  },
  {
    id: 'tshirt-2',
    name: 'Retro Gamer T-Shirt',
    description: 'This vintage-style t-shirt celebrates the golden age of arcade gaming.',
    price: 29.99,
    imageUrl: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'tshirt'
  },
  {
    id: 'tshirt-3',
    name: 'Epic Adventure T-Shirt',
    description: 'Featuring artwork from our bestselling game, this premium t-shirt is a must for fans.',
    price: 27.99,
    imageUrl: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'tshirt'
  },
  {
    id: 'tshirt-4',
    name: 'Cyber Warfare T-Shirt',
    description: 'Futuristic design inspired by the dystopian world of Cyber Warfare.',
    price: 26.99,
    imageUrl: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=600&h=400',
    category: 'tshirt'
  }
];

// Function to get discounted price
export const getDiscountedPrice = (product: Product): number => {
  if (product.discount) {
    return product.price * (1 - product.discount / 100);
  }
  return product.price;
};

// Function to filter products by category
export const getProductsByCategory = (category: 'game' | 'tshirt'): Product[] => {
  return products.filter(product => product.category === category);
};

// Function to search products
export const searchProducts = (query: string): Product[] => {
  const lowerCaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerCaseQuery) || 
    product.description.toLowerCase().includes(lowerCaseQuery) ||
    (product.publisher && product.publisher.toLowerCase().includes(lowerCaseQuery))
  );
};
