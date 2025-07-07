import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import AddToCart from '../AddToCart';
import { useCartStore } from '@/store/cart-store';
import { Product } from '@/app/lib/types';

// Create a manual mock for the cart store
jest.mock('@/store/cart-store', () => ({
  useCartStore: jest.fn((selector) => {
    // Mock implementation that returns both the state and actions
    const state = {
      items: [],
      addItem: jest.fn(),
      removeItem: jest.fn(),
      updateQuantity: jest.fn(),
      clearCart: jest.fn(),
    };
    return selector(state);
  }),
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
  let addItemMock: jest.Mock;

  beforeEach(() => {
    // Clear all mocks and create a fresh mock function
    jest.clearAllMocks();
    addItemMock = jest.fn();
    
    // Override the addItem mock implementation
    (useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      return selector({
        items: [],
        addItem: addItemMock,
        removeItem: jest.fn(),
        updateQuantity: jest.fn(),
        clearCart: jest.fn(),
      });
    });
  });

  it('renders correctly', () => {
    render(<AddToCart product={mockProduct} />);
    expect(screen.getByTestId('add-to-cart-button')).toBeInTheDocument();
  });

  it('calls addItem with correct product data when clicked', () => {
    render(<AddToCart product={mockProduct} />);
    
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    
    expect(addItemMock).toHaveBeenCalledWith({
      id: 1,
      name: 'Test Product',
      price: 100,
      image: '/test-image.jpg',
      slug: 'test-product'
    });
  });

  it('shows and hides success message when added to cart', () => {
    jest.useFakeTimers();
    render(<AddToCart product={mockProduct} />);
    
    // Initially should not show success message
    expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
    
    fireEvent.click(screen.getByTestId('add-to-cart-button'));
    
    // Should show success message after click
    expect(screen.getByTestId('success-message')).toBeInTheDocument();
    
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    
    // Should hide success message after timeout
    expect(screen.queryByTestId('success-message')).not.toBeInTheDocument();
    
    jest.useRealTimers();
  });
});