
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-azzedine-dark text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Azzedine Workshop</h3>
            <p className="text-gray-300">
              Your one-stop shop for the best games and gaming merchandise.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/#games" className="text-gray-300 hover:text-white transition-colors">
                  Games
                </Link>
              </li>
              <li>
                <Link to="/#tshirts" className="text-gray-300 hover:text-white transition-colors">
                  T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-300 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              123 Gaming Street<br />
              Digital City, DC 12345<br />
              contact@azzedine-workshop.com
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} Azzedine Workshop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
