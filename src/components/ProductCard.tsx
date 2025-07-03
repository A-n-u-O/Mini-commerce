import { Product } from "@/app/lib/types";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  // Verify image exists or use placeholder
  const getImageUrl = () => {
    try {
      // Remove any leading/trailing whitespace from path
      const cleanPath = product.image?.trim();
      
      // Check if it's a valid path (starts with /images/ and has extension)
      if (cleanPath?.startsWith('/images/') && 
          ['.jpg', '.jpeg', '.png', '.webp'].some(ext => cleanPath.endsWith(ext))) {
        return cleanPath;
      }
      return '/images/placeholder.jpg';
    } catch {
      return '/images/placeholder.jpg';
    }
  };

  const imageUrl = getImageUrl();
  return (
    <div className=" border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link href={`/product/${product.slug}`}>
        <div className=" relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className=" object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
            }}
          />
        </div>
        <div className=" p-4">
          <h3 className=" font-medium text-lg">{product.name}</h3>
          <p className=" text-gray-600">${product.price.toFixed(2)}</p>
        </div>
      </Link>
      <button
        onClick={() => addItem(product)}
        className=" w-full bg-black text-white border-2 rounded-3xl hover:bg-gray-800 transition-colors">
        Add to Cart
      </button>
    </div>
  );
}
