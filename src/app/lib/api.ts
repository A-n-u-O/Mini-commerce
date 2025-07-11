import { Product } from "./types";
import productsData from "@/../public/data/products.json";

// Helper function to validate and complete product data
const completeProductData = (products: Product[]): Product[] => {
  return products.map(product => ({
    ...product,
    images: product.images || [],
    description: product.description || '',
    category: product.category || 'uncategorized',
    stock: product.stock ?? 10, // Default stock
    tags: product.tags || [],
    rating: product.rating ?? 0, // Default rating
    reviews: product.reviews ?? 0,
    colorOptions: product.colorOptions || ['default'],
    sizeOptions: product.sizeOptions || ['standard']
  }));
};


export type ProductsResponse = {
  products: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export const fetchProducts = async (options?: {
  query?: string;
  filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  };
  pagination?: {
    page?: number;
    perPage?: number;
  };
}): Promise<{
  products: Product[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}> => {
  try {
    // In a real app, this would be an API call
    let products = completeProductData(productsData);

    // Apply search query
    if (options?.query) {
      const query = options.query.toLowerCase();
      products = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    // Apply filters
    if (options?.filters) {
      const { category, minPrice, maxPrice, inStock } = options.filters;
      
      if (category && category !== 'all') {
        products = products.filter(p => p.category === category);
      }
      if (minPrice) {
        products = products.filter(p => p.price >= minPrice);
      }
      if (maxPrice) {
        products = products.filter(p => p.price <= maxPrice);
      }
      if (inStock) {
        products = products.filter(p => (p.stock ?? 0) > 0);
      }
    }

    // Handle pagination
    const page = options?.pagination?.page ?? 1;
    const perPage = options?.pagination?.perPage ?? 12;
    const total = products.length;
    const totalPages = Math.ceil(total / perPage);

    // Slice the products array for pagination
    const startIndex = (page - 1) * perPage;
    const paginatedProducts = products.slice(startIndex, startIndex + perPage);

    return {
      products: paginatedProducts,
      total,
      page,
      perPage,
      totalPages
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      products: [],
      total: 0,
      page: 1,
      perPage: 12,
      totalPages: 0
    };
  }
};

// Keep the existing functions for backward compatibility
export const fetchProductsClient = fetchProducts;
export const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const products = completeProductData(productsData);
    const product = products.find(p => p.slug === slug);
    return product || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};