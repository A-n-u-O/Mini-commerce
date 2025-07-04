'use client'

import { useCartStore } from '@/store/cart-store'
import CartSummary from '@/components/CartSummary'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore()
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // process payment 
    clearCart()
    router.push('/checkout/success')
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
          {/* Form fields */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Full Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
            {/*  form fields */}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <CartSummary items={items} />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 mt-4"
          >
            Place Order
          </button>
        </div>
      </form>
    </main>
  )
}