"use client";

import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();

  if (items.length === 0) {
    return (
      <main className=" container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        <div className="flex flex-col items-center justify-center py-12 gap-4">
          <ShoppingCartIcon className="h-16 w-16 text-gray-400" />
          <p className="mb-4">Your Cart is empty</p>
          <Button asChild="true">
            <Link href="/" className=" text-blue-600 hover:underline">
              Continue shopping
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className=" container">
      <h1 className="text-3xl font-bold">Your Cart</h1>
      <div className="grid">
        <div className="md:col-span-2">
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={() => removeItem(item.id)}
                onQuantityChange={(quantity) =>
                  updateQuantity(item.id, quantity)
                }
              />
            ))}
          </div>
        </div>
        <div className="md:col-span-1">
          <CartSummary items={items} />
          <Button asChild="true" className="w-full mt-4">
            <Link href="/checkout" className="inline-block w-full text-center">
              Proceed to Checkout
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
function ShoppingCartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}
