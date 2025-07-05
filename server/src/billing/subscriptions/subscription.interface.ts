import type Stripe from "stripe";
import type { Timestamp } from "../../common/types/misc";

// TODO: change created to createdAt
// TODO: change timestamp to Date
export interface Subscription {
  id: string;
  created: Timestamp;
  status: Stripe.Subscription.Status;
  cancelAtPeriodEnd: boolean;
  metadata: Record<string, string>;
}
