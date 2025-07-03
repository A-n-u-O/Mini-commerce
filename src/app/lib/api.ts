import { Product } from "./types";
import productsData from "@/../public/data/products.json";

//  Helper function to validate image paths
const validateImagePaths = (products: Product[]): Product[] => {
  return products.map(product => ({...product,
    // Check if image exists in public folder
    image: product.image?.startsWith("/")
      ? product.image
      : "/images/placeholder.jpg"
  }));
};

export const fetchProducts = async (): Promise<Product[]> => {
  //in production, return directly imported data
  if (process.env.NODE_ENV !== "development") {
    return validateImagePaths(productsData);
  }

  //in development to fetch api
  try {
    const dataResponse = await fetch("/data/products.json");
    if (!dataResponse.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await dataResponse.json();
    return validateImagePaths(data);
  } catch {
    return validateImagePaths(productsData); //if fetch fails
  }
};

//for client components
export const fetchProductsClient = async (): Promise<Product[]> => {
  const dataResponse = await fetch("/data/products.json");
  if (!dataResponse.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await dataResponse.json();

  // error handling for client side
  return data.map((product: Product) => ({
    ...product,
    image: product.image || "/images/placeholder.jpg",
  }));
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | undefined> => {
  const products = await fetchProducts();
  return products.find((product) => product.slug === slug);
};
