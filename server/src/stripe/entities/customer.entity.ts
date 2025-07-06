export interface StripeCustomer {
  stripeId: string;
  systemEmail: string;
  systemName: string;
  metadata: Record<string, string>;
  createdAt: Date;
}
