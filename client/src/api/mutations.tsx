import { useMutation } from "@tanstack/react-query";
import axios from "axios";

interface ResponseObject<T> {
  data: T;
}

export function useCreateUser() {
  interface CreateUser {
    name: string;
    email: string;
  }

  interface User {
    name: string;
    email: string;
    uuid: string;
  }

  return useMutation({
    mutationFn: async (data: CreateUser) => {
      const url = "http://localhost:3000/users";
      const response = await axios.post<ResponseObject<User>>(url, data);
      return response.data;
    },
  });
}

export function useCreateSubscriptionCustomer() {
  interface CreateSubscriptionCustomer {
    name: string;
    email: string;
    uuid: string;
  }

  interface SubscriptionCUstomer {
    id: string;
  }

  return useMutation({
    mutationFn: async (data: CreateSubscriptionCustomer) => {
      const url = "http://localhost:3000/subscriptions/customers";

      const response = await axios.post<ResponseObject<SubscriptionCUstomer>>(
        url,
        data
      );
      return response.data;
    },
  });
}

export function useCheckout() {
  interface Checkout {
    stripeCustomerId: string;
    stripePriceId: string;
    stripePaymentId: string;
  }

  return useMutation({
    mutationFn: async (data: Checkout) => {
      const response = await axios.post(
        "http://localhost:3000/subscriptions/checkout",
        data
      );
      return response.data;
    },
  });
}
