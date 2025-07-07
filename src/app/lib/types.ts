export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}
