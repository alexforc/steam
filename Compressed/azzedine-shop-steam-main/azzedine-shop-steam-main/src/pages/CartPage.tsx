
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import PaymentForm from '@/components/PaymentForm';
import { Button } from '@/components/ui/button';
import { ShoppingCart, CreditCard, ArrowLeft, Check } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handlePaymentSuccess = () => {
    setShowPaymentForm(false);
    setPaymentSuccess(true);
    clearCart();
    
    // Redirect to home after successful payment with delay
    setTimeout(() => {
      navigate('/');
    }, 5000);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          {paymentSuccess ? "Payment Successful" : "Your Shopping Cart"}
        </h1>
        
        {paymentSuccess ? (
          <div className="text-center py-12">
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-semibold mb-2">Thank You for Your Purchase!</h2>
            <p className="text-gray-600 mb-8">Your order has been successfully processed.</p>
            
            <Button asChild>
              <Link to="/">Continue Shopping</Link>
            </Button>
          </div>
        ) : showPaymentForm ? (
          <PaymentForm 
            amount={totalPrice}
            onSuccess={handlePaymentSuccess}
            onCancel={() => setShowPaymentForm(false)}
          />
        ) : (
          <>
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-8">Add some awesome games or merchandise to get started!</p>
                
                <Button asChild>
                  <Link to="/">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-6">
                {items.map(item => (
                  <CartItem 
                    key={item.product.id} 
                    product={item.product} 
                    quantity={item.quantity} 
                  />
                ))}
                
                <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-center">
                  <Button
                    variant="outline"
                    className="mb-4 md:mb-0"
                    asChild
                  >
                    <Link to="/">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Continue Shopping
                    </Link>
                  </Button>
                  
                  <div className="text-right">
                    <div className="text-xl font-bold mb-4">
                      Total: ${totalPrice.toFixed(2)}
                    </div>
                    
                    <Button
                      className="bg-azzedine-primary hover:bg-azzedine-primary/90"
                      onClick={() => setShowPaymentForm(true)}
                      disabled={items.length === 0}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
