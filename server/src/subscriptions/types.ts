export interface CreateSubscription { 
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