// import { useProducts } from "./lib/useProducts";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchProducts } from "./lib/api";
import ProductGrid from "@/components/ProductGrid";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return (
    <main className=" container mx-auto px-4 py-8">
      <h1 className=" text-3xl font-bold">Mini-Commerce</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductGrid />
      </HydrationBoundary>
    </main>
  );
}
