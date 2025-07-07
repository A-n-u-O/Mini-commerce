"use client";

import { CartItem } from "@/store/cart-store";
import { useRouter } from "next/navigation";

interface CartSummaryProps {
  items: CartItem[];
}

export default function CartSummary({ items }: CartSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  
  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-500 text-xl">Subtotal</span>
          <span className=" text-xl">${subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 text-xl">Shipping</span>
          <span className="text-xl">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500 text-xl">Tax</span>
          <span className=" text-xl">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t pt-4 text-xl flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
