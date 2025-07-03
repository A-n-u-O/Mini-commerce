// this was created to prevent the serverside rendering in the product detail since it's a client file 
'use client';

import dynamic from 'next/dynamic';
import { Product } from '@/app/lib/types';

const ProductDetail = dynamic(
  () => import('@/components/ProductDetail'),
  {
    ssr: false,
    loading: () => <div className="text-center py-8">Loading product details...</div>
  }
);

export default function ProductDetailWrapper({ product }: { product: Product }) {
  return <ProductDetail product={product} />;
}