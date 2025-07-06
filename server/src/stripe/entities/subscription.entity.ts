export interface StripeSubscription {
  stripeId: string;
  status: string;
  metadata: Record<string, string>;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
}
