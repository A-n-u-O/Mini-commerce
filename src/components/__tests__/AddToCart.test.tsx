// src/components/__tests__/AddToCart.test.tsx
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AddToCart from '../AddToCart';
import { useCartStore } from '@/store/cart-store';
import { Product } from '@/app/lib/types';

// Direct mock implementation for the cart store
jest.mock('@/store/cart-store', () => ({
  useCartStore: jest.fn(() => ({
    items: [],
    addItem: jest.fn(),
    removeItem: jest.fn(),
    updateQuantity: jest.fn(),
    clearCart: jest.fn(),
  })),
}));

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  price: 100,
  slug: 'test-product',
  description: 'Test description',
  image: '/test-image.jpg'
};

describe('AddToCart Component', () => {
  let mockAddItem: jest.Mock;

  beforeEach(() => {
    // Clear all mocks
    jest.clearAllMocks();
    
    // Create a fresh mock for each test
    mockAddItem = jest.fn();
    
    // Override the addItem mock
    (useCartStore as unknown as jest.Mock).mockImplementation(() => ({
      items: [],
      addItem: mockAddItem,
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
    }));
  });

  it('renders correctly', () => {
    render(<AddToCart product={mockProduct} />);
    expect(
      screen.getByRole('button', { name: `Add ${mockProduct.name} to cart` })
    ).toBeInTheDocument();
  });

  it('calls addItem with correct product data when clicked', () => {
    render(<AddToCart product={mockProduct} />);
    
    fireEvent.click(
      screen.getByRole('button', { name: `Add ${mockProduct.name} to cart` })
    );
    
    expect(mockAddItem).toHaveBeenCalledWith({
      id: 1,
      name: 'Test Product',
      price: 100,
      image: '/test-image.jpg',
      slug: 'test-product'
    });
  });

  it('shows success message when added to cart', () => {
    jest.useFakeTimers();
    render(<AddToCart product={mockProduct} />);
    
    fireEvent.click(
      screen.getByRole('button', { name: `Add ${mockProduct.name} to cart` })
    );
    
    expect(screen.getByText(/added to cart/i)).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    expect(screen.queryByText(/added to cart/i)).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });
});