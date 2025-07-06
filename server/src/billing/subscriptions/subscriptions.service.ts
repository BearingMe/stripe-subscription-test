import type { StripeSubscriptionsService } from "../../stripe/subscriptions.service";
import { HttpError } from "../../common/exceptions/HttpError";
import { extractErrorMessage } from "../../common/utils/errors";

// return {
//   stripeId: s.id,
//   status: s.status,
//   cancelAtPeriodEnd: s.cancel_at_period_end,
//   metadata: s.metadata,
//   createdAt: new Date(s.created * 1000),
// };

// export interface Subscription {
//   uuid: string;
//   status: Stripe.Subscription.Status;
//   metadata: Record<string, string>;
//   cancelAtPeriodEnd: boolean;
//   createdAt: Date;
// }

class SubscriptionsService {
  constructor(private readonly stripeSubscriptionsService: StripeSubscriptionsService) {}

  async findManyByCustomerId(id: string): Promise<Subscription[]> {
    try {
      const foundSubscriptions = await this.stripeSubscriptionsService.findManyByCustomerId(id);
      return foundSubscriptions.map((s) => ({
        uuid: s.stripeId, // TODO: replace with system uuid
        ...s,
      }));
      //
    } catch (error) {
      const msg = extractErrorMessage(error);
      throw new HttpError(msg, 400);
    }
  }

  async create(data: CreateSubscriptionDTO): Promise<Subscription> {
    const { stripeCustomerId, stripePaymentMethodId, stripePriceId } = data;

    const foundSubscriptions = await this.findManyByCustomerId(stripeCustomerId);
    if (foundSubscriptions.some((s) => s.status === "active")) {
      throw new HttpError("Active subscription already in use", 400);
    }

    try {
      const createdSubscription = await this.stripeSubscriptionsService.create({
        stripeCustomerId,
        stripePaymentMethodId,
        stripePriceId,
      });

      // FIX: desestruturing to return like that I a shitty idea
      return {
        uuid: createdSubscription.stripeId, // TODO: it will come from db
        ...createdSubscription,
      };
      //
    } catch (error) {
      const msg = extractErrorMessage(error);
      throw new HttpError(msg, 400);
    }
  }
}

import stripeSubscriptionsServiceInjectable from "../../stripe/subscriptions.service";
import type { Subscription } from "./subscription.interface";
import type { CreateSubscriptionDTO } from "./create-subscripton.schema";
const subscriptionsService = new SubscriptionsService(stripeSubscriptionsServiceInjectable);
export default subscriptionsService;
