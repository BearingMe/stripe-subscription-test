import type { CreatePaymentMethodDTO } from "./create-payment-method.dto";
import { HttpError } from "../../common/exceptions/HttpError";
import { stripe } from "../../common/lib/stripe";
import { extractErrorMessage } from "../../common/utils/errors";

class PaymentMethodsService {
  async setup(customerId: string) {
    try {
      const intent = await stripe.setupIntents.create({ customer: customerId });
      return intent.client_secret;
      //
    } catch (error) {
      const msg = extractErrorMessage(error);
      throw new HttpError(msg, 400);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async create(_: CreatePaymentMethodDTO) {
    // save through retrieving from stripe
    throw new Error("Not implemented");
  }
}

const paymentMethodsService = new PaymentMethodsService();
export default paymentMethodsService;
