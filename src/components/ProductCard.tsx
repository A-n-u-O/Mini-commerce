"use client";
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
      if (
        cleanPath?.startsWith("/images/") &&
        [".jpg", ".jpeg", ".png", ".webp"].some((ext) =>
          cleanPath.endsWith(ext)
        )
      ) {
        return cleanPath;
      }
      return "/images/placeholder.jpg";
    } catch {
      return "/images/placeholder.jpg";
    }
  };

  const imageUrl = getImageUrl();

  return (
    <div className="group flex flex-col h-full w-full max-w-[580px] border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 bg-white mx-auto">
      <Link href={`/product/${product.slug}`} className="flex flex-col flex-grow">
        {/* Image Container */}
        <div className="relative h-[400px] w-full bg-gray-100">
          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
            }}
          />
        </div>

        {/* Content Container */}
        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-4xl font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-gray-800">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>

      {/* Add to Cart */}
      <div className="px-4 pb-4">
        <button
          onClick={() => addItem(product)}
          className="w-full py-4 text-3xl font-medium bg-black text-white hover:bg-gray-900 rounded-lg transition-all duration-150 active:scale-95"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}