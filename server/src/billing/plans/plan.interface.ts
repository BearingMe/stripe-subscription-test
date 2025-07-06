export interface Plan {
  uuid: string;
  active: boolean;
  price: number;
  metadata: Record<string, string>;
  createdAt: Date;
}
