export interface Plan {
  uuid: string;
  stripePriceId: string;
  active: boolean;
  price: number;
  metadata: Record<string, string>;
  createdAt: Date;
}
