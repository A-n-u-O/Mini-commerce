import { getProductBySlug } from "@/app/lib/api";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";

const ProductDetail = dynamic(() => import("@/components/ProductDetail"), {
  loading: () => <div className="text-center py-8">Loading product details...</div>,
});
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }
  return (
    <main className="container mx-auto px-4 py-8">
      <ProductDetail product={product} />
    </main>
  );
}
