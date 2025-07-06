import type Stripe from "stripe";
import type { StripeSubscription } from "../entities/subscription.entity";

export function mapStripeSubscriptionToEntity(s: Stripe.Subscription): StripeSubscription {
  return {
    stripeId: s.id,
    status: s.status,
    cancelAtPeriodEnd: s.cancel_at_period_end,
    metadata: s.metadata,
    createdAt: new Date(s.created * 1000),
  };
}
