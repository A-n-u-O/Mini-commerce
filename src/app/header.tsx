'use client'

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function Header() {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link 
          href="/" 
          className="text-3xl font-bold hover:opacity-80 transition-opacity"
        >
          Mini-Commerce
        </Link>
        <div className="relative">
          <Link
            href="/cart"
            className="p-2 hover:bg-gray-800 rounded-full transition-colors flex items-center"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}