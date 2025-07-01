export interface CreateSubscriptionCheckout { 
  stripeCustomerId: string, 
  stripePriceId: string, 
  stripePaymentId: string 
}

export interface CreateSubscriptionCustomer {
  uuid: string;
  name: string;
  email: string;
}

export interface AttachSubscriptionPaymentMethod {
  customerStripeID: string;
}