import type Stripe from "stripe";
import type { Timestamp } from "../../common/types/misc";
import type { Plan } from "./plan.interface";
import { HttpError } from "../../common/exceptions/HttpError";
import { stripe } from "../../common/lib/stripe";
import { extractErrorMessage } from "../../common/utils/errors";
import assert from "node:assert";

class PlansService {
  async findAll() {
    const mapStripeProductToPlan = (p: Stripe.Product): Plan => {
      assert.strict(p.default_price, "Default price should exist");

      return {
        id: p.id,
        active: p.active,
        created: p.created as Timestamp,
        metadata: p.metadata,
        defaultPrice: p.default_price.toString(),
      };
    };

    try {
      const productList = await stripe.products.list();
      const mapperProductList = productList.data.map(mapStripeProductToPlan);

      return mapperProductList;
      //
    } catch (error) {
      // TODO: improve erro treatment
      const msg = extractErrorMessage(error);
      throw new HttpError(msg, 400);
    }
  }
}

const plansService = new PlansService();
export default plansService;
