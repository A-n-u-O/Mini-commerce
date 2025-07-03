'use client'
import { fetchProductsClient } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProductsClient,
  });

  if (isLoading) return <div>Loading spinner icon</div>;
  if (error) return error.message;

  return (
    <div className=" grid grid-cols-1">
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
