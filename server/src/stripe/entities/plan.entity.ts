export interface StripePlan {
  stripeId: string;
  stripePriceId: string;
  active: boolean;
  metadata: Record<string, string>;
  createdAt: Date;
}
