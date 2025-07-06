import type { StripePlansService } from "../../stripe/plans.service";
import type { Plan } from "./plan.interface";
import { HttpError } from "../../common/exceptions/HttpError";
import { extractErrorMessage } from "../../common/utils/errors";

class PlansService {
  constructor(private readonly stripePlansService: StripePlansService) {}

  async findAll(): Promise<Plan[]> {
    try {
      const productList = await this.stripePlansService.findAll();
      return productList.map((p) => ({
        uuid: p.stripeId, // TODO: replace with the one from database
        price: 2000, // TODO: replace with the one from database, price in cents (BRL)
        ...p,
      }));
    } catch (error) {
      // TODO: improve erro treatment
      const msg = extractErrorMessage(error);
      throw new HttpError(msg, 400);
    }
  }
}

import stripePlansServiceInjectable from "../../stripe/plans.service";
const plansService = new PlansService(stripePlansServiceInjectable);
export default plansService;
