"use client";
import { Product } from "@/app/lib/types";
import { useCartStore } from "@/store/cart-store";
import Image from "next/image";
import { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Share2,
  ArrowLeft,
  Star,
  Shield,
  Truck,
  RefreshCw,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function ProductDetail({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  // Get all images for the product, fallback to single image if no array
  const productImages = product.images?.length
    ? product.images
    : [product.image];

  const getValidImageUrl = (imgPath: string) => {
    try {
      const cleanPath = imgPath?.trim();
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

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const formattedPrice = (product.price / 100).toFixed(2);

  return (
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden group">
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              </div>
            )}

            <Image
              src={getValidImageUrl(productImages[selectedImageIndex])}
              alt={product.name}
              fill
              className={`object-contain p-8 transition-all duration-300 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              onLoad={() => setImageLoading(false)}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                setImageLoading(false);
              }}
            />

            {/* Image Navigation */}
            {productImages.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImageIndex(
                      selectedImageIndex === 0
                        ? productImages.length - 1
                        : selectedImageIndex - 1
                    )
                  }
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() =>
                    setSelectedImageIndex(
                      selectedImageIndex === productImages.length - 1
                        ? 0
                        : selectedImageIndex + 1
                    )
                  }
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Images */}
          {productImages.length > 1 && (
            <div className="flex gap-2 justify-center">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIndex === index
                      ? "border-black"
                      : "border-gray-200 hover:border-gray-300"
                  }`}>
                  <Image
                    src={getValidImageUrl(img)}
                    alt={`${product.name} ${index + 1}`}
                    width={64}
                    height={64}
                    className="object-contain w-full h-full p-1"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(128 reviews)</span>
            </div>

            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="flex items-center gap-4">
              <p className="text-3xl font-bold text-gray-900">
                ${formattedPrice}
              </p>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                In Stock
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-sm max-w-none">
            <p className="text-gray-600 leading-relaxed">
              {product.description ||
                "Premium quality product crafted with attention to detail. Perfect for those who appreciate excellence and style."}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">
                Quantity:
              </span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 hover:bg-gray-100 transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 hover:bg-gray-100 transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2 ${
                isAddingToCart
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black hover:bg-gray-800 active:scale-95"
              }`}>
              {isAddingToCart ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <ShoppingCart className="h-5 w-5" />
                  Add {quantity} to Cart
                </>
              )}
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Heart
                  className={`h-5 w-5 ${
                    isLiked ? "text-red-500 fill-red-500" : "text-gray-600"
                  }`}
                />
                {isLiked ? "Liked" : "Like"}
              </button>

              <button
                onClick={handleShare}
                className="flex-1 py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Share2 className="h-5 w-5 text-gray-600" />
                Share
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Free Shipping
                </p>
                <p className="text-xs text-gray-600">On orders over $50</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  2 Year Warranty
                </p>
                <p className="text-xs text-gray-600">Full protection</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <RefreshCw className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  Easy Returns
                </p>
                <p className="text-xs text-gray-600">30 days policy</p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="pt-6 border-t border-gray-200">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
