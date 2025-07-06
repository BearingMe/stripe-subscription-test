import type { Customer } from "../../../../shared/entities/customer.entity";
import type { CreateCustomerDTO } from "../../../../shared/schemas/create-customer.schema";
import type { StripeCustomerService } from "../../stripe/customers.service";
import { HttpError } from "../../common/exceptions/HttpError";
import { extractErrorMessage } from "../../common/utils/errors";

export class CustomerService {
  constructor(private stripeCustomerService: StripeCustomerService) {}

  async create(data: CreateCustomerDTO): Promise<Customer> {
    const { uuid, name, email } = data;

    try {
      const createStripeCustomer = await this.stripeCustomerService.create({
        systemUserUuid: uuid,
        systemUserName: name,
        systemUserEmail: email,
      });

      return {
        uuid,
        name: createStripeCustomer.systemName,
        email: createStripeCustomer.systemEmail,
        ...createStripeCustomer,
      };
    } catch (err) {
      // TODO: improve this error treatment with more cases
      const msg = extractErrorMessage(err);
      throw new HttpError(msg, 400);
    }
  }
}

import stripeCustomerServiceInjectable from "../../stripe/customers.service";
export default new CustomerService(stripeCustomerServiceInjectable);
