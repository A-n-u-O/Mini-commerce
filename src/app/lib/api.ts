import { Product } from "./types";

export const fetchProducts = async (): Promise<Product[]> => {
  //to fetch api
  const dataResponse = await fetch("/products.json");
  if (!dataResponse.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await dataResponse.json();
  return data;
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | undefined> => {
  const products = await fetchProducts();
  return products.find((product) => product.slug === slug);
};
