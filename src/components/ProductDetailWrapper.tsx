'use client';
import { Product } from '@/app/lib/types';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ProductDetailSkeleton = () => (
  <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 p-6 lg:p-8">
      {/* Image Skeleton */}
      <div className="space-y-4">
        <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="flex gap-2 justify-center">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
          <div className="flex items-center gap-4">
            <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-16 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Quantity */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-32 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          <div className="flex gap-3">
            <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
              <div className="space-y-2">
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const ProductDetail = dynamic(
  () => import('@/components/ProductDetail'),
  {
    ssr: false,
    loading: () => <ProductDetailSkeleton />
  }
);

export default function ProductDetailWrapper({ product }: { product: Product }) {
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetail product={product} />
    </Suspense>
  );
}