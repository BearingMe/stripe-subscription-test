import type { CreateCustomer } from "./create-customer.dto";
import type { Customer } from "./customer.interface";
import type { Timestamp } from "../../common/types/misc";
import { HttpError } from "../../common/exceptions/HttpError";
import { stripe } from "../../common/lib/stripe";
import { extractErrorMessage } from "../../common/utils/errors";

class CustomerService {
  async create(data: CreateCustomer): Promise<Customer> {
    const { name, email, uuid } = data;

    try {
      const createStripeCustomer = await stripe.customers.create({
        name,
        email,
        metadata: { uuid },
      });

      return {
        id: createStripeCustomer.id,
        email: createStripeCustomer.email!,
        name: createStripeCustomer.name!,
        metadata: createStripeCustomer.metadata,
        created: createStripeCustomer.created as Timestamp,
      };
      //
    } catch (err) {
      // TODO: improve this error treatment with more cases
      const msg = extractErrorMessage(err);
      throw new HttpError(msg, 400);
    }
  }
}

const customerService = new CustomerService();
export default customerService;
