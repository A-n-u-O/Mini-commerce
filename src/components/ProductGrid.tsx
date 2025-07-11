'use client'
import { fetchProductsClient, type ProductsResponse } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";
import { Loader2, AlertCircle, RefreshCw, Search } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/app/lib/types";


// Separate component for search params to handle Suspense
function SearchParamsHandler({ 
  onSearchQueryChange 
}: { 
  onSearchQueryChange: (query: string) => void 
}) {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    const query = searchParams.get('q') || '';
    onSearchQueryChange(query);
  }, [searchParams, onSearchQueryChange]);

  return null;
}

function ProductGridContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [page, setPage] = useState(1);
  const perPage = 12;

  const { 
    data: productsData, 
    isLoading, 
    error, 
    refetch,
    isPending,
    isPlaceholderData 
  } = useQuery<ProductsResponse, Error>({
    queryKey: ["products", debouncedQuery, selectedCategory, page],
    queryFn: () => fetchProductsClient({
      query: debouncedQuery,
      filters: selectedCategory !== 'all' ? { category: selectedCategory } : undefined,
      pagination: { page, perPage }
    }),
    placeholderData: (previousData: ProductsResponse | undefined) => previousData,
    staleTime: 1000 * 60 * 5 // 5 minutes
  });

  // Provide default values if data is undefined
  const defaultData: ProductsResponse = {
    products: [],
    total: 0,
    page: 1,
    perPage,
    totalPages: 1
  };

  const { products, totalPages } = productsData || defaultData;

  // Handle search params change
  const handleSearchQueryChange = (query: string) => {
    setSearchQuery(query);
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      setPage(1); // Reset to first page when search changes
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Extract unique categories for filter
  const categories: string[] = ['all', ...new Set(
    products.map((p: Product) => p.category).filter((category): category is string => Boolean(category))
  )];

  if (isLoading || isPending) {
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
          {error.message}
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

  if (products.length === 0) {
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
      <Suspense fallback={<div>Loading search...</div>}>
        <SearchParamsHandler onSearchQueryChange={handleSearchQueryChange} />
      </Suspense>
      
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
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setPage(1);
              }}
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

      {/* Products Grid with loading overlay */}
      <div className="relative">
        {isPlaceholderData && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductGrid() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-12 w-12 animate-spin text-gray-600 mb-4" />
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    }>
      <ProductGridContent />
    </Suspense>
  );
}