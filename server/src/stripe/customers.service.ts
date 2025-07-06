import type { CreateStripeCustomerDTO } from "./dtos/create-customer.dto";
import { stripe } from "../common/lib/stripe";
import { mapStripeCustomerToEntity } from "./mappers/customer.mapper";

export class StripeCustomerService {
  async create(data: CreateStripeCustomerDTO) {
    const { systemUserName, systemUserEmail, systemUserUuid } = data;

    const createStripeCustomer = await stripe.customers.create({
      name: systemUserName,
      email: systemUserEmail,
      metadata: { uuid: systemUserUuid },
    });

    return mapStripeCustomerToEntity(createStripeCustomer);
  }
}

const stripeCustomerServiceInjectable = new StripeCustomerService();
export default stripeCustomerServiceInjectable;
