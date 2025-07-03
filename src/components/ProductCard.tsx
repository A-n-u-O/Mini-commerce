import { Product } from "@/app/lib/types";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  return (
    <div>
      <Link href={`/product/${product.slug}`}>
        <div className="">
          <Image
            src={product.name}
            alt={product.name}
            fill
            className=" object-cover"
          />
        </div>
        <div className="">
          <h3>{product.name}</h3>
          <p>${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button onClick={() => addItem(product)}>Add to Cart</button>
    </div>
  );
}
