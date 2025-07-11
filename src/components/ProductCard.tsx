"use client";
import { Product } from "@/app/lib/types";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const getImageUrl = () => {
    try {
      const cleanPath = product.image?.trim();
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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);

    // Simulate async operation for better UX
    setTimeout(() => {
      addItem(product);
      setIsAddingToCart(false);
    }, 300);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const imageUrl = getImageUrl();

  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200">
      {/* Wishlist Button */}
      <button
        onClick={handleLike}
        className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200 flex items-center justify-center transition-all duration-200 hover:bg-white hover:scale-110">
        <Heart
          className={`h-5 w-5 transition-colors ${
            isLiked ? "text-red-500 fill-red-500" : "text-gray-400"
          }`}
        />
      </button>

      <Link href={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          {isImageLoading && (
            <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            </div>
          )}

          <Image
            src={imageUrl}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isImageLoading ? "opacity-0" : "opacity-100"
            }`}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onLoad={() => setIsImageLoading(false)}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
              setIsImageLoading(false);
            }}
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Eye className="h-5 w-5 text-gray-800" />
            </div>
          </div>
        </div>
        {/* Content */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 text-sm leading-tight">
            {product.name}
          </h3>
          <div className="flex justify-between items-center mb-2">
            <p className="text-lg font-bold text-gray-900">
              ${(product.price / 100).toFixed(2)}
            </p>
            {product.stock > 0 ? (
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating ?? 0) // Fallback to 0 if rating is undefined
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviews ?? 0}){" "}
              {/* Fallback to 0 if reviews is undefined */}
            </span>
          </div>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
            isAddingToCart
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-800 active:scale-95"
          }`}>
          {isAddingToCart ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin"></div>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </>
          )}
        </button>
      </div>
    </div>
  );
}
