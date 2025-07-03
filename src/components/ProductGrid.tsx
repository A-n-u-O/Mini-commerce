import { fetchProducts } from "@/app/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function ProductGrid() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts, 
  });

  if(isLoading)return <div>Loading spinner icon</div>
  if(error)return error.message

  return(<div className="">
    
  </div>)
}
