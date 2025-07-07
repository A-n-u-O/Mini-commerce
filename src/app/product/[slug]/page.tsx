import { getProductBySlug } from "@/app/lib/api";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const ProductDetail = dynamic(() => import("@/components/ProductDetail"), {
  loading: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse w-1/3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="flex-1 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  ),
});

// For generateMetadata - params is now a Promise
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product does not exist",
    };
  }
  
  return {
    title: `${product.name} | Mini-Commerce`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

// Page component - params is now a Promise
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) {
    notFound();
  }
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Mini-Commerce",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
    },
  };
  
  return (
    <main className="min-h-screen bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm" aria-label="Breadcrumb">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-500 hover:text-gray-700">
              Products
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <ProductDetail product={product} />
      </div>
    </main>
  );
}