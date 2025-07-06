export interface Subscription {
  uuid: string;
  status: "active" | "canceled" | "incomplete" | "incomplete_expired" | "past_due" | "paused" | "trialing" | "unpaid";
  metadata: Record<string, string>;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
}
