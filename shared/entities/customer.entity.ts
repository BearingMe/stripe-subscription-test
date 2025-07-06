export interface Customer {
  uuid: string;
  email: string;
  name: string;
  metadata: Record<string, string>;
  createdAt: Date;
}
