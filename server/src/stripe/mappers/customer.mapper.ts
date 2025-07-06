import type Stripe from "stripe";
import type { StripeCustomer } from "../entities/customer.entity";
import assert from "node:assert/strict";

export function mapStripeCustomerToEntity(c: Stripe.Customer): StripeCustomer {
  assert(c.name, "Customer name should exist");
  assert(c.email, "Customer email should exist");

  return {
    stripeId: c.id,
    systemEmail: c.email,
    systemName: c.name,
    metadata: c.metadata,
    createdAt: new Date(c.created * 1000),
  };
}
