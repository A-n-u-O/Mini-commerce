// src/components/AddToCart.tsx
'use client';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cart-store';
import { Product } from '@/app/lib/types';

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAdded) {
      timer = setTimeout(() => setIsAdded(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [isAdded]);

  const handleAddToCart = () => {
    try {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug
      });
      setIsAdded(true);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleAddToCart}
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
        aria-label={`Add ${product.name} to cart`}
        data-testid="add-to-cart-button"
      >
        Add to Cart
      </button>
      {isAdded && (
        <p 
          className="mt-2 text-green-600 animate-fade-in" 
          data-testid="success-message"
        >
          Added to cart!
        </p>
      )}
    </div>
  );
}