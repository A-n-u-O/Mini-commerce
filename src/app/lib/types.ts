// types.ts
export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  category: string;
  stock: number;
  tags?: string[];
  rating?: number;
  reviews?: number;
  colorOptions?: string[];
  sizeOptions?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}