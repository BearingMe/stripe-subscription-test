import { stripe } from "../common/lib/stripe";

export class StripePaymentMethodsService {
  async setup(customerId: string) {
    const intent = await stripe.setupIntents.create({ customer: customerId });
    return intent.client_secret;
  }
}

const stripePaymentMethodsServiceInjectable = new StripePaymentMethodsService();
export default stripePaymentMethodsServiceInjectable;
