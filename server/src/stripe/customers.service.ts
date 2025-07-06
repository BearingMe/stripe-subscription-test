import type { CreateStripeCustomerDTO } from "./dtos/create-customer.dto";
import { stripe } from "../common/lib/stripe";
import { mapStripeCustomerToEntity } from "./mappers/customer.mapper";

class StripeCustomerService {
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

const stripeCustomerService = new StripeCustomerService();
export default stripeCustomerService;
