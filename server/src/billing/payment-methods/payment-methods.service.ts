import type { StripePaymentMethodsService } from "../../stripe/payment-methods.service";
import type { SetupIntentDTO } from "../../../../shared/schemas/setup-intent.schema";
import { HttpError } from "../../common/exceptions/HttpError";
import { extractErrorMessage } from "../../common/utils/errors";

class PaymentMethodsService {
  constructor(private readonly stripePaymentMethodsService: StripePaymentMethodsService) {}

  async setup(data: SetupIntentDTO) {
    const { stripeCustomerId } = data;

    try {
      const customerSecretKey = await this.stripePaymentMethodsService.setup(stripeCustomerId);
      return customerSecretKey;
      //
    } catch (error) {
      const msg = extractErrorMessage(error);
      throw new HttpError(msg, 400);
    }
  }
}

import stripePaymentMethodsServiceInjectable from "../../stripe/payment-methods.service";
const paymentMethodsService = new PaymentMethodsService(stripePaymentMethodsServiceInjectable);
export default paymentMethodsService;
