'use client'
import { fetchProductsClient } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Loader2, AlertCircle, RefreshCw, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ProductGrid() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: products, isLoading, error, refetch } = useQuery({
    queryKey: ["products", debouncedQuery, selectedCategory],
    queryFn: () => fetchProductsClient({
      query: debouncedQuery,
      filters: selectedCategory !== 'all' ? { category: selectedCategory } : undefined
    }),
  });

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Extract unique categories for filter
  const categories = ['all', ...new Set(products?.map(p => p.category).filter(Boolean))] as string[];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-gray-600 mb-4" />
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Failed to load products
        </h3>
        <p className="text-gray-600 text-center mb-6 max-w-md">
          {error instanceof Error ? error.message : "Something went wrong"}
        </p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="text-6xl mb-4">
          {debouncedQuery ? '🔍' : '🛍️'}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {debouncedQuery ? 'No matching products found' : 'No products available'}
        </h3>
        <p className="text-gray-600">
          {debouncedQuery ? 'Try a different search term' : 'Check back later for new arrivals!'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-auto">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}