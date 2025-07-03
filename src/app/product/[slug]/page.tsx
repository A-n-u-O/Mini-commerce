import { getProductBySlug } from "@/app/lib/api";
import { notFound } from "next/navigation";

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
      {/* <ProductDetails product={product} /> */}
    </main>
  );
}
