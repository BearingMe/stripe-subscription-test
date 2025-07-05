export interface CreatePaymentMethodDTO {
  stripePaymentId: string;
  stripeCustomerId: string;
  isDefault: boolean;
}
