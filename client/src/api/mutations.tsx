import type { CreateUserDTO } from "../../../shared/schemas/create-user.schema";
import type { CreateCustomerDTO } from "../../../shared/schemas/create-customer.schema";
import type { CreateSubscriptionDTO } from "../../../shared/schemas/create-subscripton.schema";
import type { User } from "../../../shared/entities/user.entity";
import type { Customer } from "../../../shared/entities/customer.entity";
import type { Subscription } from "../../../shared/entities/subscription.entity";
import { useMutation } from "@tanstack/react-query";
import { 
  USERS, 
  BILLING_CUSTOMERS, 
  BILLING_PAYMENT_METHODS, 
  BILLING_SUBSCRIPTIONS 
} from "../../../shared/constants/endpoints";
import http from "@/lib/http";

export function replica() {
  return useMutation({
    mutationFn: async (data: unknown) => {
      const response = await http.options("/", data);
      return response.data
    }
  })
}

export function useCreateUser() {
  return useMutation({
    mutationFn: async (data: CreateUserDTO) => {
      const response = await http.post<{ data: User }>(USERS, data);
      return response.data
    }
  })
}

export function useCreateCustomer() {
  return useMutation({
    mutationFn: async (data: CreateCustomerDTO) => {
      const response = await http.post<{ data: Customer }>(BILLING_CUSTOMERS, data);
      return response.data
    }
  })
}

export function useSetupPaymentMethod() {
  return useMutation({
    mutationFn: async (data: unknown) => {
      const response = await http.post<{ data: string }>(BILLING_PAYMENT_METHODS + "/setup", data);
      return response.data
    }
  })
}

export function useCreateSubscription() {
  return useMutation({
    mutationFn: async (data: CreateSubscriptionDTO) => {
      const response = await http.post<{ data: Subscription }>(BILLING_SUBSCRIPTIONS, data);
      return response.data
    }
  })
}