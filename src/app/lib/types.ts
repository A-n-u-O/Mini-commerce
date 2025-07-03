export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: number;
}

export interface CartItem extends Product {
  quantity: number;
}
