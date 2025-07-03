import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useSubscriptionPlans() {
  interface Product {
    id: string;
    name: string;
    default_price: string;
    active: boolean;
  }

  interface ProductList {
    data: Product[];
  }

  return useQuery({
    queryKey: ["subscriptions", "plans"],
    queryFn: async () => {
      const url = "http://localhost:3000/subscriptions/products";
      const response = await axios.get<{ data: ProductList }>(url);
      return response.data;
    },
  });
}
