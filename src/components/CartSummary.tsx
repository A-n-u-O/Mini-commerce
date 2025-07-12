"use client";
import { CartItem } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const router = useRouter();
 
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    // Navigate to checkout page
    router.push('/checkout');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
          Order Summary
        </h2>
       
        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-sm sm:text-base text-gray-600">
            <span>Subtotal ({items.length} items)</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>
         
          <div className="flex justify-between text-sm sm:text-base text-gray-600">
            <span>Shipping</span>
            <span className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600 font-medium">Free</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </span>
          </div>
         
          {subtotal > 0 && subtotal < 100 && (
            <div className="text-xs sm:text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
              💡 Add ${(100 - subtotal).toFixed(2)} more to get free shipping!
            </div>
          )}
         
          <div className="flex justify-between text-sm sm:text-base text-gray-600">
            <span>Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>
         
          <div className="border-t pt-3">
            <div className="flex justify-between text-lg sm:text-xl font-semibold text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleCheckout}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
}