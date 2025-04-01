
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from "sonner";
import { X, Check, CreditCard } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function PaymentForm({ amount, onSuccess, onCancel }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [errors, setErrors] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const validateForm = () => {
    const newErrors = {
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: ''
    };
    
    let isValid = true;
    
    // Simple validation rules - would be more complex in a real app
    if (!cardNumber.trim() || cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      isValid = false;
    }
    
    if (!cardName.trim()) {
      newErrors.cardName = 'Please enter the name on card';
      isValid = false;
    }
    
    if (!expiryDate.trim() || !/^\d{2}\/\d{2}$/.test(expiryDate)) {
      newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      isValid = false;
    }
    
    if (!cvv.trim() || !/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = 'Please enter a valid CVV (3 or 4 digits)';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // In a real app, we would call a payment API here
      // For demo, successful payment with test card number starting with 4
      if (cardNumber.startsWith('4')) {
        toast.success("Payment successful!");
        onSuccess();
      } else {
        toast.error("Payment failed. Please check your card details.");
        setErrors({
          ...errors,
          cardNumber: 'Invalid card number'
        });
      }
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Payment Information</h3>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-center mb-6">
          <p className="text-gray-600">Total Amount</p>
          <p className="text-2xl font-bold">${amount.toFixed(2)}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                  maxLength={19}
                  className={`pl-10 ${errors.cardNumber ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.cardNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                For testing: Card numbers starting with 4 will succeed, others will fail
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cardName">Name on Card</Label>
              <Input
                id="cardName"
                placeholder="John Doe"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                className={errors.cardName ? 'border-red-500' : ''}
              />
              {errors.cardName && (
                <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  maxLength={5}
                  className={errors.expiryDate ? 'border-red-500' : ''}
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  maxLength={4}
                  className={errors.cvv ? 'border-red-500' : ''}
                />
                {errors.cvv && (
                  <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>
                )}
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-azzedine-primary hover:bg-azzedine-primary/90"
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : "Complete Payment"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
