// components/SearchModal.tsx
'use client'

import { Search, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductsClient } from "@/app/lib/api";
import ProductCard from "./ProductCard";

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: products } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsClient,
  });

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  ) || [];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const modal = document.querySelector('.search-modal-content');
      if (modal && !modal.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      {/* Search Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-all duration-200"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center p-4 pt-24">
          <div className="search-modal-content bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="flex items-center border-b p-4">
              <Search className="h-5 w-5 text-gray-500 mr-2" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products..."
                className="flex-1 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoComplete="off"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-500 hover:text-gray-700"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {query.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">
                    Start typing to search products
                  </p>
                  <p className="text-sm text-gray-400">
                    Try "coffee", "notebook", or "headphones"
                  </p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-2">
                    No products found for "{query}"
                  </p>
                  <p className="text-sm text-gray-400">
                    Try different keywords
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id}
                      onClick={() => setIsOpen(false)}
                      className="cursor-pointer"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}