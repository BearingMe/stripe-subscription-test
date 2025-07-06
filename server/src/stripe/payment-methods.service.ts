import { stripe } from "../common/lib/stripe";

class StripePaymentMethodsService {
  async setup(customerId: string) {
    const intent = await stripe.setupIntents.create({ customer: customerId });
    return intent.client_secret;
  }
}

const stripePaymentMethodsService = new StripePaymentMethodsService();
export default stripePaymentMethodsService;
