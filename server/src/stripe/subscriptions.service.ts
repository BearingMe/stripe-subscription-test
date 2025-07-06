import type { CreateStripeSubscriptionDTO } from "./dtos/create-subscription.dto";
import { stripe } from "../common/lib/stripe";
import { mapStripeSubscriptionToEntity } from "./mappers/subscription.mapper";

export class StripeSubscriptionsService {
  async findManyByCustomerId(id: string) {
    const foundSubscriptions = await stripe.subscriptions.list({ customer: id });
    return foundSubscriptions.data.map(mapStripeSubscriptionToEntity);
  }

  async create(data: CreateStripeSubscriptionDTO) {
    const { stripeCustomerId, stripePaymentMethodId, stripePriceId } = data;

    const createdSubscription = await stripe.subscriptions.create({
      customer: stripeCustomerId,
      items: [{ price: stripePriceId }],
      default_payment_method: stripePaymentMethodId,
    });

    return mapStripeSubscriptionToEntity(createdSubscription);
  }
}

const stripeSubscriptionsServiceInjectable = new StripeSubscriptionsService();
export default stripeSubscriptionsServiceInjectable;
