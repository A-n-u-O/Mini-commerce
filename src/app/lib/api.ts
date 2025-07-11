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

export const fetchProductsClient = async (options?: {
  query?: string;
  filters?: {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    inStock?: boolean;
  }
}): Promise<Product[]> => {
  try {
    // In a real app, this would be an API call
    let products = completeProductData(productsData);

    // Apply search query
    if (options?.query) {
      const query = options.query.toLowerCase();
      products = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) || // Make description optional
        product.category?.toLowerCase().includes(query) || // Make category optional
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query))) // Safe tags check
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
        products = products.filter(p => (p.stock ?? 0) > 0); // Safe stock check
      }
    }

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }

};