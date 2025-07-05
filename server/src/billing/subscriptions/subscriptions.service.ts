import type Stripe from "stripe";
import type { Timestamp } from "../../common/types/misc";
import type { Subscription } from "./subscription.interface";
import type { CreateSubscriptionDTO } from "./create-subscripton.dto";
import { HttpError } from "../../common/exceptions/HttpError";
import { stripe } from "../../common/lib/stripe";
import { extractErrorMessage } from "../../common/utils/errors";

class SubscriptionsService {
  // TODO: standartize this fucking mapping functions
  private mapStripeSubscription(s: Stripe.Subscription): Subscription {
    return {
      id: s.id,
      created: s.created as Timestamp,
      status: s.status,
      cancelAtPeriodEnd: s.cancel_at_period_end,
      metadata: s.metadata,
    };
  }

  private async findManyByCustomerId(id: string) {
    try {
      const foundSubscriptions = await stripe.subscriptions.list({ customer: id });
      const mappedSubscriptions = foundSubscriptions.data.map(this.mapStripeSubscription);

      return mappedSubscriptions;
      //
    } catch (error) {
      // TODO: erro treatment bla bla
      const msg = extractErrorMessage(error);
      throw new HttpError(msg, 400);
    }
  }

  async create(data: CreateSubscriptionDTO) {
    const { customerID, paymentMethodId, priceId } = data;

    const foundSubscriptions = await this.findManyByCustomerId(customerID);
    if (foundSubscriptions.some((s) => s.status === "active")) {
      throw new HttpError("Active subscription already in use", 400);
    }

    try {
      const createdSubscription = await stripe.subscriptions.create({
        customer: customerID,
        items: [{ price: priceId }],
        default_payment_method: paymentMethodId,
      });

      return this.mapStripeSubscription(createdSubscription);
      //
    } catch (error) {
      const msg = extractErrorMessage(error);
      throw new HttpError(msg, 400);
    }
  }
}

const subscriptionsService = new SubscriptionsService();
export default subscriptionsService;
