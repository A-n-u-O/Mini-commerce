'use client'
import Link from "next/link";
import { ShoppingCart, Menu } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useState } from "react";

export default function Header() {
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 64;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - headerHeight,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-xl font-bold text-gray-900 hover:text-gray-700 transition-colors"
          >
            Mini-Commerce
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('featured-products')}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              Products
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              About
            </button>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">

            {/* Shopping Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {itemCount > 99 ? '99+' : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200 md:hidden"
              aria-label="Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('featured-products')}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-left"
              >
                Products
              </button>
              <Link
                href="/account"
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium sm:hidden"
                onClick={() => setIsMenuOpen(false)}
              >
                Account
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}