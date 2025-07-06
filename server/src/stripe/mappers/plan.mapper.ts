import type Stripe from "stripe";
import type { StripePlan } from "../entities/plan.entity";
import assert from "node:assert/strict";

export function mapStripeProductToPlanEntity(p: Stripe.Product): StripePlan {
  assert(p.default_price, "Default price should exist");

  return {
    stripeId: p.id,
    stripePriceId: p.default_price.toString(),
    active: p.active,
    metadata: p.metadata,
    createdAt: new Date(p.created * 1000),
  };
}
