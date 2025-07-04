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
    <main className="mx-auto px-4 py-8">
      

      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className=" m-10">
          <ProductGrid />
        </div>
      </HydrationBoundary>
    </main>
  );
}
