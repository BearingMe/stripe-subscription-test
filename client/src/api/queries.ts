import type { Plan } from "../../../shared/entities/plan.entity";
import type { User } from "../../../shared/entities/user.entity";
import { USERS, BILLING_PLANS } from "../../../shared/constants/endpoints";
import { useQuery } from "@tanstack/react-query";
import http from "@/lib/http";

export function users() {
  return useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await http.get<{ data: User[], total: number }>(USERS);
      return response.data;
    }
  })
}

export function plans() {
  return useQuery({
    queryKey: ["plans"],
    queryFn: async () => {
      const response = await http.get<{ data: Plan[], total: number }>(BILLING_PLANS);
      return response.data;
    }
  })
}
