"use client";
import { Product } from "@/app/lib/types";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail({ product }: { product: Product }) {
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
    <div className=" grid md:grid-cols-2 gap-8">
      {/* <h1 className=" text-6xl">{product.slug}</h1> */}
      {/* product Image  */}
      <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className=" object-contain"
          sizes=" (max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      {/* product Info  */}
      <div className=" space-y-4 min-h-3/4 flex flex-col gap-1.5 ">
        <h1 className=" text-3xl font-bold">{product.name}</h1>
        <p className=" text-2xl">${(product.price / 100).toFixed(2)}</p>
        <p className=" text-2xl">{product.description}</p>

        <div className=" flex">
          <button
            onClick={() => addItem(product)}
            className=" flex-1 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
            Add to Cart
          </button>
          <Link
            href="/products"
            className=" flex-1 py-3 text-center border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors">
            <button>Back to Products </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
